import type { ReactNode } from "react";
import { cn } from "@/utils";

export interface BadgeProps {
  children?: ReactNode;
  animate?: boolean;
  className?: string;
}

export const Badge = (props: BadgeProps) => {
  return (
    <span className="relative inline-block overflow-hidden rounded-full p-[1px] font-mono">
      {props.animate && (
        <span
          className={cn(
            "absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#94a3b8_0%,#94a3b8_50%,#1e293b_100%)]",
          )}
        />
      )}
      <div
        className={cn(
          "inline-flex h-full w-full cursor-default items-center justify-center rounded-full border border-slate-800/50 bg-slate-900/40 px-3 py-1 text-xs font-medium text-slate-100",
          props.className,
        )}
      >
        {props.children}
      </div>
    </span>
  );
};
