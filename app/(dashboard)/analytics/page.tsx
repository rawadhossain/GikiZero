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
};

const CATEGORY_CONFIG = [
	{ key: "transportationScore", label: "Transportation" },
	{ key: "energyScore", label: "Energy" },
	{ key: "waterScore", label: "Water" },
	{ key: "dietScore", label: "Diet" },
	{ key: "foodWasteScore", label: "Food Waste" },
	{ key: "shoppingScore", label: "Shopping" },
	{ key: "wasteScore", label: "Waste" },
	{ key: "electronicsScore", label: "Electronics" },
	{ key: "travelScore", label: "Travel" },
	{ key: "applianceScore", label: "Appliances" },
	{ key: "homeScore", label: "Home" },
	{ key: "heatingScore", label: "Heating" },
	{ key: "digitalScore", label: "Digital Devices" },
	{ key: "petsScore", label: "Pets" },
	{ key: "gardenScore", label: "Garden" },
] as const;

const PERIOD_OPTIONS = [
	{ value: "week", label: "Last Week" },
	{ value: "month", label: "Last Month" },
	{ value: "all", label: "All Time" },
] as const;

export default function AnalyticsPage() {
	const [period, setPeriod] = useState("month");
	const [submissions, setSubmissions] = useState<Submission[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchSubmissions();
	}, [period]);

	const fetchSubmissions = async () => {
		setLoading(true);
		try {
			const response = await fetch(`/api/submissions?period=${period}`);
			const data = await response.json();

			const processedSubmissions = (data.submissions || []).map((submission: any) => ({
				...submission,
				createdAt: submission.createdAt ? new Date(submission.createdAt) : undefined,
			}));

			setSubmissions(processedSubmissions);
		} catch (error) {
			console.error("Error fetching submissions:", error);
		} finally {
			setLoading(false);
		}
	};

	const latestSubmission = submissions[0];
	const submissionCount = submissions.length;

	const averageScore =
		submissionCount > 0
			? submissions.reduce((sum, s) => sum + s.totalEmissionScore, 0) / submissionCount
			: 0;

	const trend =
		submissions.length >= 2
			? submissions[0]?.totalEmissionScore - submissions[1]?.totalEmissionScore
			: 0;

	const categoryAverages =
		submissionCount > 0
			? CATEGORY_CONFIG.reduce(
					(acc, { key, label }) => {
						const total = submissions.reduce((sum, s) => sum + (s[key] || 0), 0);
						acc[label] = total / submissionCount;
						return acc;
					},
					{} as Record<string, number>,
				)
			: {};

	const categoryData = Object.entries(categoryAverages).map(([category, average]) => ({
		category,
		average: Number(average.toFixed(1)),
	}));

	const getTrendIcon = () => {
		if (trend < 0) return <TrendingDown className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />;
		return <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />;
	};

	const getImpactBadgeVariant = () => {
		const impactCategory = latestSubmission?.impactCategory;
		if (impactCategory === "Low") return "default";
		if (impactCategory === "Medium") return "secondary";
		return "destructive";
	};

	if (loading) {
		return (
			<div className="space-y-4 sm:space-y-6">
				<PageHeader
					title="Analytics"
					description="Loading your carbon footprint analytics..."
				/>
				<StatsGridSkeleton />
			</div>
		);
	}

	const statsCards = [
		{
			title: "Average Score",
			value: `${averageScore.toFixed(1)} kg`,
			description: "CO₂ equivalent",
			icon: <Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />,
		},
		{
			title: "Latest Score",
			value: `${latestSubmission?.totalEmissionScore?.toFixed(1) || "0"} kg`,
			description:
				trend !== 0
					? `${trend < 0 ? "↓" : "↑"} ${Math.abs(trend).toFixed(1)} from last`
					: undefined,
			trendColor: trend < 0 ? "text-green-600" : "text-red-600",
			icon: getTrendIcon(),
		},
		{
			title: "Submissions",
			value: submissionCount.toString(),
			description: "Tracking sessions",
			icon: <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />,
		},
		{
			title: "Impact Level",
			value: (
				<Badge variant={getImpactBadgeVariant()} className="text-xs">
					{latestSubmission?.impactCategory || "Unknown"}
				</Badge>
			),
			description: "Current category",
			icon: <Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />,
		},
	];

	return (
		<div className="space-y-4 sm:space-y-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<PageHeader
					title="Analytics"
					description="Detailed insights into your carbon footprint"
				/>
				<Select value={period} onValueChange={setPeriod}>
					<SelectTrigger className="w-full sm:w-[180px] touch-target">
						<SelectValue placeholder="Select period" />
					</SelectTrigger>
					<SelectContent>
						{PERIOD_OPTIONS.map(({ value, label }) => (
							<SelectItem key={value} value={value}>
								{label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
				{statsCards.map((card, index) => (
					<Card key={index} className="shadow-lg">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-xs sm:text-sm font-medium">
								{card.title}
							</CardTitle>
							{card.icon}
						</CardHeader>
						<CardContent>
							<div className="text-lg sm:text-2xl font-bold">{card.value}</div>
							<p className={`text-xs text-muted-foreground ${card.trendColor || ""}`}>
								{card.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<div className="grid gap-4 lg:grid-cols-2">
				<EmissionChart submissions={submissions} />
				<CategoryBreakdown latestSubmission={latestSubmission} />
			</div>

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
						className="h-[450px] sm:h-[450px]"
					>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={categoryData}>
								<XAxis
									dataKey="category"
									fontSize={16}
									tick={{ fontSize: 12 }}
									interval={1}
									angle={-30}
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

// Helper Components
function PageHeader({ title, description }: { title: string; description: string }) {
	return (
		<div>
			<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">{title}</h1>
			<p className="text-sm sm:text-base text-muted-foreground">{description}</p>
		</div>
	);
}

function StatsGridSkeleton() {
	return (
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
	);
}
