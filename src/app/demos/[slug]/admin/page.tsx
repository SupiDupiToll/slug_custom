import type { Metadata } from "next";

import { Button } from "@/ui/button";
import MaterialIcon from "@/components/icons/material";
import Alert from "@/ui/alert";
import { getDemoData } from "@/components/demo/demo-data";
import DemoCardLink from "@/components/demo/demo-card-link";
import DemoTagFilter from "@/components/demo/demo-tag-filter";
import SearchLinks from "@/components/links/search-link";
import LinksLimit from "@/components/links/links-limit";

export const metadata: Metadata = {
  title: "Demo Admin - Dashboard",
};

interface DemoAdminPageProps {
  params: { slug: string };
  searchParams?: {
    search?: string;
    tag?: string;
    embed?: string;
  };
}

const DemoAdminPage = async ({
  params,
  searchParams,
}: DemoAdminPageProps) => {
  const slug = decodeURIComponent(params.slug);
  const embed = searchParams?.embed === "1";
  const { tags, links } = getDemoData(slug);
  const searchLink = searchParams?.search;
  const searchTag = searchParams?.tag;

  const filteredLinks = links.filter((link) => {
    if (!searchLink && !searchTag) return true;

    const matchSlug = !searchLink || link.slug.includes(searchLink);

    const matchTag =
      !searchTag || link.tags.some((tag) => tag.tagId === searchTag);

    return matchSlug && matchTag;
  });

  return (
    <div className="w-full duration-500 animate-in fade-in-5 slide-in-from-bottom-2">
      {!embed && (
        <Alert variant="info" className="mb-3">
          <p>
            <strong>Demo-Modus:</strong> Diese Ansicht enthält ausschließlich
            Dummy-Daten. Änderungen sind nicht möglich.
          </p>
        </Alert>
      )}
      <header className="mb-3 flex w-full items-center space-x-2 md:justify-between">
        <SearchLinks className="w-full md:w-72 md:max-w-72" />
        <div className="flex items-center space-x-2">
          <LinksLimit userLinks={links.length} maxLinks={30} />
          <DemoTagFilter tags={tags} tagId={searchTag} />
          <Button disabled title="Im Demo-Modus nicht verfügbar">
            <MaterialIcon name="lock" size={16} />
            <span className="hidden md:block">Create Link</span>
          </Button>
        </div>
      </header>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-1 lg:grid-cols-2">
        {filteredLinks
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() -
              new Date(a.createdAt).getTime(),
          )
          .map((link) => {
            return (
              <DemoCardLink
                key={link.id}
                linkInfo={link}
                linkTags={link.tags}
                tagsInfo={tags}
              />
            );
          })}
      </div>
      {filteredLinks.length === 0 && (
        <div className="mt-4 flex flex-col items-center justify-center space-y-3 text-center">
          <MaterialIcon name="inventory_2" size={48} />
          <p>
            No links found with{" "}
            <span className="font-mono">{searchLink}</span> slug
          </p>
          <Button variant="outline" disabled>
            <MaterialIcon name="lock" size={14} />
            <span>Create a new link</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default DemoAdminPage;
