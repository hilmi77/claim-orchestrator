import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function DetailRow({
  icon: Icon,
  label,
  value,
  className,
}: {
  icon?: LucideIcon;
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={cn("flex items-start gap-2 text-sm", className)}>
      {Icon && <Icon className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />}
      <div className="flex flex-col sm:flex-row sm:gap-2 min-w-0">
        <span className="text-muted-foreground whitespace-nowrap">{label}:</span>
        <span className="font-medium break-all">{value}</span>
      </div>
    </div>
  );
}
