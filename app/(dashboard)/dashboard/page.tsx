import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Leaf, TrendingUp, Target, Award, Calendar, Zap } from "lucide-react";
import { EmissionChart } from "@/components/emission-chart";
import { CategoryBreakdown } from "@/components/category-breakdown";
import { AITipsCarousel } from "@/components/ai-tips-carousel";
import { RecentActivity } from "@/components/recent-activity";

export default async function DashboardPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		return <div>Not authenticated</div>;
	}

	const user = await prisma.user.findUnique({
		where: { id: session.user.id },
		include: {
			submissions: {
				orderBy: { createdAt: "desc" },
				take: 10,
			},
			aiTips: {
				orderBy: { createdAt: "desc" },
				take: 5,
			},
			badges: {
				include: { badge: true },
				orderBy: { earnedAt: "desc" },
			},
		},
	});

	if (!user) {
		return <div>User not found</div>;
	}

	const latestSubmission = user.submissions[0];
	const totalSubmissions = user.submissions.length;
	const averageScore =
		user.submissions.length > 0
			? user.submissions.reduce((sum, s) => sum + s.totalEmissionScore, 0) /
			  user.submissions.length
			: 0;

	// Calculate trend
	const trend =
		user.submissions.length >= 2
			? user.submissions[0].totalEmissionScore - user.submissions[1].totalEmissionScore
			: 0;

	return (
		<div className="space-y-4 sm:space-y-6">
			{/* Mobile-optimized header */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
				<div>
					<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
						Welcome back, {user.name?.split(" ")[0] || "there"} 👋
					</h1>
					<p className="text-sm sm:text-base text-muted-foreground">
						Track your carbon footprint and make a positive impact on the environment
					</p>
				</div>
				<Button asChild className="w-full sm:w-auto touch-target">
					<Link href="/survey">
						<Leaf className="mr-2 h-4 w-4" />
						Take Survey
					</Link>
				</Button>
			</div>

			{/* Mobile-optimized stats cards */}
			<div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
				{/* <Card className="shadow-lg"> */}
				{/* <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"> */}
				{/* <CardTitle className="text-xs sm:text-sm font-medium"> */}

				<Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/50 dark:to-emerald-950/50">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
						<CardTitle className="text-xs font-medium text-muted-foreground truncate">
							Current Score
						</CardTitle>
						<Leaf className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-lg sm:text-2xl font-bold">
							{latestSubmission
								? `${latestSubmission.totalEmissionScore.toFixed(1)}`
								: "0"}{" "}
							kg
						</div>
						<p className="text-xs text-muted-foreground">
							CO₂ equivalent
							{trend !== 0 && (
								<span
									className={`ml-1 ${
										trend < 0 ? "text-green-600" : "text-red-600"
									}`}
								>
									{trend < 0 ? "↓" : "↑"} {Math.abs(trend).toFixed(1)}
								</span>
							)}
						</p>
					</CardContent>
				</Card>

				{/* <Card className="shadow-lg">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium"> */}
				<Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/50 dark:to-cyan-950/50">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
						<CardTitle className="text-xs font-medium text-muted-foreground truncate">
							Impact Level
						</CardTitle>
						<Target className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-lg sm:text-2xl font-bold">
							{latestSubmission?.impactCategory || "Unknown"}
						</div>
						<p className="text-xs text-muted-foreground">Environmental impact</p>
					</CardContent>
				</Card>

				{/* <Card className="shadow-lg">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium"> */}
				<Card className="border-0 shadow-lg bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/50 dark:to-orange-950/50">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
						<CardTitle className="text-xs font-medium text-muted-foreground truncate">
							Streak
						</CardTitle>
						<Award className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-lg sm:text-2xl font-bold">{user.currentStreak}</div>
						<span className="text-xs text-muted-foreground">
							Days (Best: {user.longestStreak})
						</span>
					</CardContent>
				</Card>

				{/* <Card className="shadow-lg">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
						<CardTitle className="text-xs sm:text-sm font-medium"> */}
				<Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-950/50 dark:to-violet-950/50">
					<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 pt-3 px-3">
						<CardTitle className="text-xs font-medium text-muted-foreground truncate">
							Points
						</CardTitle>
						<Zap className="h-3 w-3 sm:h-4 sm:w-4 text-muted-foreground" />
					</CardHeader>
					<CardContent>
						<div className="text-lg sm:text-2xl font-bold">{user.totalPoints}</div>
						<p className="text-xs text-muted-foreground">Eco points earned</p>
					</CardContent>
				</Card>
			</div>

			{/* Mobile-optimized charts section */}
			<div className="grid gap-4 lg:grid-cols-2">
				<EmissionChart submissions={user.submissions} />
				<CategoryBreakdown latestSubmission={latestSubmission} />
			</div>

			{/* Mobile-optimized AI tips and activity */}
			<div className="grid gap-4 lg:grid-cols-2">
				<AITipsCarousel tips={user.aiTips} />
				<RecentActivity submissions={user.submissions.slice(0, 5)} />
			</div>

			{/* Mobile-optimized quick actions */}
			<Card className="shadow-lg">
				<CardHeader>
					<CardTitle>Quick Actions</CardTitle>
					<CardDescription>Continue your sustainability journey</CardDescription>
				</CardHeader>
				<CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					<Button asChild className="touch-target">
						<Link href="/survey">
							<Leaf className="mr-2 h-4 w-4" />
							New Survey
						</Link>
					</Button>
					<Button variant="outline" asChild className="touch-target bg-transparent">
						<Link href="/analytics">
							<TrendingUp className="mr-2 h-4 w-4" />
							View Analytics
						</Link>
					</Button>
					<Button variant="outline" asChild className="touch-target bg-transparent">
						<Link href="/reports">
							<Calendar className="mr-2 h-4 w-4" />
							Generate Report
						</Link>
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
