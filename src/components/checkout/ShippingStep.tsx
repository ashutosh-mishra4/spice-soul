"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCartStore } from "@/lib/store/cart-store";
import { GiftOptionsPanel } from "./GiftOptions";
import {
  shippingSchema,
  type ShippingFormData,
} from "@/lib/checkout/validation";

const US_STATES = [
  "AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA",
  "KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ",
  "NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT",
  "VA","WA","WV","WI","WY",
];

export function ShippingStep() {
  const checkout = useCartStore((s) => s.checkout);
  const setShipping = useCartStore((s) => s.setShipping);
  const setGift = useCartStore((s) => s.setGift);
  const completeStep = useCartStore((s) => s.completeStep);
  const setActiveStep = useCartStore((s) => s.setActiveStep);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ShippingFormData>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      firstName: checkout.shipping?.firstName || "",
      lastName: checkout.shipping?.lastName || "",
      address1: checkout.shipping?.address1 || "",
      address2: checkout.shipping?.address2 || "",
      city: checkout.shipping?.city || "",
      state: checkout.shipping?.state || "",
      zip: checkout.shipping?.zip || "",
      country: checkout.shipping?.country || "US",
      phone: checkout.shipping?.phone || "",
    },
    mode: "onBlur",
  });

  const state = watch("state");
  const gift = checkout.gift;

  const onSubmit = (data: ShippingFormData) => {
    setShipping(data);
    completeStep("shipping");
    setActiveStep("delivery");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <MapPin className="w-4 h-4 text-primary" />
        </div>
        <h3 className="font-heading text-lg text-foreground">
          Shipping Address
        </h3>
      </div>

      {/* Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="firstName" className="text-sm text-foreground mb-1.5 block">
            First Name
          </Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className={errors.firstName ? "border-destructive" : ""}
            autoComplete="given-name"
          />
          {errors.firstName && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.firstName.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="lastName" className="text-sm text-foreground mb-1.5 block">
            Last Name
          </Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className={errors.lastName ? "border-destructive" : ""}
            autoComplete="family-name"
          />
          {errors.lastName && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.lastName.message}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <Label htmlFor="address1" className="text-sm text-foreground mb-1.5 block">
          Address
        </Label>
        <Input
          id="address1"
          {...register("address1")}
          className={errors.address1 ? "border-destructive" : ""}
          autoComplete="address-line1"
        />
        {errors.address1 && (
          <p className="text-sm text-destructive mt-1" role="alert">
            {errors.address1.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="address2" className="text-sm text-foreground mb-1.5 block">
          Apartment, suite, etc. (optional)
        </Label>
        <Input
          id="address2"
          {...register("address2")}
          autoComplete="address-line2"
        />
      </div>

      {/* City / State / ZIP */}
      <div className="grid grid-cols-6 gap-4">
        <div className="col-span-3">
          <Label htmlFor="city" className="text-sm text-foreground mb-1.5 block">
            City
          </Label>
          <Input
            id="city"
            {...register("city")}
            className={errors.city ? "border-destructive" : ""}
            autoComplete="address-level2"
          />
          {errors.city && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.city.message}
            </p>
          )}
        </div>
        <div className="col-span-1">
          <Label htmlFor="state" className="text-sm text-foreground mb-1.5 block">
            State
          </Label>
          <Select
            value={state}
            onValueChange={(val) => setValue("state", val, { shouldValidate: true })}
          >
            <SelectTrigger
              id="state"
              className={errors.state ? "border-destructive" : ""}
            >
              <SelectValue placeholder="—" />
            </SelectTrigger>
            <SelectContent>
              {US_STATES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.state && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.state.message}
            </p>
          )}
        </div>
        <div className="col-span-2">
          <Label htmlFor="zip" className="text-sm text-foreground mb-1.5 block">
            ZIP Code
          </Label>
          <Input
            id="zip"
            {...register("zip")}
            className={errors.zip ? "border-destructive" : ""}
            autoComplete="postal-code"
            inputMode="numeric"
          />
          {errors.zip && (
            <p className="text-sm text-destructive mt-1" role="alert">
              {errors.zip.message}
            </p>
          )}
        </div>
      </div>

      {/* Country (hidden — US only for now) */}
      <input type="hidden" {...register("country")} />

      {/* Phone */}
      <div>
        <Label htmlFor="phone" className="text-sm text-foreground mb-1.5 block">
          Phone
        </Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
          className={errors.phone ? "border-destructive" : ""}
          autoComplete="tel"
          inputMode="tel"
          placeholder="(555) 123-4567"
        />
        {errors.phone && (
          <p className="text-sm text-destructive mt-1" role="alert">
            {errors.phone.message}
          </p>
        )}
      </div>

      {/* Gift Options */}
      <GiftOptionsPanel
        isGift={gift.isGift}
        giftWrap={gift.giftWrap}
        giftMessage={gift.giftMessage}
        onIsGiftChange={(val) => setGift({ ...gift, isGift: val })}
        onGiftWrapChange={(val) => setGift({ ...gift, giftWrap: val })}
        onGiftMessageChange={(val) => setGift({ ...gift, giftMessage: val })}
      />

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold py-5 rounded-sm"
      >
        Continue to Delivery Method
      </Button>
    </form>
  );
}
