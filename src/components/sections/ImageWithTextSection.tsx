"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
	hidden: { opacity: 0, scale: 1.05 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: {
			duration: 0.8,
			ease: [0.25, 0.46, 0.45, 0.94] as const,
		},
	},
};

export function ImageWithTextSection() {
	return (
		<section className="relative bg-secondary border-b border-t border-foreground">
			<div className="grid grid-cols-1 lg:grid-cols-2">
				{/* Image Side */}
				<motion.div
					variants={imageVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					className="relative aspect-square my-12 lg:aspect-auto lg:min-h-[600px] overflow-hidden"
				>
					<Image
						src="/images/lifestyle-cooking.png"
						alt="Happy couple enjoying a healthy lifestyle together"
						fill
						className="object-cover ml-12"
						sizes="(max-width: 1024px) 100vw, 50vw"
						priority
					/>
				</motion.div>

				{/* Text Side */}
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16 xl:px-24"
				>
				{/* Tagline */}
					<motion.h2
						variants={itemVariants}
						className="text-display text-3xl sm:text-4xl lg:text-5xl xl:text-[54px] text-foreground leading-tight"
					>
						<p className="font-bold">Cook Bold.</p>{" "}
						<p className="font-bold">Taste Authentic.</p>{" "}
					<p>
							Live <strong className="font-bold" style={{ color: "rgb(64, 109, 89)" }}>Flavorful.</strong>
						</p>
					</motion.h2>

					{/* Description */}
					<motion.p
						variants={itemVariants}
						className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-lg"
					>
						Small-batch, hand-crafted spice blends sourced from
						the world&apos;s finest regions.
					</motion.p>

					{/* CTA Button */}
					<motion.div variants={itemVariants} className="mt-10">
						<Button
							asChild
							variant="default"
							size="lg"
							className="bg-primary hover:bg-primary-light text-white text-heading font-semibold px-8 py-6 rounded-lg transition-all duration-300 hover:-translate-y-0.5"
						>
							<Link
								href="/collections/shop-all"
								className="text-white"
							>
								Shop now
							</Link>
						</Button>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
