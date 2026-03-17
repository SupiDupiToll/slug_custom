import { cn } from "@/utils/index";

function Spinner({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        "material-symbols-outlined animate-spin text-base",
        className,
      )}
      {...props}
    >
      progress_activity
    </span>
  );
}

export { Spinner };
