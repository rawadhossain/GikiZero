import { type NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const onboardingSchema = z.object({
	name: z.string().min(1, "Name is required"),
	age: z.string().min(1, "Age is required"),
	location: z.string().min(1, "Location is required"),
});

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await request.json();
		const parsedData = onboardingSchema.safeParse(body);

		if (!parsedData.success) {
			return NextResponse.json(
				{
					error: "Invalid input",
					details: parsedData.error.flatten().fieldErrors,
				},
				{ status: 400 }
			);
		}

		const { name, age, location } = parsedData.data;

		const updatedUser = await prisma.user.update({
			where: { id: session.user.id },
			data: {
				name: name.trim(),
				age: age.trim(),
				location: location.trim(),
				onboardingCompleted: true,
			},
		});

		return NextResponse.json({
			message: "Onboarding completed successfully",
			user: {
				id: updatedUser.id,
				name: updatedUser.name,
				email: updatedUser.email,
				age: updatedUser.age,
				location: updatedUser.location,
				onboardingCompleted: updatedUser.onboardingCompleted,
			},
		});
	} catch (error) {
		console.error("Onboarding error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
