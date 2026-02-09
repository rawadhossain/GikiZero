"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Leaf, CheckCircle } from "lucide-react";
import { getRandomQuestions } from "@/lib/carbon-scoring";
import { toast } from "sonner";

export default function SurveyPage() {
	const router = useRouter();
	const [currentStep, setCurrentStep] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [questions] = useState(() => getRandomQuestions());
	const [answers, setAnswers] = useState<Record<string, any>>({});

	const progress = ((currentStep + 1) / questions.length) * 100;

	const handleAnswer = (questionId: string, value: any) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: value,
		}));
	};

	const handleNext = () => {
		if (currentStep < questions.length - 1) {
			setCurrentStep((prev) => prev + 1);
		} else {
			handleSubmit();
		}
	};

	const handlePrevious = () => {
		if (currentStep > 0) {
			setCurrentStep((prev) => prev - 1);
		}
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		try {
			const response = await fetch("/api/submissions", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(answers),
			});

			if (response.ok) {
				const result = await response.json();
				setIsComplete(true);

				// Show success toast with detailed information
				const impactLevel = result.impactCategory;
				const score = result.totalScore.toFixed(1);

				toast.success("Survey completed successfully!", {
					description: `Your carbon score: ${score} kg CO₂ (${impactLevel} Impact)`,
					duration: 5000,
				});

				// Show additional toast based on impact level
				setTimeout(() => {
					if (impactLevel === "Low") {
						toast.success("Excellent work!", {
							description: "You're making a positive impact on the environment!",
							duration: 4000,
						});
					} else if (impactLevel === "Medium") {
						toast.info("Good progress!", {
							description: "There's room for improvement. Check out our AI tips!",
							duration: 4000,
						});
					} else {
						toast.warning("Room for improvement", {
							description:
								"Consider our AI suggestions to reduce your carbon footprint.",
							duration: 4000,
						});
					}
				}, 1000);

				setTimeout(() => {
					router.push("/dashboard");
				}, 3000);
			} else {
				const errorData = await response.json();
				toast.error("Failed to submit survey", {
					description: errorData.error || "Please try again.",
				});
			}
		} catch (error) {
			console.error("Submission error:", error);
			toast.error("Failed to submit survey", {
				description: "Please check your connection and try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	if (isComplete) {
		return (
			<div className="min-h-[60vh] flex items-center justify-center p-4">
				<Card className="w-full max-w-md text-center">
					<CardContent className="pt-6">
						<div className="flex justify-center mb-4">
							<CheckCircle className="h-12 w-12 sm:h-16 sm:w-16 text-green-600" />
						</div>
						<h2 className="text-xl sm:text-2xl font-bold mb-2">Survey Complete!</h2>
						<p className="text-sm sm:text-base text-muted-foreground mb-4">
							Your carbon footprint has been calculated. Redirecting to dashboard...
						</p>
						<div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-green-600 mx-auto"></div>
					</CardContent>
				</Card>
			</div>
		);
	}

	const currentQuestion = questions[currentStep];
	const currentAnswer = answers[currentQuestion.id];

	return (
		<div className="space-y-4 sm:space-y-6">
			<div>
				<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
					Carbon Footprint Survey
				</h1>
				<p className="text-sm sm:text-base text-muted-foreground">
					Help us understand your lifestyle to calculate your environmental impact
				</p>
			</div>

			<div className="space-y-3 sm:space-y-4">
				<div className="flex items-center justify-between text-sm">
					<span>
						Question {currentStep + 1} of {questions.length}
					</span>
					<span>{Math.round(progress)}% Complete</span>
				</div>
				<Progress value={progress} className="w-full h-2" />
			</div>

			<Card className="w-full">
				<CardHeader className="pb-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-100 text-green-600">
							<Leaf className="h-4 w-4" />
						</div>
						<div className="min-w-0 flex-1">
							<CardTitle className="text-base sm:text-lg truncate">
								{currentQuestion.category}
							</CardTitle>
							<CardDescription className="text-sm">
								Step {currentStep + 1} of {questions.length}
							</CardDescription>
						</div>
					</div>
				</CardHeader>
				<CardContent className="space-y-6">
					<div>
						<h3 className="text-base sm:text-lg font-medium mb-4 leading-relaxed">
							{currentQuestion.question}
						</h3>

						{currentQuestion.type === "select" && (
							<Select
								value={currentAnswer || ""}
								onValueChange={(value) => handleAnswer(currentQuestion.id, value)}
							>
								<SelectTrigger className="touch-target">
									<SelectValue placeholder="Select an option" />
								</SelectTrigger>
								<SelectContent>
									{currentQuestion.options?.map((option: any) => (
										<SelectItem
											key={option.value}
											value={option.value}
											className="touch-target"
										>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						)}

						{currentQuestion.type === "radio" && (
							<RadioGroup
								value={currentAnswer || ""}
								onValueChange={(value) =>
									handleAnswer(currentQuestion.id, value === "true")
								}
								className="space-y-3"
							>
								{currentQuestion.options?.map((option: any) => (
									<div
										key={option.value}
										className="flex items-center space-x-3 touch-target"
									>
										<RadioGroupItem value={option.value} id={option.value} />
										<Label
											htmlFor={option.value}
											className="flex-1 cursor-pointer"
										>
											{option.label}
										</Label>
									</div>
								))}
							</RadioGroup>
						)}
					</div>

					<div className="flex flex-col sm:flex-row justify-between gap-3 pt-4">
						<Button
							variant="outline"
							onClick={handlePrevious}
							disabled={currentStep === 0}
							className="touch-target order-2 sm:order-1 bg-transparent"
						>
							<ArrowLeft className="mr-2 h-4 w-4" />
							Previous
						</Button>

						<Button
							onClick={handleNext}
							disabled={!currentAnswer || isLoading}
							className="touch-target order-1 sm:order-2"
						>
							{currentStep === questions.length - 1 ? (
								isLoading ? (
									"Calculating..."
								) : (
									"Complete Survey"
								)
							) : (
								<>
									Next
									<ArrowRight className="ml-2 h-4 w-4" />
								</>
							)}
						</Button>
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
