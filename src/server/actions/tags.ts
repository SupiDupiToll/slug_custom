"use server";

import type { z } from "zod";

import { auth } from "@/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { CreateTagSchema } from "@/server/schemas";

/**
 * Create a tag.
 * Return an object.
 * Authentication required.
 * @type {string()}
 */
export const createTag = async (values: z.infer<typeof CreateTagSchema>) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const userId = currentUser.user?.id;
  if (!userId) {
    return null;
  }

  const parsedValues = CreateTagSchema.safeParse(values);
  if (!parsedValues.success) {
    return null;
  }

  const result = await db.tags.create({
    data: {
      name: parsedValues.data.name,
      color: parsedValues.data.color,
      creatorId: userId,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard");

  return result;
};

/**
 * Insert a tag to a link.
 * Authentication required.
 * @type {string()}
 */
export const insertTagToLink = async (linkId: string, tagId: string) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const userId = currentUser.user?.id;
  if (!userId) {
    return null;
  }

  const ownedLink = await db.links.findFirst({
    where: {
      id: linkId,
      creatorId: userId,
    },
    select: {
      id: true,
    },
  });
  const ownedTag = await db.tags.findFirst({
    where: {
      id: tagId,
      creatorId: userId,
    },
    select: {
      id: true,
    },
  });

  if (!ownedLink || !ownedTag) {
    return null;
  }

  await db.linkTags.create({
    data: {
      linkId,
      tagId,
    },
  });

  revalidatePath("/");

  return;
};

/**
 * Remove a tag.
 * Authentication required.
 * @type {string()}
 */
export const removeTag = async (tagId: string) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const userId = currentUser.user?.id;
  if (!userId) {
    return null;
  }

  await db.tags.deleteMany({
    where: {
      id: tagId,
      creatorId: userId,
    },
  });

  revalidatePath("/");

  return;
};
