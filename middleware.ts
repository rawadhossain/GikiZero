import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
	function middleware(req) {
		const { token } = req.nextauth;
		const { pathname } = req.nextUrl;

		// Public routes - allow immediate access
		if (pathname === "/" || pathname.startsWith("/api/auth")) {
			return NextResponse.next();
		}

		// Handle authenticated users attempting to access auth pages
		if (pathname.startsWith("/auth") && token) {
			const redirectUrl = token.onboardingCompleted ? "/dashboard" : "/onboarding";
			return NextResponse.redirect(new URL(redirectUrl, req.url));
		}

		// Enforce onboarding completion
		if (token) {
			const hasCompletedOnboarding = token.onboardingCompleted;

			if (!hasCompletedOnboarding && !pathname.startsWith("/onboarding")) {
				return NextResponse.redirect(new URL("/onboarding", req.url));
			}

			if (hasCompletedOnboarding && pathname.startsWith("/onboarding")) {
				return NextResponse.redirect(new URL("/dashboard", req.url));
			}
		}

		return NextResponse.next();
	},
	{
		callbacks: {
			authorized: ({ token, req }) => {
				const { pathname } = req.nextUrl;
				const publicPaths = ["/", "/auth", "/api/auth"];

				// Check if current path is public
				const isPublicPath = publicPaths.some(
					(path) => pathname === path || pathname.startsWith(`${path}/`),
				);

				return isPublicPath || !!token;
			},
		},
		pages: {
			signIn: "/auth/signin",
		},
	},
);

export const config = {
	matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
