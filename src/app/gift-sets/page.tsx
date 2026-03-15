"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Gift, Check, Star, Package } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { giftSets, products } from "@/lib/products";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

const features = [
  "Premium gift packaging",
  "Personalized gift message included",
  "Free shipping on all gift sets",
  "Satisfaction guaranteed",
];

export default function GiftSetsPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/23524544/pexels-photo-23524544.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Colorful spice bowls at market by Noemí Jiménez on Pexels"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        </div>
        <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <Gift className="w-6 h-6 text-white" />
              <p className="text-heading text-sm uppercase tracking-[0.2em] text-white/80">
                Curated Gift Collections
              </p>
            </div>
            <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-white mb-3">
              Gift Sets
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-lg">
              The perfect gift for the food lover in your life. Beautifully
              packaged and ready to delight.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Gift Features Bar */}
      <section className="bg-primary py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
            {features.map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-2 text-white/90 text-sm"
              >
                <Check className="w-4 h-4 text-white" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gift Sets Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {giftSets.map((set) => (
              <motion.div key={set.id} variants={itemVariants}>
                <GiftSetCard set={set} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Gift Spices */}
      <section className="py-16 md:py-20 bg-secondary border-t border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Package className="w-10 h-10 text-accent mx-auto mb-4" />
            <h2 className="text-display text-3xl md:text-4xl text-foreground mb-6">
              Why Gift Artisan Spices?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
              Spice blends make a thoughtful, unique gift that gets used and
              loved. Every jar is a passport to incredible flavors — perfect for
              birthdays, holidays, housewarmings, or just because.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-accent hover:bg-accent/90 text-white text-heading font-semibold px-10 py-6 rounded-sm"
            >
              <Link href="/subscribe">
                Or Subscribe & Save Instead
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function GiftSetCard({ set }: { set: (typeof giftSets)[number] }) {
  const includedProducts = set.productIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);
  const savings = set.originalPrice - set.price;

  return (
    <div className="bg-card border border-border rounded-sm overflow-hidden hover:shadow-soft-lg transition-shadow duration-300 flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={set.image}
          alt={set.name}
          className="w-full h-full object-cover"
        />
        {set.badge && (
          <div className="absolute top-4 left-4">
            <Badge className="bg-accent text-white text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-none">
              {set.badge}
            </Badge>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <Badge className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-none">
            Save ${savings}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-heading text-xl text-foreground">{set.name}</h3>
        <p className="mt-2 text-muted-foreground text-sm leading-relaxed">
          {set.description}
        </p>

        <Separator className="my-4" />

        {/* Included Blends */}
        <div className="mb-4">
          <p className="text-xs text-heading uppercase tracking-wider text-muted-foreground mb-2">
            Includes
          </p>
          <ul className="space-y-1.5">
            {includedProducts.map(
              (product) =>
                product && (
                  <li
                    key={product.id}
                    className="flex items-center gap-2 text-sm text-foreground"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: product.accentColor }}
                    />
                    {product.name}
                  </li>
                )
            )}
          </ul>
        </div>

        {/* Price & CTA */}
        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-display text-2xl text-foreground">
              ${set.price}
            </span>
            <span className="text-muted-foreground line-through text-sm">
              ${set.originalPrice}
            </span>
          </div>
          <Button className="w-full bg-primary hover:bg-primary-light text-white text-heading font-semibold py-5 rounded-sm">
            <Gift className="w-4 h-4 mr-2" />
            Add Gift Set to Cart
          </Button>
        </div>
      </div>
    </div>
  );
}
