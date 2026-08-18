import Link from "next/link";
import { cn } from "@/utils";
import { buttonVariants } from "@/ui/button";
import MaterialIcon from "@/components/icons/material";

interface DemoHeaderProps {
  slug: string;
  mode?: "landing" | "admin";
}

const DemoHeader = ({ slug, mode = "landing" }: DemoHeaderProps) => {
  const landingHref = `/demos/${slug}`;
  const adminHref = `/demos/${slug}/admin`;

  return (
    <nav
      className={cn(
        "fixed top-0 z-50 w-full",
        "border-primary/10 h-20 border-b",
        "bg-background-dark/80 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 lg:px-12">
        <div className="flex items-center space-x-3">
          <Link
            href={landingHref}
            className="flex items-center space-x-3 transition-opacity hover:opacity-80"
          >
            <span className="font-display text-lg font-black tracking-tight text-slate-100">
              go.sdtoll.de
              <span className="text-primary">.</span>
            </span>
          </Link>
          <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
            Demo
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {mode === "admin" && (
            <Link
              href={landingHref}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "group",
              })}
            >
              <MaterialIcon
                name="arrow_back"
                size={16}
                className="transition-transform group-hover:-translate-x-[2px]"
              />
              <span>Demo-Seite</span>
            </Link>
          )}
          <Link
            href={adminHref}
            className={buttonVariants({
              variant: "default",
              size: "sm",
              className: "group",
            })}
          >
            <MaterialIcon name="admin_panel_settings" size={16} />
            <span>Demo Admin</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default DemoHeader;
