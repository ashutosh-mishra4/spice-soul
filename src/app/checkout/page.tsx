"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ChevronDown, Pencil } from "lucide-react";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";
import { CheckoutStepper } from "@/components/checkout/CheckoutStepper";
import { ContactStep } from "@/components/checkout/ContactStep";
import { ShippingStep } from "@/components/checkout/ShippingStep";
import { DeliveryStep } from "@/components/checkout/DeliveryStep";
import { PaymentStep } from "@/components/checkout/PaymentStep";
import { ReviewStep } from "@/components/checkout/ReviewStep";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { useCartStore } from "@/lib/store/cart-store";
import { CHECKOUT_STEPS, STEP_LABELS, PAYMENT_METHOD_LABELS, type CheckoutStep as StepType } from "@/lib/checkout/types";

const stepComponents: Record<StepType, React.ComponentType> = {
  contact: ContactStep,
  shipping: ShippingStep,
  delivery: DeliveryStep,
  payment: PaymentStep,
  review: ReviewStep,
};

export default function CheckoutPage() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const activeStep = useCartStore((s) => s.checkout.activeStep);
  const completedSteps = useCartStore((s) => s.checkout.completedSteps);
  const editStep = useCartStore((s) => s.editStep);
  const checkout = useCartStore((s) => s.checkout);
  const orderCompletedRef = useRef(false);

  // Mark order as completed when all steps are done and review is active
  // This prevents the empty-cart redirect from racing with the confirmation navigation
  useEffect(() => {
    if (activeStep === "review" && completedSteps.length >= 4) {
      orderCompletedRef.current = true;
    }
  }, [activeStep, completedSteps]);

  // Redirect to cart if empty (but not if order was just placed)
  useEffect(() => {
    if (items.length === 0 && !orderCompletedRef.current) {
      router.replace("/cart");
    }
  }, [items.length, router]);

  if (items.length === 0) return null;

  const getStepSummary = (step: StepType): string | null => {
    switch (step) {
      case "contact":
        return checkout.contact?.email || null;
      case "shipping":
        return checkout.shipping
          ? `${checkout.shipping.firstName} ${checkout.shipping.lastName}, ${checkout.shipping.city}, ${checkout.shipping.state}`
          : null;
      case "delivery":
        return checkout.deliveryMethod
          ? checkout.deliveryMethod.charAt(0).toUpperCase() +
              checkout.deliveryMethod.slice(1)
          : null;
      case "payment":
        if (!checkout.payment) return null;
        return checkout.payment.method === "card"
          ? "Card ending in ****"
          : PAYMENT_METHOD_LABELS[checkout.payment.method];
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <CheckoutHeader />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CheckoutStepper />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Steps */}
          <div className="lg:col-span-3 space-y-4">
            {CHECKOUT_STEPS.map((step) => {
              const isActive = activeStep === step;
              const isCompleted = completedSteps.includes(step);
              const StepComponent = stepComponents[step];
              const summary = getStepSummary(step);

              // Don't show review as collapsible — it's always expanded when active
              if (step === "review" && !isActive) return null;

              return (
                <div
                  key={step}
                  className={`bg-card border rounded-sm overflow-hidden transition-colors ${
                    isActive ? "border-primary" : "border-border"
                  }`}
                >
                  {/* Step Header (collapsed view) */}
                  {!isActive && (
                    <div className="flex items-center justify-between p-5">
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 text-white" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                            <span className="text-xs text-muted-foreground font-semibold">
                              {CHECKOUT_STEPS.indexOf(step) + 1}
                            </span>
                          </div>
                        )}
                        <span
                          className={`text-sm ${
                            isCompleted
                              ? "text-foreground font-heading font-semibold"
                              : "text-muted-foreground"
                          }`}
                        >
                          {STEP_LABELS[step]}
                        </span>
                        {isCompleted && summary && (
                          <span className="text-sm text-muted-foreground ml-2 hidden sm:inline">
                            — {summary}
                          </span>
                        )}
                      </div>
                      {isCompleted && (
                        <button
                          onClick={() => editStep(step)}
                          className="flex items-center gap-1.5 text-sm text-primary hover:text-primary-light transition-colors"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          Edit
                        </button>
                      )}
                    </div>
                  )}

                  {/* Step Content (expanded) */}
                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div
                        key={`${step}-active`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 pt-2">
                          <StepComponent />
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <div className="lg:sticky lg:top-8">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
