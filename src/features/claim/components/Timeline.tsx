import { useClaimStore } from "../store/claim.store";
import { Card } from "@/components/ui/card";
import { StepRenderer } from "./StepRenderer";
import { ExplainAIButton } from "./ExplainAIDialog";
import { InsertNodeControl } from "./InsertNodeControl";
import { CustomNodeDisplay } from "./CustomNodeDisplay";
import { DocumentAnalyzer } from "./DocumentAnalyzer";
import type { Claim } from "../types";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface TimelineProps {
  claim: Claim;
  onActionClick: (stepIndex: number) => void;
}

export function Timeline({ claim }: TimelineProps) {
  const { customNodes, expandedSteps, toggleStep } = useClaimStore();

  return (
    <div className="space-y-0">
      {claim.processDetails.map((step, index) => {
        const isExpanded = expandedSteps.has(index);
        const customNodesHere = customNodes.filter((n) => n.afterIndex === index - 1);

        return (
          <div key={index}>
            {/* Step card */}
            <div
              id={`step-${index}`}
              role="button"
              tabIndex={0}
              onClick={() => toggleStep(index)}
              onKeyDown={(e) => e.key === "Enter" && toggleStep(index)}
              className={cn("w-full text-left transition-all cursor-pointer", isExpanded && "bg-muted/40")}
              aria-expanded={isExpanded}
            >
              <Card
                className={cn(
                  "rounded-none border-l-4 border-t-0 border-r-0 border-b transition-all hover:shadow-sm",
                  step.status === "Completed" || step.status === "Report Completed"
                    ? "border-l-green-500"
                    : step.status === "In Progress"
                    ? "border-l-blue-500"
                    : "border-l-muted"
                )}
              >
                <div className="p-4 sm:p-5">
                  <StepRenderer step={step} index={index} />
                  <div className="mt-3" onClick={(e) => e.stopPropagation()}>
                    <ExplainAIButton stepTitle={step.title} />
                  </div>
                </div>
              </Card>
            </div>

            {/* Expanded detail section */}
            {isExpanded && step.title === "Deduction Reason" && (
              <div className="border-l-4 border-l-amber-500 bg-amber-50/30 px-4 sm:px-5 py-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold">Upload required documents</h4>
                  <button
                    onClick={() => toggleStep(index)}
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Hide
                  </button>
                </div>
                <Separator />
                <div className="mt-3">
                  <CustomDocumentAnalyzer stepIndex={index} />
                </div>
              </div>
            )}

            {/* Custom nodes inserted by user */}
            {customNodesHere.length > 0 && (
              <div className="border-l-4 border-l-muted bg-card px-4 sm:px-5 py-2 space-y-2">
                {customNodesHere.map((node) => (
                  <CustomNodeDisplay key={node.id} node={node} />
                ))}
              </div>
            )}

            {/* Insert control — hover'da görün */}
            <div className="border-l-4 border-l-transparent hover:border-l-muted transition-colors">
              <div className="px-4 sm:px-5">
                <InsertNodeControl afterIndex={index} />
              </div>
            </div>

            {/* Separator between steps */}
            {index < claim.processDetails.length - 1 && (
              <Separator className="my-0" />
            )}
          </div>
        );
      })}
    </div>
  );
}

function CustomDocumentAnalyzer({ stepIndex: _stepIndex }: { stepIndex: number }) {
  return <DocumentAnalyzer />;
}
