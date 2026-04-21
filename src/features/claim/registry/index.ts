import { ComponentType } from "react";
import type { ProcessStep, StepTitle } from "../types";

export type StepCardProps<T extends StepTitle> = {
  step: Extract<ProcessStep, { title: T }>;
  index: number;
};

type AnyStepComponent = ComponentType<{ step: ProcessStep; index: number }>;

const registry = new Map<StepTitle, AnyStepComponent>();

/**
 * Her step component dosyası module-level'da kendini kaydeder.
 * Open/Closed: yeni step = yeni dosya, mevcut koda dokunulmaz.
 */
export function registerStep<T extends StepTitle>(
  title: T,
  component: ComponentType<StepCardProps<T>>
) {
  registry.set(title, component as AnyStepComponent);
}

/**
 * Title'a göre component döner.
 * Schema unknown title'ı zaten reddeder; bu fallback dev-safety içindir:
 * registry'de component eksikse sessizce FallbackCard gösterir.
 */
export function getStepComponent(title: string): AnyStepComponent {
  const component = registry.get(title as StepTitle);
  if (!component) {
    // Lazy import — döngüsel bağımlılığı kırmak için
    const { FallbackCard } = require("./FallbackCard");
    return FallbackCard;
  }
  return component;
}
