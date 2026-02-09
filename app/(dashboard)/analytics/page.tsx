"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { EmissionChart } from "@/components/emission-chart";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { TrendingUp, TrendingDown, Calendar, Target } from "lucide-react";

// --- Add this type ---
type Submission = {
	id: string;
	totalEmissionScore: number;
	impactCategory: string;
	transportationScore: number;
	energyScore: number;
	waterScore: number;
	dietScore: number;
	foodWasteScore: number;
	shoppingScore: number;
	wasteScore: number;
	electronicsScore: number;
	travelScore: number;
	applianceScore: number;
	homeScore?: number;
	heatingScore?: number;
	digitalScore?: number;
	petsScore?: number;
	gardenScore?: number;
	createdAt?: Date;
	// add any other fields you use
};

export default function AnalyticsPage() {
	const [period, setPeriod] = useState("month");
	const [submissions, setSubmissions] = useState<Submission[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchSubmissions();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [period]);

	const fetchSubmissions = async () => {
		setLoading(true);
		try {
			const response = await fetch(`/api/submissions?period=${period}`);
			const data = await response.json();
			const submissionsWithDate = (data.submissions || []).map((s: any) => ({
				...s,
				createdAt: s.createdAt ? new Date(s.createdAt) : undefined,
			}));
			setSubmissions(submissionsWithDate);
		} catch (error) {
			console.error("Error fetching submissions:", error);
		} finally {
			setLoading(false);
		}
	};

	const latestSubmission = submissions[0];
	const averageScore =
		submissions.length > 0
			? submissions.reduce((sum, s) => sum + s.totalEmissionScore, 0) / submissions.length
			: 0;

	const trend =
		submissions.length >= 2
			? submissions[0]?.totalEmissionScore - submissions[1]?.totalEmissionScore
			: 0;

	// Category averages for comparison (add all categories you want to show)
	const categoryAverages =
		submissions.length > 0
			? {
					Transportation:
						submissions.reduce((sum, s) => sum + (s.transportationScore || 0), 0) /
						submissions.length,
					Energy:
						submissions.reduce((sum, s) => sum + (s.energyScore || 0), 0) /
						submissions.length,
					Water:
						submissions.reduce((sum, s) => sum + (s.waterScore || 0), 0) /
						submissions.length,
					Diet:
						submissions.reduce((sum, s) => sum + (s.dietScore || 0), 0) /
						submissions.length,
					"Food Waste":
						submissions.reduce((sum, s) => sum + (s.foodWasteScore || 0), 0) /
						submissions.length,
					Shopping:
						submissions.reduce((sum, s) => sum + (s.shoppingScore || 0), 0) /
						submissions.length,
					Waste:
						submissions.reduce((sum, s) => sum + (s.wasteScore || 0), 0) /
						submissions.length,
					Electronics:
						submissions.reduce((sum, s) => sum + (s.electronicsScore || 0), 0) /
						submissions.length,
					Travel:
						submissions.reduce((sum, s) => sum + (s.travelScore || 0), 0) /
						submissions.length,
					Appliances:
						submissions.reduce((sum, s) => sum + (s.applianceScore || 0), 0) /
						submissions.length,
					Home:
						submissions.reduce((sum, s) => sum + (s.homeScore || 0), 0) /
						submissions.length,
					Heating:
						submissions.reduce((sum, s) => sum + (s.heatingScore || 0), 0) /
						submissions.length,
					"Digital Devices":
						submissions.reduce((sum, s) => sum + (s.digitalScore || 0), 0) /
						submissions.length,
					Pets:
						submissions.reduce((sum, s) => sum + (s.petsScore || 0), 0) /
						submissions.length,
					Garden:
						submissions.reduce((sum, s) => sum + (s.gardenScore || 0), 0) /
						submissions.length,
			  }
			: {};

	const categoryData = Object.entries(categoryAverages).map(([key, value]) => ({
		category: key,
		average: Number(value.toFixed(1)),
	}));

	if (loading) {
		return (
			<div className="space-y-4 sm:space-y-6">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics</h1>
					<p className="text-sm sm:text-base text-muted-foreground">
						Loading your carbon footprint analytics...
					</p>
				</div>
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
					{[...Array(4)].map((_, i) => (
						<Card key={i} className="shadow-lg">
							<CardContent className="p-4 sm:p-6">
								<div className="animate-pulse space-y-2">
									<div className="h-3 sm:h-4 bg-muted rounded w-3/4"></div>
									<div className="h-6 sm:h-8 bg-muted rounded w-1/2"></div>
								</div>
							</CardContent>
						</Card>
					))}
				</div>
			</div>
		);
	}

	return (
		<div className="space-y-4 sm:space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Analytics</h1>
					<p className="text-sm sm:text-base text-muted-foreground">
						Detailed insights into your carbon footprint
					</p>
				</div>
				<Select value={period} onValueChange={setPeriod}>
					<SelectTrigger className="w-full sm:w-[180px] touch-target">
						<SelectValue placeholder="Select period" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="week">Last Week</SelectItem>
						<SelectItem value="month">Last Month</SelectItem>
						<SelectItem value="all">All Time</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Stats cards */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
				<Card className="shadow-lg">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium">
							Average Score
						</CardTitle>
						<Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-lg sm:text-2xl font-bold">
							{averageScore.toFixed(1)} kg
						</div>
						<p className="text-xs text-muted-foreground">CO₂ equivalent</p>
					</CardContent>
				</Card>

				<Card className="shadow-lg">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium">
							Latest Score
						</CardTitle>
						{trend < 0 ? (
							<TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
						) : (
							<TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
						)}
					</CardHeader>
					<CardContent>
						<div className="text-lg sm:text-2xl font-bold">
							{latestSubmission?.totalEmissionScore?.toFixed(1) || "0"} kg
						</div>
						<p className="text-xs text-muted-foreground">
							{trend !== 0 && (
								<span className={trend < 0 ? "text-green-600" : "text-red-600"}>
									{trend < 0 ? "↓" : "↑"} {Math.abs(trend).toFixed(1)} from last
								</span>
							)}
						</p>
					</CardContent>
				</Card>

				<Card className="shadow-lg">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium">
							Submissions
						</CardTitle>
						<Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-lg sm:text-2xl font-bold">{submissions.length}</div>
						<p className="text-xs text-muted-foreground">Tracking sessions</p>
					</CardContent>
				</Card>

				<Card className="shadow-lg">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium">
							Impact Level
						</CardTitle>
						<Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-lg sm:text-2xl font-bold">
							<Badge
								variant={
									latestSubmission?.impactCategory === "Low"
										? "default"
										: latestSubmission?.impactCategory === "Medium"
										? "secondary"
										: "destructive"
								}
								className="text-xs"
							>
								{latestSubmission?.impactCategory || "Unknown"}
							</Badge>
						</div>
						<p className="text-xs text-muted-foreground">Current category</p>
					</CardContent>
				</Card>
			</div>

			{/* Charts */}
			<div className="grid gap-4 lg:grid-cols-2">
				{/* @ts-ignore */}
				<EmissionChart submissions={submissions} />
				<CategoryBreakdown latestSubmission={latestSubmission} />
			</div>

			{/* Category Performance */}

			<Card className="w-full sm:w-[900px] lg:w-[1100px] shadow-lg">
				<CardHeader>
					<CardTitle className="text-lg sm:text-xl">Category Performance</CardTitle>
					<CardDescription>
						Average emissions by category over the selected period
					</CardDescription>
				</CardHeader>

				<CardContent>
					<ChartContainer
						config={{
							average: {
								label: "Average CO₂ (kg)",
								color: "hsl(var(--chart-1))",
							},
						}}
						className="h-[450px] sm:h-[450px]" // Increased height
					>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={categoryData}>
								<XAxis
									dataKey="category"
									fontSize={16}
									tick={{ fontSize: 12 }}
									interval={1} // Less crowding; use 2 or 'preserveStartEnd' if still crowded
									angle={-30} // Less tilted for better readability
									textAnchor="end"
									height={70}
								/>
								<YAxis fontSize={12} />
								<ChartTooltip content={<ChartTooltipContent />} />
								<Bar
									dataKey="average"
									fill="var(--color-average)"
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</ChartContainer>
				</CardContent>
			</Card>
		</div>
	);
}
