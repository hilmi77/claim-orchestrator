import { AlertTriangle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Claim } from "../types";

interface ActionBannerProps {
  claim: Claim;
  onActionClick: (stepIndex: number) => void;
}

export function ActionBanner({ claim, onActionClick }: ActionBannerProps) {
  // actionRequired alanı olan ilk step'i bul
  const actionEntry = claim.processDetails
    .map((step, index) => ({ step, index }))
    .find(({ step }) => "actionRequired" in step && step.actionRequired);

  if (!actionEntry) return null;

  const { step, index } = actionEntry;
  const actionText = "actionRequired" in step ? step.actionRequired : "";

  const handleClick = () => {
    // Codex feedback: butona tıklayınca ilgili step'e scroll et ve expand et
    onActionClick(index);
    const el = document.getElementById(`step-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="sticky top-0 z-30 bg-amber-50 border-b border-amber-200 px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 min-w-0">
          <AlertTriangle className="h-5 w-5 text-amber-600 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-amber-900 leading-tight">
              Action required
            </p>
            <p className="text-xs text-amber-700 truncate">{actionText}</p>
          </div>
        </div>
        <Button
          size="sm"
          onClick={handleClick}
          className="flex-shrink-0 bg-amber-600 hover:bg-amber-700 text-white gap-1"
        >
          Take action
          <ArrowRight className="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>
  );
}
