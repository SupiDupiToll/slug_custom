"use client";

import { useMemo, useState } from "react";
import Footer from "@/components/layout/footer";

interface RedirectFlowProps {
  targetUrl: string;
  variant?: "compact" | "direct";
}

const EXIT_URL = "https://omg10.com/4/11086887";

export function RedirectFlow({
  targetUrl,
  variant = "compact",
}: RedirectFlowProps) {
  const screenshotUrls = useMemo(() => {
    if (variant !== "direct") {
      return [];
    }

    try {
      return [
        `https://image.thum.io/get/width/1200/crop/720/${targetUrl}`,
        `https://s.wordpress.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=1200`,
      ];
    } catch {
      return [];
    }
  }, [targetUrl, variant]);
  const [screenshotIndex, setScreenshotIndex] = useState(0);

  const continueToTarget = () => {
    const newTab = window.open(targetUrl, "_blank", "noopener,noreferrer");

    if (!newTab) {
      window.location.assign(EXIT_URL);
      return;
    }

    window.location.assign(EXIT_URL);
  };

  if (variant === "compact") {
    return (
      <>
        <main className="flex min-h-screen items-center justify-center bg-background-dark px-4 py-10 text-slate-100">
          <section className="w-full max-w-md rounded-xl border border-slate-800/50 bg-slate-900/40 p-6 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              Redirect
            </p>
            <h1 className="mt-2 font-display text-2xl font-black">
              Open destination
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Öffne das Ziel mit dem Button.
            </p>
            <button
              type="button"
              onClick={continueToTarget}
              className="mt-5 w-full rounded-full bg-primary px-3 py-3 text-sm font-bold text-background-dark transition hover:shadow-lg hover:shadow-primary/20"
            >
              Open Link
            </button>
          </section>
        </main>
        <Footer className="py-6" />
      </>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-background-dark px-4 py-10 text-slate-100">
        <section className="mx-auto flex w-full max-w-3xl flex-col gap-6">
          <header className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              Redirect
            </p>
            <h1 className="font-display text-3xl font-black">
              Ziel vor dem Wechsel prüfen
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-400">
              Du verlässt diese Seite und öffnest eine externe Zielseite. Für
              Inhalte, Verfügbarkeit und Folgen der Drittseite übernehmen wir
              keine Haftung.
            </p>
          </header>

          <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
            <section className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-3 shadow-sm">
              <div className="overflow-hidden rounded-lg border border-slate-800/60 bg-slate-950">
                {screenshotUrls[screenshotIndex] ? (
                  <img
                    src={screenshotUrls[screenshotIndex]}
                    alt={`Vorschau von ${targetUrl}`}
                    className="h-[360px] w-full object-cover object-top"
                    referrerPolicy="no-referrer"
                    onError={() =>
                      setScreenshotIndex((current) =>
                        current + 1 < screenshotUrls.length
                          ? current + 1
                          : current,
                      )
                    }
                  />
                ) : (
                  <div className="flex h-[360px] items-center justify-center px-6 text-center text-sm text-slate-500">
                    Vorschau konnte nicht geladen werden.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-5 shadow-sm">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Aufgerufene URL
                  </p>
                  <p className="mt-2 break-all rounded-lg border border-slate-800/60 bg-slate-950 px-3 py-2 font-mono text-sm text-slate-200">
                    {targetUrl}
                  </p>
                </div>

                <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-3 text-sm leading-6 text-amber-100">
                  Diese Weiterleitung führt zu einer externen Drittseite.
                  Inhalte, Datenschutz, Sicherheit und Erreichbarkeit liegen
                  außerhalb unseres Verantwortungsbereichs.
                </div>

                <button
                  type="button"
                  onClick={continueToTarget}
                  className="w-full rounded-full bg-primary px-3 py-3 text-sm font-bold text-background-dark transition hover:shadow-lg hover:shadow-primary/20"
                >
                  Weiter zur Zielseite
                </button>
              </div>
            </section>
          </div>
        </section>
      </main>
      <Footer className="py-6" />
    </>
  );
}
