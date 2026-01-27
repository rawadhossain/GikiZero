"use client";

import type React from "react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Leaf, ArrowRight, CheckCircle, SproutIcon } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import Image from "next/image";

export default function Onboarding() {
	const { data: session, update } = useSession();
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState({
		name: session?.user?.name || "",
		age: "",
		location: "",
	});

	const handleInputChange = (field: string, value: string) => {
		setFormData((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const response = await fetch("/api/user/onboarding", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				// Update the session to reflect onboarding completion
				await update({ onboardingCompleted: true });

				toast.success("Profile completed successfully!", {
					description:
						"Welcome to Giki Zero! Let's start tracking your carbon footprint.",
				});

				router.push("/dashboard");
				router.refresh();
			} else {
				const errorData = await response.json();
				toast.error("Failed to complete onboarding", {
					description: errorData.error || "Please try again.",
				});
			}
		} catch (error) {
			console.error("Onboarding error:", error);
			toast.error("An unexpected error occurred. Please try again.");
		} finally {
			setIsLoading(false);
		}
	};

	const isFormValid = formData.name.trim() && formData.age && formData.location.trim();
	const progress = Object.values(formData).filter((value) => value.trim()).length * 33.33;

	return (
		<div className="min-h-screen flex flex-col bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
			{/* Mobile-friendly header */}
			<div className="flex items-center justify-center p-4 sm:p-6">
				<div className="flex items-center gap-2">
					{/* <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">
						<Leaf className="h-4 w-4" />
					</div>
					<span className="text-lg font-semibold">Giki Zero</span> */}
				</div>
			</div>

			{/* Progress indicator */}
			<div className="px-4 sm:px-6 mb-4">
				<div className="max-w-md mx-auto">
					<div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
						<span>Setup Progress</span>
						<span>{Math.round(progress)}%</span>
					</div>
					<Progress value={progress} className="h-2" />
				</div>
			</div>

			{/* Main content */}
			<div className="flex-1 flex items-center justify-center p-4">
				<Card className="w-full max-w-md mx-auto">
					<CardHeader className="space-y-1 text-center pb-4">
						<div className="flex items-center justify-center mb-4">
							{/* Original commented out section - keeping it commented as per original
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-green-600 text-white">
                                <Leaf className="h-6 w-6" />
                            </div>
                            */}

							<div className="flex items-center gap-2">
								<div className="flex h-8 w-8 items-center justify-center rounded-lg text-green-600">
									<SproutIcon className="h-12 w-12" />
								</div>
								<span className="text-lg font-semibold dark:text-gray-50">
									Giki Zero
								</span>
							</div>
						</div>
						<CardTitle className="text-2xl">Complete Your Profile</CardTitle>
						<CardDescription>
							Help us personalize your carbon tracking experience
						</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input
									id="name"
									type="text"
									placeholder="Enter your full name"
									value={formData.name}
									onChange={(e) => handleInputChange("name", e.target.value)}
									required
									className="touch-target"
									autoComplete="name"
								/>
							</div>

							<div className="space-y-2">
								<Label htmlFor="age">Age Range</Label>
								<Select
									onValueChange={(value) => handleInputChange("age", value)}
									value={formData.age}
								>
									<SelectTrigger className="touch-target">
										<SelectValue placeholder="Select your age range" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="18-25">18-25</SelectItem>
										<SelectItem value="26-35">26-35</SelectItem>
										<SelectItem value="36-45">36-45</SelectItem>
										<SelectItem value="46-55">46-55</SelectItem>
										<SelectItem value="56-65">56-65</SelectItem>
										<SelectItem value="65+">65+</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<div className="space-y-2">
								<Label htmlFor="location">Location</Label>
								<Input
									id="location"
									type="text"
									placeholder="City, Country"
									value={formData.location}
									onChange={(e) => handleInputChange("location", e.target.value)}
									required
									className="touch-target"
									autoComplete="address-level2"
								/>
							</div>

							<Button
								type="submit"
								className="w-full touch-target mt-6"
								disabled={isLoading || !isFormValid}
							>
								{isLoading ? "Setting up..." : "Complete Setup"}
								<ArrowRight className="ml-2 h-4 w-4" />
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
