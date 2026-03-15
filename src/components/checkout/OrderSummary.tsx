"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp, Lock, Truck, RotateCcw, ShieldCheck, Tag } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store/cart-store";
import { products } from "@/lib/products";
import { SHIPPING_OPTIONS } from "@/lib/checkout/types";
import { validatePromoCode } from "@/lib/checkout/actions";

export function OrderSummary() {
  const items = useCartStore((s) => s.items);
  const checkout = useCartStore((s) => s.checkout);
  const promo = useCartStore((s) => s.promo);
  const setPromo = useCartStore((s) => s.setPromo);

  const [promoInput, setPromoInput] = useState(promo?.code || "");
  const [promoLoading, setPromoLoading] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const cartProducts = items
    .map((item) => {
      const product = products.find(
        (p) => p.slug === item.productId || p.id === item.productId
      );
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as { product: (typeof products)[number]; quantity: number }[];

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const shippingOption = SHIPPING_OPTIONS.find(
    (o) => o.id === checkout.deliveryMethod
  );
  const shippingPrice = checkout.deliveryMethod
    ? checkout.deliveryMethod === "standard" && subtotal >= 35
      ? 0
      : shippingOption?.price || 0
    : null;

  const discount = promo
    ? promo.type === "percentage"
      ? Math.round(subtotal * (promo.discount / 100) * 100) / 100
      : promo.discount
    : 0;

  const giftWrapPrice = checkout.gift.giftWrap ? 3.99 : 0;
  const taxableAmount = subtotal - discount + giftWrapPrice;
  const tax =
    checkout.deliveryMethod !== null
      ? Math.round(taxableAmount * 0.085 * 100) / 100
      : null;

  const total =
    tax !== null && shippingPrice !== null
      ? taxableAmount + shippingPrice + tax
      : null;

  const totalItems = cartProducts.reduce((s, i) => s + i.quantity, 0);

  const handleApplyPromo = async () => {
    if (!promoInput.trim()) return;
    setPromoLoading(true);
    const result = await validatePromoCode(promoInput.trim());
    setPromoLoading(false);
    if (result.valid && result.promo) {
      setPromo(result.promo);
      toast.success(`Promo code "${result.promo.code}" applied!`);
    } else {
      toast.error(result.error || "Invalid promo code");
    }
  };

  return (
    <div className="bg-card border border-border rounded-sm">
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileExpanded(!mobileExpanded)}
        className="lg:hidden w-full flex items-center justify-between p-4 text-sm"
      >
        <span className="text-heading font-semibold text-foreground">
          Order Summary ({totalItems} items)
        </span>
        <div className="flex items-center gap-2">
          {total !== null && (
            <span className="text-heading font-semibold text-foreground">
              ${total.toFixed(2)}
            </span>
          )}
          {mobileExpanded ? (
            <ChevronUp className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          )}
        </div>
      </button>

      {/* Content — always visible on desktop, toggleable on mobile */}
      <div className={`p-6 pt-0 lg:pt-6 ${mobileExpanded ? "block" : "hidden lg:block"}`}>
        <h3 className="text-heading text-lg text-foreground mb-4 hidden lg:block">
          Order Summary
        </h3>

        {/* Items */}
        <div className="space-y-4 mb-6">
          {cartProducts.map(({ product, quantity }) => (
            <div key={product.id} className="flex items-center gap-3">
              <Link
                href={`/products/${product.slug}`}
                className="relative w-14 h-14 rounded-sm overflow-hidden border border-border shrink-0"
              >
                <Image
                  src={product.gridImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="56px"
                />
                <span className="absolute -top-1 -right-1 bg-foreground text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-semibold">
                  {quantity}
                </span>
              </Link>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground truncate">
                  {product.name}
                </p>
              </div>
              <span className="text-sm text-foreground font-medium shrink-0">
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        {/* Promo Code */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              placeholder="Promo code"
              className="pl-9"
              onKeyDown={(e) => e.key === "Enter" && handleApplyPromo()}
            />
          </div>
          <Button
            variant="outline"
            onClick={handleApplyPromo}
            disabled={promoLoading || !promoInput.trim()}
            className="shrink-0"
          >
            {promoLoading ? "..." : "Apply"}
          </Button>
        </div>

        {promo && (
          <div className="flex items-center justify-between text-sm mb-4 bg-primary/5 px-3 py-2 rounded-sm">
            <span className="text-primary font-medium">{promo.code}</span>
            <button
              onClick={() => {
                setPromo(null);
                setPromoInput("");
              }}
              className="text-xs text-muted-foreground hover:text-destructive"
            >
              Remove
            </button>
          </div>
        )}

        <Separator className="mb-4" />

        {/* Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">${subtotal.toFixed(2)}</span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-primary">Discount</span>
              <span className="text-primary">-${discount.toFixed(2)}</span>
            </div>
          )}
          {giftWrapPrice > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Gift Wrapping</span>
              <span className="text-foreground">$3.99</span>
            </div>
          )}
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Shipping</span>
            <span className="text-foreground">
              {shippingPrice === null
                ? "Calculated next"
                : shippingPrice === 0
                  ? "Free"
                  : `$${shippingPrice.toFixed(2)}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="text-foreground">
              {tax === null ? "Calculated next" : `$${tax.toFixed(2)}`}
            </span>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex justify-between items-baseline">
          <span className="text-heading text-base text-foreground">Total</span>
          <span className="text-display text-xl text-foreground">
            {total !== null ? `$${total.toFixed(2)}` : "—"}
          </span>
        </div>

        {/* Trust Badges */}
        <div className="mt-6 grid grid-cols-3 gap-3">
          {[
            { icon: Lock, label: "Secure" },
            { icon: Truck, label: "Free Ship 35+" },
            { icon: RotateCcw, label: "Easy Returns" },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-1.5 py-2"
            >
              <Icon className="w-4 h-4 text-primary" />
              <span className="text-[10px] text-muted-foreground leading-tight">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
