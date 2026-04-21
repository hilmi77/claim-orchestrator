import { useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useClaimStore } from "../store/claim.store";
import { AI_EXPLANATIONS } from "../constants/ai-explanations";

function TypewriterText({ text, onDone }: { text: string; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed("");
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
        onDone?.();
      }
    }, 18);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className={`text-sm leading-relaxed ${!done ? "typewriter-cursor" : ""}`}>
      {displayed}
    </p>
  );
}

export function ExplainAIDialog() {
  const { explainOpenFor, closeExplain } = useClaimStore();
  const isOpen = explainOpenFor !== null;
  const explanation = explainOpenFor ? AI_EXPLANATIONS[explainOpenFor] : null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeExplain()}>
      <DialogContent>
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-100">
              <Sparkles className="h-4 w-4 text-violet-600" />
            </div>
            <div>
              <DialogTitle>AI Explanation</DialogTitle>
              <DialogDescription>{explainOpenFor}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="pt-2 min-h-[80px]">
          {explanation ? (
            <TypewriterText key={explainOpenFor} text={explanation} />
          ) : (
            <p className="text-sm text-muted-foreground italic">
              No explanation available for this step.
            </p>
          )}
        </div>
        <div className="pt-4 flex justify-end">
          <Button variant="outline" size="sm" onClick={closeExplain}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function ExplainAIButton({ stepTitle }: { stepTitle: string }) {
  const { openExplain } = useClaimStore();
  return (
    <button
      onClick={() => openExplain(stepTitle)}
      className="flex items-center gap-1.5 text-xs text-violet-600 hover:text-violet-700 transition-colors mt-2 py-1"
    >
      <Sparkles className="h-3.5 w-3.5" />
      Explain with AI
    </button>
  );
}
