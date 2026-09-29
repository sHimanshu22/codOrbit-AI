# 🚀 CodOrbit AI

> **AI-Powered Developer Growth Platform**
>
> Track your coding journey, analyze your progress, master DSA, improve your resume, and become placement-ready — all from one dashboard.

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-success?logo=mongodb)
![Google OAuth](https://img.shields.io/badge/Auth-Google%20OAuth-red?logo=google)
![License](https://img.shields.io/badge/License-MIT-blue)

---

# 📖 Overview

Preparing for software placements usually requires switching between multiple platforms like:

- GitHub
- LeetCode
- Codeforces
- GeeksforGeeks
- Resume Builders
- DSA Sheets
- Contest Platforms

Tracking progress manually across all these platforms becomes difficult.

**CodOrbit AI** solves this problem by bringing everything together into a single AI-powered dashboard that helps developers monitor their progress, identify weak areas, and receive personalized recommendations.

---

# ✨ Features

## 📊 Developer Dashboard

- Developer Score
- Overall coding analytics
- Coding streak tracking
- Platform summaries
- Progress overview

---

## 💻 DSA Tracker

- Multiple DSA Sheets
- Progress Tracking
- Completion Percentage
- Difficulty Analytics
- Bookmarks
- Personal Notes
- Solution Videos
- AI Learning Coach
- Skill Analysis

Supported Sheets:

- Striver A2Z
- Striver SDE Sheet
- Blind 75
- NeetCode 150
- Love Babbar 450

---

## 📈 Analytics

Analyze performance across coding platforms.

- GitHub Analytics
- LeetCode Analytics
- Codeforces Analytics
- Difficulty Breakdown
- Contest Statistics
- Activity Trends

---

## 🤖 AI Features

Powered using **Google Gemini API**

- AI Resume Analysis
- AI Learning Coach
- AI Skill Analysis
- Personalized Recommendations
- Placement Readiness Analysis

---

## 📄 Resume Analysis

Upload your resume and receive:

- Resume Score
- Strengths
- Weaknesses
- Improvement Suggestions
- ATS Optimization Tips

---

## 🏆 Contest Tracking

- Upcoming Contests
- Contest History
- Platform-wise Filtering
- Contest Calendar

---

## 👤 Profile

Manage

- Developer Profile
- Coding Usernames
- College Details
- Public Developer Profile
- Social Links

---

## 🔐 Authentication

- Google OAuth Login
- JWT Authentication
- Protected Routes
- Secure APIs

---

# 🛠 Tech Stack

## Frontend

- React 19
- React Router
- Tailwind CSS
- Axios
- Context API
- Lucide Icons
- React Hot Toast
- Google OAuth

---

## Backend

- Node.js
- Express.js
- JWT
- Google Auth Library
- Multer
- Cloudinary
- Nodemailer
- Gemini API

---

## Database

- MongoDB Atlas
- Mongoose

---

# 📂 Project Structure

```
CodOrbit-AI
│
├── client
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── context
│   │   ├── layouts
│   │   ├── pages
│   │   ├── routes
│   │   ├── services
│   │   └── App.jsx
│   │
│   └── package.json
│
├── server
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── services
│   │   ├── utils
│   │   └── app.js
│   │
│   └── package.json
│
└── README.md
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/codorbit-ai.git
```

```
cd codorbit-ai
```

---

## Install Client

```bash
cd client
npm install
```

---

## Install Server

```bash
cd ../server
npm install
```

---

# 🔑 Environment Variables

## Client

Create

```
client/.env
```

```
VITE_API_URL=http://localhost:5000/api

VITE_GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID
```

---

## Server

Create

```
server/.env
```

```
PORT=5000

MONGO_URI=YOUR_MONGODB_URI

JWT_SECRET=YOUR_SECRET

GOOGLE_CLIENT_ID=YOUR_GOOGLE_CLIENT_ID

GEMINI_API_KEY=YOUR_GEMINI_API_KEY

CLOUDINARY_CLOUD_NAME=

CLOUDINARY_API_KEY=

CLOUDINARY_API_SECRET=

EMAIL_USER=

EMAIL_PASS=
```

---

# ▶ Running the Project

## Backend

```bash
cd server

npm run dev
```

---

## Frontend

```bash
cd client

npm run dev
```

---

# 🌱 Database Seeders

Populate DSA Sheets

```bash
npm run seed:striver

npm run seed:blind75

npm run seed:loveBabbar

npm run seed:striverSDE

npm run seed:neetcode150
```

---

# 🔐 Authentication Flow

```
User

↓

Google OAuth

↓

React Frontend

↓

Express API

↓

Google Token Verification

↓

MongoDB

↓

JWT Generation

↓

Protected Routes

↓

Dashboard
```

---

# 🧠 Architecture

```
Browser

↓

React

↓

Pages

↓

Components

↓

Services

↓

Axios

↓

Express Routes

↓

Controllers

↓

Services

↓

MongoDB

↓

Response

↓

React State

↓

UI Update
```

---

# 📸 Screenshots

| Landing Page | Dashboard |
|--------------|-----------|
| Add Screenshot | Add Screenshot |

| DSA Tracker | Resume Analysis |
|--------------|----------------|
| Add Screenshot | Add Screenshot |

---

# 🚀 Future Improvements

- GitHub Contribution Heatmap
- AI Interview Preparation
- Mock Interview Platform
- Coding Calendar
- AI Roadmap Generator
- Team Leaderboards
- Mobile Application
- Browser Extension
- Coding Challenges
- Community Features

---

# 📚 What I Learned

During this project I gained hands-on experience with:

- MERN Stack Development
- REST APIs
- Authentication
- Google OAuth
- JWT
- MongoDB Schema Design
- React Context API
- Protected Routing
- File Uploads
- AI Integration
- Resume Parsing
- Dashboard Design
- Production UI
- Deployment

---

# 🤝 Contributing

Contributions are welcome.

Fork the repository and submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Dumaneshwar Sonawane**

GitHub:
https://github.com/yourusername

LinkedIn:
https://linkedin.com/in/yourprofile

---

⭐ If you found this project useful, consider giving it a star!
