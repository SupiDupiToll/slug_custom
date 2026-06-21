"use client";

import { useEffect, useState } from "react";
import Footer from "@/components/layout/footer";

interface RedirectFlowProps {
  targetUrl: string;
  variant?: "compact" | "direct";
}

export function RedirectFlow({
  targetUrl,
}: RedirectFlowProps) {
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((p) => p - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  useEffect(() => {
    if (countdown === 0) window.location.assign(targetUrl);
  }, [countdown, targetUrl]);

  const continueToTarget = () => {
    window.location.assign(targetUrl);
  };

  return (
    <>
      <main className="flex min-h-screen items-center justify-center bg-background-dark px-4 pb-10 pt-24 text-slate-100 sm:pt-28">
        <section className="w-full max-w-md rounded-xl border border-slate-800/50 bg-slate-900/40 p-6 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-primary">
            Redirect
          </p>
          <h1 className="mt-2 font-display text-2xl font-black">
            Ziel wird geöffnet
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Du wirst in Kürze weitergeleitet.
          </p>

          <div className="mt-6 text-6xl font-black font-display text-primary">
            {countdown > 0 ? countdown : "✓"}
          </div>

          <button
            type="button"
            onClick={continueToTarget}
            className="mt-5 w-full rounded-full bg-primary px-3 py-3 text-sm font-bold text-background-dark transition hover:shadow-lg hover:shadow-primary/20"
          >
            Direkt weiter
          </button>
        </section>
      </main>
      <Footer className="py-6" />
    </>
  );
}
