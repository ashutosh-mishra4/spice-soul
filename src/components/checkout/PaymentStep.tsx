"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Lock,
  AlertCircle,
  Wallet,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useCartStore } from "@/lib/store/cart-store";
import { validateCard, validateAltPayment } from "@/lib/checkout/actions";
import type { PaymentMethod } from "@/lib/checkout/types";

type PaymentView = "card" | "alt_methods" | "processing";

const ALT_METHODS: { id: PaymentMethod; label: string; icon: string }[] = [
  { id: "apple_pay", label: "Apple Pay", icon: "" },
  { id: "google_pay", label: "Google Pay", icon: "G" },
  { id: "paypal", label: "PayPal", icon: "P" },
];

export function PaymentStep() {
  const setPayment = useCartStore((s) => s.setPayment);
  const completeStep = useCartStore((s) => s.completeStep);
  const setActiveStep = useCartStore((s) => s.setActiveStep);

  const [view, setView] = useState<PaymentView>("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardFilled, setCardFilled] = useState(false);
  const [billingMatchesShipping, setBillingMatchesShipping] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isValidating, setIsValidating] = useState(false);
  const [selectedAlt, setSelectedAlt] = useState<PaymentMethod | null>(null);

  const formatCardNumber = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(.{4})/g, "$1 ").trim();
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setCardFilled(formatted.replace(/\s/g, "").length >= 16);
    setError(null);
  };

  const handleCardSubmit = async () => {
    setIsValidating(true);
    setError(null);

    const result = await validateCard(cardNumber);

    if (result.valid) {
      completePayment("card");
    } else {
      // Card failed → show alternative payment options
      setError(result.error || "Card validation failed.");
      setView("alt_methods");
    }

    setIsValidating(false);
  };

  const handleAltPayment = async (method: PaymentMethod) => {
    setSelectedAlt(method);
    setIsValidating(true);
    setError(null);

    const result = await validateAltPayment(method, 0);

    if (result.valid) {
      completePayment(method);
    } else {
      // Alt payment also failed → show validation error, go back to card
      setError(
        result.error ||
          "Alternative payment failed. Please try entering your card again."
      );
      setView("card");
      setSelectedAlt(null);
    }

    setIsValidating(false);
  };

  const completePayment = (method: PaymentMethod) => {
    setPayment({
      method,
      cardComplete: method === "card",
      billingMatchesShipping,
    });
    completeStep("payment");
    setActiveStep("review");
  };

  const handleBackToCard = () => {
    setView("card");
    setError(null);
    setSelectedAlt(null);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <CreditCard className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-heading text-lg text-foreground">Payment</h3>
      </div>

      {/* Error Banner */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-3 p-3.5 bg-destructive/10 border border-destructive/20 rounded-sm"
          >
            <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {/* ─── Card Entry View ─── */}
        {view === "card" && (
          <motion.div
            key="card-view"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            {/* Express Checkout Buttons */}
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground text-center uppercase tracking-wider">
                Express Checkout
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => handleAltPayment("apple_pay")}
                  disabled={isValidating}
                  className="flex items-center justify-center gap-2 py-3 border border-border rounded-sm bg-black text-white text-sm font-medium hover:bg-black/90 transition-colors disabled:opacity-50"
                >
                   Pay
                </button>
                <button
                  type="button"
                  onClick={() => handleAltPayment("google_pay")}
                  disabled={isValidating}
                  className="flex items-center justify-center gap-2 py-3 border border-border rounded-sm bg-white text-foreground text-sm font-medium hover:bg-muted transition-colors disabled:opacity-50"
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

            {/* Card Form */}
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
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    maxLength={19}
                    value={cardNumber}
                    className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                    onChange={handleCardNumberChange}
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
                  <Label className="text-sm text-foreground mb-1.5 block">
                    CVC
                  </Label>
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
              onClick={handleCardSubmit}
              disabled={!cardFilled || isValidating}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold py-5 rounded-sm disabled:opacity-50"
            >
              {isValidating ? "Validating…" : "Review Order"}
            </Button>
          </motion.div>
        )}

        {/* ─── Alternative Payment Methods View ─── */}
        {view === "alt_methods" && (
          <motion.div
            key="alt-view"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                <Wallet className="w-4 h-4 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground font-heading">
                  Choose another payment method
                </p>
                <p className="text-xs text-muted-foreground">
                  Your card could not be validated. Please select an alternative.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {ALT_METHODS.map((method) => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => handleAltPayment(method.id)}
                  disabled={isValidating}
                  className={`w-full flex items-center gap-4 p-4 border rounded-sm transition-all ${
                    selectedAlt === method.id && isValidating
                      ? "border-primary bg-primary/5"
                      : "border-border bg-card hover:border-primary/50 hover:bg-primary/5"
                  } disabled:opacity-60`}
                >
                  <span className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-sm font-bold text-foreground shrink-0">
                    {method.icon}
                  </span>
                  <span className="text-sm font-medium text-foreground font-heading">
                    {method.label}
                  </span>
                  {selectedAlt === method.id && isValidating && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      Verifying…
                    </span>
                  )}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleBackToCard}
              className="text-sm text-primary hover:text-primary-light transition-colors underline underline-offset-2"
            >
              ← Try a different card instead
            </button>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Lock className="w-3.5 h-3.5" />
              <span>All payment methods are encrypted and secure</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
