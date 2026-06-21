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

const redirectFlowHtml = (targetUrl: string) => {
  const targetJson = JSON.stringify(targetUrl);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Redirect</title>
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

      h1 {
        margin: 0;
        font-size: 24px;
      }

      p {
        margin: 8px 0 0;
        color: #94a3b8;
        font-size: 14px;
      }

      .countdown {
        margin-top: 24px;
        font-size: 64px;
        font-weight: 900;
        color: #84cc16;
      }

      button {
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
        cursor: pointer;
      }
    </style>
  </head>
  <body>
    <main>
      <h1>Ziel wird geöffnet</h1>
      <p>Du wirst in Kürze weitergeleitet.</p>
      <div class="countdown" id="countdown">3</div>
      <button type="button" id="direct-link">Direkt weiter</button>
    </main>
    <script>
      const targetUrl = ${targetJson};
      var countdownEl = document.getElementById("countdown");
      var count = 3;

      function redirect() {
        window.location.assign(targetUrl);
      }

      document.getElementById("direct-link").addEventListener("click", redirect);

      var timer = setInterval(function () {
        count--;
        if (count <= 0) {
          clearInterval(timer);
          countdownEl.textContent = "✓";
          redirect();
        } else {
          countdownEl.textContent = count;
        }
      }, 1000);
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
