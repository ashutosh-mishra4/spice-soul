"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const shopLinks = [
	{ label: "Mediterranean Magic", href: "/products/mediterranean-magic" },
	{ label: "Smoky BBQ Rub", href: "/products/smoky-bbq-rub" },
	{ label: "Asian Fusion", href: "/products/asian-fusion" },
	{ label: "Tuscan Herb Blend", href: "/products/tuscan-herb" },
];

const aboutLinks = [
	{ label: "About Us", href: "/pages/about" },
	{ label: "Our Story", href: "/pages/story" },
	{ label: "Recipes", href: "/blogs/recipes" },
];

const supportLinks = [
	{ label: "Contact", href: "/contact" },
	{ label: "Shipping", href: "/policies/shipping" },
	{ label: "Returns", href: "/policies/returns" },
	{ label: "Privacy Policy", href: "/policies/privacy" },
];

export function Footer() {
	const [email, setEmail] = useState("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		// Handle newsletter signup
		console.log("Newsletter signup:", email);
		setEmail("");
	};

	return (
		<footer className="bg-primary text-white">
			{/* Top Section */}
			<div className="px-6 md:px-12 lg:px-[50px] py-14 md:py-16">
				<div className="max-w-7xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
						{/* Left - Newsletter */}
						<div>
							<h3 className="text-display text-2xl md:text-3xl mb-4">
								Join the Flavor Club
							</h3>
							<p className="text-white/70 text-base mb-6 max-w-md">
								Sign up for exclusive recipes, cooking tips, and early access
								to new spice blends.
							</p>
							<form
								onSubmit={handleSubmit}
								className="flex gap-3 max-w-md"
							>
								<input
									type="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Email address"
									className="flex-1 px-4 py-3 bg-transparent border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:border-white transition-colors"
									required
								/>
								<motion.button
									type="submit"
									className="px-6 py-3 bg-white text-[#0d0d0d] font-semibold text-sm uppercase tracking-wider hover:bg-white/90 transition-colors"
									whileTap={{ scale: 0.98 }}
								>
									Submit
								</motion.button>
							</form>
						</div>

						{/* Right - Menu Links */}
						<div className="grid grid-cols-2 md:grid-cols-3 gap-8">
							{/* Shop */}
							<div>
								<h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
									Shop
								</h4>
								<ul className="space-y-3">
									{shopLinks.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												className="text-white/70 hover:text-white transition-colors text-sm"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* About */}
							<div>
								<h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
									About Us
								</h4>
								<ul className="space-y-3">
									{aboutLinks.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												className="text-white/70 hover:text-white transition-colors text-sm"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>

							{/* Support */}
							<div>
								<h4 className="text-sm font-semibold uppercase tracking-wider mb-4 text-white/90">
									Support
								</h4>
								<ul className="space-y-3">
									{supportLinks.map((link) => (
										<li key={link.href}>
											<Link
												href={link.href}
												className="text-white/70 hover:text-white transition-colors text-sm"
											>
												{link.label}
											</Link>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Bottom Section */}
			<div className="border-t border-white/10 px-6 md:px-12 lg:px-[50px] py-6">
				<div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
					<p className="text-white/50 text-sm">
						© {new Date().getFullYear()} Spice & Soul. All rights reserved.
					</p>
					<div className="flex items-center gap-6">
						<Link
							href="https://instagram.com"
							className="text-white/50 hover:text-white transition-colors text-sm"
							target="_blank"
							rel="noopener noreferrer"
						>
							Instagram
						</Link>
						<Link
							href="https://tiktok.com"
							className="text-white/50 hover:text-white transition-colors text-sm"
							target="_blank"
							rel="noopener noreferrer"
						>
							TikTok
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
}
