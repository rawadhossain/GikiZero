"use client";

import { MessageCircle, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export function AIAssistantSection() {
	const [typingText, setTypingText] = useState("");
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	const sampleQuestions = [
		"Is 500kg CO₂/month high?",
		"What's the best habit to start with?",
		"How can I cut food-related emissions?",
		"Should I switch to electric transport?",
		"What's my biggest carbon contributor?",
	];

	const fullText =
		"Hi! I'm your AI sustainability coach. I can help you understand your carbon footprint and suggest personalized ways to reduce it. What would you like to know?";

	useEffect(() => {
		let index = 0;
		const timer = setInterval(() => {
			if (index <= fullText.length) {
				setTypingText(fullText.slice(0, index));
				index++;
			} else {
				clearInterval(timer);
			}
		}, 50);

		return () => clearInterval(timer);
	}, []);

	useEffect(() => {
		const questionTimer = setInterval(() => {
			setCurrentQuestionIndex((prev) => (prev + 1) % sampleQuestions.length);
		}, 3000);

		return () => clearInterval(questionTimer);
	}, []);

	return (
		<section className="py-20 px-4 bg-gradient-to-b from-gray-900 via-black to-gray-900 relative overflow-hidden">
			{/* Neural Network Background */}
			<div className="absolute inset-0 opacity-10">
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
								<circle
									cx={x + Math.sin((mousePosition.x + i * 50) * 0.01) * 3}
									cy={y + Math.cos((mousePosition.y + i * 50) * 0.01) * 3}
									r="1"
									fill="url(#neuralGradient)"
									className="animate-pulse"
									style={{ animationDelay: `${i * 0.1}s` }}
								/>
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

			<div className="max-w-6xl mx-auto text-center relative z-10">
				<div className="mb-12">
					<div className="inline-block mb-4">
						<span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30 flex items-center space-x-2">
							<Sparkles className="w-4 h-4" />
							<span>AI Assistant</span>
						</span>
					</div>
					<h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
						Meet Your{" "}
						<span className="bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
							Sustainability Coach
						</span>
					</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full" />
				</div>

				<div className="max-w-4xl mx-auto">
					{/* Interactive Chat Interface */}
					<div className="relative mb-12">
						<div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl relative overflow-hidden border border-gray-700">
							{/* Chat Header */}
							<div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-600">
								<div className="flex items-center space-x-3">
									<div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-400 rounded-full flex items-center justify-center text-2xl animate-pulse">
										🌿
									</div>
									<div>
										<div className="text-white font-semibold">EcoBot</div>
										<div className="text-green-400 text-sm flex items-center space-x-1">
											<div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
											<span>Online</span>
										</div>
									</div>
								</div>
								<div className="flex space-x-1">
									<div className="w-3 h-3 bg-red-400 rounded-full" />
									<div className="w-3 h-3 bg-yellow-400 rounded-full" />
									<div className="w-3 h-3 bg-green-400 rounded-full" />
								</div>
							</div>

							{/* Chat Bubble */}
							<div className="relative">
								<div className="bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-2xl p-6 backdrop-blur-sm border border-green-400/30 relative">
									<div className="text-left text-white leading-relaxed">
										{typingText}
										<span className="animate-pulse">|</span>
									</div>

									{/* Bubble Tail */}
									<div className="absolute bottom-0 left-8 w-0 h-0 transform translate-y-full">
										<div className="border-l-[15px] border-r-[15px] border-t-[15px] border-l-transparent border-r-transparent border-t-green-400/30" />
									</div>
								</div>

								{/* Smooth Pulse Rings */}
								<div className="absolute inset-0 pointer-events-none">
									<div className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-blue-400/5 to-green-400/10 rounded-2xl animate-pulse" />
									<div className="absolute inset-2 bg-gradient-to-r from-blue-400/5 via-transparent to-blue-400/5 rounded-2xl animate-pulse animation-delay-1000" />
								</div>
							</div>
						</div>
					</div>

					{/* Sample Questions */}
					<div className="mb-12">
						<p className="text-gray-400 text-lg mb-8">Ask questions like:</p>
						<div className="flex flex-wrap justify-center gap-4">
							{sampleQuestions.map((question, index) => (
								<div
									key={index}
									className={`group cursor-pointer px-4 py-2 rounded-full border-2 transition-all duration-500 transform hover:scale-105 ${
										index === currentQuestionIndex
											? "border-green-400 bg-green-400/10 text-green-400 scale-105"
											: "border-gray-600 text-gray-400 hover:border-blue-400 hover:text-blue-400"
									}`}
								>
									<span className="relative">
										"{question}"
										{index === currentQuestionIndex && (
											<div className="absolute -inset-1 bg-green-400/20 rounded-full blur animate-pulse" />
										)}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* CTA Button */}
					{/* <Button
						size="lg"
						className="group relative overflow-hidden bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 hover:from-green-600 hover:via-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-green-500/25"
					>
						<MessageCircle className="w-5 h-5 mr-2 group-hover:animate-bounce" />
						<span className="relative z-10 text-base md:text-lg">
							Chat with EcoBot Now
						</span>
						<div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
					</Button> */}
				</div>
			</div>
		</section>
	);
}
