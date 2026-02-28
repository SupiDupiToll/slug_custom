"use server";

import { db } from "@/server/db";
import { checkBlocked } from "../actions/profile";

export interface urlFromServerResult {
  error: boolean;
  message: string;
  createdBy?: string;
  redirect404?: boolean;
  url?: string;
  rateLimited?: boolean;
  requiresPassword?: boolean;
}

interface urlFromServerOptions {
  skipPasswordCheck?: boolean;
}

const isSafeRedirectUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

export const urlFromServer = async (
  slug: string,
  options: urlFromServerOptions = {},
): Promise<urlFromServerResult> => {
  try {
    // Get link from server:s
    const getLinkFromServer = await db.links.findUnique({
      where: {
        slug: slug,
      },
    });

    if (!getLinkFromServer) {
      return {
        error: false,
        message: "🚧 Error (urlFromServer): Slug not found or invalid.",
        redirect404: true,
      };
    }

    const isUserBlocked = await checkBlocked(getLinkFromServer.creatorId);

    if (isUserBlocked) {
      return {
        error: false,
        message: "🚧 Error (urlFromServer): User blocked.",
        redirect404: true,
      };
    }

    if (getLinkFromServer.passwordHash && !options.skipPasswordCheck) {
      return {
        error: false,
        message: "Password required.",
        createdBy: getLinkFromServer.creatorId,
        requiresPassword: true,
      };
    }

    if (!isSafeRedirectUrl(getLinkFromServer.url)) {
      return {
        error: false,
        message: "Invalid redirect URL.",
        redirect404: true,
      };
    }

    await db.links.update({
      where: {
        id: getLinkFromServer.id,
      },
      data: {
        clicks: {
          increment: 1,
        },
        lastClicked: new Date(),
      },
    });

    return {
      error: false,
      message: "Success",
      createdBy: getLinkFromServer.creatorId,
      url: getLinkFromServer.url,
    };
  } catch (error) {
    console.error("🚧 Error (urlFromServer): ", error);
    return {
      error: true,
      message: "Something went wrong.",
    };
  }
};
