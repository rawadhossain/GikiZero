"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

interface Submission {
	id: string;
	totalEmissionScore: number;
	createdAt: Date;
}

interface EmissionChartProps {
	submissions: Submission[];
}

export function EmissionChart({ submissions }: EmissionChartProps) {
	const chartData = submissions
		.slice(0, 10)
		.reverse()
		.map((submission, index) => ({
			date: new Date(submission.createdAt).toLocaleDateString("en-US", {
				month: "short",
				day: "numeric",
			}),
			emissions: submission.totalEmissionScore,
			index: index + 1,
		}));

	return (
		<Card className="shadow-lg">
			<CardHeader>
				<CardTitle>Emission Trends</CardTitle>
				<CardDescription>Your carbon footprint over time</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer
					config={{
						emissions: {
							label: "CO₂ Emissions (kg)",
							color: "hsl(var(--chart-1))",
						},
					}}
					className="h-[300px]"
				>
					<ResponsiveContainer width="100%" height="100%">
						<LineChart data={chartData}>
							<XAxis dataKey="date" />
							<YAxis />
							<ChartTooltip content={<ChartTooltipContent />} />
							<Line
								type="monotone"
								dataKey="emissions"
								stroke="var(--color-emissions)"
								strokeWidth={2}
								dot={{ fill: "var(--color-emissions)", strokeWidth: 3, r: 4 }}
							/>
						</LineChart>
					</ResponsiveContainer>
				</ChartContainer>
			</CardContent>
		</Card>
	);
}
