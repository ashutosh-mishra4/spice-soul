"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeroSlide {
	id: string;
	title: string;
	highlightedText: string;
	subtitle: string;
	ctaText: string;
	ctaLink: string;
	backgroundImage: string;
	backgroundPosition?: string;
}

const heroSlides: HeroSlide[] = [
	{
		id: "tuscan-herb",
		title: "New:",
		highlightedText: "Tuscan Herb Blend",
		subtitle:
			"Hand-crafted artisan spice blend for authentic Italian flavors.",
		ctaText: "SHOP THE COLLECTION",
		ctaLink: "/products/tuscan-herb",
		backgroundImage: "/images/hero-main.png",
		backgroundPosition: "center right",
	},
];

const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
			delayChildren: 0.3,
		},
	},
};

const itemVariants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: [0.25, 0.46, 0.45, 0.94] as const,
		},
	},
};

const imageVariants = {
	hidden: { scale: 1.1, opacity: 0 },
	visible: {
		scale: 1,
		opacity: 1,
		transition: {
			duration: 1.2,
			ease: [0.25, 0.46, 0.45, 0.94] as const,
		},
	},
};

export function HeroSection() {
	const slide = heroSlides[0];

	return (
		<section className="relative h-screen min-h-[600px] max-h-[900px] overflow-hidden">
			{/* Background Image with Zoom Animation */}
			<motion.div
				variants={imageVariants}
				initial="hidden"
				animate="visible"
				className="absolute inset-0"
			>
				<div
					className="absolute inset-0 bg-cover bg-no-repeat"
					style={{
						backgroundImage: `url(${slide.backgroundImage})`,
						backgroundPosition:
							slide.backgroundPosition || "center",
					}}
				/>
				{/* Overlay for text readability - very light */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/25 via-black/10 to-transparent" />
			</motion.div>

			{/* Content */}
			<div className="relative h-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
				<motion.div
					variants={containerVariants}
					initial="hidden"
					animate="visible"
					className="flex flex-col justify-center h-full pt-32 pb-16 max-w-xl"
				>
					{/* Title */}
					<motion.h1
						variants={itemVariants}
						className="text-display text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] text-white leading-tight"
					>
						{slide.title}{" "}
						<span className="text-white">
							{slide.highlightedText}
						</span>
					</motion.h1>

					{/* Subtitle */}
					<motion.p
						variants={itemVariants}
						className="mt-4 sm:mt-6 text-lg sm:text-xl text-white/90 max-w-md"
					>
						{slide.subtitle}
					</motion.p>

					{/* CTA Button */}
					<motion.div
						variants={itemVariants}
						className="mt-8 sm:mt-10"
					>
					<Button
							asChild
							variant="outline"
							size="lg"
							className="border-2 border-white bg-transparent hover:bg-white/10 !text-white text-heading font-semibold uppercase tracking-wider px-8 py-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
						>
							<Link href={slide.ctaLink}>{slide.ctaText}</Link>
						</Button>
					</motion.div>

					{/* Scroll Indicator */}
					<motion.div
						variants={itemVariants}
						className="absolute bottom-8 left-1/2 -translate-x-1/2"
					>
						<motion.div
							animate={{ y: [0, 8, 0] }}
							transition={{
								duration: 1.5,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center pt-2"
						>
							<div className="w-1.5 h-3 bg-white/70 rounded-full" />
						</motion.div>
					</motion.div>
				</motion.div>
			</div>

			{/* Decorative Elements */}
			<motion.div
				initial={{ opacity: 0, x: 100 }}
				animate={{ opacity: 0.1, x: 0 }}
				transition={{ duration: 1, delay: 0.8 }}
				className="absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block"
			>
				<svg
					width="300"
					height="300"
					viewBox="0 0 300 300"
					fill="none"
					className="text-white"
				>
					<circle
						cx="150"
						cy="150"
						r="140"
						stroke="currentColor"
						strokeWidth="2"
						strokeDasharray="8 8"
					/>
					<circle
						cx="150"
						cy="150"
						r="100"
						stroke="currentColor"
						strokeWidth="1"
					/>
				</svg>
			</motion.div>
		</section>
	);
}
