import Footer from "@/components/layout/footer";
// Removed unused imports
// import { buttonVariants } from "@/ui/button";
// import ExternalLink from "@/ui/external-link";
// import { ArrowUpRight, HomeIcon } from "lucide-react";
import { headers } from "next/headers";
// ...existing code...

const NotFoundPage = async () => {
  // ...existing code...
  return (
    <>
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-12 lg:py-40">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="font-display mb-4 text-6xl font-black tracking-tight lg:text-7xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-medium tracking-tight text-slate-100 md:text-4xl">
            Page not found
          </p>
          <p className="mb-4 font-mono text-sm font-light text-slate-500">
            {`URL nicht gefunden. Bist du sicher, dass du die richtige URL eingegeben hast?`}
          </p>
          <div className="flex items-center justify-center space-x-2"></div>
        </div>
      </div>
      <Footer className="py-6" />
    </>
  );
};

export default NotFoundPage;
