import { z } from "zod";

export const contactSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  wantsAccount: z.boolean(),
});

export const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address1: z.string().min(1, "Address is required"),
  address2: z.string(),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zip: z
    .string()
    .min(1, "ZIP code is required")
    .regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code"),
  country: z.string().min(1, "Country is required"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(
      /^[\d\s\-().+]+$/,
      "Please enter a valid phone number"
    ),
});

export const giftSchema = z.object({
  isGift: z.boolean(),
  giftWrap: z.boolean(),
  giftMessage: z.string().max(250, "Message must be 250 characters or less"),
});

export const deliverySchema = z.object({
  method: z.enum(["standard", "expedited", "overnight"], {
    message: "Please select a delivery method",
  }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
export type ShippingFormData = z.infer<typeof shippingSchema>;
export type GiftFormData = z.infer<typeof giftSchema>;
export type DeliveryFormData = z.infer<typeof deliverySchema>;
