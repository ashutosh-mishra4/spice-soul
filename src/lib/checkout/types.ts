export type CheckoutStep =
  | "contact"
  | "shipping"
  | "delivery"
  | "payment"
  | "review";

export const CHECKOUT_STEPS: CheckoutStep[] = [
  "contact",
  "shipping",
  "delivery",
  "payment",
  "review",
];

export const STEP_LABELS: Record<CheckoutStep, string> = {
  contact: "Contact",
  shipping: "Shipping",
  delivery: "Delivery",
  payment: "Payment",
  review: "Review",
};

export type ContactInfo = {
  email: string;
  wantsAccount: boolean;
};

export type ShippingAddress = {
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
};

export type GiftOptions = {
  isGift: boolean;
  giftWrap: boolean;
  giftMessage: string;
};

export type ShippingMethod = "standard" | "expedited" | "overnight";

export type ShippingOption = {
  id: ShippingMethod;
  name: string;
  description: string;
  price: number;
  estimatedDays: string;
};

export const SHIPPING_OPTIONS: ShippingOption[] = [
  {
    id: "standard",
    name: "Standard Shipping",
    description: "5-7 business days",
    price: 0,
    estimatedDays: "5-7 business days",
  },
  {
    id: "expedited",
    name: "Expedited Shipping",
    description: "2-3 business days",
    price: 7.99,
    estimatedDays: "2-3 business days",
  },
  {
    id: "overnight",
    name: "Overnight Shipping",
    description: "Next business day",
    price: 14.99,
    estimatedDays: "Next business day",
  },
];

export type PaymentMethod = "card" | "apple_pay" | "google_pay" | "paypal";

export const PAYMENT_METHOD_LABELS: Record<PaymentMethod, string> = {
  card: "Credit / Debit Card",
  apple_pay: "Apple Pay",
  google_pay: "Google Pay",
  paypal: "PayPal",
};

export type PaymentInfo = {
  method: PaymentMethod;
  cardComplete: boolean;
  billingMatchesShipping: boolean;
};

export type PromoCode = {
  code: string;
  discount: number;
  type: "percentage" | "fixed";
};

export type OrderTotals = {
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  giftWrap: number;
  total: number;
};

export type Order = {
  id: string;
  contact: ContactInfo;
  shipping: ShippingAddress;
  deliveryMethod: ShippingMethod;
  gift: GiftOptions;
  totals: OrderTotals;
  createdAt: string;
};
