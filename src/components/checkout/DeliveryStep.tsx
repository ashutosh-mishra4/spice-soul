"use client";

import { useState } from "react";
import { Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCartStore } from "@/lib/store/cart-store";
import { SHIPPING_OPTIONS, type ShippingMethod } from "@/lib/checkout/types";
import { products } from "@/lib/products";

export function DeliveryStep() {
  const items = useCartStore((s) => s.items);
  const checkout = useCartStore((s) => s.checkout);
  const setDeliveryMethod = useCartStore((s) => s.setDeliveryMethod);
  const completeStep = useCartStore((s) => s.completeStep);
  const setActiveStep = useCartStore((s) => s.setActiveStep);
  const [isCalculating, setIsCalculating] = useState(false);

  const subtotal = items.reduce((sum, item) => {
    const product = products.find(
      (p) => p.slug === item.productId || p.id === item.productId
    );
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  const selected = checkout.deliveryMethod || "standard";

  const handleMethodChange = (value: string) => {
    setDeliveryMethod(value as ShippingMethod);
  };

  const handleContinue = async () => {
    setIsCalculating(true);
    // Simulate shipping + tax calculation
    await new Promise((r) => setTimeout(r, 600));
    setIsCalculating(false);
    setDeliveryMethod(selected);
    completeStep("delivery");
    setActiveStep("payment");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Truck className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-heading text-lg text-foreground">
          Delivery Method
        </h3>
      </div>

      <RadioGroup value={selected} onValueChange={handleMethodChange}>
        {SHIPPING_OPTIONS.map((option) => {
          const isFreeEligible =
            option.id === "standard" && subtotal >= 35;
          const displayPrice = isFreeEligible ? 0 : option.price;

          return (
            <label
              key={option.id}
              htmlFor={`delivery-${option.id}`}
              className={`flex items-center gap-4 p-4 border rounded-sm cursor-pointer transition-all ${
                selected === option.id
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <RadioGroupItem
                value={option.id}
                id={`delivery-${option.id}`}
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-heading text-sm text-foreground">
                    {option.name}
                  </span>
                  <span className="text-heading text-sm text-foreground">
                    {displayPrice === 0 ? (
                      <span className="text-primary font-semibold">Free</span>
                    ) : (
                      `$${displayPrice.toFixed(2)}`
                    )}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {option.estimatedDays}
                </p>
              </div>
            </label>
          );
        })}
      </RadioGroup>

      <Button
        type="button"
        onClick={handleContinue}
        disabled={isCalculating}
        className="w-full bg-primary hover:bg-primary-light text-white text-heading font-semibold py-5 rounded-sm"
      >
        {isCalculating ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Calculating...
          </>
        ) : (
          "Continue to Payment"
        )}
      </Button>
    </div>
  );
}
