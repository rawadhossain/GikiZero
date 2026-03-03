import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface CategoryPerformanceCardProps {
	latestSubmission: any | null;
}

const CATEGORIES = [
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
];

export function CategoryPerformanceCard({ latestSubmission }: CategoryPerformanceCardProps) {
	if (!latestSubmission) {
		return (
			<Card className="shadow-lg animate-fade-in">
				<CardHeader>
					<CardTitle>Category Performance</CardTitle>
				</CardHeader>
				<CardContent>
					<div className="text-muted-foreground py-8 text-center">No data available</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="shadow-lg animate-fade-in">
			<CardHeader>
				<CardTitle>Category Performance</CardTitle>
			</CardHeader>
			<CardContent>
				<div className="overflow-x-auto">
					<table className="min-w-full text-sm">
						<thead>
							<tr>
								<th className="text-left py-2 px-2 font-semibold">Category</th>
								<th className="text-right py-2 px-2 font-semibold">
									Score (kg CO₂)
								</th>
							</tr>
						</thead>
						<tbody>
							{CATEGORIES.map(({ key, label }) => (
								<tr
									key={key}
									className="border-b last:border-0 hover:bg-muted/30 transition-colors"
								>
									<td className="py-2 px-2">{label}</td>
									<td className="py-2 px-2 text-right font-mono">
										{typeof latestSubmission[key] === "number"
											? latestSubmission[key].toFixed(1)
											: "-"}
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}
