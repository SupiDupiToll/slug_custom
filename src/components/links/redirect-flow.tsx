"use client";

import { useMemo } from "react";

interface RedirectFlowProps {
  targetUrl: string;
}

export function RedirectFlow({ targetUrl }: RedirectFlowProps) {
  const screenshotUrl = useMemo(() => {
    try {
      return `https://s.wordpress.com/mshots/v1/${encodeURIComponent(targetUrl)}?w=1200`;
    } catch {
      return "";
    }
  }, [targetUrl]);

  const continueToTarget = () => {
    window.location.assign(targetUrl);
  };

  return (
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
              {screenshotUrl ? (
                <img
                  src={screenshotUrl}
                  alt={`Vorschau von ${targetUrl}`}
                  className="h-[360px] w-full object-cover object-top"
                  referrerPolicy="no-referrer"
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
                Diese Weiterleitung führt zu einer externen Drittseite. Inhalte,
                Datenschutz, Sicherheit und Erreichbarkeit liegen außerhalb
                unseres Verantwortungsbereichs.
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
  );
}
