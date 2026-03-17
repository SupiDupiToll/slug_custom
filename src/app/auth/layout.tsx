import Footer from "@/components/layout/footer";
import { cn } from "@/utils";
import type { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = (props: AuthLayoutProps) => {
  return (
    <>
      <main
        className={cn(
          "mt-24 flex w-full flex-col items-center justify-center space-y-8 px-6 lg:px-12",
        )}
      >
        <div className="flex flex-col items-center justify-center">
          {props.children}
        </div>
      </main>
      <Footer className="py-6" />
    </>
  );
};

export default AuthLayout;
