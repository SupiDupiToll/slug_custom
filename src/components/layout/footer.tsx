"use client";

import ExternalLink from "@/ui/external-link";
import { cn } from "@/utils";
import Script from "next/script";
import React from "react";

interface FooterProps {
  className?: string;
}

const Footer = (props: FooterProps) => {
  return (
    <footer
      className={cn(
        "group w-full text-sm text-slate-400",
        "bg-background-dark/80 border-t border-slate-800/50 backdrop-blur-md",
        props.className,
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-center px-6 lg:px-12">
        <div className="flex items-center space-x-2">
          <span className="material-symbols-outlined text-primary">
            favorite
          </span>
          <ExternalLink
            href="https://github.com/pheralb/slug"
            className="hover:text-primary flex items-center space-x-1 transition-colors"
          >
            <p>Fork von Slug</p>
            <span className="material-symbols-outlined text-base">
              arrow_outward
            </span>
          </ExternalLink>
          <ExternalLink
            href="https://sdtoll.de"
            className="hover:text-primary flex items-center space-x-1 transition-colors"
          >
            <p>Design by SDT</p>
            <span className="material-symbols-outlined text-base">
              arrow_outward
            </span>
          </ExternalLink>
          <a
            data-impressum-popup
            className="hover:text-primary cursor-pointer transition-colors"
          >
            Impressum
          </a>
        </div>
      </div>
      <Script
        src="https://embed.impressum.mangoe.de/impressum-embed.js"
        strategy="afterInteractive"
      />
    </footer>
  );
};

export default Footer;
