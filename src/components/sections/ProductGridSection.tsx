"use client";

import { motion } from "framer-motion";
import { ProductCard } from "@/components/ui/ProductCard";

const products = [
  {
    id: "mediterranean-magic",
    name: "Mediterranean Magic",
    image: "/images/products/mediterranean-grid.png",
    accentColor: "#D4A84B", // Saffron gold
    href: "/products/mediterranean-magic",
  },
  {
    id: "smoky-bbq-rub",
    name: "Smoky BBQ Rub",
    image: "/images/products/bbq-grid.png",
    accentColor: "#8B4513", // Smoky brown
    href: "/products/smoky-bbq-rub",
  },
  {
    id: "asian-fusion",
    name: "Asian Fusion",
    image: "/images/products/asian-grid.png",
    accentColor: "#C41E3A", // Deep chili red
    href: "/products/asian-fusion",
  },
  {
    id: "tuscan-herb",
    name: "Tuscan Herb Blend",
    image: "/images/products/tuscan-grid.png",
    accentColor: "#6B8E23", // Olive green
    href: "/products/tuscan-herb",
  },
  {
    id: "everything-bagel",
    name: "Everything Bagel",
    image: "/images/products/everything-bagel-grid.png",
    accentColor: "#C4A35A", // Sesame beige
    href: "/products/everything-bagel",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const,
    },
  },
};

export function ProductGridSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-heading text-sm md:text-base uppercase tracking-[0.2em] text-muted-foreground">
            Discover Our Artisan Spice Blends
          </h2>
        </motion.div>

        {/* Product Grid - Horizontal scroll on mobile, grid on desktop */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="relative"
        >
          {/* Desktop Grid */}
          <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          {/* Mobile Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hidden pb-4 -mx-4 px-4">
            <div className="flex gap-4" style={{ width: "max-content" }}>
              {products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="w-[280px] flex-shrink-0"
                >
                  <ProductCard {...product} />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
