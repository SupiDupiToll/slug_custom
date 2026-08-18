import Link from "next/link";
import { cn } from "@/utils";
import UserButton from "@/components/auth/user-btn";
import Logo from "@/components/icons/logo";
import CommandK from "@/components/commandK";
import HideOnDemo from "./hide-on-demo";

const Header = () => {
  return (
    <HideOnDemo>
      <nav
        className={cn(
          "fixed top-0 z-50 w-full",
          "border-primary/10 h-20 border-b",
          "bg-background-dark/80 backdrop-blur-md",
        )}
      >
        <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between px-6 lg:px-12">
          <div className="flex items-center space-x-5">
            <Link
              href="/"
              className="flex items-center space-x-3 transition-opacity hover:opacity-80 rtl:space-x-reverse"
            >
              <span className="font-display text-lg font-black tracking-tight text-slate-100">
                go.sdtoll.de
                <span className="text-primary">.</span>
              </span>
            </Link>
          </div>
          <div className="flex items-center space-x-2">
            <CommandK />
            <UserButton />
          </div>
        </div>
      </nav>
    </HideOnDemo>
  );
};

export default Header;
