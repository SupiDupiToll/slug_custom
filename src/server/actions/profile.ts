"use server";

import type { z } from "zod";

import { auth, signOut } from "@/auth";
import { db } from "@/server/db";
import { revalidatePath } from "next/cache";
import { UpdateProfileSchema } from "@/server/schemas";

/**
 * Update Profile.
 * Authentication required.
 */
export const updateProfile = async (
  values: z.infer<typeof UpdateProfileSchema>,
) => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  const parsedValues = UpdateProfileSchema.safeParse(values);
  if (!parsedValues.success) {
    return null;
  }

  // Create new link:
  const result = await db.user.update({
    where: {
      id: currentUser.user.id,
    },
    data: {
      ...parsedValues.data,
    },
  });

  revalidatePath("/");
  revalidatePath("/dashboard/settings");

  return result;
};

/**
 * Delete Profile.
 * Authentication required.
 */
export const deleteProfile = async () => {
  const currentUser = await auth();

  if (!currentUser) {
    console.error("Not authenticated.");
    return null;
  }

  // Delete user:
  await db.user.delete({
    where: {
      id: currentUser.user.id,
    },
  });

  await signOut();

  return true;
};

/** Check if the user is blocked, for URL redirects. */
export const checkBlocked = async (userId: string) => {
  const result = await db.user.findFirst({
    where: {
      id: userId,
      blocked: true,
    },
  });
  return result;
};
