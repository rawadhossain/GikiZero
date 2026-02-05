"use client";

import { Github, Instagram, Twitter, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { useState, useEffect } from "react";

export function Footer() {
	const [hoveredSocial, setHoveredSocial] = useState<number | null>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const navLinks = [
		{ name: "Home", href: "#" },
		{ name: "Features", href: "#" },
		{ name: "Dashboard", href: "#" },
		{ name: "Privacy", href: "#" },
	];

	// Modified socialLinks: No 'color' property needed for the icon itself now,
	// as we'll apply text color directly and remove the background box.
	const socialLinks = [
		{ icon: Github, href: "https://github.com/rawadhossain" }, // Added full URL for href
	];

	return (
		<footer className="bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
			{/* Subtle Wave Background */}
			<div className="absolute inset-0 opacity-5">
				<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					<defs>
						<linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#46B64A" />
							<stop offset="50%" stopColor="#54D0FF" />
							<stop offset="100%" stopColor="#A3F7B5" />
						</linearGradient>
					</defs>
					<path
						d={`M0,30 Q${25 + Math.sin(mousePosition.x * 0.01) * 5},${
							20 + Math.cos(mousePosition.y * 0.01) * 3
						} 50,35 T100,30 V100 H0 Z`}
						fill="url(#footerGradient)"
						className="transition-all duration-500 ease-out"
					/>
				</svg>
			</div>

			<div className="max-w-6xl mx-auto px-4 py-12 relative z-10">
				{/* Divider */}
				<div className="border-t border-gray-700 pt-8">
					<div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-x-8 md:space-y-0">
						{/* Copyright */}
						<div className="text-gray-400 text-md md:mr-4 text-center md:text-left">
							© 2025 Giki Zero. Built by{" "}
							<span className="text-green-400 font-semibold">Rawad Hossain</span>.
						</div>

						{/* Social Links */}
						<div className="flex space-x-4">
							{socialLinks.map((social, index) => (
								<a
									key={index}
									href={social.href}
									target="_blank" // Open in new tab for external links
									rel="noopener noreferrer" // Security best practice for target="_blank"
									className="text-gray-400 hover:text-green-400 transition-colors duration-200"
								>
									<social.icon className="w-6 h-6" />
								</a>
							))}
							{/* Add other social links similarly if needed */}
							{/* <a
								href="#"
								className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
							>
								<Twitter className="w-6 h-6" />
							</a> */}
							<a
								href="https://www.linkedin.com/in/rawadhossain/"
								className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
							>
								<Linkedin className="w-6 h-6" />
							</a>
							{/*
                            <a href="#" className="text-gray-400 hover:text-pink-400 transition-colors duration-200">
                                <Instagram className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-red-400 transition-colors duration-200">
                                <Mail className="w-6 h-6" />
                            </a>
                            */}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
