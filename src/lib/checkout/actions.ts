"use server";

import type {
  ShippingAddress,
  ShippingMethod,
  PromoCode,
  OrderTotals,
  Order,
} from "./types";
import type { CartItem } from "@/lib/store/cart-store";

// ─── Mock helpers ───────────────────────────────────────────
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function generateOrderId() {
  return `SS-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
}

// ─── Address Validation ─────────────────────────────────────
export async function validateAddress(
  address: ShippingAddress
): Promise<{ valid: boolean; suggestion?: ShippingAddress }> {
  await delay(600);

  // Mock: always valid unless ZIP is obviously wrong
  if (address.zip.length < 5) {
    return { valid: false };
  }

  return { valid: true };
}

// ─── Shipping Rate Calculation ──────────────────────────────
export async function calculateShipping(
  _address: ShippingAddress,
  method: ShippingMethod,
  subtotal: number
): Promise<{ price: number }> {
  await delay(400);

  const rates: Record<ShippingMethod, number> = {
    standard: subtotal >= 35 ? 0 : 5.99,
    expedited: 7.99,
    overnight: 14.99,
  };

  return { price: rates[method] };
}

// ─── Tax Calculation ────────────────────────────────────────
export async function calculateTax(
  _address: ShippingAddress,
  subtotal: number
): Promise<{ tax: number; rate: number }> {
  await delay(300);

  // Mock: 8.5% tax rate
  const rate = 0.085;
  const tax = Math.round(subtotal * rate * 100) / 100;

  return { tax, rate };
}

// ─── Promo Code Validation ──────────────────────────────────
export async function validatePromoCode(
  code: string
): Promise<{ valid: boolean; promo?: PromoCode; error?: string }> {
  await delay(500);

  const promoCodes: Record<string, PromoCode> = {
    SPICE10: { code: "SPICE10", discount: 10, type: "percentage" },
    WELCOME5: { code: "WELCOME5", discount: 5, type: "fixed" },
    FREESHIP: { code: "FREESHIP", discount: 0, type: "fixed" },
  };

  const promo = promoCodes[code.toUpperCase()];
  if (promo) {
    return { valid: true, promo };
  }

  return { valid: false, error: "Invalid promo code" };
}

// ─── Create Payment Intent (Mock) ───────────────────────────
export async function createPaymentIntent(
  amount: number
): Promise<{ clientSecret: string }> {
  await delay(800);

  // Mock client secret — in production this calls Stripe API:
  // const paymentIntent = await stripe.paymentIntents.create({
  //   amount: Math.round(amount * 100),
  //   currency: 'usd',
  // });
  // return { clientSecret: paymentIntent.client_secret };
  const mockSecret = `pi_mock_${Date.now()}_secret_${Math.random().toString(36).substring(2)}`;
  return { clientSecret: mockSecret };
}

// ─── Place Order ────────────────────────────────────────────
export async function placeOrder(data: {
  items: CartItem[];
  contact: { email: string; wantsAccount: boolean };
  shipping: ShippingAddress;
  deliveryMethod: ShippingMethod;
  gift: { isGift: boolean; giftWrap: boolean; giftMessage: string };
  totals: OrderTotals;
}): Promise<{ success: boolean; order?: Order; error?: string }> {
  await delay(1200);

  // Mock: always succeed
  // In production:
  // 1. Lock inventory
  // 2. Confirm Stripe PaymentIntent
  // 3. Create order in DB
  // 4. Send confirmation email
  // 5. Notify fulfillment

  const order: Order = {
    id: generateOrderId(),
    contact: data.contact,
    shipping: data.shipping,
    deliveryMethod: data.deliveryMethod,
    gift: data.gift,
    totals: data.totals,
    createdAt: new Date().toISOString(),
  };

  return { success: true, order };
}
