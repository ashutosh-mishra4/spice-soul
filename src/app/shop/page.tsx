"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Star } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/products";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
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

export default function ShopPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Banner */}
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/2039570/pexels-photo-2039570.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Artisan spice jars collection by Ajit Pendse on Pexels"
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
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-3">
              Shop All Blends
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-lg">
              Discover our collection of artisan spice blends, hand-crafted in
              small batches.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-muted-foreground mb-10 font-heading text-sm uppercase tracking-[0.15em]"
          >
            {products.length} Products
          </motion.p>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {products.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ShopProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function ShopProductCard({
  product,
}: {
  product: (typeof products)[number];
}) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative overflow-hidden bg-card border border-border rounded-sm shadow-soft-sm hover:shadow-soft-lg transition-shadow duration-300">
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src={product.gridImage}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Badge */}
          <div className="absolute top-4 left-4">
            <Badge
              className="text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-none"
              style={{ backgroundColor: product.accentColor, color: "#fff" }}
            >
              {product.badge}
            </Badge>
          </div>

          {/* Quick Add Overlay */}
          <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-foreground/90">
            <span className="flex items-center justify-center gap-2 py-3 text-white text-sm font-semibold">
              <ShoppingCart className="w-4 h-4" />
              Quick View — ${product.price}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <h3 className="font-heading text-lg text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="font-heading text-lg text-foreground">
              ${product.price}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount})
              </span>
            </div>
          </div>
        </div>

        {/* Accent Bar */}
        <div
          className="h-1 w-full"
          style={{ backgroundColor: product.accentColor }}
        />
      </div>
    </Link>
  );
}
