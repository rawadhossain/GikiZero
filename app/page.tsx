"use client";

import { useRouter } from "next/navigation";
import { Navbar } from "@/components/Landing/navbar";
import { FloatingNavDemo } from "@/components/Landing/floating-nav-demo";
import { HeroSection } from "@/components/Landing/hero-section";
import { AchievementsSection } from "@/components/Landing/achievements-section";
import { HowItWorksSection } from "@/components/Landing/how-it-works-section";
import { AIAssistantSection } from "@/components/Landing/ai-assistant-section";
import { CTABanner } from "@/components/Landing/cta-banner";
import { Footer } from "@/components/Landing/footer";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function HomePage() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		// If user is authenticated, redirect to dashboard
		if (status === "authenticated" && session?.user) {
			router.push("/dashboard");
		}
	}, [status, session, router]);

	if (status === "loading") {
		return (
			<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black text-white">
				<div className="flex flex-col items-center space-y-6">
					{/* Modern Pulsing Spinner */}
					<div className="relative flex h-20 w-20 items-center justify-center">
						{/* Outer pulsating glow */}
						<div className="absolute h-full w-full rounded-full bg-green-500 opacity-20 animate-ping-slow"></div>
						{/* Inner primary circle */}
						<div className="relative h-12 w-12 rounded-full bg-gradient-to-br from-green-600 to-blue-600 animate-pulse-slow"></div>
						{/* Optional: A small central dot for more detail */}
						<div className="absolute h-4 w-4 rounded-full bg-white opacity-70"></div>
					</div>
					<span className="pl-6 text-2xl font-semibold text-gray-500 animate-fade-in drop-shadow-lg">
						Loading...
					</span>
				</div>
			</div>
		);
	}

	// If authenticated, don't show landing page content
	if (status === "authenticated") {
		return null;
	}

	return (
		<main className="min-h-screen bg-gray-900 overflow-x-hidden">
			<Navbar />
			<FloatingNavDemo />
			<div id="home">
				<HeroSection />
			</div>
			{/* <div id="features">
				<TakeActionSection />
			</div> */}
			<AchievementsSection />
			<div id="how-it-works">
				<HowItWorksSection />
			</div>
			<AIAssistantSection />
			<CTABanner />
			<div id="contact">
				<Footer />
			</div>
		</main>
	);
}
