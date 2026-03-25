"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Check,
  Package,
  CalendarClock,
  Sparkles,
  Truck,
  ArrowRight,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { subscribeFAQs } from "@/lib/products";

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

const steps = [
  {
    icon: Package,
    step: "01",
    title: "Choose Your Blends",
    description:
      "Pick your favorite artisan spice blends from our curated collection.",
  },
  {
    icon: CalendarClock,
    step: "02",
    title: "Set Your Schedule",
    description:
      "Select a delivery frequency that fits your cooking habits — every 2 weeks, monthly, or every 2 months.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Save & Enjoy",
    description:
      "Save up to 15% on every order with free shipping. Pause or cancel anytime.",
  },
];

const plans = [
  {
    id: "bi-weekly",
    name: "Every 2 Weeks",
    discount: 15,
    badge: "Best Value",
    description: "For the passionate home cook who seasons daily.",
    popular: true,
  },
  {
    id: "monthly",
    name: "Monthly",
    discount: 10,
    badge: "Most Popular",
    description: "The perfect balance for regular weeknight cooking.",
    popular: false,
  },
  {
    id: "bi-monthly",
    name: "Every 2 Months",
    discount: 5,
    description: "Great for casual cooks and trying new flavors.",
    popular: false,
  },
];

const benefits = [
  "Save up to 15% on every order",
  "Free shipping on all subscriptions",
  "Pause, skip, or cancel anytime",
  "Exclusive access to limited-edition blends",
  "Free sample with every delivery",
  "Priority customer support",
];

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState("monthly");

  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero */}
      <section className="relative h-[55vh] min-h-[450px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero-subscribe.png"
            alt="Subscribe and save hero background"
            fill
            className="object-cover"
            sizes="100vw"
            priority
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
            <Badge className="bg-accent text-white text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-none mb-4">
              Save up to 15%
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              Subscribe & Save
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/85 leading-relaxed">
              Never run out of your favorite blends. Get artisan spices delivered
              on your schedule with exclusive savings.
            </p>
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="bg-white text-foreground hover:bg-white/90 font-heading font-semibold px-8 py-6 rounded-sm"
              >
                <a href="#plans">
                  View Plans
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-heading text-sm uppercase tracking-[0.2em] text-accent mb-4">
              Simple & Flexible
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              How It Works
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            {steps.map(({ icon: Icon, step, title, description }) => (
              <motion.div
                key={step}
                variants={itemVariants}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <p className="font-heading text-sm text-accent mb-2">{step}</p>
                <h3 className="font-heading text-xl text-foreground mb-3">
                  {title}
                </h3>
                <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">
                  {description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="plans" className="py-20 md:py-28 bg-secondary scroll-mt-20">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="font-heading text-sm uppercase tracking-[0.2em] text-accent mb-4">
              Choose Your Frequency
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Subscription Plans
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;
              return (
                <motion.div key={plan.id} variants={itemVariants}>
                  <button
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`w-full text-left p-8 rounded-sm border-2 transition-all duration-300 ${
                      isSelected
                        ? "border-primary bg-card shadow-soft-lg"
                        : "border-border bg-card hover:border-primary/30 hover:shadow-soft-sm"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          isSelected
                            ? "border-primary"
                            : "border-muted-foreground"
                        }`}
                      >
                        {isSelected && (
                          <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </span>
                      {plan.badge && (
                        <Badge className="bg-accent text-white text-xs font-semibold rounded-none px-2 py-0.5">
                          {plan.badge}
                        </Badge>
                      )}
                    </div>
                    <h3 className="font-heading text-xl text-foreground">
                      {plan.name}
                    </h3>
                    <p className="font-display text-3xl text-primary mt-2">
                      Save {plan.discount}%
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground">
                      {plan.description}
                    </p>
                  </button>
                </motion.div>
              );
            })}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-heading font-semibold px-12 py-6 rounded-sm"
            >
              <Link href="/shop">
                Choose Your Blends
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-sm text-muted-foreground mt-4">
              <Truck className="w-4 h-4 inline mr-1" />
              Free Shipping on all subscriptions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-primary">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl text-white mb-8">
                Subscriber Benefits
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-3 text-white/90"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5 text-white" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square max-w-md mx-auto lg:ml-auto">
              <Image
                src="/images/our-blends.png"
                alt="Our artisan spice blends"
                fill
                className="object-cover rounded-sm"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 md:py-28 bg-background">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <p className="font-heading text-sm uppercase tracking-[0.2em] text-accent mb-4">
              Got Questions?
            </p>
            <h2 className="font-display text-3xl md:text-4xl text-foreground">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <Accordion type="single" collapsible className="w-full">
            {subscribeFAQs.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger className="font-heading text-left text-base">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </main>
  );
}
