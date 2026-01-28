import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import { z } from "zod";

const credentialsSchema = z.object({
	email: z.string().email(),
	password: z.string().min(1),
});

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
		CredentialsProvider({
			name: "credentials",
			credentials: {
				email: { label: "Email", type: "email" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) return null;

				const parsed = credentialsSchema.safeParse(credentials);
				if (!parsed.success) return null;

				const { email, password } = parsed.data;
				const user = await prisma.user.findUnique({ where: { email } });
				if (!user || !user.password) return null;

				const isValid = await compare(password, user.password);
				if (!isValid) return null;

				return {
					id: user.id,
					email: user.email,
					name: user.name,
					image: user.image,
					onboardingCompleted: user.onboardingCompleted,
				};
			},
		}),
	],
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async jwt({ token, user, trigger, session }) {
			// On initial sign-in
			if (user) {
				token.id = user.id;
			}

			// Always fetch onboardingCompleted from DB using token.id
			if (token.id) {
				const dbUser = await prisma.user.findUnique({
					where: { id: token.id as string },
					select: { onboardingCompleted: true },
				});
				token.onboardingCompleted = dbUser?.onboardingCompleted ?? false;
			}

			// If session was updated manually (e.g., after onboarding)
			if (trigger === "update" && session?.onboardingCompleted !== undefined) {
				token.onboardingCompleted = session.onboardingCompleted;
			}

			return token;
		},
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.id as string;
				session.user.onboardingCompleted = token.onboardingCompleted as boolean;
			}
			return session;
		},
	},
	pages: {
		signIn: "/auth/signin",
	},
	debug: process.env.NODE_ENV === "development",
};
