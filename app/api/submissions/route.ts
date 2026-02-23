import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateCarbonScore } from "@/lib/carbon-scoring";

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const data = await request.json();

		// Calculate carbon scores
		const { scores, totalScore, impactCategory } = calculateCarbonScore(data);

		// Create submission
		const submission = await prisma.submission.create({
			data: {
				userId: session.user.id,
				transportationType: data.transportationType,
				transportationFrequency: data.transportationFrequency,
				transportationDistance: data.transportationDistance,
				transportationScore: scores.transportation,
				electricityUnits: data.electricityUnits,
				renewableEnergy: data.renewableEnergy === "true" || data.renewableEnergy === true,
				energyScore: scores.energy,
				waterUsage: data.waterUsage,
				waterScore: scores.water,
				dietType: data.dietType,
				dietScore: scores.diet,
				foodWasteLevel: data.foodWasteLevel,
				foodWasteScore: scores.foodWaste,
				clothesPerMonth: data.clothesPerMonth,
				shoppingScore: scores.shopping,
				recyclingHabits: data.recyclingHabits,
				wasteScore: scores.waste,
				streamingHabits: data.streamingHabits,
				electronicsScore: scores.electronics,
				airTravelFreq: data.airTravelFreq,
				travelScore: scores.travel,
				applianceUsage: data.applianceUsage,
				applianceScore: scores.appliance,
				totalEmissionScore: totalScore,
				impactCategory,
			},
		});

		// Update user streak and points
		await updateUserStats(session.user.id, totalScore);

		// Generate AI tips
		await generateAITips(session.user.id, data, totalScore, impactCategory);

		return NextResponse.json({ submission, totalScore, impactCategory });
	} catch (error) {
		console.error("Submission error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = new URL(request.url);
		const period = searchParams.get("period") || "month";

		let dateFilter = {};
		const now = new Date();

		if (period === "week") {
			const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
			dateFilter = { gte: weekAgo };
		} else if (period === "month") {
			const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
			dateFilter = { gte: monthAgo };
		}

		const submissions = await prisma.submission.findMany({
			where: {
				userId: session.user.id,
				createdAt: dateFilter,
			},
			orderBy: { createdAt: "desc" },
		});

		return NextResponse.json({ submissions });
	} catch (error) {
		console.error("Get submissions error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

async function updateUserStats(userId: string, currentScore: number) {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		include: {
			submissions: {
				orderBy: { createdAt: "desc" },
				take: 2,
			},
		},
	});

	if (!user) return;

	let points = 0;
	let streakIncrement = 0;

	// Award points based on improvement
	if (user.submissions.length > 1) {
		const previousScore = user.submissions[1].totalEmissionScore;
		if (currentScore < previousScore) {
			points = Math.floor((previousScore - currentScore) / 10);
			streakIncrement = 1;
		}
	} else {
		points = 50; // First submission bonus
		streakIncrement = 1;
	}

	// Check if submission is within 24 hours of last one for streak
	const lastSubmission = user.submissions[0];
	const now = new Date();
	const daysSinceLastSubmission = lastSubmission
		? Math.floor((now.getTime() - lastSubmission.createdAt.getTime()) / (1000 * 60 * 60 * 24))
		: 999;

	let newStreak = user.currentStreak;
	if (daysSinceLastSubmission <= 1) {
		newStreak += streakIncrement;
	} else if (daysSinceLastSubmission > 7) {
		newStreak = streakIncrement;
	}

	await prisma.user.update({
		where: { id: userId },
		data: {
			currentStreak: newStreak,
			longestStreak: Math.max(user.longestStreak, newStreak),
			totalPoints: user.totalPoints + points,
		},
	});
}

async function generateAITips(
	userId: string,
	submissionData: any,
	totalScore: number,
	impactCategory: string
) {
	// For now, we'll create some sample tips
	// In production, this would call the AI API
	const sampleTips = [
		{
			title: "Switch to Public Transport",
			description:
				"Consider using public transportation or carpooling to reduce your transportation emissions by up to 45%.",
			category: "Transportation",
			impact: "High",
			reasoning:
				"Transportation accounts for a significant portion of your carbon footprint. Public transport can dramatically reduce individual emissions.",
		},
		{
			title: "Reduce Meat Consumption",
			description:
				"Try having one or two plant-based meals per week to lower your dietary carbon footprint.",
			category: "Diet",
			impact: "Medium",
			reasoning:
				"Livestock farming produces significant greenhouse gases. Even small reductions in meat consumption can make a meaningful difference.",
		},
		{
			title: "Improve Home Energy Efficiency",
			description:
				"Consider switching to LED bulbs and unplugging devices when not in use to reduce energy consumption.",
			category: "Energy",
			impact: "Medium",
			reasoning:
				"Small changes in energy usage can compound over time, reducing both your carbon footprint and energy bills.",
		},
	];

	// Delete old tips and create new ones
	await prisma.aiTip.deleteMany({
		where: { userId },
	});

	for (const tip of sampleTips) {
		await prisma.aiTip.create({
			data: {
				userId,
				title: tip.title,
				description: tip.description,
				category: tip.category,
				impact: tip.impact,
				reasoning: tip.reasoning,
			},
		});
	}
}
