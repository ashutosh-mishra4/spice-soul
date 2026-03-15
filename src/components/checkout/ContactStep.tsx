"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/checkout/validation";

export function ContactStep() {
  const checkout = useCartStore((s) => s.checkout);
  const setContact = useCartStore((s) => s.setContact);
  const completeStep = useCartStore((s) => s.completeStep);
  const setActiveStep = useCartStore((s) => s.setActiveStep);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      email: checkout.contact?.email || "",
      wantsAccount: checkout.contact?.wantsAccount || false,
    },
    mode: "onBlur",
  });

  const wantsAccount = watch("wantsAccount");

  const onSubmit = (data: ContactFormData) => {
    setContact(data);
    completeStep("contact");
    setActiveStep("shipping");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="flex items-center gap-3 mb-1">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
          <Mail className="w-4 h-4 text-primary" />
        </div>
        <h3 className="text-heading text-lg text-foreground">
          Contact Information
        </h3>
      </div>

      <div>
        <Label htmlFor="email" className="text-sm text-foreground mb-1.5 block">
          Email Address
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className={errors.email ? "border-destructive" : ""}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-sm text-destructive mt-1.5" role="alert">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="wantsAccount"
          checked={wantsAccount}
          onCheckedChange={(checked) =>
            setValue("wantsAccount", checked === true)
          }
        />
        <Label
          htmlFor="wantsAccount"
          className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
        >
          Create an account for faster checkout next time
        </Label>
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary-light text-white text-heading font-semibold py-5 rounded-sm"
      >
        Continue to Shipping
      </Button>
    </form>
  );
}
