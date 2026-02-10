import { type NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { z } from "zod";

const signupSchema = z.object({
	email: z.string().email("Invalid email address"),
	password: z.string().min(8, "Password must be at least 8 characters long"),
	name: z.string().min(1, "Name is required").optional(),
});

export async function POST(request: NextRequest) {
	try {
		const body = await request.json();
		const validationResult = signupSchema.safeParse(body);

		if (!validationResult.success) {
			const fieldErrors = validationResult.error.flatten().fieldErrors;
			return NextResponse.json(
				{ error: "Invalid input", details: fieldErrors },
				{ status: 400 },
			);
		}

		const { email, password, name } = validationResult.data;

		// Check for existing user
		const existingUser = await prisma.user.findUnique({
			where: { email: email.toLowerCase() },
		});

		if (existingUser) {
			return NextResponse.json(
				{ error: "User with this email already exists" },
				{ status: 409 },
			);
		}

		// Hash password and create user
		const hashedPassword = await hash(password, 12);
		const userData = {
			email: email.toLowerCase(),
			password: hashedPassword,
			name: name || null,
			onboardingCompleted: false,
		};

		const newUser = await prisma.user.create({ data: userData });

		// Remove password from response
		const { password: _, ...safeUserData } = newUser;

		return NextResponse.json(
			{
				message: "User created successfully",
				user: safeUserData,
			},
			{ status: 201 },
		);
	} catch (error) {
		console.error("Signup error:", error);
		return NextResponse.json({ error: "Internal server error" }, { status: 500 });
	}
}
