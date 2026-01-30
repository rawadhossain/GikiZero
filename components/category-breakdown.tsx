"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";

interface Submission {
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
}

interface CategoryBreakdownProps {
	latestSubmission: Submission | null;
}

const COLORS = [
	"hsl(var(--chart-1))",
	"hsl(var(--chart-2))",
	"hsl(var(--chart-3))",
	"hsl(var(--chart-4))",
	"hsl(var(--chart-5))",
	"#8884d8",
	"#82ca9d",
	"#ffc658",
	"#ff7300",
	"#00ff00",
];

export function CategoryBreakdown({ latestSubmission }: CategoryBreakdownProps) {
	if (!latestSubmission) {
		return (
			<Card className="shadow-lg">
				<CardHeader>
					<CardTitle>Emission Breakdown</CardTitle>
					<CardDescription>No data available</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="flex items-center justify-center h-[300px] text-muted-foreground">
						Take a survey to see your emission breakdown
					</div>
				</CardContent>
			</Card>
		);
	}

	const data = [
		{ name: "Transportation", value: latestSubmission.transportationScore },
		{ name: "Energy", value: latestSubmission.energyScore },
		{ name: "Water", value: latestSubmission.waterScore },
		{ name: "Diet", value: latestSubmission.dietScore },
		{ name: "Food Waste", value: latestSubmission.foodWasteScore },
		{ name: "Shopping", value: latestSubmission.shoppingScore },
		{ name: "Waste", value: latestSubmission.wasteScore },
		{ name: "Electronics", value: latestSubmission.electronicsScore },
		{ name: "Travel", value: latestSubmission.travelScore },
		{ name: "Appliances", value: latestSubmission.applianceScore },
	].filter((item) => item.value > 0);

	return (
		<Card className="shadow-lg">
			<CardHeader>
				<CardTitle>Emission Breakdown</CardTitle>
				<CardDescription>Your carbon footprint by category</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={{
						value: {
							label: "CO₂ Emissions (kg)",
						},
					}}
					className="h-[300px]"
				>
					<ResponsiveContainer width="100%" height="100%">
						<PieChart>
							<Pie
								data={data}
								cx="50%"
								cy="50%"
								outerRadius={80}
								fill="#8884d8"
								dataKey="value"
								label={({ name }) => `${name}`}
							>
								{data.map((entry, index) => (
									<Cell
										key={`cell-${index}`}
										fill={COLORS[index % COLORS.length]}
									/>
								))}
							</Pie>
							<ChartTooltip content={<ChartTooltipContent />} />
						</PieChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
