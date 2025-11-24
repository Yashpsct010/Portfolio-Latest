# MERN Portfolio with AI Chatbot

A modern, high-performance portfolio website built with the MERN stack, featuring a dynamic UI and an interactive AI chatbot powered by Google Gemini.

**Live Demo:** [https://parmaryash.vercel.app/](https://parmaryash.vercel.app/)

## 🚀 Features

- **Modern UI/UX**: Built with React 19, Tailwind CSS v4, and Framer Motion for smooth animations and glassmorphism effects.
- **AI Chatbot**: An intelligent assistant that answers questions about my skills, experience, and projects using the Google Gemini API.
- **Responsive Design**: Fully responsive layout with a custom mobile menu and interactive elements.
- **Dynamic Content**: Centralized content management for easy updates to experience, projects, and skills.
- **Backend Integration**: Express.js server handling API requests for the chatbot.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Framer Motion, React Icons
- **Backend**: Node.js, Express.js
- **AI**: Google Gemini API (`@google/generative-ai`)
- **Utilities**: `clsx`, `tailwind-merge`

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18+ recommended)
- Google Gemini API Key (for Chatbot)

### 1. Clone the Repository
```bash
git clone https://github.com/Yashpsct010/Portfolio-Latest.git
cd Portfolio-Latest
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory based on `.env.example`:
```env
GEMINI_API_KEY=your_actual_api_key_here
PORT=5000
```

### 4. Run the Application

**Development Mode (Frontend + Backend)**
To run both the frontend (Vite) and backend (Express) concurrently, you can use a tool like `concurrently` or run them in separate terminals.

**Terminal 1 (Frontend):**
```bash
npm run dev
```

**Terminal 2 (Backend):**
```bash
node server/index.js
```

The frontend will be available at `http://localhost:5173`.

## 📂 Project Structure

```
src/
├── components/    # React components (Hero, About, Projects, etc.)
├── constants/     # Static data (Resume info, Projects list)
├── server/        # Express backend code
└── App.jsx        # Main application entry
```

## 📝 License

This project is open source and available under the [MIT License](LICENSE).
