"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Leaf, Heart, FlaskConical, Globe, Users, Award } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
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

const values = [
  {
    icon: Leaf,
    title: "Small Batch",
    description:
      "Every blend is crafted in small batches to ensure maximum freshness and flavor in every jar.",
  },
  {
    icon: Globe,
    title: "Ethically Sourced",
    description:
      "We partner directly with farmers worldwide, ensuring fair trade practices and sustainable agriculture.",
  },
  {
    icon: FlaskConical,
    title: "No Fillers or Preservatives",
    description:
      "Pure spices, nothing else. No MSG, no artificial colors, no anti-caking agents — ever.",
  },
  {
    icon: Heart,
    title: "Crafted with Love",
    description:
      "Each recipe is developed and tested by our team of culinary artisans over months of refinement.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description:
      "Our blends are inspired by our community of home cooks who share their feedback and recipes.",
  },
  {
    icon: Award,
    title: "Award Winning",
    description:
      "Recognized by top culinary publications for flavor innovation and artisan quality.",
  },
];

const stats = [
  { value: "50K+", label: "Happy Customers" },
  { value: "6", label: "Artisan Blends" },
  { value: "12+", label: "Countries Sourced" },
  { value: "0", label: "Artificial Ingredients" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/5480055/pexels-photo-5480055.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Hands grinding herbs in mortar by Yan Krukau on Pexels"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        </div>
        <div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-xl"
          >
            <h1 className="text-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Our Story
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed">
              We believe every meal deserves extraordinary flavor. That&apos;s
              why we hand-craft artisan spice blends using the world&apos;s
              finest ingredients.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 md:py-28 bg-background">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div variants={itemVariants}>
              <p className="text-heading text-sm uppercase tracking-[0.2em] text-accent mb-4">
                Our Mission
              </p>
              <h2 className="text-display text-3xl md:text-4xl lg:text-[44px] text-foreground leading-tight">
                Hand-Crafted Excellence, From Our Kitchen to Yours
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                Spice & Soul was born in a home kitchen, from a simple belief:
                cooking should be joyful, and great flavor shouldn&apos;t
                require a pantry full of spices. We set out to create perfectly
                balanced blends that make every dish extraordinary — whether
                you&apos;re a seasoned chef or just starting your culinary
                journey.
              </p>
              <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
                Today, we source directly from farms across 12 countries,
                ensuring fair wages and sustainable practices while bringing you
                the freshest, most vibrant spices available anywhere.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-sm">
                <img
                  src="https://images.pexels.com/photos/7299685/pexels-photo-7299685.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Farmer harvesting peppercorns by Anna Tarazevich on Pexels"
                  className="w-full h-full object-cover"
                />
              </div>
              <div
                className="absolute -bottom-4 -right-4 w-24 h-24 rounded-sm opacity-20"
                style={{ backgroundColor: "#AF6E4D" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-primary">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="text-center"
              >
                <p className="text-display text-4xl md:text-5xl text-white">
                  {stat.value}
                </p>
                <p className="mt-2 text-white/70 text-sm uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 md:py-28 bg-secondary">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-heading text-sm uppercase tracking-[0.2em] text-accent mb-4">
              What We Stand For
            </p>
            <h2 className="text-display text-3xl md:text-4xl text-foreground">
              Our Values
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {values.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={itemVariants}
                className="bg-card p-8 border border-border rounded-sm hover:shadow-soft-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-heading text-xl text-foreground mb-3">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-display text-3xl md:text-4xl text-foreground mb-6">
              Ready to Transform Your Cooking?
            </h2>
            <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10">
              Explore our collection and discover why thousands of home cooks
              trust Spice & Soul.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary-light text-white text-heading font-semibold px-10 py-6 rounded-sm"
            >
              <Link href="/shop">Shop the Collection</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
