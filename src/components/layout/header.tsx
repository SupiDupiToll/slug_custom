import Link from "next/link";
import { cn } from "@/utils";

import { buttonVariants } from "@/ui/button";
import ExternalLink from "@/ui/external-link";
import { Badge } from "@/ui/badge";

import { ModeToggle } from "@/components/change-theme";
import UserButton from "@/components/auth/user-btn";
import Logo from "@/components/icons/logo";
import { GithubLogo } from "@/components/icons/logos";
import CommandK from "@/components/commandK";

const Header = () => {
  return (
    <nav
      className={cn(
        "flex w-full",
        "pb-3 pt-4 lg:px-4",
        "sticky top-0 z-50",
        "bg-white dark:bg-neutral-900",
      )}
    >
      <div
        className={cn("flex w-full items-center justify-between", "container")}
      >
        <div className="flex items-center space-x-5">
          <div className="flex items-center space-x-1 pr-1 md:pr-4">
            <Link
              href="/"
              className="flex items-center space-x-3 transition-opacity hover:opacity-80 rtl:space-x-reverse"
            >
              <span className="self-center whitespace-nowrap text-lg font-bold tracking-tight dark:text-white">
                go.sdtoll.de
              </span>
            </Link>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </nav>
  );
};

export default Header;
