import type { ProcessStep } from "../types";
import { getStepComponent } from "../registry";

// Side-effect import: tüm step card'larını registry'ye kaydeder
import "../registry/steps";

interface StepRendererProps {
  step: ProcessStep;
  index: number;
}

export function StepRenderer({ step, index }: StepRendererProps) {
  const Component = getStepComponent(step.title);
  return <Component step={step} index={index} />;
}
