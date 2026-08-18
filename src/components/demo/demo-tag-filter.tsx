"use client";

import type { Tags } from "@prisma/client";
import { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { Button } from "@/ui/button";
import MaterialIcon from "@/components/icons/material";

interface DemoTagFilterProps {
  tags: Tags[];
  tagId?: string;
}

const DemoTagFilter = (props: DemoTagFilterProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const searchTagParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSearchTag = (value: string) => {
    const params = new URLSearchParams(searchTagParams);
    if (value) {
      params.set("tag", value);
    } else {
      params.delete("tag");
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const selectedTag = props.tags.find((tag) => tag.id === props.tagId);

  return (
    <Popover open={isOpened} onOpenChange={setIsOpened}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {isOpened ? (
            <MaterialIcon name="close" size={16} />
          ) : (
            <MaterialIcon name="sell" size={16} />
          )}
          {selectedTag ? (
            <span>{selectedTag.name}</span>
          ) : (
            <span className="hidden md:block">Select a tag</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="my-2 text-center text-sm font-medium">
          My Tags ({props.tags.length})
        </p>
        <div className="mb-2 flex w-full flex-col space-y-1">
          {props.tags.length === 0 && (
            <div className="my-4 flex flex-col items-center justify-center space-y-2 text-sm text-slate-400">
              <MaterialIcon name="sell" size={24} />
              <span>No tags found</span>
            </div>
          )}
          {props.tags.map((tag) => {
            return (
              <button
                key={tag.id}
                type="button"
                aria-label={tag.name}
                onClick={() => handleSearchTag(tag.id)}
                className="flex w-full items-center justify-between rounded-lg border border-slate-800/50 px-2 py-1 text-left text-sm transition-colors duration-200 hover:opacity-80"
                style={{
                  backgroundColor: tag.color
                    ? `${tag.color}`
                    : "rgba(23, 23, 23, 0.5)",
                  color: tag.color ? "#fff" : "#171717",
                }}
              >
                <span>{tag.name}</span>
                {tag.id === props.tagId && (
                  <MaterialIcon name="check" size={16} />
                )}
              </button>
            );
          })}
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="outline" onClick={() => handleSearchTag("")}>
            <MaterialIcon name="search_off" size={16} />
            <span>Clear search</span>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default DemoTagFilter;
