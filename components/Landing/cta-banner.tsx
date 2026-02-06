"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function CTABanner() {
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<section className="px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
			{/* Smooth Flowing Gradients */}
			<div className="absolute inset-0 opacity-15">
				<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					<defs>
						<radialGradient id="neuralGradient" cx="50%" cy="50%" r="50%">
							<stop offset="0%" stopColor="#46B64A" />
							<stop offset="50%" stopColor="#54D0FF" />
							<stop offset="100%" stopColor="#A3F7B5" />
						</radialGradient>
					</defs>
					{/* Neural network nodes */}
					{[...Array(15)].map((_, i) => {
						const x = 10 + (i % 5) * 20;
						const y = 20 + Math.floor(i / 5) * 30;
						return (
							<g key={i}>
								{/* <circle
									cx={x + Math.sin((mousePosition.x + i * 50) * 0.01) * 3}
									cy={y + Math.cos((mousePosition.y + i * 50) * 0.01) * 3}
									r="1"
									fill="url(#neuralGradient)"
									className="animate-pulse"
									style={{ animationDelay: `${i * 0.1}s` }}
								/> */}
								{/* Connections */}
								{i < 10 && (
									<line
										x1={x + Math.sin((mousePosition.x + i * 50) * 0.01) * 3}
										y1={y + Math.cos((mousePosition.y + i * 50) * 0.01) * 3}
										x2={
											x +
											20 +
											Math.sin((mousePosition.x + (i + 5) * 50) * 0.01) * 3
										}
										y2={
											y +
											Math.cos((mousePosition.y + (i + 5) * 50) * 0.01) * 3
										}
										stroke="url(#neuralGradient)"
										strokeWidth="0.2"
										opacity="0.5"
									/>
								)}
							</g>
						);
					})}
				</svg>
			</div>

			{/* Interactive Cursor Glow */}
			<div
				className="absolute w-96 h-96 bg-gradient-radial from-green-400/20 via-blue-400/10 to-transparent rounded-full pointer-events-none transition-all duration-300 ease-out blur-xl"
				style={{
					left: mousePosition.x - 192,
					top: mousePosition.y - 192,
				}}
			/>

			<div className="max-w-4xl mx-auto text-center relative z-10">
				{/* Badge */}
				<div className="inline-block mb-8">
					<div className="flex items-center space-x-2 px-6 py-3 bg-green-400/20 rounded-full border border-green-400/30 backdrop-blur-sm">
						<Sparkles className="w-5 h-5 text-green-400 animate-pulse" />
						<span className="text-green-400 font-medium">Start Your Journey</span>
					</div>
				</div>

				{/* Main Heading */}
				<h2 className="text-5xl md:text-8xl font-bold text-white mb-8 leading-tight">
					<span className="inline-block animate-fade-in-up">Take</span>{" "}
					<span className="inline-block animate-fade-in-up animation-delay-200">the</span>{" "}
					<span className="inline-block bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in-up animation-delay-400">
						First Step
					</span>
				</h2>

				{/* Subtitle */}
				<div className="mb-12 animate-fade-in-up animation-delay-600">
					<p className="text-xl md:text-3xl text-gray-300 mb-4 font-light">
						Every choice matters.{" "}
						<span className="font-semibold text-white">Track yours today.</span>
					</p>
					<div className="w-32 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full animate-expand-width animation-delay-800" />
				</div>

				{/* CTA Button */}
				<div className="animate-fade-in-up animation-delay-1000">
					<Link href="/dashboard">
						<Button
							size="lg"
							className="group relative overflow-hidden bg-gradient-to-r from-green-500 via-blue-500 to-green-600 hover:from-green-600 hover:via-blue-600 hover:to-green-700 text-white font-bold text-lg md:text-xl px-10 py-6 rounded-full transition-all duration-500 transform hover:scale-110 shadow-2xl hover:shadow-green-500/30"
						>
							<span className="relative z-10 flex items-center space-x-3">
								<span>Start Tracking</span>
								<ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
							</span>

							{/* Animated Shine Effect */}
							<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

							{/* Pulsing Glow */}
							<div className="absolute inset-0 bg-gradient-to-r from-green-500 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10 scale-150" />
						</Button>
					</Link>
				</div>

				{/* Supporting Text */}
				<p className="text-gray-400 mt-8 text-base md:text-lg animate-fade-in-up animation-delay-1200">
					Join thousands of users already making a difference
				</p>
			</div>
		</section>
	);
}
