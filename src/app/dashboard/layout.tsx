import type { ReactNode } from "react";

import DashboardRoutesComponent from "@/components/dashboard-routes";
import Footer from "@/components/layout/footer";
import { cn } from "@/utils";

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = (props: DashboardLayoutProps) => {
  return (
    <>
      <nav className="border-primary/10 bg-background-dark/80 fixed top-20 z-40 flex h-16 w-full items-center border-b backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 lg:px-12">
          <div className="flex w-full items-center justify-between">
            <div className="mt-0 flex flex-row space-x-0 text-sm font-medium rtl:space-x-reverse">
              <DashboardRoutesComponent />
            </div>
          </div>
        </div>
      </nav>
      <main
        className={cn(
          "mx-auto mb-12 mt-36 flex w-full max-w-7xl px-6 lg:px-12",
        )}
      >
        {props.children}
      </main>
      <Footer className="py-6" />
    </>
  );
};

export default DashboardLayout;
