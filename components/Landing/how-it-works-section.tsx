"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

export function HowItWorksSection() {
	const [activeStep, setActiveStep] = useState(0);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const steps = [
		{
			title: "Sign in with Google",
			description: "Quick and secure authentication to get started instantly",
			icon: "🔐",
			color: "from-blue-500 to-cyan-500",
		},
		{
			title: "Fill out our dynamic lifestyle form",
			description: "Smart questions that adapt based on your responses",
			icon: "📝",
			color: "from-green-500 to-emerald-500",
		},
		{
			title: "Get your carbon score instantly",
			description: "Real-time calculation of your environmental impact",
			icon: "⚡",
			color: "from-yellow-500 to-orange-500",
		},
		{
			title: "Receive weekly AI-powered suggestions",
			description: "Personalized recommendations to reduce your footprint",
			icon: "🤖",
			color: "from-purple-500 to-pink-500",
		},
	];

	return (
		<section className="py-15 px-4 pb-1 bg-gradient-to-b from-black to-gray-900 relative overflow-hidden">
			{/* Flowing Lines Background */}
			<div className="absolute inset-0 opacity-15">
				<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					<defs>
						<linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
							<stop offset="0%" stopColor="#46B64A" />
							<stop offset="50%" stopColor="#54D0FF" />
							<stop offset="100%" stopColor="#A3F7B5" />
						</linearGradient>
					</defs>
					<path
						d={`M0,20 Q${25 + Math.sin(mousePosition.x * 0.01) * 10},${
							10 + Math.cos(mousePosition.y * 0.01) * 5
						} 50,30 T100,25`}
						stroke="url(#flowGradient)"
						strokeWidth="0.5"
						fill="none"
						className="transition-all duration-500 ease-out"
					/>
					<path
						d={`M0,50 Q${25 + Math.cos(mousePosition.x * 0.008) * 8},${
							40 + Math.sin(mousePosition.y * 0.008) * 6
						} 50,60 T100,55`}
						stroke="url(#flowGradient)"
						strokeWidth="0.3"
						fill="none"
						opacity="0.7"
						className="transition-all duration-700 ease-out"
					/>
					<path
						d={`M0,80 Q${25 + Math.sin(mousePosition.x * 0.006) * 6},${
							70 + Math.cos(mousePosition.y * 0.006) * 4
						} 50,85 T100,82`}
						stroke="url(#flowGradient)"
						strokeWidth="0.4"
						fill="none"
						opacity="0.5"
						className="transition-all duration-900 ease-out"
					/>
				</svg>
			</div>

			<div className="max-w-6xl mx-auto relative z-10">
				<div className="text-center mb-16">
					<div className="inline-block mb-4">
						<span className="px-4 py-2 bg-blue-400/20 text-blue-400 rounded-full text-sm font-medium border border-blue-400/30">
							How It Works
						</span>
					</div>
					<h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
						Your Sustainability{" "}
						<span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
							Companion
						</span>
					</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full" />
				</div>

				<div className="grid md:grid-cols-2 gap-12 items-center">
					{/* Interactive Dashboard Mockup */}
					<div className="order-2 md:order-1 relative">
						<div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-gray-700">
							{/* Screen Glow */}
							<div className="absolute inset-0 bg-gradient-to-br from-green-400/10 via-transparent to-blue-400/10 rounded-3xl" />

							{/* Mock Dashboard Content */}
							<div className="relative z-10">
								<div className="flex items-center justify-between mb-6">
									<div className="flex items-center space-x-2">
										<div className="w-3 h-3 bg-red-400 rounded-full" />
										<div className="w-3 h-3 bg-yellow-400 rounded-full" />
										<div className="w-3 h-3 bg-green-400 rounded-full" />
									</div>
									<div className="text-white/60 text-sm">Giki Zero Dashboard</div>
								</div>

								{/* Carbon Score Display */}
								<div className="bg-white/10 rounded-2xl p-6 mb-4 backdrop-blur-sm border border-gray-600">
									<div className="text-center">
										<div className="text-4xl font-bold text-green-400 mb-2">
											2.4 tons
										</div>
										<div className="text-white/80 text-sm">
											Monthly CO₂ Footprint
										</div>
										<div className="w-full bg-white/20 rounded-full h-2 mt-3">
											<div className="bg-gradient-to-r from-green-400 to-blue-400 h-2 rounded-full w-3/4 animate-expand-width" />
										</div>
									</div>
								</div>

								{/* Progress Indicators */}
								<div className="grid grid-cols-2 gap-4">
									<div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-gray-600">
										<div className="text-blue-400 text-2xl font-bold">-15%</div>
										<div className="text-white/60 text-xs">This Month</div>
									</div>
									<div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-gray-600">
										<div className="text-green-400 text-2xl font-bold">
											🏆 7
										</div>
										<div className="text-white/60 text-xs">Streak Days</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Steps */}
					<div className="order-1 md:order-2">
						<div className="space-y-6">
							{steps.map((step, index) => (
								<div
									key={index}
									className={`group cursor-pointer transition-all duration-300 ${
										activeStep === index ? "scale-105" : "hover:scale-102"
									}`}
									onMouseEnter={() => setActiveStep(index)}
								>
									<div className="flex items-start space-x-4 p-6 rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-400/50 hover:shadow-xl hover:shadow-green-500/10 transition-all duration-300">
										<div
											className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-2xl shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}
										>
											{step.icon}
										</div>
										<div className="flex-1">
											<div className="flex items-center space-x-2 mb-2">
												<div
													className={`w-8 h-8 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-sm`}
												>
													{index + 1}
												</div>
												<h3 className="text-lg md:text-xl font-semibold text-white group-hover:text-green-400 transition-colors duration-300">
													{step.title}
												</h3>
												{activeStep >= index && (
													<CheckCircle className="w-5 h-5 text-green-400 animate-scale-in" />
												)}
											</div>
											<p className="text-sm md:text-base text-gray-300 leading-relaxed">
												{step.description}
											</p>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
