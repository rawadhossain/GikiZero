"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Download, FileText, Calendar } from "lucide-react";
import { toast } from "sonner";

export default function ReportsPage() {
	const [reportType, setReportType] = useState("monthly");
	const [isGenerating, setIsGenerating] = useState(false);
	const [recentReports, setRecentReports] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchRecentReports();
	}, []);

	const fetchRecentReports = async () => {
		try {
			const response = await fetch("/api/reports");
			const data = await response.json();
			setRecentReports(data.reports || []);
		} catch (error) {
			console.error("Error fetching reports:", error);
			toast.error("Failed to load reports", {
				description: "Please try refreshing the page.",
			});
		} finally {
			setLoading(false);
		}
	};

	const generateReport = async () => {
		setIsGenerating(true);
		try {
			toast.info("Generating your report...", {
				description: "This may take a few moments.",
			});

			const response = await fetch("/api/reports/generate", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ type: reportType }),
			});

			if (response.ok) {
				const blob = await response.blob();
				const url = window.URL.createObjectURL(blob);
				const a = document.createElement("a");
				a.style.display = "none";
				a.href = url;
				a.download = `carbon-footprint-report-${reportType}.pdf`;
				document.body.appendChild(a);
				a.click();
				window.URL.revokeObjectURL(url);

				toast.success("Report generated successfully!", {
					description: `Your ${reportType} report has been downloaded.`,
					duration: 5000,
				});

				// Refresh the reports list
				await fetchRecentReports();

				// Show additional toast for report features
				setTimeout(() => {
					toast.info("Report Features", {
						description:
							"Your report includes detailed analysis, charts, and AI-powered recommendations.",
						duration: 4000,
					});
				}, 1000);
			} else {
				const errorData = await response.json();
				toast.error("Failed to generate report", {
					description: errorData.error || "Please try again.",
				});
			}
		} catch (error) {
			console.error("Error generating report:", error);
			toast.error("Failed to generate report", {
				description: "Please check your connection and try again.",
			});
		} finally {
			setIsGenerating(false);
		}
	};

	return (
		<div className="space-y-4 sm:space-y-6">
			<div>
				<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Reports</h1>
				<p className="text-sm sm:text-base text-muted-foreground">
					Generate and download your carbon footprint reports
				</p>
			</div>

			<div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
				<Card className="shadow-lg">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
							<FileText className="h-4 w-4 sm:h-5 sm:w-5" />
							Generate Report
						</CardTitle>
						<CardDescription>
							Create a comprehensive PDF report of your carbon footprint
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Report Type</label>
							<Select value={reportType} onValueChange={setReportType}>
								<SelectTrigger className="touch-target">
									<SelectValue placeholder="Select report type" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="weekly">Weekly Report</SelectItem>
									<SelectItem value="monthly">Monthly Report</SelectItem>
									<SelectItem value="quarterly">Quarterly Report</SelectItem>
									<SelectItem value="yearly">Yearly Report</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<Button
							onClick={generateReport}
							disabled={isGenerating}
							className="w-full touch-target"
						>
							<Download className="mr-2 h-4 w-4" />
							{isGenerating ? "Generating..." : "Generate PDF Report"}
						</Button>
					</CardContent>
				</Card>

				<Card className="shadow-lg">
					<CardHeader>
						<CardTitle className="text-lg sm:text-xl">Report Features</CardTitle>
						<CardDescription>
							What's included in your carbon footprint report
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="space-y-3">
							{[
								"Personal profile and tracking period",
								"Total carbon footprint score",
								"Category breakdown charts",
								"Emission trends over time",
								"AI-generated sustainability tips",
								"Improvement recommendations",
							].map((feature, index) => (
								<div key={index} className="flex items-center gap-2">
									<Badge variant="secondary" className="text-xs">
										✓
									</Badge>
									<span className="text-sm">{feature}</span>
								</div>
							))}
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className="shadow-lg">
				<CardHeader>
					<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
						<Calendar className="h-4 w-4 sm:h-5 sm:w-5" />
						Recent Reports
					</CardTitle>
					<CardDescription>Your previously generated reports</CardDescription>
				</CardHeader>
				<CardContent>
					{loading ? (
						<div className="text-center py-8 text-muted-foreground">
							Loading reports...
						</div>
					) : recentReports.length > 0 ? (
						<div className="space-y-3">
							{recentReports.map((report: any) => (
								<div
									key={report.id}
									className="flex items-center justify-between p-3 rounded-lg border"
								>
									<div className="space-y-1 min-w-0 flex-1">
										<div className="flex items-center gap-2">
											<FileText className="h-4 w-4 flex-shrink-0" />
											<span className="font-medium text-sm truncate">
												{report.filename}
											</span>
											<Badge
												variant="outline"
												className="text-xs flex-shrink-0"
											>
												{report.type}
											</Badge>
										</div>
										<p className="text-xs text-muted-foreground">
											Generated on{" "}
											{new Date(report.createdAt).toLocaleDateString()}
										</p>
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="text-center py-8 text-muted-foreground">
							No reports generated yet. Create your first report above!
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
