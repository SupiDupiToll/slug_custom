import type { LinkTags, Links, Tags, User } from "@prisma/client";

export interface DemoData {
  user: Pick<User, "name" | "username" | "email" | "image">;
  tags: Tags[];
  links: (Links & { tags: LinkTags[] })[];
}

const mulberry32 = (seed: number) => () => {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const hashSeed = (value: string) => {
  let hash = 2166136261;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
};

const sanitizeSlug = (slug: string) => {
  const clean = slug
    .toLowerCase()
    .replace(/[^a-z0-9-_]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return clean || "demo";
};

const TAG_DEFS = [
  { name: "GitHub", color: "#6e5494" },
  { name: "Docs", color: "#2563eb" },
  { name: "Design", color: "#db2777" },
  { name: "WIP", color: "#ca8a04" },
] as const;

const LINK_DEFS = [
  {
    suffix: "github",
    url: "https://github.com/SupiDupiToll/slug_custom",
    description: "Open-Source-Repository des Link-Shorteners",
    tags: [0] as number[],
  },
  {
    suffix: "docs",
    url: "https://nextjs.org/docs",
    description: "Dokumentation für das Selfhosting des Dienstes",
    tags: [1] as number[],
  },
  {
    suffix: "design",
    url: "https://www.figma.com",
    description: "Aktuelle UI-Mockups des Dashboards",
    tags: [2] as number[],
  },
  {
    suffix: "vercel",
    url: "https://vercel.com",
    description: "Hosting & Deployment der gesamten Plattform",
    tags: [0, 1] as number[],
  },
  {
    suffix: "blog",
    url: "https://example.com/coming-soon",
    description: "Noch nicht veröffentlichter Blog-Artikel",
    tags: [3] as number[],
  },
  {
    suffix: "home",
    url: "https://go.sdtoll.de",
    description: "Persönliche Startseite mit allen wichtigen Links",
    tags: [] as number[],
  },
] as const;

const daysAgo = (days: number) =>
  new Date(Date.now() - days * 24 * 60 * 60 * 1000);

export const getDemoData = (slug: string): DemoData => {
  const base = sanitizeSlug(slug);
  const rand = mulberry32(hashSeed(slug));

  const user: Pick<User, "name" | "username" | "email" | "image"> = {
    name: "Max Mustermann",
    username: "demo-admin",
    email: "demo@go.sdtoll.de",
    image: null,
  };

  const tags: Tags[] = TAG_DEFS.map((tag, index) => ({
    id: `demo-tag-${index}`,
    name: tag.name,
    color: tag.color,
    createdAt: daysAgo(120 - index * 10),
    creatorId: "demo-user",
  }));

  const links: (Links & { tags: LinkTags[] })[] = LINK_DEFS.map(
    (link, index) => {
      const linkTags: LinkTags[] = link.tags.map((tagIndex) => ({
        linkId: `demo-link-${index}`,
        tagId: `demo-tag-${tagIndex}`,
      }));

      return {
        id: `demo-link-${index}`,
        url: link.url,
        slug: link.suffix === "home" ? base : `${base}-${link.suffix}`,
        description: link.description,
        passwordHash: null,
        createdAt: daysAgo(Math.floor(2 + rand() * 180)),
        creatorId: "demo-user",
        clicks: Math.floor(rand() * 1200),
        lastClicked: rand() > 0.3 ? daysAgo(Math.floor(rand() * 14)) : null,
        tags: linkTags,
      };
    },
  );

  return { user, tags, links };
};
