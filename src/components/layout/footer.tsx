import ExternalLink from "@/ui/external-link";
import { cn } from "@/utils";
import React from "react";
import { T3Logo, XLogo } from "../icons/logos";
import { ArrowUpRight, Heart } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => {
  return (
    <footer
      className={cn(
        "group w-full text-sm text-neutral-600 animate-in fade-in-25 dark:text-neutral-400",
        "bg-white/60 backdrop-blur-md dark:bg-neutral-900/60",
        props.className,
      )}
    >
      <div className={cn("container flex items-center justify-center")}> 
        <div className="flex items-center space-x-2">
          <Heart
            size={14}
            className="text-red-500 group-hover:transform group-hover:animate-pulse"
          />
          <ExternalLink
            href="https://github.com/pheralb/slug"
            className="flex items-center space-x-1"
          >
            <p>Basiert auf dem tollem Projekt Slug</p>

            <ArrowUpRight size={14} />
          </ExternalLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
