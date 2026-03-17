import { cn } from "@/utils";

type MaterialIconProps = {
  name: string;
  className?: string;
  size?: number;
  fill?: boolean;
};

const MaterialIcon = ({
  name,
  className,
  size = 18,
  fill = false,
}: MaterialIconProps) => {
  return (
    <span
      className={cn("material-symbols-outlined", fill && "fill", className)}
      style={{ fontSize: size }}
    >
      {name}
    </span>
  );
};

export default MaterialIcon;
