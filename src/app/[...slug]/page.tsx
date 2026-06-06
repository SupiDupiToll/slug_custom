import { notFound, redirect } from "next/navigation";

import { RedirectFlow } from "@/components/links/redirect-flow";
import { urlFromServer } from "@/server/middleware/redirect";

interface SlugPageProps {
  params: { slug: string[] };
}

const isSafeRedirectUrl = (value: string) => {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
};

const isDomainLikeTarget = (value: string) => {
  return value.includes(".") && !value.includes(" ");
};

const normalizeTargetUrl = (value: string) => {
  if (isSafeRedirectUrl(value)) {
    return value;
  }

  if (isDomainLikeTarget(value)) {
    return `https://${value}`;
  }

  return value;
};

const getSlugValue = (slugParts: string[]) => {
  try {
    return decodeURIComponent(slugParts.join("/"));
  } catch {
    return slugParts.join("/");
  }
};

export default async function SlugPage({ params }: SlugPageProps) {
  const slugValue = getSlugValue(params.slug);
  const targetUrl = normalizeTargetUrl(slugValue);
  const isDirectTarget = isSafeRedirectUrl(targetUrl) || isDomainLikeTarget(slugValue);

  if (isDirectTarget) {
    return <RedirectFlow targetUrl={targetUrl} variant="direct" />;
  }

  const getDataApi = await urlFromServer(slugValue);

  if (getDataApi.error || getDataApi.redirect404) {
    notFound();
  }

  if (getDataApi.requiresPassword) {
    redirect(`/unlock/${slugValue}`);
  }

  if (getDataApi.url) {
    return <RedirectFlow targetUrl={getDataApi.url} variant="compact" />;
  }

  notFound();
}
