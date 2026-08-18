import type { Metadata } from "next";
import Link from "next/link";

import Footer from "@/components/layout/footer";
import ExternalLink from "@/ui/external-link";
import Alert from "@/ui/alert";
import { buttonVariants } from "@/ui/button";
import MaterialIcon from "@/components/icons/material";
import { getDemoData } from "@/components/demo/demo-data";
import DemoHeader from "@/components/demo/demo-header";

export const metadata: Metadata = {
  title: "Demo",
};

interface DemosSlugPageProps {
  params: { slug: string };
  searchParams?: { embed?: string };
}

const DemosSlugPage = async ({
  params,
  searchParams,
}: DemosSlugPageProps) => {
  const slug = decodeURIComponent(params.slug);
  const embed = searchParams?.embed === "1";
  const { links } = getDemoData(slug);
  const target = links[0];

  return (
    <>
      <DemoHeader slug={slug} mode="landing" embed={embed} />
      <main
        className={`flex min-h-screen items-center justify-center bg-background-dark px-4 pb-10 text-slate-100 ${
          embed ? "pt-10" : "pt-24 sm:pt-28"
        }`}
      >
        <div className="w-full max-w-md space-y-4">
          {!embed && (
            <Alert variant="info">
              <p>
                <strong>Demo-Modus:</strong> Vorschau der Link-Seite ohne echte
                Weiterleitung.
              </p>
            </Alert>
          )}
          <section className="rounded-xl border border-slate-800/50 bg-slate-900/40 p-6 text-center shadow-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-primary">
              Redirect
            </p>
            <h1 className="mt-2 font-display text-2xl font-black">
              Ziel wird geöffnet
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              {target ? (
                <>
                  Der Short-Link{" "}
                  <span className="font-mono">go.sdtoll.de/{target.slug}</span>{" "}
                  führt in dieser Demo zu{" "}
                  <span className="font-mono">{target.url}</span>
                </>
              ) : (
                "Demo-Vorschau des Redirect-Flows."
              )}
            </p>
            <div className="mt-6 text-6xl font-black font-display text-primary">
              ✓
            </div>
            <ExternalLink
              href={target?.url ?? "https://example.com"}
              className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-primary px-3 py-3 text-sm font-bold text-background-dark transition hover:shadow-lg hover:shadow-primary/20"
            >
              Direkt weiter
            </ExternalLink>
          </section>
          <Link
            href={`/demos/${slug}/admin`}
            className={buttonVariants({
              variant: "outline",
              className: "group w-full",
            })}
          >
            <MaterialIcon name="admin_panel_settings" size={16} />
            <span>Zum Demo Admin</span>
            <MaterialIcon
              name="arrow_forward"
              size={16}
              className="transition-transform group-hover:translate-x-[2px]"
            />
          </Link>
        </div>
      </main>
      {!embed && <Footer className="py-6" />}
    </>
  );
};

export default DemosSlugPage;
