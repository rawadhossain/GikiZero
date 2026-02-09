"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Leaf } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	if (!mounted) return null;

	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden flex items-center justify-center">
			{/* Animated Background */}
			<div className="absolute inset-0 opacity-15">
				<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					<defs>
						<radialGradient id="notFoundGradient" cx="50%" cy="50%" r="50%">
							<stop offset="0%" stopColor="#46B64A" />
							<stop offset="50%" stopColor="#54D0FF" />
							<stop offset="100%" stopColor="#A3F7B5" />
						</radialGradient>
					</defs>
					{/* Floating orbs */}
					{[...Array(12)].map((_, i) => (
						<circle
							key={i}
							cx={
								10 +
								(i % 4) * 25 +
								Math.sin((mousePosition.x + i * 100) * 0.005) * 5
							}
							cy={
								20 +
								Math.floor(i / 4) * 25 +
								Math.cos((mousePosition.y + i * 100) * 0.005) * 5
							}
							r={1 + Math.sin(i) * 0.5}
							fill="url(#notFoundGradient)"
							className="animate-pulse"
							style={{
								animationDelay: `${i * 0.3}s`,
								animationDuration: `${2 + Math.random() * 2}s`,
							}}
						/>
					))}
				</svg>
			</div>

			{/* Interactive Cursor Glow */}
			<div
				className="absolute w-96 h-96 bg-gradient-radial from-green-400/10 via-blue-400/5 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out blur-xl"
				style={{
					left: mousePosition.x - 192,
					top: mousePosition.y - 192,
				}}
			/>

			{/* Main Content */}
			<div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
				{/* Logo Section */}
				<div className="flex items-center justify-center space-x-3 mb-8 animate-fade-in-up">
					<div className="relative w-12 h-12">
						{/* <Image
							src="/public/images/giki-logo.png"
							alt="Giki Zero Logo"
							fill
							className="object-contain"
						/> */}
						<Image
							height={42}
							width={42}
							src="/giki-logo.png"
							alt="Giki Zero Logo"
							className="object-contain"
						/>
					</div>
					<div className="flex flex-col">
						<span className="text-white font-bold text-2xl">Giki Zero</span>
						<span className="text-green-400 text-sm font-medium">
							Carbon Intelligence
						</span>
					</div>
				</div>

				{/* 404 Animation */}
				<div className="mb-8 animate-fade-in-up animation-delay-200">
					<div className="relative">
						<h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-gradient-to-r from-green-400 via-blue-400 to-green-400 bg-clip-text animate-pulse">
							404
						</h1>
						{/* Floating leaves around 404 */}
						<div className="absolute inset-0 pointer-events-none">
							{[...Array(6)].map((_, i) => (
								<div
									key={i}
									className="absolute animate-float"
									style={{
										left: `${20 + Math.random() * 60}%`,
										top: `${20 + Math.random() * 60}%`,
										animationDelay: `${i * 0.5}s`,
										animationDuration: `${3 + Math.random() * 2}s`,
									}}
								>
									<Leaf className="w-6 h-6 text-green-400/60 transform rotate-12" />
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Error Message */}
				<div className="mb-12 animate-fade-in-up animation-delay-400">
					<h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
						Oops! This page went{" "}
						<span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
							carbon neutral
						</span>
					</h2>
					<p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
						The page you're looking for doesn't exist or has been moved to reduce its
						environmental footprint.
					</p>
				</div>

				{/* Action Cards */}
				<div className="grid md:grid-cols-3 gap-6 mb-12 animate-fade-in-up animation-delay-600">
					{[
						{
							icon: Home,
							title: "Go Home",
							description: "Return to our main page",
							href: "/",
							color: "from-green-500 to-emerald-500",
						},
						{
							icon: Search,
							title: "Explore Features",
							description: "Discover what we offer",
							href: "/#features",
							color: "from-blue-500 to-cyan-500",
						},
						{
							icon: ArrowLeft,
							title: "Go Back",
							description: "Return to previous page",
							href: "#",
							color: "from-purple-500 to-pink-500",
							onClick: () => window.history.back(),
						},
					].map((action, index) => (
						<Card
							key={index}
							className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-green-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/10 cursor-pointer"
						>
							<CardContent className="p-6 text-center relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								<div className="relative z-10">
									<div
										className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${action.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}
									>
										<action.icon className="w-8 h-8 text-white" />
									</div>
									<h3 className="text-white font-semibold text-lg mb-2 group-hover:text-green-400 transition-colors duration-300">
										{action.title}
									</h3>
									<p className="text-gray-400 text-sm mb-4">
										{action.description}
									</p>
									{action.onClick ? (
										<Button
											onClick={action.onClick}
											className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-2 rounded-lg transition-all duration-300"
										>
											{action.title}
										</Button>
									) : (
										<Link href={action.href}>
											<Button className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-medium py-2 rounded-lg transition-all duration-300">
												{action.title}
											</Button>
										</Link>
									)}
								</div>
							</CardContent>
						</Card>
					))}
				</div>

				{/* Main CTA */}
				<div className="animate-fade-in-up animation-delay-800">
					<Link href="/">
						<Button
							size="lg"
							className="group relative overflow-hidden bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold px-12 py-6 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-green-500/30"
						>
							<Home className="w-6 h-6 mr-3 group-hover:animate-bounce" />
							<span className="relative z-10 text-lg">Take Me Home</span>
							<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
						</Button>
					</Link>
				</div>

				{/* Fun Fact */}
				<div className="mt-12 animate-fade-in-up animation-delay-1000">
					<div className="inline-block px-6 py-3 bg-green-400/20 rounded-full border border-green-400/30 backdrop-blur-sm">
						<p className="text-green-400 text-sm font-medium flex items-center space-x-2">
							<Leaf className="w-4 h-4" />
							<span>
								Fun fact: This 404 page is carbon-optimized with minimal resources!
							</span>
						</p>
					</div>
				</div>
			</div>

			{/* Decorative Elements */}
			<div className="absolute bottom-10 left-10 opacity-20">
				<div className="w-32 h-32 border-2 border-green-400/30 rounded-full animate-spin-slow" />
			</div>
			<div className="absolute top-20 right-20 opacity-20">
				<div className="w-24 h-24 bg-blue-400/20 rounded-full animate-bounce" />
			</div>
		</div>
	);
}
