"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ClipboardCheck, Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store/cart-store";
import { products } from "@/lib/products";
import { SHIPPING_OPTIONS } from "@/lib/checkout/types";
import { placeOrder } from "@/lib/checkout/actions";

export function ReviewStep() {
  const router = useRouter();
  const items = useCartStore((s) => s.items);
  const checkout = useCartStore((s) => s.checkout);
  const promo = useCartStore((s) => s.promo);
  const clearCart = useCartStore((s) => s.clearCart);
  const resetCheckout = useCartStore((s) => s.resetCheckout);

  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isPlacing, setIsPlacing] = useState(false);

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
  const shippingPrice =
    checkout.deliveryMethod === "standard" && subtotal >= 35
      ? 0
      : shippingOption?.price || 0;

  const discount = promo
    ? promo.type === "percentage"
      ? Math.round(subtotal * (promo.discount / 100) * 100) / 100
      : promo.discount
    : 0;

  const giftWrapPrice = checkout.gift.giftWrap ? 3.99 : 0;
  const taxRate = 0.085;
  const taxableAmount = subtotal - discount + giftWrapPrice;
  const tax = Math.round(taxableAmount * taxRate * 100) / 100;
  const total = taxableAmount + shippingPrice + tax;

  const handlePlaceOrder = async () => {
    if (!agreedToTerms) {
      toast.error("Please agree to the Terms of Service to continue.");
      return;
    }
    if (!checkout.contact || !checkout.shipping || !checkout.deliveryMethod) {
      toast.error("Please complete all checkout steps.");
      return;
    }

    setIsPlacing(true);
    try {
      const result = await placeOrder({
        items,
        contact: checkout.contact,
        shipping: checkout.shipping,
        deliveryMethod: checkout.deliveryMethod,
        gift: checkout.gift,
        totals: {
          subtotal,
          shipping: shippingPrice,
          tax,
          discount,
          giftWrap: giftWrapPrice,
          total,
        },
      });

      if (result.success && result.order) {
        clearCart();
        resetCheckout();
        router.push(
          `/checkout/confirmation?orderId=${result.order.id}&total=${total.toFixed(2)}`
        );
      } else {
        toast.error(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <ClipboardCheck className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-heading text-lg text-foreground">Review Order</h3>
      </div>

      {/* Summary */}
      <div className="space-y-3 bg-secondary/50 p-4 rounded-sm border border-border">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Contact</span>
          <span className="text-foreground">{checkout.contact?.email}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Ship to</span>
          <span className="text-foreground text-right">
            {checkout.shipping?.address1}, {checkout.shipping?.city},{" "}
            {checkout.shipping?.state} {checkout.shipping?.zip}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Delivery</span>
          <span className="text-foreground">
            {shippingOption?.name} ({shippingOption?.estimatedDays})
          </span>
        </div>
        {checkout.gift.isGift && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gift</span>
            <span className="text-accent">
              {checkout.gift.giftWrap ? "Gift wrapped" : "Gift order"} 🎁
            </span>
          </div>
        )}
      </div>

      {/* Items */}
      <div className="space-y-3">
        {cartProducts.map(({ product, quantity }) => (
          <div
            key={product.id}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-foreground">
              {product.name} × {quantity}
            </span>
            <span className="text-foreground font-medium">
              ${(product.price * quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <Separator />

      {/* Totals */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="text-foreground">${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-primary">Discount ({promo?.code})</span>
            <span className="text-primary">-${discount.toFixed(2)}</span>
          </div>
        )}
        {giftWrapPrice > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Gift Wrapping</span>
            <span className="text-foreground">${giftWrapPrice.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="text-foreground">
            {shippingPrice === 0 ? (
              <span className="text-primary font-medium">Free</span>
            ) : (
              `$${shippingPrice.toFixed(2)}`
            )}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Tax</span>
          <span className="text-foreground">${tax.toFixed(2)}</span>
        </div>
        <Separator />
        <div className="flex justify-between">
          <span className="text-heading text-lg text-foreground">Total</span>
          <span className="text-display text-xl text-foreground">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Terms */}
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked === true)}
        />
        <Label
          htmlFor="terms"
          className="text-xs text-muted-foreground leading-relaxed cursor-pointer"
        >
          By placing your order, you agree to our Terms of Service and Privacy
          Policy
        </Label>
      </div>

      {/* Place Order */}
      <Button
        type="button"
        onClick={handlePlaceOrder}
        disabled={isPlacing || !agreedToTerms}
        className="w-full bg-primary hover:bg-primary-light text-white text-heading font-semibold py-6 rounded-sm text-base"
      >
        {isPlacing ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
            Processing...
          </>
        ) : (
          <>
            <ShieldCheck className="w-4 h-4 mr-2" />
            Place Order — ${total.toFixed(2)}
          </>
        )}
      </Button>
    </div>
  );
}
