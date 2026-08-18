"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const HideOnDemo = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  if (pathname.startsWith("/demos")) return null;
  return <>{children}</>;
};

export default HideOnDemo;
