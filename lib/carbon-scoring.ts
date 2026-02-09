interface SubmissionData {
	transportationType?: string;
	transportationFrequency?: string;
	transportationDistance?: string;
	electricityUnits?: string;
	renewableEnergy?: boolean;
	waterUsage?: string;
	dietType?: string;
	meatIntakeFreq?: string;
	foodWasteLevel?: string;
	clothesPerMonth?: string;
	recyclingHabits?: string;
	streamingHabits?: string;
	airTravelFreq?: string;
	applianceUsage?: string;
	homeSize?: string;
	heatingType?: string;
	wasteDisposal?: string;
	digitalDevices?: string;
	petOwnership?: string;
	gardenPractices?: string;
}

export function calculateCarbonScore(data: SubmissionData) {
	const scores = {
		transportation: 0,
		energy: 0,
		water: 0,
		diet: 0,
		foodWaste: 0,
		shopping: 0,
		waste: 0,
		electronics: 0,
		travel: 0,
		appliance: 0,
		home: 0,
		heating: 0,
		digital: 0,
		pets: 0,
		garden: 0,
	};

	// Transportation scoring
	const transportScores: Record<string, number> = {
		"car-gasoline": 120,
		"car-diesel": 110,
		"car-electric": 40,
		"public-transport": 30,
		bicycle: 5,
		walking: 0,
		motorcycle: 80,
	};

	const frequencyMultiplier: Record<string, number> = {
		daily: 1.0,
		weekly: 0.7,
		monthly: 0.3,
		rarely: 0.1,
		never: 0,
	};

	const distanceMultiplier: Record<string, number> = {
		short: 0.5,
		medium: 1.0,
		long: 1.5,
		"very-long": 2.0,
	};

	if (data.transportationType && data.transportationFrequency && data.transportationDistance) {
		scores.transportation =
			(transportScores[data.transportationType] || 60) *
			(frequencyMultiplier[data.transportationFrequency] || 0.5) *
			(distanceMultiplier[data.transportationDistance] || 1.0);
	}

	// Energy scoring
	const electricityScore: Record<string, number> = {
		"very-low": 20,
		low: 40,
		medium: 80,
		high: 120,
		"very-high": 160,
	};

	if (data.electricityUnits) {
		scores.energy = electricityScore[data.electricityUnits] || 80;
		if (data.renewableEnergy) {
			scores.energy *= 0.3; // 70% reduction for renewable energy
		}
	}

	// Water scoring
	const waterScores: Record<string, number> = {
		"very-low": 10,
		low: 20,
		medium: 40,
		high: 60,
		"very-high": 80,
	};

	if (data.waterUsage) {
		scores.water = waterScores[data.waterUsage] || 40;
	}

	// Diet scoring
	const dietScores: Record<string, number> = {
		vegan: 20,
		vegetarian: 35,
		pescatarian: 50,
		omnivore: 80,
		"high-meat": 120,
	};

	if (data.dietType) {
		scores.diet = dietScores[data.dietType] || 80;
	}

	// Food waste scoring
	const foodWasteScores: Record<string, number> = {
		none: 0,
		minimal: 10,
		some: 25,
		moderate: 40,
		high: 60,
	};

	if (data.foodWasteLevel) {
		scores.foodWaste = foodWasteScores[data.foodWasteLevel] || 25;
	}

	// Shopping scoring
	const shoppingScores: Record<string, number> = {
		"0": 0,
		"1-2": 15,
		"3-5": 30,
		"6-10": 50,
		"10+": 80,
	};

	if (data.clothesPerMonth) {
		scores.shopping = shoppingScores[data.clothesPerMonth] || 30;
	}

	// Waste/Recycling scoring
	const recyclingScores: Record<string, number> = {
		always: 0,
		often: 10,
		sometimes: 25,
		rarely: 40,
		never: 60,
	};

	if (data.recyclingHabits) {
		scores.waste = recyclingScores[data.recyclingHabits] || 25;
	}

	// Electronics/Streaming scoring
	const streamingScores: Record<string, number> = {
		minimal: 5,
		moderate: 15,
		high: 30,
		"very-high": 50,
	};

	if (data.streamingHabits) {
		scores.electronics = streamingScores[data.streamingHabits] || 15;
	}

	// Air travel scoring
	const travelScores: Record<string, number> = {
		never: 0,
		rarely: 50,
		occasionally: 150,
		frequently: 300,
		"very-frequently": 500,
	};

	if (data.airTravelFreq) {
		scores.travel = travelScores[data.airTravelFreq] || 50;
	}

	// Appliance scoring
	const applianceScores: Record<string, number> = {
		minimal: 20,
		moderate: 40,
		high: 60,
		"very-high": 80,
	};

	if (data.applianceUsage) {
		scores.appliance = applianceScores[data.applianceUsage] || 40;
	}

	// Home size scoring
	const homeScores: Record<string, number> = {
		studio: 20,
		"1-bedroom": 30,
		"2-bedroom": 45,
		"3-bedroom": 60,
		"4+": 80,
	};

	if (data.homeSize) {
		scores.home = homeScores[data.homeSize] || 45;
	}

	// Heating type scoring
	const heatingScores: Record<string, number> = {
		electric: 80,
		gas: 60,
		oil: 70,
		wood: 40,
		solar: 20,
		"heat-pump": 30,
	};

	if (data.heatingType) {
		scores.heating = heatingScores[data.heatingType] || 60;
	}

	// Digital devices scoring
	const digitalScores: Record<string, number> = {
		"1-2": 10,
		"3-5": 25,
		"6-10": 40,
		"10+": 60,
	};

	if (data.digitalDevices) {
		scores.digital = digitalScores[data.digitalDevices] || 25;
	}

	// Pet ownership scoring
	const petScores: Record<string, number> = {
		none: 0,
		small: 15,
		medium: 25,
		large: 35,
		multiple: 50,
	};

	if (data.petOwnership) {
		scores.pets = petScores[data.petOwnership] || 0;
	}

	// Garden practices scoring
	const gardenScores: Record<string, number> = {
		none: 0,
		basic: 5,
		organic: -10, // Negative score for positive impact
		composting: -15,
		sustainable: -20,
	};

	if (data.gardenPractices) {
		scores.garden = gardenScores[data.gardenPractices] || 0;
	}

	const totalScore = Object.values(scores).reduce((sum, score) => sum + score, 0);

	const impactCategory = totalScore < 300 ? "Low" : totalScore < 600 ? "Medium" : "High";

	return {
		scores,
		totalScore,
		impactCategory,
	};
}

export function getRandomQuestions() {
	const allQuestions = [
		{
			id: "transportation",
			category: "Transportation",
			question: "What is your primary mode of transportation?",
			type: "select",
			options: [
				{ value: "car-gasoline", label: "Gasoline Car" },
				{ value: "car-diesel", label: "Diesel Car" },
				{ value: "car-electric", label: "Electric Car" },
				{ value: "public-transport", label: "Public Transport" },
				{ value: "bicycle", label: "Bicycle" },
				{ value: "walking", label: "Walking" },
				{ value: "motorcycle", label: "Motorcycle" },
			],
		},
		{
			id: "transportationFrequency",
			category: "Transportation",
			question: "How often do you use your primary transportation?",
			type: "select",
			options: [
				{ value: "daily", label: "Daily" },
				{ value: "weekly", label: "Few times a week" },
				{ value: "monthly", label: "Few times a month" },
				{ value: "rarely", label: "Rarely" },
				{ value: "never", label: "Never" },
			],
		},
		{
			id: "transportationDistance",
			category: "Transportation",
			question: "What is your typical travel distance?",
			type: "select",
			options: [
				{ value: "short", label: "Short (< 10km)" },
				{ value: "medium", label: "Medium (10-50km)" },
				{ value: "long", label: "Long (50-100km)" },
				{ value: "very-long", label: "Very Long (> 100km)" },
			],
		},
		{
			id: "electricityUnits",
			category: "Energy",
			question: "How much electricity do you use monthly?",
			type: "select",
			options: [
				{ value: "very-low", label: "Very Low (< 200 kWh)" },
				{ value: "low", label: "Low (200-400 kWh)" },
				{ value: "medium", label: "Medium (400-600 kWh)" },
				{ value: "high", label: "High (600-800 kWh)" },
				{ value: "very-high", label: "Very High (> 800 kWh)" },
			],
		},
		{
			id: "renewableEnergy",
			category: "Energy",
			question: "Do you use renewable energy sources?",
			type: "radio",
			options: [
				{ value: "true", label: "Yes" },
				{ value: "false", label: "No" },
			],
		},
		{
			id: "waterUsage",
			category: "Water",
			question: "How would you rate your water usage?",
			type: "select",
			options: [
				{ value: "very-low", label: "Very Low" },
				{ value: "low", label: "Low" },
				{ value: "medium", label: "Medium" },
				{ value: "high", label: "High" },
				{ value: "very-high", label: "Very High" },
			],
		},
		{
			id: "dietType",
			category: "Diet",
			question: "What best describes your diet?",
			type: "select",
			options: [
				{ value: "vegan", label: "Vegan" },
				{ value: "vegetarian", label: "Vegetarian" },
				{ value: "pescatarian", label: "Pescatarian" },
				{ value: "omnivore", label: "Omnivore" },
				{ value: "high-meat", label: "High Meat Consumption" },
			],
		},
		{
			id: "foodWasteLevel",
			category: "Food Waste",
			question: "How much food do you typically waste?",
			type: "select",
			options: [
				{ value: "none", label: "None" },
				{ value: "minimal", label: "Minimal" },
				{ value: "some", label: "Some" },
				{ value: "moderate", label: "Moderate" },
				{ value: "high", label: "High" },
			],
		},
		{
			id: "clothesPerMonth",
			category: "Shopping",
			question: "How many new clothing items do you buy per month?",
			type: "select",
			options: [
				{ value: "0", label: "0" },
				{ value: "1-2", label: "1-2" },
				{ value: "3-5", label: "3-5" },
				{ value: "6-10", label: "6-10" },
				{ value: "10+", label: "10+" },
			],
		},
		{
			id: "recyclingHabits",
			category: "Waste",
			question: "How often do you recycle?",
			type: "select",
			options: [
				{ value: "always", label: "Always" },
				{ value: "often", label: "Often" },
				{ value: "sometimes", label: "Sometimes" },
				{ value: "rarely", label: "Rarely" },
				{ value: "never", label: "Never" },
			],
		},
		{
			id: "streamingHabits",
			category: "Electronics",
			question: "How much do you stream videos/music daily?",
			type: "select",
			options: [
				{ value: "minimal", label: "Minimal (< 1 hour)" },
				{ value: "moderate", label: "Moderate (1-3 hours)" },
				{ value: "high", label: "High (3-6 hours)" },
				{ value: "very-high", label: "Very High (> 6 hours)" },
			],
		},
		{
			id: "airTravelFreq",
			category: "Travel",
			question: "How often do you travel by air?",
			type: "select",
			options: [
				{ value: "never", label: "Never" },
				{ value: "rarely", label: "Rarely (once a year)" },
				{ value: "occasionally", label: "Occasionally (2-3 times a year)" },
				{ value: "frequently", label: "Frequently (4-6 times a year)" },
				{ value: "very-frequently", label: "Very Frequently (> 6 times a year)" },
			],
		},
		{
			id: "applianceUsage",
			category: "Appliances",
			question: "How would you rate your home appliance usage?",
			type: "select",
			options: [
				{ value: "minimal", label: "Minimal" },
				{ value: "moderate", label: "Moderate" },
				{ value: "high", label: "High" },
				{ value: "very-high", label: "Very High" },
			],
		},
		{
			id: "homeSize",
			category: "Home",
			question: "What size is your home?",
			type: "select",
			options: [
				{ value: "studio", label: "Studio" },
				{ value: "1-bedroom", label: "1 Bedroom" },
				{ value: "2-bedroom", label: "2 Bedrooms" },
				{ value: "3-bedroom", label: "3 Bedrooms" },
				{ value: "4+", label: "4+ Bedrooms" },
			],
		},
		{
			id: "heatingType",
			category: "Heating",
			question: "What type of heating do you use?",
			type: "select",
			options: [
				{ value: "electric", label: "Electric" },
				{ value: "gas", label: "Natural Gas" },
				{ value: "oil", label: "Oil" },
				{ value: "wood", label: "Wood" },
				{ value: "solar", label: "Solar" },
				{ value: "heat-pump", label: "Heat Pump" },
			],
		},
		{
			id: "digitalDevices",
			category: "Digital",
			question: "How many digital devices do you own?",
			type: "select",
			options: [
				{ value: "1-2", label: "1-2 devices" },
				{ value: "3-5", label: "3-5 devices" },
				{ value: "6-10", label: "6-10 devices" },
				{ value: "10+", label: "10+ devices" },
			],
		},
		{
			id: "petOwnership",
			category: "Pets",
			question: "Do you own any pets?",
			type: "select",
			options: [
				{ value: "none", label: "No pets" },
				{ value: "small", label: "Small pets (hamsters, fish)" },
				{ value: "medium", label: "Medium pets (cats, small dogs)" },
				{ value: "large", label: "Large pets (big dogs)" },
				{ value: "multiple", label: "Multiple pets" },
			],
		},
		{
			id: "gardenPractices",
			category: "Garden",
			question: "What gardening practices do you follow?",
			type: "select",
			options: [
				{ value: "none", label: "No garden" },
				{ value: "basic", label: "Basic gardening" },
				{ value: "organic", label: "Organic gardening" },
				{ value: "composting", label: "Composting" },
				{ value: "sustainable", label: "Sustainable practices" },
			],
		},
	];

	// Return 10-12 random questions, ensuring variety
	const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, Math.floor(Math.random() * 3) + 10); // 10-12 questions
}
