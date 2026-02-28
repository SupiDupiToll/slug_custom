import { redirect } from "next/navigation";

import { db } from "@/server/db";

interface UnlockPageProps {
  params: { slug: string };
  searchParams?: {
    error?: string;
    rate?: string;
  };
}

export default async function UnlockPage({
  params,
  searchParams,
}: UnlockPageProps) {
  const slug = params.slug;

  const link = await db.links.findUnique({
    where: { slug },
    select: {
      passwordHash: true,
      createdBy: {
        select: {
          blocked: true,
        },
      },
    },
  });

  if (link && !link.createdBy?.blocked && !link.passwordHash) {
    redirect(`/${slug}`);
  }

  const hasError = searchParams?.error === "1";
  const isRateLimited = searchParams?.rate === "1";

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 py-10 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <section className="w-full max-w-md rounded-xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-xs uppercase tracking-wide text-neutral-500">
          Protected Link
        </p>
        <h1 className="mt-2 text-xl font-semibold">Enter password</h1>
        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          You are opening: <span className="font-mono">/{slug}</span>
        </p>

        <form method="POST" action={`/unlock/${encodeURIComponent(slug)}/verify`} className="mt-5 space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              autoComplete="current-password"
              className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-neutral-500 dark:border-neutral-700 dark:bg-neutral-950"
            />
          </div>

          {hasError ? (
            <p className="text-sm text-red-600 dark:text-red-400">
              Wrong password, please try again.
            </p>
          ) : null}

          {isRateLimited ? (
            <p className="text-sm text-red-600 dark:text-red-400">
              Too many attempts. Please try again later.
            </p>
          ) : null}

          <button
            type="submit"
            className="w-full rounded-md bg-neutral-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-neutral-700 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  );
}
