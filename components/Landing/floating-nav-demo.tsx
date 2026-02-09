"use client";
import { FloatingNav } from "../ui/floating-navbar";
import { Home, Zap, Users, MessageCircle, Sparkles } from "lucide-react";

export function FloatingNavDemo() {
	const navItems = [
		{
			name: "Home",
			link: "#home",
			icon: <Home className="h-4 w-4 text-gray-400" />,
		},
		{
			name: "Features",
			link: "#features",
			icon: <Sparkles className="h-4 w-4 text-gray-400" />,
		},
		{
			name: "How It Works",
			link: "#how-it-works",
			icon: <Zap className="h-4 w-4 text-gray-400" />,
		},
		{
			name: "About",
			link: "#about",
			icon: <Users className="h-4 w-4 text-gray-400" />,
		},
		{
			name: "Contact",
			link: "#footer",
			icon: <MessageCircle className="h-4 w-4 text-gray-400" />,
		},
	];

	return (
		<div className="relative w-full">
			<FloatingNav navItems={navItems} />
		</div>
	);
}
