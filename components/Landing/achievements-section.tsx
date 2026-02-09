"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

export function AchievementsSection() {
	const [counts, setCounts] = useState({ assessments: 0, tips: 0, users: 0 });
	const [isVisible, setIsVisible] = useState(false);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			setMousePosition({ x: e.clientX, y: e.clientY });
		};
		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					setIsVisible(true);
				}
			},
			{ threshold: 0.3 }
		);

		const section = document.getElementById("achievements-section");
		if (section) observer.observe(section);

		return () => observer.disconnect();
	}, []);

	useEffect(() => {
		if (!isVisible) return;

		const animateCount = (target: number, key: keyof typeof counts) => {
			let current = 0;
			const increment = target / 100;
			const timer = setInterval(() => {
				current += increment;
				if (current >= target) {
					current = target;
					clearInterval(timer);
				}
				setCounts((prev) => ({ ...prev, [key]: Math.floor(current) }));
			}, 30);
		};

		animateCount(15000, "assessments");
		animateCount(12300, "tips");
		animateCount(3200, "users");
	}, [isVisible]);

	const achievements = [
		{
			count: counts.assessments,
			label: "Lifestyle Assessments",
			sublabel: "Completed by our community",
			color: "green",
			icon: "📊",
		},
		{
			count: counts.tips,
			label: "Personalized Tips",
			sublabel: "AI-powered recommendations delivered",
			color: "blue",
			icon: "🎯",
		},
		{
			count: counts.users,
			label: "Low-Impact Users",
			sublabel: "Successfully reducing their footprint",
			color: "emerald",
			icon: "🌱",
		},
	];

	return (
		<section
			id="achievements-section"
			className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
		>
			{/* Dynamic Grid Background */}
			<div className="absolute inset-0 opacity-10">
				<svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
					<defs>
						<radialGradient id="gridGradient" cx="50%" cy="50%" r="50%">
							<stop offset="0%" stopColor="#46B64A" />
							<stop offset="50%" stopColor="#54D0FF" />
							<stop offset="100%" stopColor="#A3F7B5" />
						</radialGradient>
					</defs>
					{/* Dynamic grid that responds to mouse */}
					{[...Array(10)].map((_, i) => (
						<g key={i}>
							<circle
								cx={10 + i * 10}
								cy={50 + Math.sin((mousePosition.x + i * 100) * 0.01) * 10}
								r="0.5"
								fill="url(#gridGradient)"
								className="animate-pulse"
								style={{ animationDelay: `${i * 0.2}s` }}
							/>
							<circle
								cx={50 + Math.cos((mousePosition.y + i * 100) * 0.01) * 10}
								cy={10 + i * 10}
								r="0.5"
								fill="url(#gridGradient)"
								className="animate-pulse"
								style={{ animationDelay: `${i * 0.2}s` }}
							/>
						</g>
					))}
				</svg>
			</div>

			<div className="max-w-6xl mx-auto text-center relative z-10">
				<div className="mb-16">
					<div className="inline-block mb-4">
						<span className="px-4 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium border border-green-500/30">
							Our Impact
						</span>
					</div>
					<h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
						Our Footprint{" "}
						<span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
							So Far
						</span>
					</h2>
					<div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-400 mx-auto rounded-full" />
				</div>

				<div className="grid md:grid-cols-3 gap-8">
					{achievements.map((achievement, index) => (
						<Card
							key={index}
							className="group bg-gray-800/50 backdrop-blur-md border border-gray-700 hover:border-green-400/50 transition-all duration-500 hover:transform hover:scale-105 relative overflow-hidden"
						>
							{/* Glow Effect */}
							<div
								className={`absolute inset-0 bg-gradient-to-br ${
									achievement.color === "green"
										? "from-green-500/10 to-emerald-500/5"
										: achievement.color === "blue"
										? "from-blue-500/10 to-cyan-500/5"
										: "from-emerald-500/10 to-green-500/5"
								} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
							/>

							<CardContent className="p-6 md:p-8 relative z-10">
								{/* Icon */}
								<div className="text-3xl sm:text-4xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300">
									{achievement.icon}
								</div>

								{/* Animated Counter */}
								<div className="mb-4">
									<div
										className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r ${
											achievement.color === "green"
												? "from-green-400 to-emerald-400"
												: achievement.color === "blue"
												? "from-blue-400 to-cyan-400"
												: "from-emerald-400 to-green-400"
										} bg-clip-text text-transparent`}
									>
										{achievement.count >= 1000
											? `${(achievement.count / 1000).toFixed(1)}K+`
											: `${achievement.count}+`}
									</div>

									{/* Progress Ring */}
									<div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4">
										<svg
											className="w-full h-full transform -rotate-90"
											viewBox="0 0 100 100"
										>
											<circle
												cx="50"
												cy="50"
												r="40"
												stroke="currentColor"
												strokeWidth="8"
												fill="none"
												className="text-gray-700"
											/>
											<circle
												cx="50"
												cy="50"
												r="40"
												stroke="currentColor"
												strokeWidth="8"
												fill="none"
												strokeDasharray={`${2 * Math.PI * 40}`}
												strokeDashoffset={`${
													2 * Math.PI * 40 * (1 - (isVisible ? 0.75 : 0))
												}`}
												className={`${
													achievement.color === "green"
														? "text-green-400"
														: achievement.color === "blue"
														? "text-blue-400"
														: "text-emerald-400"
												} transition-all duration-2000 ease-out`}
												strokeLinecap="round"
											/>
										</svg>
									</div>
								</div>

								<h3 className="text-base sm:text-lg md:text-xl font-semibold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
									{achievement.label}
								</h3>
								<p className="text-gray-400 text-xs sm:text-sm">
									{achievement.sublabel}
								</p>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
}
