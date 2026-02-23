export const dynamic = "force-dynamic";

import { type NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generatePDFReport } from "@/lib/pdf-generator";

export async function POST(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
		}

		const { type } = await request.json();

		// Fetch user data
		const user = await prisma.user.findUnique({
			where: { id: session.user.id },
			include: {
				submissions: {
					orderBy: { createdAt: "desc" },
					take: type === "weekly" ? 7 : type === "monthly" ? 30 : 100,
				},
				aiTips: {
					orderBy: { createdAt: "desc" },
					take: 5,
				},
			},
		});

		if (!user) {
			return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
		}

		// Generate PDF
		const pdfBuffer = await generatePDFReport(user, type);

		// Save report metadata to database
		await prisma.report.create({
			data: {
				userId: session.user.id,
				filename: `carbon-report-${type}-${new Date().toISOString().split("T")[0]}.pdf`,
				fileType: "application/pdf",
			},
		});

		return new Response(new Uint8Array(pdfBuffer), {
			headers: {
				"Content-Type": "application/pdf",
				"Content-Disposition": `attachment; filename="carbon-report-${type}.pdf"`,
			},
		});
	} catch (error) {
		console.error("PDF generation error:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
	}
}
