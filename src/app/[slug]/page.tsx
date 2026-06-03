import { notFound, redirect } from "next/navigation";

import { RedirectFlow } from "@/components/links/redirect-flow";
import { urlFromServer } from "@/server/middleware/redirect";

interface SlugPageProps {
  params: { slug: string };
}

export default async function SlugPage({ params }: SlugPageProps) {
  const slug = params.slug;

  const getDataApi = await urlFromServer(slug);

  if (getDataApi.error || getDataApi.redirect404) {
    notFound();
  }

  if (getDataApi.requiresPassword) {
    redirect(`/unlock/${slug}`);
  }

  if (getDataApi.url) {
    return <RedirectFlow targetUrl={getDataApi.url} />;
  }

  notFound();
}
