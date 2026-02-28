"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";

export function TakeActionSection() {
	const [hoveredCard, setHoveredCard] = useState<number | null>(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<section className="py-10 px-4 bg-gradient-to-b from-gray-800 to-gray-900 relative overflow-hidden">
			{/* Animated Wave Background */}
			<div className="absolute inset-0 opacity-10">
				<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					<defs>
						<linearGradient id="waveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
							<stop offset="0%" stopColor="#46B64A" />
							<stop offset="50%" stopColor="#54D0FF" />
							<stop offset="100%" stopColor="#A3F7B5" />
						</linearGradient>
					</defs>
					<path
						d={`M0,50 Q25,${
							30 + Math.sin(mousePosition.x * 0.01) * 10
						} 50,50 T100,50 V100 H0 Z`}
						fill="url(#waveGradient)"
						className="transition-all duration-300 ease-out"
					/>
					<path
						d={`M0,60 Q25,${
							40 + Math.cos(mousePosition.x * 0.008) * 8
						} 50,60 T100,60 V100 H0 Z`}
						fill="url(#waveGradient)"
						opacity="0.5"
						className="transition-all duration-500 ease-out"
					/>
				</svg>
			</div>

			<div className="max-w-6xl mx-auto relative z-10">
				<div className="text-center mb-16">
					<div className="inline-block mb-4">
						<span className="px-4 py-2 bg-green-400/20 text-green-400 rounded-full text-sm font-medium border border-green-400/30">
							Ready to Start?
						</span>
					</div>
					<h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
						Take Action{" "}
						<span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
							Today
						</span>
					</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full" />
				</div>

				<div className="grid md:grid-cols-2 gap-8">
					{[
						{
							id: 1,
							icon: "🌍",
							title: "Track My Lifestyle",
							description:
								"Answer our comprehensive lifestyle assessment and get your personalized carbon footprint score instantly.",
							gradient: "from-green-500 to-emerald-600",
							bgGradient: "from-green-400/10 to-emerald-400/5",
							buttonColor: "bg-green-500 hover:bg-green-600",
						},
						{
							id: 2,
							icon: "💡",
							title: "Get AI Tips",
							description:
								"Receive personalized, AI-powered recommendations to reduce your environmental impact effectively.",
							gradient: "from-blue-500 to-cyan-600",
							bgGradient: "from-blue-400/10 to-cyan-400/5",
							buttonColor: "bg-blue-500 hover:bg-blue-600",
						},
					].map((card, index) => (
						<Card
							key={card.id}
							className="group relative overflow-hidden border border-gray-700 bg-gray-800/50 backdrop-blur-sm shadow-xl hover:shadow-2xl hover:shadow-green-500/10 transition-all duration-500 transform hover:scale-105"
							onMouseEnter={() => setHoveredCard(card.id)}
							onMouseLeave={() => setHoveredCard(null)}
						>
							{/* Animated Background */}
							<div
								className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
							/>

							{/* Number Badge */}
							<div className="absolute top-6 right-6 z-20">
								<div
									className={`w-16 h-16 rounded-full bg-gradient-to-br ${
										card.gradient
									} flex items-center justify-center text-white font-bold text-xl shadow-lg transform ${
										hoveredCard === card.id ? "scale-110 rotate-12" : ""
									} transition-all duration-300`}
								>
									0{card.id}
								</div>
							</div>

							{/* Smooth Gradient Overlay */}
							<div className="absolute inset-0 pointer-events-none">
								<div
									className={`absolute inset-0 bg-gradient-to-br ${
										card.id === 1
											? "from-green-400/5 via-transparent to-green-400/10"
											: "from-blue-400/5 via-transparent to-blue-400/10"
									} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
								/>
							</div>

							<CardContent className="relative z-10 p-8">
								<div className="mb-6">
									<div
										className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${card.gradient} text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}
									>
										{card.icon}
									</div>
									<h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors duration-300">
										{card.title}
									</h3>
									<p className="text-base md:text-lg text-gray-300 leading-relaxed">
										{card.description}
									</p>
								</div>

								<Button
									className={`w-full ${card.buttonColor} text-white font-semibold py-4 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl relative overflow-hidden`}
								>
									<span className="relative z-10">
										{card.id === 1 ? "Start Assessment" : "Get Smart Tips"}
									</span>
									<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
								</Button>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
