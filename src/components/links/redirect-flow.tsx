"use client";

import { useEffect, useRef, useState } from "react";

const EXIT_URL = "https://omg10.com/4/11086887";

interface RedirectFlowProps {
  targetUrl: string;
}

export function RedirectFlow({ targetUrl }: RedirectFlowProps) {
  const [isBlocked, setIsBlocked] = useState(false);
  const didAttemptOpen = useRef(false);

  const openTargetAndExit = () => {
    const newTab = window.open(targetUrl, "_blank");

    if (!newTab) {
      setIsBlocked(true);
      return;
    }

    newTab.opener = null;
    window.location.assign(EXIT_URL);
  };

  useEffect(() => {
    if (didAttemptOpen.current) {
      return;
    }

    didAttemptOpen.current = true;
    openTargetAndExit();
  }, [openTargetAndExit]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background-dark px-4 py-10 text-slate-100">
      <section className="w-full max-w-md rounded-xl border border-slate-800/50 bg-slate-900/40 p-6 text-center shadow-sm">
        <p className="text-xs font-bold uppercase tracking-wide text-primary">
          Redirect
        </p>
        <h1 className="mt-2 font-display text-2xl font-black">
          Open destination
        </h1>
        <p className="mt-2 text-sm text-slate-400">
          {isBlocked
            ? "Your browser blocked the new tab. Use the button below to continue."
            : "Opening your link..."}
        </p>
        <button
          type="button"
          onClick={openTargetAndExit}
          className="mt-5 w-full rounded-full bg-primary px-3 py-3 text-sm font-bold text-background-dark transition hover:shadow-lg hover:shadow-primary/20"
        >
          Open Link
        </button>
      </section>
    </main>
  );
}
