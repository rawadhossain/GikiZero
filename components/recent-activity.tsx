import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, TrendingDown, TrendingUp } from "lucide-react";

interface Submission {
	id: string;
	totalEmissionScore: number;
	impactCategory: string;
	createdAt: Date;
}

interface RecentActivityProps {
	submissions: Submission[];
}

export function RecentActivity({ submissions }: RecentActivityProps) {
	return (
		<Card className="shadow-lg">
			<CardHeader>
				<CardTitle className="flex items-center gap-2">
					<Calendar className="h-5 w-5" />
					Recent Activity
				</CardTitle>
				<CardDescription>Your latest carbon tracking submissions</CardDescription>
			</CardHeader>
			<CardContent>
				{submissions.length > 0 ? (
					<div className="space-y-3">
						{submissions.map((submission, index) => {
							const prevSubmission = submissions[index + 1];
							const trend = prevSubmission
								? submission.totalEmissionScore - prevSubmission.totalEmissionScore
								: 0;

							return (
								<div
									key={submission.id}
									className="flex items-center justify-between p-3 rounded-lg border"
								>
									<div className="space-y-1">
										<div className="flex items-center gap-2">
											<span className="text-sm font-medium">
												{new Date(
													submission.createdAt
												).toLocaleDateString()}
											</span>
											<Badge variant="outline" className="text-xs">
												{submission.impactCategory}
											</Badge>
										</div>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<span>
												{submission.totalEmissionScore.toFixed(1)} kg CO₂
											</span>
											{trend !== 0 && (
												<div
													className={`flex items-center gap-1 ${
														trend < 0
															? "text-green-600"
															: "text-red-600"
													}`}
												>
													{trend < 0 ? (
														<TrendingDown className="h-3 w-3" />
													) : (
														<TrendingUp className="h-3 w-3" />
													)}
													<span className="text-xs">
														{Math.abs(trend).toFixed(1)}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							);
						})}
					</div>
				) : (
					<div className="flex items-center justify-center h-[200px] text-muted-foreground">
						No submissions yet. Take your first survey!
					</div>
				)}
			</CardContent>
		</Card>
	);
}
