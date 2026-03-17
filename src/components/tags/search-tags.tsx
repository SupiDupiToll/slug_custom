"use client";

import type { Tags } from "@prisma/client";
import { useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/ui/popover";
import { CreateTag } from "./create-tag";
import { Button } from "@/ui/button";
import MaterialIcon from "@/components/icons/material";
import DeleteTag from "./delete-tag";

interface SearchTagProps {
  tags: Tags[];
  tagSelected: string;
  tagName?: string;
}

const SearchTag = (props: SearchTagProps) => {
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

  const handleDeleteTag = () => {
    const params = new URLSearchParams(searchTagParams);
    params.delete("tag");
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <Popover open={isOpened} onOpenChange={setIsOpened}>
      <PopoverTrigger asChild>
        <Button variant="outline">
          {isOpened ? (
            <MaterialIcon name="close" size={16} />
          ) : (
            <MaterialIcon name="sell" size={16} />
          )}
          {props.tagName ? (
            <span>
              {props.tags.map((tag) => {
                if (tag.id === props.tagName) {
                  return tag.name;
                }
              })}
            </span>
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
              <div
                key={tag.id}
                aria-label={tag.name}
                className="flex w-full items-center justify-between rounded-lg border border-slate-800/50 px-2 py-1 text-left text-sm transition-colors duration-200 hover:opacity-80"
                style={{
                  backgroundColor: tag.color
                    ? `${tag.color}`
                    : "rgba(23, 23, 23, 0.5)" || "#171717",
                  color: tag.color ? "#fff" : "#171717",
                }}
              >
                <button
                  onClick={() => handleSearchTag(tag.id)}
                  className="w-full text-start"
                >
                  {tag.name}
                </button>
                <div className="flex items-center space-x-2">
                  {tag.id === props.tagSelected && (
                    <MaterialIcon name="check" size={16} />
                  )}
                  <DeleteTag
                    tag={tag}
                    trigger={
                      <button className="rounded-md p-1 hover:opacity-80">
                        <MaterialIcon name="close" size={16} />
                      </button>
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center space-x-1">
          <Button variant="outline" onClick={handleDeleteTag}>
            <MaterialIcon name="search_off" size={16} />
            <span>Clear search</span>
          </Button>
          <CreateTag tagsCreated={props.tags}>
            <Button variant="outline" className="w-full">
              <MaterialIcon name="add" size={16} />
              <span>Create Tag</span>
            </Button>
          </CreateTag>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SearchTag;
