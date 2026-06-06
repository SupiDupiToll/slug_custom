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
      <main className="min-h-screen bg-background-dark px-4 pb-32 pt-6 text-slate-100 sm:px-6 sm:py-10 lg:px-8 lg:pb-10">
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-5 sm:gap-6">
          <header className="space-y-3">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              Redirect
            </p>
            <h1 className="max-w-2xl font-display text-3xl font-black leading-tight sm:text-4xl">
              Ziel vor dem Wechsel prüfen
            </h1>
            <p className="max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
              Du verlässt diese Seite und öffnest eine externe Zielseite. Für
              Inhalte, Verfügbarkeit und Folgen der Drittseite übernehmen wir
              keine Haftung.
            </p>
          </header>

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)] lg:items-start lg:gap-6">
            <section className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-3 shadow-sm">
              <div className="overflow-hidden rounded-xl border border-slate-800/60 bg-slate-950">
                {screenshotUrls[screenshotIndex] ? (
                  <img
                    src={screenshotUrls[screenshotIndex]}
                    alt={`Vorschau von ${targetUrl}`}
                    className="aspect-[4/5] max-h-[68svh] w-full object-cover object-top sm:aspect-[16/10] lg:aspect-[4/3] lg:max-h-[560px]"
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
                  <div className="flex aspect-[4/5] max-h-[68svh] items-center justify-center px-6 text-center text-sm text-slate-500 sm:aspect-[16/10] lg:aspect-[4/3] lg:max-h-[560px]">
                    Vorschau konnte nicht geladen werden.
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 shadow-sm sm:p-5">
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                    Aufgerufene URL
                  </p>
                  <p className="mt-2 break-all rounded-lg border border-slate-800/60 bg-slate-950 px-3 py-2 font-mono text-xs text-slate-200 sm:text-sm">
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
                  className="hidden w-full rounded-full bg-primary px-3 py-3 text-sm font-bold text-background-dark transition hover:shadow-lg hover:shadow-primary/20 lg:inline-flex"
                >
                  Weiter zur Zielseite
                </button>
              </div>
            </section>
          </div>
        </section>
      </main>
      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-800/60 bg-background-dark/90 px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] pt-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-3">
          <p className="text-xs leading-5 text-slate-400">
            Du kannst den Ziel-Check überspringen und direkt weitermachen.
          </p>
          <button
            type="button"
            onClick={continueToTarget}
            className="w-full rounded-full bg-primary px-3 py-3 text-sm font-bold text-background-dark transition hover:shadow-lg hover:shadow-primary/20"
          >
            Weiter zur Zielseite
          </button>
        </div>
      </div>
      <Footer className="py-6" />
    </>
  );
}
