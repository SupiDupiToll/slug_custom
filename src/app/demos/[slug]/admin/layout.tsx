import type { ReactNode } from "react";

import DemoAdminChrome from "@/components/demo/demo-admin-chrome";

interface DemoAdminLayoutProps {
  children: ReactNode;
  params: { slug: string };
}

const DemoAdminLayout = ({ children, params }: DemoAdminLayoutProps) => {
  const slug = decodeURIComponent(params.slug);

  return <DemoAdminChrome slug={slug}>{children}</DemoAdminChrome>;
};

export default DemoAdminLayout;
