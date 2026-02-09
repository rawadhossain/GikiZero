"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Lightbulb, RefreshCw } from "lucide-react";

interface AiTip {
	id: string;
	title: string;
	description: string;
	category: string;
	impact: string;
	reasoning: string;
}

interface AITipsCarouselProps {
	tips: AiTip[];
}

export function AITipsCarousel({ tips }: AITipsCarouselProps) {
	const [currentTip, setCurrentTip] = useState(0);
	const [isRefreshing, setIsRefreshing] = useState(false);

	useEffect(() => {
		if (tips.length > 1) {
			const interval = setInterval(() => {
				setCurrentTip((prev) => (prev + 1) % tips.length);
			}, 5000); // Auto-rotate every 5 seconds

			return () => clearInterval(interval);
		}
	}, [tips.length]);

	const handleRefresh = async () => {
		setIsRefreshing(true);
		// In a real app, this would call the AI API to generate new tips
		setTimeout(() => {
			setIsRefreshing(false);
		}, 1000);
	};

	const nextTip = () => {
		setCurrentTip((prev) => (prev + 1) % tips.length);
	};

	const prevTip = () => {
		setCurrentTip((prev) => (prev - 1 + tips.length) % tips.length);
	};

	if (tips.length === 0) {
		return (
			<Card className="shadow-lg">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
						<Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />
						Smart Suggestions
					</CardTitle>
					<CardDescription>AI-powered sustainability tips</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center h-[150px] sm:h-[200px] text-muted-foreground text-center">
						Complete a survey to get personalized tips
					</div>
				</CardContent>
			</Card>
		);
	}

	const tip = tips[currentTip];

	return (
		<Card className="shadow-lg">
			<CardHeader>
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2">
						<Lightbulb className="h-4 w-4 sm:h-5 sm:w-5" />
						<CardTitle className="text-lg sm:text-xl">Smart Suggestions</CardTitle>
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={handleRefresh}
						disabled={isRefreshing}
						className="touch-target"
					>
						<RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
					</Button>
				</div>
				<CardDescription>AI-powered sustainability tips</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="space-y-3">
					<div className="flex items-center justify-between gap-2">
						<Badge variant="secondary" className="text-xs">
							{tip.category}
						</Badge>
						<Badge
							variant={
								tip.impact === "High"
									? "default"
									: tip.impact === "Medium"
									? "secondary"
									: "outline"
							}
							className="text-xs"
						>
							{tip.impact} Impact
						</Badge>
					</div>

					<h3 className="font-semibold text-base sm:text-lg leading-tight">
						{tip.title}
					</h3>
					<p className="text-sm text-muted-foreground leading-relaxed">
						{tip.description}
					</p>

					<div className="bg-muted/50 p-3 rounded-lg">
						<p className="text-xs sm:text-sm">
							<strong>Why this helps:</strong> {tip.reasoning}
						</p>
					</div>
				</div>

				{tips.length > 1 && (
					<div className="flex items-center justify-between pt-2">
						<Button
							variant="ghost"
							size="sm"
							onClick={prevTip}
							className="touch-target"
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<div className="flex space-x-1">
							{tips.map((_, index) => (
								<button
									key={index}
									onClick={() => setCurrentTip(index)}
									className={`h-2 w-2 rounded-full transition-colors touch-target ${
										index === currentTip ? "bg-primary" : "bg-muted"
									}`}
									aria-label="click"
								/>
							))}
						</div>
						<Button
							variant="ghost"
							size="sm"
							onClick={nextTip}
							className="touch-target"
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
