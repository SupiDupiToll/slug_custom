import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils";
interface IconProps {
  Icon: React.ComponentType<{ size?: number; className?: string }>;
  iconPlacement: "left" | "right";
}

interface IconRefProps {
  Icon?: never;
  iconPlacement?: undefined;
}

export type ButtonIconProps = IconProps | IconRefProps;

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-bold text-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-background-dark hover:shadow-lg hover:shadow-primary/20 glow-accent",
        primary:
          "bg-primary text-background-dark hover:brightness-110 hover:shadow-lg hover:shadow-primary/20 glow-accent",
        destructive: "bg-red-500 text-slate-100 shadow-sm hover:bg-red-500/90",
        outline: "border-2 border-slate-800 text-slate-100 hover:bg-slate-800",
        secondary: "bg-slate-900/40 text-slate-100 hover:bg-slate-900/60",
        ghost: "text-slate-100 hover:bg-slate-900/40",
        link: "text-primary underline-offset-4 hover:underline",
        expandIcon:
          "group relative border-2 border-slate-800 text-slate-100 hover:bg-slate-800",
      },
      size: {
        default: "h-14 px-8",
        sm: "h-10 px-4 text-sm",
        lg: "h-14 px-10",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonIconProps
>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      Icon,
      iconPlacement,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {Icon && iconPlacement === "left" && (
          <div className="group-hover:translate-x-100 w-0 translate-x-[0%] pr-0 opacity-0 transition-all duration-200 group-hover:w-4 group-hover:pr-1 group-hover:opacity-100">
            <Icon size={18} />
          </div>
        )}
        <Slottable>{props.children}</Slottable>
        {Icon && iconPlacement === "right" && (
          <div className="w-0 translate-x-[100%] pl-0 opacity-0 transition-all duration-200 group-hover:w-4 group-hover:translate-x-0 group-hover:pl-1 group-hover:opacity-100">
            <Icon size={18} />
          </div>
        )}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
