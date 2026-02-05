"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";

interface SliderProduct {
	id: string;
	badge: string;
	title: string;
	subtitle: string;
	image: string;
	href: string;
	bgColor: string;
	price: number;
	rating: number;
	reviewCount: number;
}

const products: SliderProduct[] = [
	{
		id: "1",
		badge: "BLEND",
		title: "MEDITERRANEAN MAGIC",
		subtitle: "Greek & Italian Herbs",
		image: "/images/products/mediterranean-slider.png",
		href: "/products/mediterranean-magic",
		bgColor: "#D4A84B",
		price: 14,
		rating: 4.9,
		reviewCount: 312,
	},
	{
		id: "2",
		badge: "RUB",
		title: "SMOKY BBQ",
		subtitle: "Texas Style",
		image: "/images/products/bbq-slider.png",
		href: "/products/smoky-bbq-rub",
		bgColor: "#8B4513",
		price: 12,
		rating: 4.8,
		reviewCount: 256,
	},
	{
		id: "3",
		badge: "BLEND",
		title: "ASIAN FUSION",
		subtitle: "Five Spice Harmony",
		image: "/images/products/asian-slider.png",
		href: "/products/asian-fusion",
		bgColor: "#C41E3A",
		price: 14,
		rating: 4.9,
		reviewCount: 189,
	},
	{
		id: "4",
		badge: "BLEND",
		title: "TUSCAN HERB",
		subtitle: "Italian Countryside",
		image: "/images/products/tuscan-slider.png",
		href: "/products/tuscan-herb",
		bgColor: "#6B8E23",
		price: 14,
		rating: 4.8,
		reviewCount: 278,
	},
	{
		id: "5",
		badge: "SEASONING",
		title: "EVERYTHING BAGEL",
		subtitle: "The Classic",
		image: "/images/products/everything-bagel-slider.png",
		href: "/products/everything-bagel",
		bgColor: "#C4A35A",
		price: 10,
		rating: 4.9,
		reviewCount: 421,
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

export function ProductSliderSection() {
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const checkScroll = () => {
		if (scrollContainerRef.current) {
			const { scrollLeft, scrollWidth, clientWidth } =
				scrollContainerRef.current;
			setCanScrollLeft(scrollLeft > 10);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
		}
	};

	const scroll = (direction: "left" | "right") => {
		if (scrollContainerRef.current) {
			const cardWidth = 400;
			const scrollAmount = direction === "left" ? -cardWidth : cardWidth;
			scrollContainerRef.current.scrollBy({
				left: scrollAmount,
				behavior: "smooth",
			});
		}
	};

	return (
		<section className="relative bg-white py-16 md:py-20 border-t border-border">
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				className="max-w-[1600px] mx-auto"
			>
				{/* Section Title */}
				<motion.h2
					variants={itemVariants}
					className="text-display text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-12"
				>
					Shop The Collection
				</motion.h2>

				{/* Slider Container */}
				<div className="relative">
					{/* Left Arrow */}
					<AnimatePresence>
						{canScrollLeft && (
							<motion.button
								initial={{ opacity: 0, x: 20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 20 }}
								onClick={() => scroll("left")}
								className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-soft-md flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all duration-300"
								aria-label="Scroll left"
							>
								<ChevronLeft className="w-6 h-6 text-foreground" />
							</motion.button>
						)}
					</AnimatePresence>

					{/* Products Slider */}
					<motion.div
						ref={scrollContainerRef}
						onScroll={checkScroll}
						className="flex gap-6 overflow-x-auto scrollbar-hidden px-6 md:px-12 lg:px-16 pb-4 scroll-smooth snap-x snap-mandatory"
					>
						{products.map((product, index) => (
							<motion.div
								key={product.id}
								variants={itemVariants}
								custom={index}
								className="flex-shrink-0 snap-start"
							>
								<ProductSliderCard product={product} />
							</motion.div>
						))}
					</motion.div>

					{/* Right Arrow */}
					<AnimatePresence>
						{canScrollRight && (
							<motion.button
								initial={{ opacity: 0, x: -20 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: -20 }}
								onClick={() => scroll("right")}
								className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white border border-border shadow-soft-md flex items-center justify-center hover:bg-secondary hover:scale-110 transition-all duration-300"
								aria-label="Scroll right"
							>
								<ChevronRight className="w-6 h-6 text-foreground" />
							</motion.button>
						)}
					</AnimatePresence>
				</div>

				{/* Explore All Link */}
				<motion.div
					variants={itemVariants}
					className="text-center mt-12"
				>
					<Link
						href="/collections/shop-all"
						className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-semibold text-lg transition-colors group"
					>
						Explore all products
						<ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
					</Link>
				</motion.div>
			</motion.div>
		</section>
	);
}

function ProductSliderCard({ product }: { product: SliderProduct }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			onMouseEnter={() => setIsHovered(true)}
			className="w-[340px] md:w-[380px] lg:w-[400px] overflow-hidden group cursor-pointer rounded-none"
			onMouseLeave={() => setIsHovered(false)}
			transition={{ duration: 0.4, ease: "easeOut" }}
		>
			{/* Card Content */}
			<motion.div
				className="relative aspect-[3/4] flex flex-col overflow-hidden border border-border rounded-none"
				animate={{
					boxShadow: isHovered
						? "0 25px 50px -12px rgba(0, 0, 0, 0.35)"
						: "0 4px 16px rgba(0, 0, 0, 0.1)",
				}}
				transition={{ duration: 0.4 }}
			>
				{/* Full-bleed Background Image */}
				<motion.div
					className="absolute inset-0"
					animate={{ scale: isHovered ? 1.05 : 1 }}
					transition={{ duration: 0.6, ease: "easeOut" }}
				>
					<Image
						src={product.image}
						alt={product.title}
						fill
						className="object-cover"
						sizes="400px"
					/>
				</motion.div>

				{/* Dark Gradient Overlay for text readability */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 z-[1]" />

				{/* Shimmer Effect on Hover */}
				<motion.div
					className="absolute inset-0 pointer-events-none z-[2]"
					style={{
						background:
							"linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
					}}
					initial={{ x: "-100%" }}
					animate={{ x: isHovered ? "100%" : "-100%" }}
					transition={{ duration: 0.8, ease: "easeInOut" }}
				/>

				{/* Top Content - Badge */}
				<motion.div
					className="p-6 z-10"
					animate={{ y: isHovered ? 4 : 0 }}
					transition={{ duration: 0.4 }}
				>
					{/* Badge */}
					<motion.span
						className="inline-block px-3 py-1.5 bg-foreground/90 text-white text-xs font-semibold tracking-wider uppercase"
						animate={{ scale: isHovered ? 1.05 : 1 }}
						transition={{ duration: 0.3 }}
					>
						{product.badge}
					</motion.span>
				</motion.div>

				{/* Spacer to push content to bottom */}
				<div className="flex-1" />

				{/* Star Rating - positioned above button */}
				<div className="px-6 pb-16 z-10">
					<div className="border-t border-white/30 pt-3">
						<Link
							href={product.href}
							className="flex items-center gap-2"
						>
							<div className="flex items-center gap-0.5">
								{[...Array(5)].map((_, i) => (
									<Star
										key={i}
										className="w-4 h-4 text-white fill-white"
									/>
								))}
							</div>
							<span className="text-white text-sm font-medium">
								{product.rating}
							</span>
							<span className="text-white/70 text-sm">
								({product.reviewCount})
							</span>
						</Link>
					</div>
				</div>

				{/* Add to Cart Button - Always visible */}
				<div className="absolute bottom-0 left-0 right-0 z-20 bg-[#323230]">
					<Link href={product.href}>
						<motion.button
							className="w-full py-4 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-colors hover:bg-white/20"
							whileTap={{ scale: 0.98 }}
						>
							<ShoppingCart className="w-4 h-4" />
							Add to Cart - ${product.price}
						</motion.button>
					</Link>
				</div>
			</motion.div>
		</motion.div>
	);
}
