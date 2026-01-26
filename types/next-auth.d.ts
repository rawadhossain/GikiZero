import type { DefaultSession, DefaultJWT, DefaultUser } from "next-auth"; // Import DefaultUser

declare module "next-auth" {
	interface Session {
		user: {
			id: string;
			onboardingCompleted: boolean;
		} & DefaultSession["user"];
	}

	// Extend the User interface to include default properties and your custom ones
	interface User extends DefaultUser {
		onboardingCompleted: boolean;
	}
}

declare module "next-auth/jwt" {
	interface JWT extends DefaultJWT {
		id: string;
		onboardingCompleted: boolean;
	}
}
