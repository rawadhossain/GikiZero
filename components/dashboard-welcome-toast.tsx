"use client";
import { useEffect } from "react";
import { toast } from "sonner";

export function DashboardWelcomeToast({ name }: { name?: string | null }) {
	useEffect(() => {
		if (typeof window !== "undefined" && !sessionStorage.getItem("dashboard-welcome-toast")) {
			toast.success(`Welcome back${name ? ", " + name.split(" ")[0] : "!"}`, {
				description: "Check out your latest carbon stats and tips below.",
				duration: 4000,
			});
			sessionStorage.setItem("dashboard-welcome-toast", "1");
		}
	}, [name]);
	return null;
}
