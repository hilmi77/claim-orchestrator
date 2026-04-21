import { Badge } from "@/components/ui/badge";

type Status = string;

const statusConfig: Record<string, { variant: "success" | "warning" | "info" | "secondary" | "outline"; label: string }> = {
  Completed: { variant: "success", label: "Completed" },
  "Report Completed": { variant: "success", label: "Report Completed" },
  "In Progress": { variant: "info", label: "In Progress" },
  Pending: { variant: "secondary", label: "Pending" },
};

export function StatusBadge({ status }: { status: Status }) {
  const config = statusConfig[status] ?? { variant: "outline", label: status };
  return <Badge variant={config.variant}>{config.label}</Badge>;
}

export function isCompleted(status: Status) {
  return status === "Completed" || status === "Report Completed";
}

export function isActive(status: Status) {
  return status === "In Progress";
}
