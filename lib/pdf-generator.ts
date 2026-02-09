import { jsPDF } from "jspdf";

interface User {
	name: string | null;
	email: string;
	age: string | null;
	location: string | null;
	currentStreak: number;
	totalPoints: number;
	submissions: any[];
	aiTips: any[];
}

export async function generatePDFReport(user: User, reportType: string): Promise<Buffer> {
	const doc = new jsPDF();
	const pageWidth = doc.internal.pageSize.width;
	const pageHeight = doc.internal.pageSize.height;
	let yPosition = 30;

	// Enhanced Colors
	const primaryColor = [34, 139, 34]; // Green
	const secondaryColor = [100, 100, 100]; // Gray
	const accentColor = [0, 123, 255]; // Blue
	const warningColor = [255, 193, 7]; // Yellow
	const successColor = [40, 167, 69]; // Green

	// Header with enhanced design
	doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
	doc.rect(0, 0, pageWidth, 35, "F");

	// Logo and title with better typography
	doc.setTextColor(255, 255, 255);
	doc.setFontSize(32);
	doc.setFont("Helvetica", "bold");
	doc.text("🌱 GIKI ZERO", 20, 22);

	doc.setFontSize(14);
	doc.setFont("Helvetica", "normal");
	doc.text("Carbon Footprint Report", pageWidth - 80, 22);

	// Subtitle
	doc.setFontSize(10);
	doc.text(
		`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Analysis`,
		pageWidth - 80,
		30
	);

	yPosition = 50;

	// Report title with enhanced styling
	doc.setTextColor(0, 0, 0);
	doc.setFontSize(28);
	doc.setFont("Helvetica", "bold");
	doc.text(
		`${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Carbon Report`,
		20,
		yPosition
	);

	yPosition += 20;

	// Report metadata with better formatting
	doc.setFontSize(12);
	doc.setFont("Helvetica", "normal");
	doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
	doc.text(
		`Generated on: ${new Date().toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		})}`,
		20,
		yPosition
	);

	yPosition += 30;

	// User Information Section with enhanced design
	doc.setFillColor(248, 249, 250);
	doc.rect(15, yPosition - 8, pageWidth - 30, 45, "F");
	doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
	doc.setLineWidth(0.5);
	doc.rect(15, yPosition - 8, pageWidth - 30, 45, "S");

	doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
	doc.setFontSize(18);
	doc.setFont("Helvetica", "bold");
	doc.text("👤 Personal Information", 20, yPosition + 2);

	yPosition += 15;

	doc.setTextColor(0, 0, 0);
	doc.setFontSize(11);
	doc.setFont("Helvetica", "normal");

	const userInfo = [
		[`Name:`, user.name || "Not provided"],
		[`Email:`, user.email],
		[`Age:`, user.age || "Not provided"],
		[`Location:`, user.location || "Not provided"],
	];

	userInfo.forEach(([label, value], index) => {
		const xPos = index % 2 === 0 ? 20 : pageWidth / 2 + 10;
		const yPos = yPosition + Math.floor(index / 2) * 8;
		doc.setFont("Helvetica", "bold");
		doc.text(label, xPos, yPos);
		doc.setFont("Helvetica", "normal");
		doc.text(value, xPos + 25, yPos);
	});

	yPosition += 50;

	// Performance Summary with enhanced design
	if (user.submissions.length > 0) {
		const latestSubmission = user.submissions[0];
		const averageScore =
			user.submissions.reduce((sum, s) => sum + s.totalEmissionScore, 0) /
			user.submissions.length;

		// Enhanced background with gradient effect
		doc.setFillColor(accentColor[0], accentColor[1], accentColor[2]);
		doc.rect(15, yPosition - 8, pageWidth - 30, 55, "F");

		doc.setTextColor(255, 255, 255);
		doc.setFontSize(18);
		doc.setFont("Helvetica", "bold");
		doc.text("📊 Performance Summary", 20, yPosition + 2);

		yPosition += 15;

		doc.setFontSize(12);
		doc.setFont("Helvetica", "normal");

		const performanceData = [
			[`Latest Score:`, `${latestSubmission.totalEmissionScore.toFixed(1)} kg CO₂`],
			[`Average Score:`, `${averageScore.toFixed(1)} kg CO₂`],
			[`Impact Category:`, latestSubmission.impactCategory],
			[`Total Submissions:`, user.submissions.length.toString()],
			[`Current Streak:`, `${user.currentStreak} days`],
			[`Total Points:`, user.totalPoints.toString()],
		];

		performanceData.forEach(([label, value], index) => {
			const xPos = index % 2 === 0 ? 20 : pageWidth / 2 + 10;
			const yPos = yPosition + Math.floor(index / 2) * 8;
			doc.setFont("Helvetica", "bold");
			doc.text(label, xPos, yPos);
			doc.setFont("Helvetica", "normal");
			doc.text(value, xPos + 40, yPos);
		});

		yPosition += 65;

		// Category Breakdown with enhanced visuals
		doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
		doc.setFontSize(18);
		doc.setFont("Helvetica", "bold");
		doc.text("🏷️ Category Breakdown", 20, yPosition);

		yPosition += 15;

		doc.setTextColor(0, 0, 0);
		doc.setFontSize(11);
		doc.setFont("Helvetica", "normal");

		const categories = [
			{
				name: "🚗 Transportation",
				score: latestSubmission.transportationScore,
				color: [255, 99, 132],
			},
			{ name: "⚡ Energy", score: latestSubmission.energyScore, color: [54, 162, 235] },
			{ name: "💧 Water", score: latestSubmission.waterScore, color: [255, 205, 86] },
			{ name: "🍽️ Diet", score: latestSubmission.dietScore, color: [75, 192, 192] },
			{
				name: "🗑️ Food Waste",
				score: latestSubmission.foodWasteScore,
				color: [153, 102, 255],
			},
			{ name: "🛍️ Shopping", score: latestSubmission.shoppingScore, color: [255, 159, 64] },
			{ name: "♻️ Waste", score: latestSubmission.wasteScore, color: [199, 199, 199] },
			{
				name: "📱 Electronics",
				score: latestSubmission.electronicsScore,
				color: [83, 102, 255],
			},
			{ name: "✈️ Travel", score: latestSubmission.travelScore, color: [255, 99, 132] },
			{
				name: "🏠 Appliances",
				score: latestSubmission.applianceScore,
				color: [255, 159, 64],
			},
		];

		categories.forEach((category, index) => {
			if (category.score > 0) {
				const barWidth = (category.score / latestSubmission.totalEmissionScore) * 120;
				const percentage = (
					(category.score / latestSubmission.totalEmissionScore) *
					100
				).toFixed(1);

				// Category name with icon
				doc.text(category.name, 20, yPosition);

				// Score with better formatting
				doc.setFont("Helvetica", "bold");
				doc.text(`${category.score.toFixed(1)} kg`, 120, yPosition);

				// Percentage
				doc.setFont("Helvetica", "normal");
				doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
				doc.text(`(${percentage}%)`, 160, yPosition);

				// Enhanced progress bar
				doc.setFillColor(240, 240, 240);
				doc.rect(140, yPosition - 4, 120, 8, "F");
				doc.setFillColor(category.color[0], category.color[1], category.color[2]);
				doc.rect(140, yPosition - 4, barWidth, 8, "F");

				// Reset text color
				doc.setTextColor(0, 0, 0);

				yPosition += 15;
			}
		});

		yPosition += 20;
	}

	// AI Tips Section with enhanced design
	if (user.aiTips.length > 0) {
		// Check if we need a new page
		if (yPosition > pageHeight - 120) {
			doc.addPage();
			yPosition = 30;
		}

		doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
		doc.setFontSize(18);
		doc.setFont("Helvetica", "bold");
		doc.text("💡 AI-Powered Sustainability Tips", 20, yPosition);

		yPosition += 15;

		user.aiTips.forEach((tip, index) => {
			if (yPosition > pageHeight - 80) {
				doc.addPage();
				yPosition = 30;
			}

			// Enhanced tip header with background
			doc.setFillColor(248, 249, 250);
			doc.rect(15, yPosition - 6, pageWidth - 30, 12, "F");
			doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
			doc.setLineWidth(0.3);
			doc.rect(15, yPosition - 6, pageWidth - 30, 12, "S");

			doc.setTextColor(0, 0, 0);
			doc.setFontSize(13);
			doc.setFont("Helvetica", "bold");
			doc.text(`${index + 1}. ${tip.title}`, 20, yPosition + 2);

			// Category and impact badges with better styling
			doc.setFontSize(9);
			doc.setFont("Helvetica", "normal");
			doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
			doc.text(`${tip.category} • ${tip.impact} Impact`, pageWidth - 70, yPosition + 2);

			yPosition += 18;

			// Description with better formatting
			doc.setTextColor(0, 0, 0);
			doc.setFontSize(10);
			const splitDescription = doc.splitTextToSize(tip.description, pageWidth - 50);
			doc.text(splitDescription, 25, yPosition);
			yPosition += splitDescription.length * 4 + 8;

			// Reasoning with enhanced styling
			doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
			doc.setFont("Helvetica", "italic");
			const splitReasoning = doc.splitTextToSize(`💭 ${tip.reasoning}`, pageWidth - 50);
			doc.text(splitReasoning, 25, yPosition);
			yPosition += splitReasoning.length * 4 + 20;
		});
	}

	// Enhanced footer on all pages
	const totalPages = doc.internal.pages.length;
	for (let i = 1; i <= totalPages; i++) {
		doc.setPage(i);

		// Footer line with enhanced styling
		doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
		doc.setLineWidth(0.5);
		doc.line(20, pageHeight - 25, pageWidth - 20, pageHeight - 25);

		// Footer text with better formatting
		doc.setFontSize(9);
		doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2]);
		doc.setFont("Helvetica", "normal");
		doc.text("Generated by Giki Zero - Your Carbon Footprint Companion", 20, pageHeight - 15);
		doc.text(`Page ${i} of ${totalPages}`, pageWidth - 35, pageHeight - 15);

		// Add a small logo in footer
		doc.setFontSize(8);
		doc.text("🌱", pageWidth - 45, pageHeight - 15);
	}

	return Buffer.from(doc.output("arraybuffer"));
}
