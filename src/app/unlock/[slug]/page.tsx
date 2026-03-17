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
    <main className="bg-background-dark relative flex min-h-screen items-center justify-center px-4 py-10 text-slate-100">
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-0 top-0 -mr-32 -mt-32 h-64 w-64 rounded-full bg-white/20"></div>
        <div className="absolute bottom-0 left-0 -mb-24 -ml-24 h-48 w-48 rounded-full bg-white/10"></div>
      </div>
      <section className="w-full max-w-md rounded-xl border border-slate-800/50 bg-slate-900/40 p-6 shadow-sm backdrop-blur">
        <p className="text-primary text-xs font-bold uppercase tracking-wide">
          Protected Link
        </p>
        <h1 className="font-display mt-2 text-2xl font-black">
          Enter password
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          You are opening: <span className="font-mono">/{slug}</span>
        </p>

        <form
          method="POST"
          action={`/unlock/${encodeURIComponent(slug)}/verify`}
          className="mt-5 space-y-4"
        >
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
              className="focus:ring-primary w-full rounded-lg border-none bg-slate-800 px-4 py-3 text-sm text-slate-100 outline-none transition focus:ring-2"
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
            className="bg-primary text-background-dark hover:shadow-primary/20 w-full rounded-full px-3 py-3 text-sm font-bold transition hover:shadow-lg"
          >
            Continue
          </button>
        </form>
      </section>
    </main>
  );
}
