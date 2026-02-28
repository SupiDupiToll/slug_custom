import { load } from "cheerio";

interface MetadataResponse {
  title: string;
  description: string;
  siteUrl: string;
  site_name: string;
  image: string;
  icon: string;
  keywords: string;
}

const isBlockedHost = (hostname: string) => {
  const host = hostname.toLowerCase();

  if (host === "localhost" || host === "127.0.0.1" || host === "::1") {
    return true;
  }

  if (
    host.startsWith("10.") ||
    host.startsWith("192.168.") ||
    host.startsWith("169.254.") ||
    host.startsWith("127.")
  ) {
    return true;
  }

  if (/^172\.(1[6-9]|2\d|3[0-1])\./.test(host)) {
    return true;
  }

  if (host.endsWith(".local")) {
    return true;
  }

  return false;
};

export const getMetadata = async (url: string) => {
  try {
    const parsedUrl = new URL(url);
    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      return;
    }

    if (isBlockedHost(parsedUrl.hostname)) {
      return;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    const response = await fetch(parsedUrl.toString(), {
      signal: controller.signal,
      redirect: "error",
    });
    clearTimeout(timeoutId);

    const contentType = response.headers.get("content-type") ?? "";
    if (!contentType.includes("text/html")) {
      return;
    }

    const res = await response.text();
    const $ = load(res);

    const title =
      ($('meta[property="og:title"]').attr("content") ?? $("title").text()) ||
      $('meta[name="title"]').attr("content");
    const description =
      $('meta[property="og:description"]').attr("content") ??
      $('meta[name="description"]').attr("content");
    const siteUrl = $('meta[property="og:url"]').attr("content");
    const site_name = $('meta[property="og:site_name"]').attr("content");
    const image =
      $('meta[property="og:image"]').attr("content") ??
      $('meta[property="og:image:url"]').attr("content");
    let icon =
      $('link[rel="icon"]').attr("href") ??
      $('link[rel="shortcut icon"]').attr("href");
    if (icon && !icon.includes("http")) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const urlFromParams = new URL(siteUrl ?? url);
      icon = `${urlFromParams.origin}${icon}`;
    }
    const keywords =
      $('meta[property="og:keywords"]').attr("content") ??
      $('meta[name="keywords"]').attr("content");

    return {
      title,
      description,
      siteUrl,
      site_name,
      image,
      icon,
      keywords,
    } as MetadataResponse;
  } catch (error) {
    console.error(error);
  }
};
