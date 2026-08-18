"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils";

const DemoRoutes = [
  {
    title: "Links",
    path: "links",
    icon: "link",
  },
  {
    title: "Settings",
    path: "settings",
    icon: "settings",
  },
];

interface DemoRoutesComponentProps {
  slug: string;
}

const DemoRoutesComponent = ({ slug }: DemoRoutesComponentProps) => {
  const pathname = usePathname();
  const base = `/demos/${slug}/admin`;

  return (
    <div>
      <div className="flex items-center space-x-8">
        {DemoRoutes.map((route) => {
          const path =
            route.path === "links" ? base : `${base}/${route.path}`;
          const active = pathname === path;

          return (
            <Link
              key={route.path}
              href={path}
              className={cn(
                "hover:text-primary group relative px-1 pb-4 pt-3 text-sm font-medium transition-colors duration-200 focus-visible:outline",
                active
                  ? "border-primary/60 border-b text-slate-100"
                  : "text-slate-500",
              )}
            >
              <div className="relative z-10 flex items-center space-x-2">
                <span className="material-symbols-outlined text-base">
                  {route.icon}
                </span>
                <span>{route.title}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DemoRoutesComponent;
