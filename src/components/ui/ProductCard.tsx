"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  accentColor: string;
  href: string;
}

export function ProductCard({
  id,
  name,
  image,
  accentColor,
  href,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={href} className="block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Card Container */}
        <div className="relative overflow-hidden shadow-soft-md">
          <motion.div
            animate={{ scale: isHovered ? 1.02 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative aspect-[4/5] overflow-hidden"
          >
            {/* Background Image with Zoom Effect */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
            />

            {/* Gradient Overlay - base state */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Full Opaque Color Ripple Overlay */}
            <AnimatePresence>
              {isHovered && (
                <>
                  {/* Primary ripple */}
                  <motion.div
                    initial={{ clipPath: "circle(0% at 50% 50%)" }}
                    animate={{ clipPath: "circle(150% at 50% 50%)" }}
                    exit={{ clipPath: "circle(0% at 50% 50%)" }}
                    transition={{
                      duration: 0.8,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    className="absolute inset-0 pointer-events-none"
                    style={{ backgroundColor: accentColor }}
                  />
                  {/* Secondary ripple for depth */}
                  <motion.div
                    initial={{ clipPath: "circle(0% at 50% 50%)" }}
                    animate={{ clipPath: "circle(150% at 50% 50%)" }}
                    exit={{ clipPath: "circle(0% at 50% 50%)" }}
                    transition={{
                      duration: 0.7,
                      ease: [0.4, 0, 0.2, 1],
                      delay: 0.1,
                    }}
                    className="absolute inset-0 pointer-events-none opacity-80"
                    style={{ backgroundColor: accentColor }}
                  />
                </>
              )}
            </AnimatePresence>

            {/* Content Container */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 z-10">
              {/* Product Name - moves up on hover */}
              <motion.h3
                className="text-display text-2xl md:text-3xl text-white text-center leading-tight drop-shadow-lg"
                animate={{ y: isHovered ? -16 : 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {name}
              </motion.h3>

              {/* Shop Now Button - slides up from below */}
              <div className="absolute bottom-20 left-0 right-0 flex justify-center">
                <motion.div
                  initial={{ y: 48, opacity: 0 }}
                  animate={{
                    y: isHovered ? 0 : 48,
                    opacity: isHovered ? 1 : 0,
                  }}
                  transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                >
                  <span
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold uppercase tracking-wider shadow-lg transition-transform duration-200 hover:scale-105"
                    style={{
                      backgroundColor: "white",
                      color: accentColor,
                    }}
                  >
                    Shop Now
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </motion.svg>
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Shine Effect on Hover */}
            <motion.div
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
              }}
              initial={{ x: "-100%", opacity: 0 }}
              animate={{
                x: isHovered ? "100%" : "-100%",
                opacity: isHovered ? 0.3 : 0,
              }}
              transition={{ duration: 1, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Accent Bar Below Card */}
        <div
          className="h-2 w-full mt-3"
          style={{ backgroundColor: accentColor }}
        />
      </motion.div>
    </Link>
  );
}
