"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Settings, Bell, Shield, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function SettingsPage() {
	const { data: session } = useSession();
	const [isLoading, setIsLoading] = useState(false);
	const [settings, setSettings] = useState({
		notifications: true,
		weeklyReminders: true,
		dataSharing: false,
		units: "metric",
	});

	const handleSave = async () => {
		setIsLoading(true);
		try {
			// Simulate API call
			await new Promise((resolve) => setTimeout(resolve, 1000));
			toast.success("Settings saved successfully!", {
				description: "Your preferences have been updated and will take effect immediately.",
				duration: 4000,
			});
		} catch (error) {
			toast.error("Failed to save settings", {
				description: "Please check your connection and try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const handleNotificationChange = (checked: boolean) => {
		setSettings((prev) => ({ ...prev, notifications: checked }));
		toast.info(checked ? "Notifications enabled" : "Notifications disabled", {
			description: checked
				? "You'll receive updates about your carbon tracking progress."
				: "You won't receive push notifications.",
			duration: 3000,
		});
	};

	const handleWeeklyRemindersChange = (checked: boolean) => {
		setSettings((prev) => ({ ...prev, weeklyReminders: checked }));
		toast.info(checked ? "Weekly reminders enabled" : "Weekly reminders disabled", {
			description: checked
				? "You'll get reminded to complete your weekly carbon survey."
				: "You won't receive weekly survey reminders.",
			duration: 3000,
		});
	};

	const handleDataSharingChange = (checked: boolean) => {
		setSettings((prev) => ({ ...prev, dataSharing: checked }));
		toast.info(checked ? "Data sharing enabled" : "Data sharing disabled", {
			description: checked
				? "You're helping improve our platform with anonymous data."
				: "Your data will remain private and won't be shared.",
			duration: 3000,
		});
	};

	const handleUnitsChange = (value: string) => {
		setSettings((prev) => ({ ...prev, units: value }));
		toast.info("Measurement units updated", {
			description: `Switched to ${value === "metric" ? "metric" : "imperial"} units.`,
			duration: 3000,
		});
	};

	return (
		<div className="space-y-4 sm:space-y-6">
			<div>
				<h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Settings</h1>
				<p className="text-sm sm:text-base text-muted-foreground">
					Manage your account preferences and privacy settings
				</p>
			</div>

			<div className="grid gap-4 sm:gap-6">
				{/* Profile Settings */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
							<Settings className="h-4 w-4 sm:h-5 sm:w-5" />
							Profile Settings
						</CardTitle>
						<CardDescription>Update your personal information</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="name">Full Name</Label>
								<Input
									id="name"
									defaultValue={session?.user?.name || ""}
									placeholder="Enter your full name"
									className="touch-target"
									autoComplete="name"
								/>
							</div>
							<div className="space-y-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									type="email"
									defaultValue={session?.user?.email || ""}
									placeholder="Enter your email"
									disabled
									className="touch-target"
									autoComplete="email"
								/>
							</div>
						</div>
						<div className="grid gap-4 sm:grid-cols-2">
							<div className="space-y-2">
								<Label htmlFor="age">Age Range</Label>
								<Select>
									<SelectTrigger className="touch-target">
										<SelectValue placeholder="Select age range" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="18-25">18-25</SelectItem>
										<SelectItem value="26-35">26-35</SelectItem>
										<SelectItem value="36-45">36-45</SelectItem>
										<SelectItem value="46-55">46-55</SelectItem>
										<SelectItem value="56-65">56-65</SelectItem>
										<SelectItem value="65+">65+</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className="space-y-2">
								<Label htmlFor="location">Location</Label>
								<Input
									id="location"
									placeholder="City, Country"
									className="touch-target"
									autoComplete="address-level2"
								/>
							</div>
						</div>
					</CardContent>
				</Card>

				{/* Notification Settings */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
							<Bell className="h-4 w-4 sm:h-5 sm:w-5" />
							Notifications
						</CardTitle>
						<CardDescription>Configure how you receive updates</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between py-2">
							<div className="space-y-0.5 flex-1 pr-4">
								<Label className="text-sm font-medium">Push Notifications</Label>
								<p className="text-xs sm:text-sm text-muted-foreground">
									Receive notifications about your carbon tracking progress
								</p>
							</div>
							<Switch
								checked={settings.notifications}
								onCheckedChange={handleNotificationChange}
								className="touch-target"
							/>
						</div>
						<Separator />
						<div className="flex items-center justify-between py-2">
							<div className="space-y-0.5 flex-1 pr-4">
								<Label className="text-sm font-medium">Weekly Reminders</Label>
								<p className="text-xs sm:text-sm text-muted-foreground">
									Get reminded to complete your weekly carbon survey
								</p>
							</div>
							<Switch
								checked={settings.weeklyReminders}
								onCheckedChange={handleWeeklyRemindersChange}
								className="touch-target"
							/>
						</div>
					</CardContent>
				</Card>

				{/* Privacy Settings */}
				<Card>
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
							<Shield className="h-4 w-4 sm:h-5 sm:w-5" />
							Privacy & Data
						</CardTitle>
						<CardDescription>Control your data sharing preferences</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex items-center justify-between py-2">
							<div className="space-y-0.5 flex-1 pr-4">
								<Label className="text-sm font-medium">
									Anonymous Data Sharing
								</Label>
								<p className="text-xs sm:text-sm text-muted-foreground">
									Help improve our platform by sharing anonymized usage data
								</p>
							</div>
							<Switch
								checked={settings.dataSharing}
								onCheckedChange={handleDataSharingChange}
								className="touch-target"
							/>
						</div>
						<Separator />
						<div className="space-y-2">
							<Label>Measurement Units</Label>
							<Select value={settings.units} onValueChange={handleUnitsChange}>
								<SelectTrigger className="w-full sm:w-[200px] touch-target">
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="metric">Metric (kg, km)</SelectItem>
									<SelectItem value="imperial">Imperial (lbs, miles)</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</CardContent>
				</Card>

				{/* Danger Zone */}
				<Card className="border-red-200 dark:border-red-800">
					<CardHeader>
						<CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400 text-lg sm:text-xl">
							<Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
							Danger Zone
						</CardTitle>
						<CardDescription>Irreversible actions for your account</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border border-red-200 dark:border-red-800 rounded-lg">
							<div className="space-y-0.5">
								<Label className="text-red-600 dark:text-red-400 font-medium">
									Delete Account
								</Label>
								<p className="text-xs sm:text-sm text-muted-foreground">
									Permanently delete your account and all associated data
								</p>
							</div>
							<Button
								variant="destructive"
								size="sm"
								className="touch-target w-full sm:w-auto"
								onClick={() => {
									toast.error("Account deletion", {
										description:
											"This feature is not yet implemented. Please contact support.",
										duration: 4000,
									});
								}}
							>
								Delete Account
							</Button>
						</div>
					</CardContent>
				</Card>

				{/* Save Button */}
				<div className="flex justify-end">
					<Button
						onClick={handleSave}
						disabled={isLoading}
						className="w-full sm:w-auto touch-target"
					>
						{isLoading ? "Saving..." : "Save Changes"}
					</Button>
				</div>
			</div>
		</div>
	);
}
