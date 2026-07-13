import { notFound, redirect } from "next/navigation";

import { urlFromServer } from "@/server/middleware/redirect";

interface DirectSlugPageProps {
  params: { slug: string };
}

export default async function DirectSlugPage({ params }: DirectSlugPageProps) {
  const slugValue = decodeURIComponent(params.slug);

  const getDataApi = await urlFromServer(slugValue);

  if (getDataApi.error || getDataApi.redirect404) {
    notFound();
  }

  if (getDataApi.requiresPassword) {
    redirect(`/unlock/${slugValue}`);
  }

  if (getDataApi.url) {
    redirect(getDataApi.url);
  }

  notFound();
}
