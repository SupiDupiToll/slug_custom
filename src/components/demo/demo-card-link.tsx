import type { LinkTags, Links, Tags } from "@prisma/client";

import { formatDate } from "@/utils/formatDate";
import MaterialIcon from "@/components/icons/material";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/collapsible";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/ui/tooltip";
import ShowClicks from "@/components/links/show-clicks-link";
import { cn } from "@/utils";

interface DemoCardLinkProps {
  linkInfo: Links;
  linkTags: LinkTags[];
  tagsInfo: Tags[];
}

const DemoCardLink = ({ linkInfo, linkTags, tagsInfo }: DemoCardLinkProps) => {
  return (
    <div className="border-primary/10 flex w-full flex-col rounded-xl border bg-slate-900/40 p-4 shadow-sm">
      <div className="mb-1 flex w-full items-center justify-between space-x-2">
        <p className="block space-x-[1px] overflow-hidden truncate font-medium">
          <span className="text-sm text-slate-500">go.sdtoll.de/</span>
          <span>{linkInfo.slug}</span>
        </p>
        <div className="flex items-center space-x-3">
          <ShowClicks
            numberOfClicks={linkInfo.clicks}
            lastDate={linkInfo.lastClicked}
            className="hidden border-r border-slate-800/60 pr-2 md:flex"
          />
          <TooltipProvider delayDuration={500}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="flex cursor-default items-center opacity-50">
                  <MaterialIcon name="lock" size={15} />
                </span>
              </TooltipTrigger>
              <TooltipContent sideOffset={5}>
                <p>Im Demo-Modus nicht verfügbar</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
      <p
        className="mb-2 select-all truncate font-mono text-sm text-slate-500"
        title={linkInfo.url}
      >
        {linkInfo.url}
      </p>
      <Collapsible>
        <div className="flex items-center justify-between font-mono text-xs font-medium text-slate-500 md:space-x-2">
          <div className="flex max-w-[75%] items-center space-x-2">
            {linkTags.length > 0 && (
              <div className="flex cursor-default items-center space-x-1">
                {linkTags.map((tag) => {
                  const tagInfo = tagsInfo.find((t) => t.id === tag.tagId);
                  return (
                    <span
                      key={tag.tagId}
                      className={cn(
                        "rounded-full border border-slate-800/60 bg-slate-800 px-2 py-[0.5px] font-mono text-xs text-slate-200",
                      )}
                    >
                      {tagInfo?.name}
                    </span>
                  );
                })}
              </div>
            )}
            <p
              className="hidden truncate md:block"
              title={linkInfo.description ?? ""}
            >
              {linkInfo.description}
            </p>
            <CollapsibleTrigger className="flex items-center transition-colors hover:text-slate-100 md:hidden">
              <MaterialIcon name="expand_more" size={14} className="mr-2" />
              <span>Info</span>
            </CollapsibleTrigger>
          </div>
          <p>{formatDate(linkInfo.createdAt)}</p>
        </div>
        <CollapsibleContent className="flex flex-col">
          <div className="my-2 rounded-lg border border-slate-800/50 p-2 shadow-sm">
            <ShowClicks
              numberOfClicks={linkInfo.clicks}
              lastDate={linkInfo.lastClicked}
            />
          </div>
          {linkInfo.description && (
            <div className="rounded-lg border border-slate-800/50 p-2 shadow-sm">
              <p
                className="text-pretty text-sm"
                title={linkInfo.description ?? ""}
              >
                {linkInfo.description}
              </p>
            </div>
          )}
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

export default DemoCardLink;
