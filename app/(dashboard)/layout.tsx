import type React from "react";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ThemeToggle } from "@/components/theme-toggle";
import ChatBot from "@/components/ChatBot/ChatBot";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
	return (
		<SidebarProvider>
			<AppSidebar />
			<SidebarInset>
				<header className="flex h-14 sm:h-16 shrink-0 items-center gap-2 border-b px-3 sm:px-4">
					<SidebarTrigger className="-ml-1 touch-target" />
					<Separator orientation="vertical" className="mr-2 h-4" />
					<Breadcrumb className="flex-1 min-w-0">
						<BreadcrumbList>
							<BreadcrumbItem className="hidden sm:block">
								<BreadcrumbLink href="/dashboard" className="truncate">
									Giki Zero
								</BreadcrumbLink>
							</BreadcrumbItem>
							<BreadcrumbSeparator className="hidden sm:block" />
							<BreadcrumbItem>
								<BreadcrumbPage className="truncate">Dashboard</BreadcrumbPage>
							</BreadcrumbItem>
						</BreadcrumbList>
					</Breadcrumb>
					<div className="ml-auto">
						<ThemeToggle />
					</div>
				</header>
				<div className="flex flex-1 flex-col gap-3 sm:gap-4 p-3 sm:p-4 pt-0 mobile-scroll">
					{children}
					<ChatBot />
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}
