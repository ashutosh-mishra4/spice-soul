"use client";

import { Check } from "lucide-react";
import { CHECKOUT_STEPS, STEP_LABELS, type CheckoutStep } from "@/lib/checkout/types";
import { useCartStore } from "@/lib/store/cart-store";

export function CheckoutStepper() {
  const activeStep = useCartStore((s) => s.checkout.activeStep);
  const completedSteps = useCartStore((s) => s.checkout.completedSteps);

  return (
    <nav aria-label="Checkout progress" className="mb-8">
      <ol className="flex items-center gap-1 sm:gap-2">
        {CHECKOUT_STEPS.map((step, index) => {
          const isCompleted = completedSteps.includes(step);
          const isActive = activeStep === step;
          return (
            <li key={step} className="flex items-center gap-1 sm:gap-2">
              <StepIndicator
                step={step}
                index={index}
                isActive={isActive}
                isCompleted={isCompleted}
              />
              {index < CHECKOUT_STEPS.length - 1 && (
                <div
                  className={`hidden sm:block w-8 h-px ${
                    isCompleted ? "bg-primary" : "bg-border"
                  }`}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function StepIndicator({
  step,
  index,
  isActive,
  isCompleted,
}: {
  step: CheckoutStep;
  index: number;
  isActive: boolean;
  isCompleted: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
          isCompleted
            ? "bg-primary text-white"
            : isActive
              ? "bg-primary text-white"
              : "bg-muted text-muted-foreground"
        }`}
      >
        {isCompleted ? <Check className="w-3.5 h-3.5" /> : index + 1}
      </div>
      <span
        className={`text-sm hidden sm:inline ${
          isActive
            ? "text-foreground font-semibold text-heading"
            : isCompleted
              ? "text-primary font-medium"
              : "text-muted-foreground"
        }`}
      >
        {STEP_LABELS[step]}
      </span>
    </div>
  );
}
