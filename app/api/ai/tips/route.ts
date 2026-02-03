import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { submissionData, totalScore, impactCategory } = await request.json();

		// For now, generate sample tips based on the data
		// In production, this would call Gemini or Groq API
		const tips = await generateSampleTips(submissionData, totalScore, impactCategory);

		// Delete old tips and create new ones
		await prisma.aiTip.deleteMany({
			where: { userId: session.user.id },
		});

		const createdTips = await Promise.all(
			tips.map((tip) =>
				prisma.aiTip.create({
					data: {
						userId: session.user.id,
						title: tip.title,
						description: tip.description,
						category: tip.category,
						impact: tip.impact,
						reasoning: tip.reasoning,
					},
				})
			)
		);

		return NextResponse.json({ tips: createdTips });
	} catch (error) {
		console.error("AI tips generation error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}

async function generateSampleTips(submissionData: any, totalScore: number, impactCategory: string) {
	const tips = [];

	// Transportation tips
	if (
		submissionData.transportationType === "car-gasoline" ||
		submissionData.transportationType === "car-diesel"
	) {
		tips.push({
			title: "Switch to Electric or Hybrid Vehicle",
			description:
				"Consider upgrading to an electric or hybrid vehicle for your next car purchase. This can reduce your transportation emissions by up to 60%.",
			category: "Transportation",
			impact: "High",
			reasoning:
				"Transportation is one of the largest sources of personal carbon emissions. Electric vehicles produce zero direct emissions and are becoming more affordable and accessible.",
		});
	}

	// Energy tips
	if (
		submissionData.electricityUnits === "high" ||
		submissionData.electricityUnits === "very-high"
	) {
		tips.push({
			title: "Upgrade to Energy-Efficient Appliances",
			description:
				"Replace old appliances with ENERGY STAR certified models and switch to LED lighting throughout your home.",
			category: "Energy",
			impact: "Medium",
			reasoning:
				"Energy-efficient appliances can reduce your electricity consumption by 20-30%, significantly lowering your carbon footprint and energy bills.",
		});
	}

	// Diet tips
	if (submissionData.dietType === "omnivore" || submissionData.dietType === "high-meat") {
		tips.push({
			title: "Adopt Meatless Mondays",
			description:
				"Try going meat-free one day per week. This simple change can reduce your dietary carbon footprint by 15%.",
			category: "Diet",
			impact: "Medium",
			reasoning:
				"Livestock farming produces significant greenhouse gases. Reducing meat consumption even slightly can have a meaningful environmental impact.",
		});
	}

	// Travel tips
	if (
		submissionData.airTravelFreq === "frequently" ||
		submissionData.airTravelFreq === "very-frequently"
	) {
		tips.push({
			title: "Offset Your Flight Emissions",
			description:
				"Consider purchasing carbon offsets for your flights and explore alternative transportation for shorter trips.",
			category: "Travel",
			impact: "High",
			reasoning:
				"Air travel has a very high carbon intensity. Offsetting flights and reducing unnecessary air travel can significantly reduce your overall footprint.",
		});
	}

	// Waste tips
	if (submissionData.recyclingHabits === "rarely" || submissionData.recyclingHabits === "never") {
		tips.push({
			title: "Improve Recycling Habits",
			description:
				"Set up a proper recycling system at home and learn about your local recycling guidelines to maximize waste diversion.",
			category: "Waste",
			impact: "Low",
			reasoning:
				"Proper recycling reduces the need for new materials and prevents waste from going to landfills, where it produces methane.",
		});
	}

	// Default tips if none match
	if (tips.length === 0) {
		tips.push(
			{
				title: "Use a Programmable Thermostat",
				description:
					"Install a programmable thermostat to optimize your heating and cooling usage, potentially saving 10% on energy costs.",
				category: "Energy",
				impact: "Medium",
				reasoning:
					"Heating and cooling account for nearly half of home energy use. Smart temperature control can significantly reduce energy waste.",
			},
			{
				title: "Choose Sustainable Transportation",
				description:
					"Walk, bike, or use public transportation for short trips instead of driving when possible.",
				category: "Transportation",
				impact: "Medium",
				reasoning:
					"Short car trips are often the least efficient and can easily be replaced with more sustainable alternatives.",
			}
		);
	}

	return tips.slice(0, 3); // Return up to 3 tips
}
