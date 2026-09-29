# CodOrbit

### AI-Powered Developer Growth Platform

CodOrbit is a full-stack developer growth and placement preparation platform designed for students, aspiring software engineers, and competitive programmers.

It brings coding profiles, DSA preparation, competitive programming statistics, progress tracking, analytics, and AI-powered insights into one unified dashboard.

Instead of switching between multiple coding platforms and manually tracking progress, CodOrbit provides a single place to understand your coding journey, identify strengths and weaknesses, and prepare more effectively for technical interviews.

---

## Overview

Students preparing for software engineering roles often use multiple platforms such as GitHub, LeetCode, Codeforces, GeeksforGeeks, HackerRank, and different DSA sheets.

This creates several problems:

- Progress is scattered across multiple platforms
- DSA preparation is difficult to track consistently
- Coding statistics are not available in one place
- It is difficult to identify weak topics
- Contest performance and development activity remain disconnected
- Students lack personalized guidance based on their actual progress

CodOrbit aims to solve this by creating a centralized developer growth platform.

---

## Key Features

### Unified Developer Dashboard

Get a consolidated overview of your development and problem-solving journey.

The dashboard provides:

- Developer overview
- Coding statistics
- DSA progress
- Platform activity
- Developer score
- Skill analysis
- Coding streaks
- AI-generated insights
- Recent activity
- Progress visualization

---

### DSA Sheet Tracker

Track Data Structures and Algorithms preparation directly inside CodOrbit.

The DSA tracker is designed around structured interview preparation and supports topic-wise progress tracking.

Topics include:

- Basics
- Arrays
- Binary Search
- Strings
- Linked Lists
- Recursion
- Bit Manipulation
- Stack & Queue
- Sliding Window & Two Pointers
- Heaps
- Greedy Algorithms
- Binary Trees
- Binary Search Trees
- Graphs
- Dynamic Programming
- Tries

The tracker provides:

- Topic-wise progress
- Question completion tracking
- Easy / Medium / Hard distribution
- Overall completion percentage
- Module progress
- Skill analysis
- Difficulty analytics
- AI coaching insights

---

### AI-Powered Insights

CodOrbit uses AI to transform coding activity and preparation data into meaningful recommendations.

AI-powered functionality can provide:

- Personalized recommendations
- Weak-topic identification
- Strength analysis
- DSA preparation guidance
- Developer growth insights
- Improvement suggestions
- Learning roadmap recommendations

The goal is not just to display statistics, but to help users understand what those statistics mean and what they should work on next.

---

### Developer Score

CodOrbit provides a consolidated developer score based on available development and problem-solving activity.

The score helps users get a quick overview of their current developer growth while detailed analytics provide additional context.

---

### Skill Analysis

Understand strengths and improvement areas across DSA topics and coding activity.

Skill analysis helps users answer questions such as:

- Which DSA topics are strongest?
- Which topics need more practice?
- How balanced is the current preparation?
- Where should preparation be focused next?

---

### Difficulty Analytics

Track problem-solving progress based on difficulty:

- Easy
- Medium
- Hard

This makes it easier to understand whether preparation is balanced or concentrated around a particular difficulty level.

---

### Coding Platform Integration

CodOrbit is designed to bring coding activity from multiple platforms into a unified experience.

Supported / integrated platforms include:

- GitHub
- LeetCode
- Codeforces
- GeeksforGeeks
- HackerRank

Platform integrations can be used to display statistics such as:

- Problems solved
- Difficulty distribution
- GitHub activity
- Competitive programming ratings
- Contest participation
- Coding profiles
- Platform-specific analytics

---

### Codeforces Analytics

Codeforces integration provides competitive programming information such as:

- Current rating
- Maximum rating
- Current rank
- Maximum rank
- Contest participation
- Contest history

---

### LeetCode Analytics

LeetCode integration provides problem-solving statistics including:

- Total problems solved
- Easy problems solved
- Medium problems solved
- Hard problems solved

These statistics can be combined with CodOrbit's internal analytics to provide a broader view of DSA preparation.

---

### Contest Tracking

Track competitive programming activity and contest performance from supported coding platforms.

Contest analytics help users understand their competitive programming progress over time.

---

### Google Authentication

CodOrbit uses Google Sign-In for a simple and secure authentication experience.

Authentication flow:

1. User signs in with Google
2. Google identity token is verified by the backend
3. User account is created or retrieved
4. CodOrbit generates its own JWT
5. JWT is used for authenticated API requests

Passwords are not required for Google-authenticated users.

---

### Guest Mode

CodOrbit supports a guest experience so users can explore the platform before signing in.

Guest users can explore the application using demo data without creating an account.

Guest Mode is designed as a frontend demo experience and does not bypass backend authentication.

Guest users can preview features such as:

- Dashboard
- DSA Tracker
- Analytics
- Developer statistics
- AI feature previews
- Coding platform analytics

Account-specific functionality remains protected.

Features such as saving progress, connecting coding accounts, personalized analysis, and profile modification require authentication.

---

### Responsive UI

CodOrbit is designed to work across different screen sizes with a clean and accessible interface.

The UI includes:

- Responsive dashboard
- Sidebar navigation
- Navbar
- Light and dark mode support
- Reusable cards
- Skeleton loading states
- Modals
- Charts and analytics
- Mobile-friendly layouts

---

### Skeleton Loading Experience

Instead of blocking the entire interface with loading spinners, CodOrbit uses skeleton loading states for dashboard components.

This keeps the page structure visible while data is being fetched and reduces layout shifts.

Skeletons are used for components such as:

- Statistics cards
- Analytics
- Charts
- AI insights
- DSA modules
- Profile information
- Platform cards

---

### Secure Logout

CodOrbit includes a custom logout confirmation experience.

The logout modal is rendered using React Portal so that it correctly overlays the complete application interface regardless of component stacking contexts.

---

## Technology Stack

### Frontend

| Technology | Purpose |
|---|---|
| React.js | Frontend library |
| Vite | Development and build tool |
| React Router | Client-side routing |
| Tailwind CSS | Styling |
| Axios | HTTP requests |
| Recharts | Data visualization |
| Context API | Authentication and application state |

### Backend

| Technology | Purpose |
|---|---|
| Node.js | JavaScript runtime |
| Express.js | Backend framework |
| REST API | Frontend/backend communication |
| JWT | Application authentication |
| Google Auth Library | Google authentication verification |

### Database

| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud database |
| Mongoose | MongoDB object modeling |

### AI

| Technology | Purpose |
|---|---|
| Google Gemini API | AI-powered insights and recommendations |

### Deployment & Development

| Technology | Purpose |
|---|---|
| Git | Version control |
| GitHub | Source code management |
| Postman | API testing |
| Vercel | Frontend deployment |
| Render | Backend deployment |
| MongoDB Atlas | Cloud database |

---

## Architecture

CodOrbit follows a modular full-stack architecture.

```text
Client
  │
  │ HTTP / REST API
  ▼
React Frontend
  │
  │ Axios
  ▼
Express Routes
  │
  ▼
Controllers
  │
  ▼
Services
  │
  ├──────────────► External Coding APIs
  │
  ├──────────────► Gemini API
  │
  ▼
Mongoose Models
  │
  ▼
MongoDB Atlas
```

The backend primarily follows:

```text
Routes → Controllers → Services → Models
```

This separation keeps API routing, business logic, external integrations, and database operations easier to maintain.

---

## Authentication Architecture

```text
                ┌──────────────────┐
                │    Login Page    │
                └────────┬─────────┘
                         │
             ┌───────────┴────────────┐
             │                        │
             ▼                        ▼
     Google Sign-In              Guest Mode
             │                        │
             ▼                        ▼
     Google Token                 Demo Data
             │                        │
             ▼                        ▼
     Backend Verification      Guest Dashboard
             │
             ▼
       CodOrbit JWT
             │
             ▼
     Authenticated APIs
             │
             ▼
       User Dashboard
```

Guest Mode is intentionally separated from backend authentication.

A guest flag must never be treated as authentication by protected backend routes.

---

## Project Structure

A simplified representation of the project structure:

```text
CodOrbit/
│
├── client/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── OverviewCard.jsx
│   │   │   ├── LogoutModal.jsx
│   │   │   └── skeletons/
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── ...
│   │   │
│   │   ├── routes/
│   │   │   └── ProtectedRoute.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── data/
│   │   │   └── guestData.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── config/
│   │
│   ├── app.js
│   └── package.json
│
├── .gitignore
└── README.md
```

The exact structure may evolve as new CodOrbit modules are introduced.

---

## Getting Started

Follow these steps to run CodOrbit locally.

### Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Git
- MongoDB Atlas account
- Google OAuth credentials
- Gemini API credentials

---

## Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/CodOrbit.git
```

Move into the project:

```bash
cd CodOrbit
```

---

## Backend Setup

Navigate to the backend:

```bash
cd server
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `server` directory.

```env
PORT=5000

MONGO_URI=YOUR_MONGODB_CONNECTION_STRING

JWT_SECRET=YOUR_JWT_SECRET

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

GEMINI_API_KEY=YOUR_GEMINI_API_KEY
```

> Environment variable names may vary depending on your local configuration. Use the names referenced by the current source code.

Start the backend:

```bash
npm run dev
```

If the project uses a standard start script instead:

```bash
npm start
```

The backend will normally run at:

```text
http://localhost:5000
```

---

## Frontend Setup

Open another terminal and navigate to the frontend:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create the frontend environment file if required by the current configuration.

Example:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

Start the frontend:

```bash
npm run dev
```

Vite will display the local development URL in the terminal.

It will typically be:

```text
http://localhost:5173
```

---

## Environment Variables

Never commit environment variables or API credentials to GitHub.

Make sure `.env` files are included in `.gitignore`.

Example:

```gitignore
.env
.env.local
.env.production
node_modules/
dist/
```

Sensitive values that must remain private include:

- MongoDB connection strings
- JWT secrets
- Gemini API keys
- Private API credentials
- Authentication secrets

---

## API Structure

CodOrbit uses REST APIs for communication between the React frontend and Express backend.

Example API organization:

```text
/api/auth
/api/google
/api/github
/api/leetcode
/api/codeforces
/api/dsa
/api/analytics
/api/ai
```

The exact available endpoints depend on the current implementation.

---

## Google Authentication Flow

```text
User
 │
 ▼
Google Sign-In
 │
 ▼
Google Identity Token
 │
 ▼
POST /api/google/login
 │
 ▼
Backend verifies Google token
 │
 ▼
Find/Create User
 │
 ▼
Generate CodOrbit JWT
 │
 ▼
Frontend stores JWT
 │
 ▼
Authenticated API Requests
```

The backend remains responsible for validating authenticated requests.

---

## DSA Analytics Flow

```text
DSA Progress
     │
     ├──► Overall Progress
     │
     ├──► Topic Progress
     │
     ├──► Difficulty Analysis
     │
     ├──► Skill Analysis
     │
     ├──► Developer Score
     │
     └──► AI Coach
```

This allows raw progress data to be transformed into more meaningful preparation insights.

---

## External Platform Integration

CodOrbit communicates with supported coding platforms through dedicated backend services.

The service layer is responsible for:

- Fetching external profile information
- Normalizing responses
- Handling API failures
- Returning structured data to controllers
- Keeping platform-specific logic outside routes

This keeps integrations isolated and easier to maintain.

---

## Security

CodOrbit follows several important security practices.

### Authentication

Protected APIs require valid authentication.

### JWT

JWT tokens are used for authenticated communication between the frontend and backend.

### Google Token Verification

Google authentication tokens are verified on the backend rather than trusting frontend authentication state.

### Password Handling

Google-authenticated users do not require locally stored passwords.

For any local-password accounts supported by the application, passwords should always be securely hashed before storage.

### Environment Variables

Secrets and API credentials are stored in environment variables and should never be committed to source control.

### Guest Security

Guest Mode does not provide backend authentication.

Guest users cannot bypass protected APIs simply by modifying frontend state.

Backend authorization remains the source of truth for protected operations.

---

## Design Principles

CodOrbit is developed around several principles:

### Simple

The platform should remain easy for students to understand and use.

### Useful

Features should directly contribute to developer growth or placement preparation.

### Data Driven

Analytics should help users understand their actual progress.

### Personalized

AI should provide recommendations based on meaningful developer and preparation data.

### Modular

Frontend components and backend services should remain reusable and maintainable.

### Secure

Frontend state must never replace backend authentication and authorization.

---

## Target Users

CodOrbit is primarily designed for:

- College students
- Final-year students
- Placement aspirants
- Internship aspirants
- Software development candidates
- DSA learners
- Competitive programmers
- Students preparing for technical interviews

---

## Use Cases

A student can use CodOrbit to:

1. Sign in using Google
2. Connect coding profiles
3. View coding statistics
4. Track DSA preparation
5. Analyze topic-wise performance
6. Monitor difficulty distribution
7. Review competitive programming performance
8. Receive AI-powered insights
9. Identify weak areas
10. Improve placement preparation over time

Users who are not ready to sign in can explore the platform through Guest Mode before creating their CodOrbit profile.

---

## Current Focus

CodOrbit is focused on creating a unified developer growth ecosystem around:

```text
Coding Profiles
      +
DSA Preparation
      +
Competitive Programming
      +
Progress Analytics
      +
AI Insights
      =
CodOrbit
```

---

## Future Scope

CodOrbit can be expanded with features such as:

- More coding platform integrations
- Advanced developer analytics
- Improved AI roadmaps
- Personalized placement preparation plans
- Interview readiness analytics
- Advanced contest analytics
- Coding streak intelligence
- Resume-based skill analysis
- Goal-based preparation
- Progress comparison over time
- More DSA sheets
- Smart revision recommendations
- Achievement systems
- Improved mobile experience

---

## Deployment

The intended deployment architecture is:

```text
Frontend
   │
   ▼
Vercel
   │
   ▼
Custom Domain
   │
   │ REST API
   ▼
Render
   │
   ▼
Node.js + Express
   │
   ├────────► External Coding Platforms
   │
   ├────────► Gemini API
   │
   ▼
MongoDB Atlas
```

---

## Production

CodOrbit uses a custom domain:

**CodOrbit.online**

Frontend deployment can be hosted on Vercel while the Express backend can be hosted on Render.

MongoDB Atlas provides the production database infrastructure.

---

## Development Roadmap

```text
[✓] MERN architecture
[✓] MongoDB database integration
[✓] REST API architecture
[✓] Google authentication
[✓] JWT authentication
[✓] Protected routes
[✓] Dashboard
[✓] DSA tracking
[✓] Difficulty analytics
[✓] Skill analysis
[✓] Developer score
[✓] LeetCode integration
[✓] Codeforces integration
[✓] GitHub integration
[✓] AI-powered insights
[✓] Dark mode support
[✓] Responsive dashboard
[✓] Custom logout modal
[✓] Skeleton loading states
[✓] Guest Mode

[ ] Additional platform integrations
[ ] Advanced AI recommendations
[ ] Expanded contest analytics
[ ] Advanced placement analytics
[ ] Additional DSA preparation tools
```

---

## Why CodOrbit?

Most developer platforms focus on one specific area.

GitHub focuses on development activity.

LeetCode focuses on problem solving.

Codeforces focuses on competitive programming.

DSA sheets focus on interview preparation.

CodOrbit aims to bring these different parts of a student's developer journey together.

The objective is to provide a clearer answer to:

> **Where am I in my developer journey, what are my weak areas, and what should I work on next?**

---

## Contributing

CodOrbit is currently under active development.

If you would like to contribute:

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature-name
```

3. Make your changes
4. Commit your changes

```bash
git commit -m "Add your feature"
```

5. Push the branch

```bash
git push origin feature/your-feature-name
```

6. Open a Pull Request

Please keep changes focused and avoid unnecessary architectural modifications.

---

## Bug Reports & Feature Requests

If you find a bug or have a feature suggestion, open an issue in this repository with:

- Clear description
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots, if applicable

---

## Author

**Himanshu Sonawane**

Final Year Student  
University of Pune  
Pune, Maharashtra, India

Focused on:

- Software Development
- Data Structures & Algorithms
- Java
- C++
- JavaScript
- React
- Node.js
- Backend Development
- Cloud Computing
- AI/ML

---

## Project Status

CodOrbit is under active development.

New features, integrations, analytics, and improvements are continuously being added.

---

## Support

If you find CodOrbit useful, consider giving the repository a ⭐.

It helps support the project and its continued development.

---

<div align="center">

# CodOrbit

### Code. Track. Analyze. Grow.

**Built for students preparing to become software engineers.**

</div>
