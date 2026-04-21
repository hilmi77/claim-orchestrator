import { useClaim } from "./features/claim/hooks/useClaim";
import { ClaimHeader } from "./features/claim/components/ClaimHeader";
import { ActionBanner } from "./features/claim/components/ActionBanner";
import { Timeline } from "./features/claim/components/Timeline";
import { ExplainAIDialog } from "./features/claim/components/ExplainAIDialog";
import { useClaimStore } from "./features/claim/store/claim.store";
import { Skeleton } from "./components/ui/skeleton";
import { AlertTriangle } from "lucide-react";

export function App() {
  const { data: claim, isLoading, error } = useClaim();
  const { expandStep } = useClaimStore();

  const handleActionClick = (stepIndex: number) => {
    expandStep(stepIndex);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-8 w-32" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error || !claim) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 mx-auto">
            <AlertTriangle className="h-8 w-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-bold">Failed to load claim</h1>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred. Please refresh and try again."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <ActionBanner claim={claim} onActionClick={handleActionClick} />

      <main className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        <ClaimHeader claim={claim} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Timeline — main content */}
          <div className="lg:col-span-3">
            <Timeline claim={claim} onActionClick={handleActionClick} />
          </div>

          {/* Sidebar — stats (optional, mobile hidden) */}
          <aside className="hidden lg:block">
            <div className="sticky top-20 space-y-4">
              <div className="rounded-lg border bg-card p-4 space-y-2">
                <h3 className="text-sm font-semibold">Quick summary</h3>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total steps</span>
                    <span className="font-medium">{claim.processDetails.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Completed</span>
                    <span className="font-medium">
                      {claim.processDetails.filter((s) => s.status === "Completed" || s.status === "Report Completed").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">In progress</span>
                    <span className="font-medium">
                      {claim.processDetails.filter((s) => s.status === "In Progress").length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Pending</span>
                    <span className="font-medium">
                      {claim.processDetails.filter((s) => s.status === "Pending").length}
                    </span>
                  </div>
                </div>
              </div>

              {/* Help card */}
              <div className="rounded-lg border bg-card p-4 space-y-2 bg-blue-50/50 border-blue-200/50">
                <h3 className="text-sm font-semibold text-blue-900">Need help?</h3>
                <p className="text-xs text-blue-700">
                  Click on any step to see details. Use "Explain with AI" to understand complex terms.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* AI Dialog — modal state managed by Zustand */}
      <ExplainAIDialog />
    </div>
  );
}
