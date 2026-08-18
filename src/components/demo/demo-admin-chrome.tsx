"use client";

import { Suspense, type ReactNode } from "react";
import { useSearchParams } from "next/navigation";

import Footer from "@/components/layout/footer";
import DemoHeader from "@/components/demo/demo-header";
import DemoRoutesComponent from "@/components/demo/demo-routes";
import { cn } from "@/utils";

interface DemoAdminChromeProps {
  slug: string;
  children: ReactNode;
}

const DemoAdminChromeInner = ({ slug, children }: DemoAdminChromeProps) => {
  const searchParams = useSearchParams();
  const embed = searchParams.get("embed") === "1";

  const main = (
    <main
      className={cn(
        "mx-auto mb-12 flex w-full max-w-7xl px-6 lg:px-12",
        embed ? "mt-10" : "mt-36",
      )}
    >
      {children}
    </main>
  );

  if (embed) return main;

  return (
    <>
      <DemoHeader slug={slug} mode="admin" />
      <nav className="border-primary/10 bg-background-dark/80 fixed top-20 z-40 flex h-16 w-full items-center border-b backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-7xl items-center px-6 lg:px-12">
          <div className="flex w-full items-center justify-between">
            <div className="mt-0 flex flex-row space-x-0 text-sm font-medium rtl:space-x-reverse">
              <DemoRoutesComponent slug={slug} />
            </div>
          </div>
        </div>
      </nav>
      {main}
      <Footer className="py-6" />
    </>
  );
};

const DemoAdminChrome = ({ slug, children }: DemoAdminChromeProps) => {
  return (
    <Suspense fallback={null}>
      <DemoAdminChromeInner slug={slug} children={children} />
    </Suspense>
  );
};

export default DemoAdminChrome;
