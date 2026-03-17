"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/utils";

const DashboardRoutes = [
  {
    title: "Links",
    path: "/dashboard",
    icon: "link",
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: "settings",
  },
];

const DashboardRoutesComponent = () => {
  const pathname = usePathname();
  return (
    <div>
      <div className="flex items-center space-x-8">
        {DashboardRoutes.map((route) => (
          <Link
            key={route.path}
            href={route.path}
            className={cn(
              "hover:text-primary group relative px-1 pb-4 pt-3 text-sm font-medium transition-colors duration-200 focus-visible:outline",
              pathname === route.path
                ? "border-primary/60 border-b text-slate-100"
                : "text-slate-500",
            )}
          >
            <div className=" relative z-10 flex items-center space-x-2">
              <span className="material-symbols-outlined text-base">
                {route.icon}
              </span>
              <span>{route.title}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DashboardRoutesComponent;
