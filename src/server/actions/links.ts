"use server";

import type { z } from "zod";

import bcrypt from "bcryptjs";
import { auth } from "@/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { CreateLinkSchema, EditLinkSchema } from "@/server/schemas";

const CREATE_LINK_MAX_ATTEMPTS = 30;
const CREATE_LINK_WINDOW_MINUTES = 60;

const isSafeRedirectUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

/**
 * Get single link data.
 * Return an object.
 * Authentication required.
 * @type {string()}
 */
export const getSingleLink = async (id: string) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const userId = currentUser.user?.id;
  if (!userId) {
    return null;
  }

  const result = await db.links.findFirst({
    where: {
      id,
      creatorId: userId,
    },
  });

  return result;
};

/**
 * Check if slug is available.
 * Return true or false.
 * Not authentication required.
 * @type {string()}
 */
export const checkIfSlugExist = async (slug: string) => {
  const currentUser = await auth();

  if (!currentUser) {
    return true;
  }

  const result = await db.links.findUnique({
    where: {
      slug: slug,
    },
  });

  if (result) {
    return true;
  }

  return false;
};

/**
 * Create new link.
 * Authentication required.
 * @type {z.infer<typeof LinkSchema>}
 */

interface createLinkResult {
  limit?: boolean;
  error?: string;
  linkId?: string;
}

export const createLink = async (
  values: z.infer<typeof CreateLinkSchema>,
): Promise<createLinkResult> => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return { error: "Not authenticated. Please login again." };
  }

  const userId = currentUser.user?.id;
  if (!userId) {
    return { error: "Not authenticated. Please login again." };
  }

  // Kein Link-Limit mehr: Limit-Prüfung entfernt

  // If the user is blocked, dont allow to create a new link:
  if (currentUser.user?.blocked) {
    return {
      limit: true,
      error: "Your account is blocked. Please contact the support.",
    };
  }

  const parsedValues = CreateLinkSchema.safeParse(values);
  if (!parsedValues.success) {
    return {
      error: parsedValues.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  if (!isSafeRedirectUrl(parsedValues.data.url)) {
    return {
      error: "Only http:// or https:// URLs are allowed.",
    };
  }

  const windowStart = new Date(
    Date.now() - CREATE_LINK_WINDOW_MINUTES * 60 * 1000,
  );
  const recentCreations = await db.links.count({
    where: {
      creatorId: userId,
      createdAt: {
        gte: windowStart,
      },
    },
  });

  if (recentCreations >= CREATE_LINK_MAX_ATTEMPTS) {
    return {
      limit: true,
      error: "Rate limit reached. Please try again later.",
    };
  }

  const password = parsedValues.data.password?.trim();
  const passwordHash = password ? await bcrypt.hash(password, 10) : null;

  // Create new link:
  const result = await db.links.create({
    data: {
      url: parsedValues.data.url,
      slug: parsedValues.data.slug,
      description: parsedValues.data.description,
      passwordHash,
      creatorId: userId,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");

  return { limit: false, linkId: result.id };
};

/**
 * Update link data.
 * Authentication required.
 * @type {z.infer<typeof EditLinkSchema>}
 */
export const updateLink = async (
  values: z.infer<typeof EditLinkSchema> & { tags?: string[] },
) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const userId = currentUser.user?.id;
  if (!userId) {
    return null;
  }

  const parsedValues = EditLinkSchema.safeParse(values);
  if (!parsedValues.success) {
    return {
      error: parsedValues.error.issues[0]?.message ?? "Invalid input.",
    };
  }

  if (!isSafeRedirectUrl(parsedValues.data.url)) {
    return {
      error: "Only http:// or https:// URLs are allowed.",
    };
  }

  const { tags } = values;
  type UpdateLinkData = {
    url: string;
    slug: string;
    description: string;
    tags?: {
      deleteMany: Record<string, never>;
      create: { tag: { connect: { id: string } } }[];
    };
  };
  const data: UpdateLinkData = {
    url: parsedValues.data.url,
    slug: parsedValues.data.slug,
    description: parsedValues.data.description,
  };
  if (tags) {
    const allowedTags = await db.tags.findMany({
      where: {
        creatorId: userId,
        id: {
          in: tags,
        },
      },
      select: {
        id: true,
      },
    });
    data.tags = {
      deleteMany: {},
      create: allowedTags.map((tag) => ({ tag: { connect: { id: tag.id } } })),
    };
  }

  const ownedLink = await db.links.findFirst({
    where: {
      id: parsedValues.data.id,
      creatorId: userId,
    },
    select: {
      id: true,
    },
  });

  if (!ownedLink) {
    return {
      error: "Not authorized.",
    };
  }

  await db.links.update({
    where: {
      id: ownedLink.id,
    },
    data,
  });

  revalidatePath("/");
  revalidatePath("/dashboard");

  return;
};

/**
 * Delete link.
 * Authentication required.
 * @type {string()}
 */
export const deleteLink = async (id: string) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const userId = currentUser.user?.id;
  if (!userId) {
    return null;
  }

  // Update link:
  const result = await db.links.deleteMany({
    where: { id: id, creatorId: userId },
  });

  revalidatePath("/dashboard");

  return result;
};

/**
 * Download all links data as JSON.
 * Authentication required.
 * @type {{ slug: string; url: string; }[]}
 */
export const downloadAllLinks = async () => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const userId = currentUser.user?.id;
  if (!userId) {
    return null;
  }

  const result = await db.links.findMany({
    where: {
      creatorId: userId,
    },
  });

  return result.map((link) => {
    const { slug, url, createdAt } = link;
    return { slug, url, createdAt } as {
      slug: string;
      url: string;
      createdAt: Date;
    };
  });
};
