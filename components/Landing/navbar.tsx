"use client";

import { Button } from "@/components/ui/button";
import { Menu, SproutIcon, X } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 100);
		};
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const navLinks = [
		{ name: "Features", href: "#features" },
		{ name: "How It Works", href: "#how-it-works" },
		{ name: "About", href: "#about" },
		{ name: "Contact", href: "#contact" },
	];

	return (
		<nav
			className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
				isScrolled ? "opacity-0 pointer-events-none" : "opacity-100"
			}`}
		>
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-20">
					{/* Logo */}
					<div className="flex items-center space-x-3">
						<div className="relative w-10 h-10">
							{/* <Image
								src="/giki-logo.png"
								alt="Giki Zero Logo"
								fill
								className="object-contain"
							/> */}
							<SproutIcon className="w-10 h-10 text-green-400" />
						</div>
						<div className="flex flex-col">
							<span className="text-white font-bold text-lg sm:text-xl">
								Giki Zero
							</span>
							<span className="text-green-400 text-xs sm:text-sm font-medium">
								Carbon Intelligence
							</span>
						</div>
					</div>

					{/* Desktop Navigation */}
					<div className="hidden md:flex items-center space-x-8">
						{navLinks.map((link) => (
							<a
								key={link.name}
								href={link.href}
								className="text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium relative group"
							>
								{link.name}
								<div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-blue-400 group-hover:w-full transition-all duration-300" />
							</a>
						))}
					</div>

					{/* Desktop CTA */}
					<div className="hidden md:flex items-center space-x-4">
						<Link href="/dashboard">
							<Button
								variant="ghost"
								className="text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
							>
								Sign In
							</Button>
						</Link>
						<Link href="/dashboard">
							<button
								className="relative text-base font-medium text-white px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-blue-500/20 hover:from-green-500 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 group overflow-hidden
shadow-md hover:shadow-lg shadow-green-500/50 hover:shadow-green-500/75"
							>
								<span className="relative z-10">Get Started</span>
								<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
								<span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-green-400 to-transparent h-px" />
							</button>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden">
						<Button
							variant="ghost"
							size="sm"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							className="text-white hover:bg-white/10"
						>
							{isMobileMenuOpen ? (
								<X className="w-6 h-6" />
							) : (
								<Menu className="w-6 h-6" />
							)}
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMobileMenuOpen && (
					<div className="md:hidden absolute top-20 left-0 right-0 bg-gray-900/95 backdrop-blur-md border-b border-gray-700/50 rounded-b-2xl">
						<div className="px-4 py-6 space-y-4">
							{navLinks.map((link) => (
								<a
									key={link.name}
									href={link.href}
									className="block text-gray-300 hover:text-green-400 transition-colors duration-300 font-medium py-2"
									onClick={() => setIsMobileMenuOpen(false)}
								>
									{link.name}
								</a>
							))}
							<div className="pt-4 space-y-3">
								<Button
									variant="ghost"
									className="w-full text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300"
								>
									Sign In
								</Button>
								<Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 rounded-full transition-all duration-300">
									Get Started
								</Button>
							</div>
						</div>
					</div>
				)}
			</div>
		</nav>
	);
}
