import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

import { db } from "@/server/db";

const MAX_ATTEMPTS = 5;
const WINDOW_MINUTES = 10;

const isSafeRedirectUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const getIp = (request: Request) => {
  const xForwardedFor = request.headers.get("x-forwarded-for");
  const xRealIp = request.headers.get("x-real-ip");

  if (xForwardedFor) {
    return xForwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return xRealIp ?? "unknown";
};

const gateRedirectUrl = (request: Request, slug: string) => {
  return new URL(`/unlock/${encodeURIComponent(slug)}`, request.url);
};

export async function POST(
  request: Request,
  { params }: { params: { slug: string } },
) {
  const slug = params.slug;
  const ip = getIp(request);
  const formData = await request.formData();
  const password = formData.get("password");

  const baseRedirect = gateRedirectUrl(request, slug);

  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000);
  const recentAttempts = await db.passwordAttempt.count({
    where: {
      ip,
      createdAt: {
        gte: windowStart,
      },
    },
  });

  if (recentAttempts >= MAX_ATTEMPTS) {
    const rateLimitedUrl = gateRedirectUrl(request, slug);
    rateLimitedUrl.searchParams.set("rate", "1");
    return NextResponse.redirect(rateLimitedUrl, { status: 303 });
  }

  const link = await db.links.findUnique({
    where: { slug },
    select: {
      id: true,
      url: true,
      passwordHash: true,
      createdBy: {
        select: {
          blocked: true,
        },
      },
    },
  });

  if (!link) {
    await db.passwordAttempt.create({
      data: {
        slug,
        ip,
      },
    });

    baseRedirect.searchParams.set("error", "1");
    return NextResponse.redirect(baseRedirect, { status: 303 });
  }

  if (link.createdBy?.blocked) {
    await db.passwordAttempt.create({
      data: {
        slug,
        ip,
      },
    });

    baseRedirect.searchParams.set("error", "1");
    return NextResponse.redirect(baseRedirect, { status: 303 });
  }

  if (!link.passwordHash) {
    await db.passwordAttempt.create({
      data: {
        slug,
        ip,
      },
    });

    baseRedirect.searchParams.set("error", "1");
    return NextResponse.redirect(baseRedirect, { status: 303 });
  }

  if (typeof password !== "string" || password.length === 0) {
    await db.passwordAttempt.create({
      data: {
        slug,
        ip,
      },
    });

    baseRedirect.searchParams.set("error", "1");
    return NextResponse.redirect(baseRedirect, { status: 303 });
  }

  const isValidPassword = await bcrypt.compare(password, link.passwordHash);

  if (!isValidPassword) {
    await db.passwordAttempt.create({
      data: {
        slug,
        ip,
      },
    });

    baseRedirect.searchParams.set("error", "1");
    return NextResponse.redirect(baseRedirect, { status: 303 });
  }

  await db.links.update({
    where: {
      id: link.id,
    },
    data: {
      clicks: {
        increment: 1,
      },
      lastClicked: new Date(),
    },
  });

  if (!isSafeRedirectUrl(link.url)) {
    baseRedirect.searchParams.set("error", "1");
    return NextResponse.redirect(baseRedirect, { status: 303 });
  }

  return NextResponse.redirect(link.url, { status: 303 });
}
