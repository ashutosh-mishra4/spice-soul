"use client";

import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/store/cart-store";

// NOTE: In production, wrap with <Elements> from @stripe/react-stripe-js
// and use <CardElement /> or <PaymentElement /> from Stripe.
// For now we use a mock card form that simulates the Stripe experience.

export function PaymentStep() {
  const setPayment = useCartStore((s) => s.setPayment);
  const completeStep = useCartStore((s) => s.completeStep);
  const setActiveStep = useCartStore((s) => s.setActiveStep);

  const [cardFilled, setCardFilled] = useState(false);
  const [billingMatchesShipping, setBillingMatchesShipping] = useState(true);

  const handleContinue = () => {
    setPayment({
      cardComplete: true,
      billingMatchesShipping,
    });
    completeStep("payment");
    setActiveStep("review");
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <CreditCard className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-heading text-lg text-foreground">Payment</h3>
      </div>

      {/* Express Checkout Buttons (stubs) */}
      <div className="space-y-3">
        <p className="text-xs text-muted-foreground text-center uppercase tracking-wider">
          Express Checkout
        </p>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 border border-border rounded-sm bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors"
          >
             Pay
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-3 border border-border rounded-sm bg-white text-foreground text-sm font-medium hover:bg-muted transition-colors"
          >
            G Pay
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-card px-3 text-muted-foreground">
              Or pay with card
            </span>
          </div>
        </div>
      </div>

      {/* Mock Stripe Card Element */}
      <div className="space-y-4">
        <div>
          <Label className="text-sm text-foreground mb-1.5 block">
            Card Number
          </Label>
          <div
            className={`border rounded-sm p-3.5 transition-colors ${
              cardFilled
                ? "border-primary bg-primary/5"
                : "border-border bg-background"
            }`}
          >
            {/* In production: <CardElement /> from @stripe/react-stripe-js */}
            <input
              type="text"
              placeholder="4242 4242 4242 4242"
              maxLength={19}
              className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
              onChange={(e) => setCardFilled(e.target.value.length >= 16)}
              inputMode="numeric"
              autoComplete="cc-number"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label className="text-sm text-foreground mb-1.5 block">
              Expiry
            </Label>
            <input
              type="text"
              placeholder="MM / YY"
              maxLength={7}
              className="w-full border border-border rounded-sm p-3.5 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              inputMode="numeric"
              autoComplete="cc-exp"
            />
          </div>
          <div>
            <Label className="text-sm text-foreground mb-1.5 block">CVC</Label>
            <input
              type="text"
              placeholder="123"
              maxLength={4}
              className="w-full border border-border rounded-sm p-3.5 bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              inputMode="numeric"
              autoComplete="cc-csc"
            />
          </div>
        </div>
      </div>

      {/* Billing address */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="billingMatch"
          checked={billingMatchesShipping}
          onCheckedChange={(checked) =>
            setBillingMatchesShipping(checked === true)
          }
        />
        <Label
          htmlFor="billingMatch"
          className="text-sm text-muted-foreground cursor-pointer"
        >
          Billing address same as shipping
        </Label>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Lock className="w-3.5 h-3.5" />
        <span>Your payment info is encrypted and secure</span>
      </div>

      <Button
        type="button"
        onClick={handleContinue}
        className="w-full bg-primary hover:bg-primary-light text-white text-heading font-semibold py-5 rounded-sm"
      >
        Review Order
      </Button>
    </div>
  );
}
