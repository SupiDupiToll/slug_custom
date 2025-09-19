import Footer from "@/components/layout/footer";
import { buttonVariants } from "@/ui/button";
import ExternalLink from "@/ui/external-link";
import { ArrowUpRight, HomeIcon } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";

const NotFoundPage = async () => {
  const headersList = headers();
  const domain = headersList.get("host");
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-16">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 font-mono text-6xl font-bold tracking-tight lg:text-7xl">
            404
          </h1>
          <p className="mb-4 text-3xl font-medium tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Page not found
          </p>
          <p className="mb-4 font-mono text-sm font-light text-gray-500 dark:text-gray-400">
            {`URL nicht gefunden. Bist du sicher, dass du die richtige URL eingegeben hast?`}
          </p>
          <div className="flex items-center justify-center space-x-2">
          </div>
        </div>
      </div>
      <Footer className="fixed bottom-0 mt-4 py-4" />
    </>
  );
};

export default NotFoundPage;
