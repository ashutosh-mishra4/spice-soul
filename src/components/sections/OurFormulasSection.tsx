"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const tabs = [
	{
		id: "hand-crafted",
		label: "Hand-Crafted",
		title: "Hand-Crafted in Small Batches",
		content:
			"Each blend is carefully crafted by our master spice artisans, ensuring perfect flavor balance and aromatic intensity in every jar.",
	},
	{
		id: "ethically-sourced",
		label: "Ethically Sourced",
		title: "Ethically Sourced",
		content:
			"We partner directly with farmers across the globe, ensuring fair trade practices and the freshest, most vibrant spices possible.",
	},
	{
		id: "made-without",
		label: "Made Without",
		title: "Our Promise",
		content: null,
		list: [
			"No Fillers",
			"No MSG",
			"No Artificial Colors",
			"No Preservatives",
			"Non-Irradiated",
			"Gluten Free",
		],
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

export function OurFormulasSection() {
	const [activeTab, setActiveTab] = useState(tabs[0].id);
	const activeTabData = tabs.find((tab) => tab.id === activeTab);

	return (
		<section
			className="w-full"
			style={{ backgroundColor: "rgb(231, 229, 224)" }}
		>
			<motion.div
				variants={containerVariants}
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, margin: "-100px" }}
				className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-16 md:py-20"
			>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
					{/* Left Side - Content */}
					<div>
						{/* Section Title */}
						<motion.h2
							variants={itemVariants}
							className="text-display text-3xl md:text-4xl lg:text-5xl text-foreground mb-10"
						>
							Our Blends
						</motion.h2>

						{/* Tabs */}
						<motion.div
							variants={itemVariants}
							className="flex flex-wrap gap-2 mb-8"
						>
							{tabs.map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`cursor-pointer! px-4 py-2 text-sm font-medium rounded-sm transition-all duration-300 ${activeTab === tab.id
											? "bg-foreground text-white"
											: "bg-transparent text-foreground hover:bg-foreground/10"
										}`}
								>
									{tab.label}
								</button>
							))}
						</motion.div>

						{/* Tab Content */}
						<AnimatePresence mode="wait">
							<motion.div
								key={activeTab}
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}
								transition={{ duration: 0.3 }}
								className="min-h-[200px]"
							>
								<h3 className="text-display text-2xl md:text-3xl text-foreground mb-4">
									{activeTabData?.title}
								</h3>

								{activeTabData?.content && (
									<p className="text-foreground/80 text-base md:text-lg leading-relaxed max-w-lg">
										{activeTabData.content}
									</p>
								)}

								{activeTabData?.list && (
									<ul className="grid grid-cols-2 gap-x-8 gap-y-3 mt-4">
										{activeTabData.list.map(
											(item, index) => (
												<li
													key={index}
													className="text-foreground/80 text-base md:text-lg flex items-center gap-2"
												>
													<span className="w-1.5 h-1.5 rounded-full bg-foreground/60" />
													{item}
												</li>
											),
										)}
									</ul>
								)}
							</motion.div>
						</AnimatePresence>
					</div>

					{/* Right Side - Image */}
					<motion.div
						variants={itemVariants}
						className="relative flex items-center justify-center"
					>
						<div className="relative w-full max-w-md lg:max-w-lg aspect-square">
							<Image
								src="/images/our-blends.png"
								alt="Happy couple enjoying a healthy lifestyle together"
								fill
								className="object-cover ml-12"
								sizes="(max-width: 1024px) 100vw, 50vw"
								priority
							/>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}
