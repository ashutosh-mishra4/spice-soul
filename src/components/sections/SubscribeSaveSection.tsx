"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";

const benefits = [
	"Enjoy a 10% discount",
	"Never run out",
	"Pause or cancel anytime",
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.2,
		},
	},
};

const itemVariants = {
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

export function SubscribeSaveSection() {
	return (
		<section className="relative w-full min-h-[600px] md:min-h-[700px] lg:min-h-[789px] overflow-hidden border-t border-b border-foreground">
			{/* Background Image */}
			<div className="absolute inset-0">
				<Image
					src="/images/hero-subscribe.png"
					alt="Fresh dragonfruit background"
					fill
					className="object-cover"
					sizes="100vw"
					priority
				/>
			</div>

			{/* Gradient Overlay for text readability */}
			<div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent" />

			{/* Content */}
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				className="relative z-10 h-full min-h-[600px] md:min-h-[700px] lg:min-h-[789px] flex items-center"
			>
				<div className="w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20">
					<div>
					{/* Heading */}
						<motion.h2
							variants={itemVariants}
							className="text-display text-center text-4xl md:text-5xl lg:text-6xl text-white mb-6 leading-tight"
						>
							Artisan Spice Blends That Transform
							Every Dish You Create
						</motion.h2>

						{/* CTA Button */}
						<motion.div
							variants={itemVariants}
							className="flex items-center justify-center"
						>
							<Link
								href="/pages/subscribe-save"
								className="inline-flex items-center justify-center px-8 py-4 bg-transparent text-white font-semibold text-base rounded-sm  transition-all duration-300 border border-white hover:bg-white hover:text-foreground"
							>
								Get Started
							</Link>
						</motion.div>
					</div>
				</div>
			</motion.div>
		</section>
	);
}
