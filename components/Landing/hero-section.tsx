"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, TrendingUp, Brain, Sprout } from "lucide-react";
import { useEffect, useState } from "react";
import { WrapButton } from "../ui/wrap-Button";
import Link from "next/link";

export function HeroSection() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<section className="pb-2 relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-800 pt-20">
			{/* Animated Mesh Background */}
			<div className="absolute inset-0 opacity-20">
				<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					<defs>
						<linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#46B64A" />
							<stop offset="50%" stopColor="#54D0FF" />
							<stop offset="100%" stopColor="#A3F7B5" />
						</linearGradient>
					</defs>
					{/* Animated mesh lines */}
					{[...Array(20)].map((_, i) => (
						<line
							key={i}
							x1={i * 5}
							y1="0"
							x2={i * 5}
							y2="100"
							stroke="url(#meshGradient)"
							strokeWidth="0.1"
							className="animate-pulse"
							style={{
								animationDelay: `${i * 0.1}s`,
								transform: `translateX(${
									Math.sin((mousePosition.x + i * 50) * 0.01) * 2
								}px)`,
							}}
						/>
					))}
					{[...Array(20)].map((_, i) => (
						<line
							key={`h-${i}`}
							x1="0"
							y1={i * 5}
							x2="100"
							y2={i * 5}
							stroke="url(#meshGradient)"
							strokeWidth="0.1"
							className="animate-pulse"
							style={{
								animationDelay: `${i * 0.1}s`,
								transform: `translateY(${
									Math.sin((mousePosition.y + i * 50) * 0.01) * 2
								}px)`,
							}}
						/>
					))}
				</svg>
			</div>

			{/* Flowing Gradient Blobs */}
			<div className="absolute inset-0 pointer-events-none">
				<div
					className="absolute w-96 h-96 bg-gradient-to-r from-green-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"
					style={{
						left: `${20 + Math.sin(mousePosition.x * 0.01) * 10}%`,
						top: `${30 + Math.cos(mousePosition.y * 0.01) * 10}%`,
						transition: "all 0.3s ease-out",
					}}
				/>
				<div
					className="absolute w-80 h-80 bg-gradient-to-r from-blue-400/15 to-green-400/15 rounded-full blur-2xl animate-pulse"
					style={{
						right: `${15 + Math.cos(mousePosition.x * 0.008) * 8}%`,
						bottom: `${25 + Math.sin(mousePosition.y * 0.008) * 8}%`,
						transition: "all 0.4s ease-out",
						animationDelay: "1s",
					}}
				/>
			</div>

			{/* Interactive Cursor Glow */}
			<div
				className="absolute w-96 h-96 bg-gradient-radial from-green-400/10 via-blue-400/5 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out"
				style={{
					left: mousePosition.x - 192,
					top: mousePosition.y - 192,
				}}
			/>

			{/* Content */}
			<div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
				<div className="mb-8">
					<div className="inline-block mb-6">
						<div className="flex items-center space-x-2 px-4 py-2 bg-green-400/20 rounded-full border border-green-400/30 backdrop-blur-sm">
							<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
							<span className="text-green-400 text-sm font-medium">
								Carbon Intelligence Platform
							</span>
						</div>
					</div>

					<h1 className="text-5xl md:text-8xl font-bold text-white mb-4 leading-tight">
						<span className="inline-block animate-fade-in-up">Know</span>{" "}
						<span className="inline-block animate-fade-in-up animation-delay-200">
							Your
						</span>{" "}
						<span className="inline-block bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">
							Impact
						</span>
					</h1>

					<h2 className="text-xl md:text-4xl font-light text-gray-300 mb-8 animate-fade-in-up animation-delay-600">
						Live Sustainably with{" "}
						<span className="font-bold text-green-400 relative">
							Giki Zero
							<div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-green-400 to-blue-400 animate-expand-width" />
						</span>
					</h2>

					<p className="text-base md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-800">
						Track your lifestyle. Understand your emissions. Take control of your
						environmental impact.
					</p>
				</div>

				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row gap-4 justify-center mb-20 animate-fade-in-up animation-delay-1000">
					<div className="flex justify-center">
						<Link href="/dashboard">
							<WrapButton className="mt-10">
								<div className="flex items-center gap-2">
									{" "}
									{/* Added a flex container for the icon and text */}
									<Sprout className="animate-pulse bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparents" />
									<span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-white">
										Start Tracking
									</span>{" "}
									{/* Wrapped text in a span for better control */}
								</div>
							</WrapButton>
						</Link>
					</div>
				</div>

				{/* Feature Cards */}
				<div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
					{[
						{ icon: Recycle, title: "Calculate Your Carbon Score", color: "green" },
						{ icon: TrendingUp, title: "Visualize Emission Trends", color: "blue" },
						{ icon: Brain, title: "Get Smart AI Tips", color: "green" },
					].map((feature, index) => (
						<Card
							key={index}
							className="group bg-white/5 backdrop-blur-md border border-white/10 hover:border-green-400/50 transition-all duration-500 hover:transform hover:scale-105 hover:bg-white/10 animate-fade-in-up"
							style={{ animationDelay: `${1200 + index * 200}ms` }}
						>
							<CardContent className="p-6 text-center relative overflow-hidden">
								<div className="absolute inset-0 bg-gradient-to-br from-green-400/5 via-transparent to-blue-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
								<div className="relative z-10">
									<div
										className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center bg-gradient-to-br ${
											feature.color === "green"
												? "from-green-400/20 to-green-600/20 border border-green-400/30"
												: "from-blue-400/20 to-blue-600/20 border border-blue-400/30"
										} group-hover:scale-110 transition-transform duration-300`}
									>
										<feature.icon
											className={`w-8 h-8 ${
												feature.color === "green"
													? "text-green-400"
													: "text-blue-400"
											}`}
										/>
									</div>
									<h3 className="text-white font-semibold text-lg mb-2 group-hover:text-green-400 transition-colors duration-300">
										{feature.title}
									</h3>
									<p className="text-gray-400 text-sm">
										Transform your environmental impact with data-driven
										insights
									</p>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
