"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  CheckCircle2,
  Package,
  ArrowRight,
  UserPlus,
  Share2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckoutHeader } from "@/components/checkout/CheckoutHeader";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "SS-UNKNOWN";
  const total = searchParams.get("total") || "0.00";

  // Estimated delivery: 5-7 business days from now
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 7);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen bg-secondary">
      <CheckoutHeader />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-16 md:py-24">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2,
          }}
          className="flex justify-center mb-8"
        >
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 300 }}
            >
              <CheckCircle2 className="w-12 h-12 text-primary" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-display text-3xl md:text-4xl text-foreground mb-3">
            Thank you for your order!
          </h1>
          <p className="text-muted-foreground text-lg">
            Your order has been placed successfully.
          </p>
        </motion.div>

        {/* Order Details Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-10 bg-card border border-border rounded-sm p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Package className="w-5 h-5 text-primary" />
            <h2 className="text-heading text-lg text-foreground">
              Order Details
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Order Number</span>
              <span className="text-sm text-foreground font-mono font-semibold">
                {orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Order Total
              </span>
              <span className="text-sm text-foreground font-semibold">
                ${total}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">
                Estimated Delivery
              </span>
              <span className="text-sm text-foreground">{formattedDelivery}</span>
            </div>
          </div>

          <Separator className="my-6" />

          <p className="text-sm text-muted-foreground leading-relaxed">
            A confirmation email has been sent with your order details and
            tracking information. You can track your order status anytime from
            your account.
          </p>
        </motion.div>

        {/* Post-Purchase Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <button className="flex items-center gap-3 p-4 bg-card border border-border rounded-sm hover:border-primary/30 hover:shadow-soft-sm transition-all text-left">
            <UserPlus className="w-5 h-5 text-primary shrink-0" />
            <div>
              <p className="text-sm text-heading font-semibold text-foreground">
                Create an Account
              </p>
              <p className="text-xs text-muted-foreground">
                Track orders & faster checkout
              </p>
            </div>
          </button>
          <button className="flex items-center gap-3 p-4 bg-card border border-border rounded-sm hover:border-primary/30 hover:shadow-soft-sm transition-all text-left">
            <Share2 className="w-5 h-5 text-accent shrink-0" />
            <div>
              <p className="text-sm text-heading font-semibold text-foreground">
                Share with Friends
              </p>
              <p className="text-xs text-muted-foreground">
                Give $5, get $5 on referral
              </p>
            </div>
          </button>
        </motion.div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-10 text-center"
        >
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary-light text-white text-heading font-semibold px-10 py-6 rounded-sm"
          >
            <Link href="/shop">
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-secondary flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
