# Smart Personalized Dashboard

A stunning, resume-ready dashboard built with **React + Vite**, **Material UI**, **Framer Motion**, and **react-grid-layout** (drag & resize).

## ✨ Features
- Draggable, responsive widgets
- Dark/Light theme toggle (saved in localStorage)
- **Weather** (OpenWeather API) — enter city, shows temp/conditions
- **News** (Hacker News front page — public API, no key)
- **Crypto** (BTC price via Coindesk — no key)
- **To‑Do** (persistent using localStorage)
- **Clock & Greeting**

## 🛠️ Setup (Local)
```bash
npm install
cp .env.example .env   # add your OpenWeather API key
npm run dev
```

Open http://localhost:5173

## 🚀 Deploy (Fast)
- **Vercel**: Import this repo → Framework: Vite → Add env var `VITE_OPENWEATHER_KEY` → Deploy.
- **Netlify**: New site from Git → Build: `npm run build` → Publish directory: `dist` → Add env var too.

## 🔗 Add to Resume
- **Live Link**: your deployed URL (Vercel/Netlify)
- **Repo**: GitHub repo link
- **One-liner**: Modular React dashboard with draggable widgets, API integrations (weather/news/crypto), Material UI & SASS, dark/light theming.

## 📁 Tech Stack
React, Vite, Material UI, Framer Motion, react-grid-layout, Axios, Sass.
