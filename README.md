# 🌱 Giki Zero – Personal Carbon Footprint Tracker

> A modern, AI-powered web application to help users track their lifestyle-based carbon emissions, visualize progress, and receive personalized eco-friendly suggestions.

---

## 🌟 Features

### 🔐 Authentication & Onboarding

- Google OAuth + Email (NextAuth)

- JWT-based session handling and CSRF protection

- Onboarding form for name, age, and location


### 📊 Lifestyle Input & Carbon Score

- Multi-step lifestyle survey:
  - Transportation type and distance
  - Energy and water usage
  - Diet habits (veg/non-veg)
  - Food waste level
  - Clothing purchases
  - Electronics and media usage
  - Appliance usage
  - Air travel frequency
  - Waste management & recycling
- Rotating question sets on repeated visits
- Carbon emission calculated based on input
- Emission score stored in PostgreSQL via Prisma

### 📈 Dashboard & Visual Insights

- Personalized dashboard greeting
- Real-time charts (bar, pie, line) to show:
  - Total emission score
  - Weekly/monthly change
  - Breakdown by category
- Categorize users: *Low / Moderate / High impact*
- Sustainable carousel tips (refreshing from Gemini AI)

### 🤖 AI-Powered Suggestions

- Gemini API integration for:
  - 3–5 personalized tips based on lifestyle input
  - Context-aware suggestions with reasoning
  - Estimated CO₂ savings per suggestion
- Smart Suggestions panel in dashboard
- Tips stored for reuse in PDF report

### 📄 Report Generation

- “Download My Report” feature
- Generate PDF containing:
  - Profile details
  - Lifestyle input summary
  - Carbon emission score & breakdown
  - Graphs and trends
  - AI-generated tips


## 📁 Project Structure
```
giki-zero/
├── src/
│   ├── app/                    # App Router structure
│   │   ├── dashboard/          # User dashboard
│   │   ├── survey/             # Lifestyle survey form
│   │   ├── api/                # Backend APIs (AI tips, report)
│   │   └── auth/               # Authentication routes
│   ├── components/             # UI Components
│   ├── lib/                    # Utility functions (AI, scoring)
│   ├── styles/                 # Tailwind & globals
│   └── types/                  # TypeScript types
├── prisma/                     # DB schema & migrations
└── public/                     # Assets and images

```

## 🛠️ Tech Stack

### 🧑‍💻 Frontend & Backend

- **Next.js (App Router)** – Full-stack React framework
- **TypeScript** – Type-safe development
- **Tailwind CSS** – Utility-first styling
- **Chart.js / Recharts** – Graphs and charts

### 🔗 Backend & Database

- **Next.js Server Actions / API Routes**
- **Prisma ORM** with **PostgreSQL**
- **NextAuth.js** – Google & Email-based login

### 🤖 AI & PDF

- **Gemini API** – AI suggestion engine
- **@react-pdf/renderer** or **html2pdf.js** – PDF reports

### 📦 Dev Tools

- **ESLint & Prettier** – Code formatting and linting
- **Vercel** – Hosting and CI/CD
- **React Hook Form** – Form management




<br>

## 📐 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/rawadhossain/Giki-Zero.git
```
###   2. Set Environment Variables
Create a ```.env``` file in the root directory and fill in:
```
# Database
DATABASE_URL="postgresql://your-database-url"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your_secret"

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Gemini AI
GEMINI_API_KEY=your_gemini_api_key
```

### 3. Install Dependencies
```
npm run dev
```

### 4. Run the Development Server
```
npm run dev
```

<br>

## 🌐 API Endpoints
### Emission Survey
- ```POST /api/survey/submit``` – Submit lifestyle answers

- ```GET /api/survey/history``` – Get previous submissions

### Dashboard & Tips
- ```GET /api/dashboard/stats``` – User emission data

- ```POST /api/tips/generate``` – Get AI-generated tips

### Reports
- ```GET /api/report/pdf``` – Generate and download report


