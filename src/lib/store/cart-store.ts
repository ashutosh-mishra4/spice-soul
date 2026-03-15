import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  ContactInfo,
  ShippingAddress,
  GiftOptions,
  ShippingMethod,
  PaymentInfo,
  PromoCode,
  CheckoutStep,
} from "@/lib/checkout/types";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CheckoutData = {
  contact: ContactInfo | null;
  shipping: ShippingAddress | null;
  gift: GiftOptions;
  deliveryMethod: ShippingMethod | null;
  payment: PaymentInfo | null;
  completedSteps: CheckoutStep[];
  activeStep: CheckoutStep;
};

type CartState = {
  items: CartItem[];
  promo: PromoCode | null;
  checkout: CheckoutData;

  // Cart actions
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;

  // Promo actions
  setPromo: (promo: PromoCode | null) => void;

  // Checkout actions
  setContact: (contact: ContactInfo) => void;
  setShipping: (shipping: ShippingAddress) => void;
  setGift: (gift: GiftOptions) => void;
  setDeliveryMethod: (method: ShippingMethod) => void;
  setPayment: (payment: PaymentInfo) => void;
  completeStep: (step: CheckoutStep) => void;
  setActiveStep: (step: CheckoutStep) => void;
  editStep: (step: CheckoutStep) => void;
  resetCheckout: () => void;

  // Computed helpers
  totalItems: () => number;
};

const initialCheckout: CheckoutData = {
  contact: null,
  shipping: null,
  gift: { isGift: false, giftWrap: false, giftMessage: "" },
  deliveryMethod: null,
  payment: null,
  completedSteps: [],
  activeStep: "contact",
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promo: null,
      checkout: { ...initialCheckout },

      // Cart actions
      addItem: (productId, quantity = 1) =>
        set((state) => {
          const existing = state.items.find(
            (item) => item.productId === productId
          );
          if (existing) {
            return {
              items: state.items.map((item) =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          return { items: [...state.items, { productId, quantity }] };
        }),

      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        })),

      updateQuantity: (productId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              items: state.items.filter(
                (item) => item.productId !== productId
              ),
            };
          }
          return {
            items: state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
          };
        }),

      clearCart: () => set({ items: [], promo: null }),

      // Promo
      setPromo: (promo) => set({ promo }),

      // Checkout actions
      setContact: (contact) =>
        set((state) => ({
          checkout: { ...state.checkout, contact },
        })),

      setShipping: (shipping) =>
        set((state) => ({
          checkout: { ...state.checkout, shipping },
        })),

      setGift: (gift) =>
        set((state) => ({
          checkout: { ...state.checkout, gift },
        })),

      setDeliveryMethod: (method) =>
        set((state) => ({
          checkout: { ...state.checkout, deliveryMethod: method },
        })),

      setPayment: (payment) =>
        set((state) => ({
          checkout: { ...state.checkout, payment },
        })),

      completeStep: (step) =>
        set((state) => ({
          checkout: {
            ...state.checkout,
            completedSteps: state.checkout.completedSteps.includes(step)
              ? state.checkout.completedSteps
              : [...state.checkout.completedSteps, step],
          },
        })),

      setActiveStep: (step) =>
        set((state) => ({
          checkout: { ...state.checkout, activeStep: step },
        })),

      editStep: (step) =>
        set((state) => ({
          checkout: {
            ...state.checkout,
            activeStep: step,
          },
        })),

      resetCheckout: () =>
        set({ checkout: { ...initialCheckout } }),

      totalItems: () =>
        get().items.reduce((sum, item) => sum + item.quantity, 0),
    }),
    {
      name: "spice-soul-cart",
      partialize: (state) => ({
        items: state.items,
        promo: state.promo,
        checkout: state.checkout,
      }),
    }
  )
);
