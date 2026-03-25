"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronRight,
  Truck,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/lib/store/cart-store";
import { products } from "@/lib/products";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.3 },
  },
};

export default function CartPage() {
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);

  const cartProducts = items
    .map((item) => {
      const product = products.find((p) => p.slug === item.productId || p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as { product: (typeof products)[number]; quantity: number }[];

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const freeShippingThreshold = 35;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const totalItemCount = cartProducts.reduce((s, i) => s + i.quantity, 0);

  return (
    <main className="min-h-screen">
      <Header variant="solid" />

      <div className="pt-32 pb-4 bg-secondary">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">Cart</span>
          </nav>
        </div>
      </div>

      <section className="py-12 md:py-16 bg-secondary min-h-[60vh]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-3xl md:text-4xl text-foreground mb-10"
          >
            Your Cart
          </motion.h1>

          {cartProducts.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                {/* Free Shipping Progress */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`border rounded-sm p-4 mb-8 flex items-center gap-3 ${
                    remainingForFreeShipping === 0
                      ? "bg-primary/10 border-primary/20"
                      : "bg-primary/5 border-primary/20"
                  }`}
                >
                  <Truck className="w-5 h-5 text-primary shrink-0" />
                  {remainingForFreeShipping > 0 ? (
                    <p className="text-sm text-foreground">
                      You&apos;re{" "}
                      <strong className="text-primary">
                        ${remainingForFreeShipping.toFixed(2)}
                      </strong>{" "}
                      away from free shipping!
                    </p>
                  ) : (
                    <p className="text-sm text-primary font-semibold">
                      You qualify for free shipping! 🎉
                    </p>
                  )}
                </motion.div>

                {/* Header Row */}
                <div className="hidden md:grid md:grid-cols-[2fr_1fr_1fr_auto] gap-6 pb-4 border-b border-border text-xs font-heading uppercase tracking-wider text-muted-foreground">
                  <span>Product</span>
                  <span className="text-center">Quantity</span>
                  <span className="text-right">Total</span>
                  <span className="w-10" />
                </div>

                <AnimatePresence mode="popLayout">
                  {cartProducts.map((item) => (
                    <motion.div
                      key={item.product.id}
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      layout
                      className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-6 py-6 border-b border-border items-center"
                    >
                      <div className="flex items-center gap-4">
                        <Link
                          href={`/products/${item.product.slug}`}
                          className="relative w-20 h-20 rounded-sm overflow-hidden border border-border shrink-0"
                        >
                          <Image
                            src={item.product.gridImage}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        </Link>
                        <div>
                          <Link
                            href={`/products/${item.product.slug}`}
                            className="font-heading text-base text-foreground hover:text-primary transition-colors"
                          >
                            {item.product.name}
                          </Link>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            ${item.product.price} each
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-border rounded-sm">
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity - 1
                              )
                            }
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-10 text-center text-sm font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.quantity + 1
                              )
                            }
                            className="p-2 hover:bg-muted transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-heading text-base text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-32 bg-card border border-border rounded-sm p-8">
                  <h2 className="font-heading text-xl text-foreground mb-6">
                    Order Summary
                  </h2>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Subtotal ({totalItemCount} items)
                      </span>
                      <span className="text-foreground font-medium">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="text-foreground font-medium">
                        {remainingForFreeShipping === 0
                          ? "Free"
                          : "Calculated at checkout"}
                      </span>
                    </div>
                  </div>

                  <Separator className="my-6" />

                  <div className="flex justify-between items-baseline mb-8">
                    <span className="font-heading text-lg text-foreground">
                      Subtotal
                    </span>
                    <span className="font-display text-2xl text-foreground">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>

                  <Button
                    asChild
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold py-6 rounded-sm"
                  >
                    <Link href="/checkout">
                      Proceed to Checkout
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    Shipping calculated at checkout
                  </p>

                  <Separator className="my-6" />

                  <Link
                    href="/shop"
                    className="flex items-center justify-center gap-2 text-sm text-primary hover:text-primary-light transition-colors font-medium"
                  >
                    Continue Shopping
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function EmptyCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center py-20"
    >
      <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
        <ShoppingBag className="w-10 h-10 text-muted-foreground" />
      </div>
      <h2 className="font-display text-2xl text-foreground mb-3">
        Your cart is empty
      </h2>
      <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
        Looks like you haven&apos;t added any artisan blends yet. Explore our
        collection and find your perfect flavor.
      </p>
      <Button
        asChild
        size="lg"
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold px-10 py-6 rounded-sm"
      >
        <Link href="/shop">
          Continue Shopping
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
    </motion.div>
  );
}
