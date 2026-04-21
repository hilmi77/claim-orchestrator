import { Clock, Activity } from "lucide-react";
import type { Claim } from "../types";

export function ClaimHeader({ claim }: { claim: Claim }) {
  return (
    <div className="space-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider font-medium">
            {claim.title}
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mt-0.5">
            #{claim.fileNo}
          </h1>
        </div>
        <div className="flex items-center gap-1.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap">
          <Clock className="h-4 w-4" />
          {claim.estimatedRemainingTime}
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <Activity className="h-4 w-4 text-muted-foreground" />
        <span className="text-muted-foreground">Status:</span>
        <span className="font-medium">{claim.currentStatus}</span>
      </div>
    </div>
  );
}
