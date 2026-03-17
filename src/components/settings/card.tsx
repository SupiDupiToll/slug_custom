import { TypographyH4 } from "@/ui/typography";
import type { ReactNode } from "react";

interface SettingsCardProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

const SettingsCard = (props: SettingsCardProps) => {
  return (
    <div className="border-primary/10 flex w-full flex-col rounded-xl border bg-slate-900/40 p-6">
      <div className="mb-6 flex flex-col space-y-1 rounded-md">
        <div className="flex items-center space-x-2">
          <TypographyH4 className="my-0">{props.title}</TypographyH4>
        </div>
        <p className="text-sm text-slate-500">{props.description}</p>
      </div>
      {props.children}
    </div>
  );
};

export default SettingsCard;
