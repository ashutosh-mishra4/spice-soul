"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Truck,
  RefreshCw,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { toast } from "sonner";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/lib/store/cart-store";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  getProductBySlug,
  getRelatedProducts,
  type Product,
} from "@/lib/products";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  if (!product) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="pt-40 pb-20 text-center max-w-[1440px] mx-auto px-4">
          <h1 className="text-display text-4xl text-foreground mb-4">
            Product Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            The product you&apos;re looking for doesn&apos;t exist.
          </p>
          <Button asChild>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </div>
        <Footer />
      </main>
    );
  }

  const relatedProducts = getRelatedProducts(slug, 3);

  const handleAddToCart = () => {
    addItem(product.slug, quantity);
    setAdded(true);
    toast.success(`${product.name} added to cart`, {
      description: `Qty: ${quantity}`,
      action: { label: "View Cart", onClick: () => window.location.href = "/cart" },
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <main className="min-h-screen">
      <Header />

      {/* Breadcrumb */}
      <div className="pt-32 pb-4 bg-secondary">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/shop"
              className="hover:text-primary transition-colors"
            >
              Shop
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail */}
      <section className="py-12 md:py-16 bg-secondary">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Product Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="sticky top-32">
                <div className="relative aspect-square overflow-hidden rounded-sm border border-border">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  <div className="absolute top-4 left-4">
                    <Badge
                      className="text-xs font-semibold tracking-wider uppercase px-3 py-1.5 rounded-none"
                      style={{
                        backgroundColor: product.accentColor,
                        color: "#fff",
                      }}
                    >
                      {product.badge}
                    </Badge>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                visible: {
                  transition: { staggerChildren: 0.1, delayChildren: 0.3 },
                },
              }}
            >
              <motion.div variants={itemVariants}>
                <p className="text-sm text-muted-foreground uppercase tracking-[0.15em] text-heading mb-2">
                  {product.category}
                </p>
                <h1 className="text-display text-3xl md:text-4xl lg:text-5xl text-foreground">
                  {product.name}
                </h1>
              </motion.div>

              {/* Rating */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-3 mt-4"
              >
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5"
                      style={{
                        color: product.accentColor,
                        fill: product.accentColor,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm text-foreground font-medium">
                  {product.rating}
                </span>
                <span className="text-sm text-muted-foreground">
                  ({product.reviewCount} reviews)
                </span>
              </motion.div>

              {/* Price */}
              <motion.div variants={itemVariants} className="mt-6">
                <span className="text-display text-3xl text-foreground">
                  ${product.price}
                </span>
              </motion.div>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="mt-6 text-muted-foreground text-base leading-relaxed"
              >
                {product.description}
              </motion.p>

              <Separator className="my-8" />

              {/* Quantity & Add to Cart */}
              <motion.div variants={itemVariants} className="space-y-6">
                <div>
                  <label className="text-sm text-heading font-semibold text-foreground mb-3 block">
                    Qty
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center border border-border rounded-sm">
                      <button
                        onClick={() =>
                          setQuantity((q) => Math.max(1, q - 1))
                        }
                        className="p-3 hover:bg-muted transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center text-heading font-semibold">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-3 hover:bg-muted transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="w-full py-6 text-base font-semibold text-heading rounded-sm"
                  style={{
                    backgroundColor: added ? "#5C6B3A" : product.accentColor,
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {added ? "Added!" : `Add to Cart — $${product.price * quantity}`}
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                variants={itemVariants}
                className="mt-8 grid grid-cols-3 gap-4"
              >
                {[
                  { icon: Truck, label: "Free Shipping Over $35" },
                  { icon: RefreshCw, label: "Easy Returns" },
                  { icon: ShieldCheck, label: "Satisfaction Guaranteed" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center gap-2 py-3"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                    <span className="text-xs text-muted-foreground">
                      {label}
                    </span>
                  </div>
                ))}
              </motion.div>

              <Separator className="my-8" />

              {/* Tabs: Description / Ingredients / Reviews */}
              <motion.div variants={itemVariants}>
                <Tabs defaultValue="description">
                  <TabsList className="w-full justify-start bg-transparent border-b border-border rounded-none p-0 h-auto">
                    {["description", "ingredients", "reviews"].map((tab) => (
                      <TabsTrigger
                        key={tab}
                        value={tab}
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none text-heading capitalize px-6 py-3"
                      >
                        {tab}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="description" className="pt-6">
                    <p className="text-muted-foreground leading-relaxed">
                      {product.longDescription}
                    </p>
                  </TabsContent>
                  <TabsContent value="ingredients" className="pt-6">
                    <ul className="grid grid-cols-2 gap-3">
                      {product.ingredients.map((ingredient) => (
                        <li
                          key={ingredient}
                          className="flex items-center gap-2 text-muted-foreground"
                        >
                          <span
                            className="w-2 h-2 rounded-full"
                            style={{
                              backgroundColor: product.accentColor,
                            }}
                          />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="reviews" className="pt-6">
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        {product.reviewCount} happy customers have reviewed this
                        blend.
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-3">
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-5 h-5"
                              style={{
                                color: product.accentColor,
                                fill: product.accentColor,
                              }}
                            />
                          ))}
                        </div>
                        <span className="text-foreground font-semibold">
                          {product.rating} out of 5
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="py-16 md:py-20 bg-background border-t border-border">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-display text-3xl md:text-4xl text-foreground text-center mb-12">
            You May Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {relatedProducts.map((rp) => (
              <RelatedProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function RelatedProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border">
        <Image
          src={product.gridImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-display text-xl text-white">{product.name}</h3>
          <p className="text-white/80 text-sm mt-1">${product.price}</p>
        </div>
      </div>
      <div
        className="h-1 w-full mt-2"
        style={{ backgroundColor: product.accentColor }}
      />
    </Link>
  );
}
