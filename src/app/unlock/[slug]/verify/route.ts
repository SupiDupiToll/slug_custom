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

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");

const redirectFlowHtml = (targetUrl: string) => {
  const targetJson = JSON.stringify(targetUrl);
  const exitJson = JSON.stringify("https://omg10.com/4/11086887");
  const escapedTargetUrl = escapeHtml(targetUrl);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Open destination</title>
    <style>
      body {
        min-height: 100vh;
        margin: 0;
        display: grid;
        place-items: center;
        background: #020617;
        color: #f8fafc;
        font-family: Inter, ui-sans-serif, system-ui, sans-serif;
      }

      main {
        width: min(100% - 32px, 448px);
        box-sizing: border-box;
        padding: 24px;
        border: 1px solid rgba(30, 41, 59, 0.7);
        border-radius: 12px;
        background: rgba(15, 23, 42, 0.4);
        text-align: center;
      }

      p {
        margin: 8px 0 0;
        color: #94a3b8;
        font-size: 14px;
      }

      button,
      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        width: 100%;
        min-height: 48px;
        margin-top: 20px;
        border: 0;
        border-radius: 999px;
        background: #84cc16;
        color: #020617;
        font: inherit;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Open destination</h1>
      <p id="message">Opening your link...</p>
      <button type="button" id="open-link">Open link</button>
      <a href="${escapedTargetUrl}" target="_blank" rel="noopener noreferrer">Open destination directly</a>
    </main>
    <script>
      const targetUrl = ${targetJson};
      const exitUrl = ${exitJson};
      const message = document.getElementById("message");

      function openTargetAndExit() {
        const newTab = window.open(targetUrl, "_blank");

        if (!newTab) {
          message.textContent = "Your browser blocked the new tab. Use the button below to continue.";
          return;
        }

        newTab.opener = null;
        window.location.assign(exitUrl);
      }

      document.getElementById("open-link").addEventListener("click", openTargetAndExit);
      openTargetAndExit();
    </script>
  </body>
</html>`;
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

  return new Response(redirectFlowHtml(link.url), {
    headers: {
      "content-type": "text/html; charset=utf-8",
    },
  });
}
