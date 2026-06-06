# Urban Harvest Hub

A full-stack web application for sustainable urban living — discover local events, eco-friendly products, and gardening workshops. Built with React, Node.js, Express, MongoDB, and Tailwind CSS.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Frontend Routes](#frontend-routes)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Progressive Web App (PWA)](#progressive-web-app-pwa)
- [Internationalization](#internationalization)
- [Styling & Responsiveness](#styling--responsiveness)
- [Deployment](#deployment)
- [Scripts Reference](#scripts-reference)
- [Troubleshooting](#troubleshooting)

---

## Features

- **Home page** — hero section, about us, feature highlights, and geolocation finder
- **Events** — browse, search, and filter events; create, edit, and delete when logged in
- **Event details** — view individual event information
- **Products** — browse sustainable products with fallback sample data
- **Workshops** — browse gardening and sustainability workshops
- **User authentication** — register and login with JWT tokens
- **Dark mode** — toggle light/dark theme (persisted in `localStorage`)
- **Multi-language support** — English, Sinhala, and Tamil
- **Push notifications** — browser notification permission and alerts
- **PWA support** — installable app with offline fallback page
- **Responsive design** — mobile, tablet, and desktop layouts with safe-area support

---

## Tech Stack

| Layer      | Technologies |
|-----------|--------------|
| Frontend  | React 19, Vite 8, React Router, Tailwind CSS 4, Axios, i18next, vite-plugin-pwa |
| Backend   | Node.js, Express 5, Mongoose, JWT, bcryptjs, express-validator |
| Database  | MongoDB |
| Tooling   | ESLint, Concurrently, Nodemon |

---

## Project Structure

```
UrbanHarvestHub/
├── backend/
│   ├── controllers/       # Route handlers
│   ├── middleware/          # Error handling
│   ├── models/              # Mongoose schemas (Event, Product, Workshop, User)
│   ├── routes/              # API route definitions
│   ├── public/              # Service worker assets
│   ├── server.js            # Express entry point
│   └── package.json
├── frontend/
│   ├── public/              # Static assets (offline.html, icons)
│   ├── src/
│   │   ├── components/      # Navbar, Footer, LocationFinder, etc.
│   │   ├── pages/           # Home, Events, Products, Workshops, Login, Register
│   │   ├── services/        # Axios API client
│   │   ├── locales/         # en.json, si.json, ta.json
│   │   ├── index.css        # Tailwind + global styles
│   │   ├── App.jsx          # Router setup
│   │   └── main.jsx         # React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── package.json             # Root scripts (run both servers)
└── README.md
```

---

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** 18 or higher ([nodejs.org](https://nodejs.org))
- **npm** (comes with Node.js)
- **MongoDB** — local instance or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud database

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/UrbanHarvestHub.git
cd UrbanHarvestHub
```

### 2. Install root dependencies

```bash
npm install
```

### 3. Install backend dependencies

```bash
cd backend
npm install
cd ..
```

### 4. Install frontend dependencies

```bash
cd frontend
npm install
cd ..
```

---

## Environment Variables

### Backend (`backend/.env`)

Create a file named `.env` inside the `backend/` folder:

```env
MONGO_URI=mongodb://127.0.0.1:27017/urbanharvest
PORT=3000
```

| Variable   | Description                          | Required |
|-----------|--------------------------------------|----------|
| `MONGO_URI` | MongoDB connection string          | Yes      |
| `PORT`      | Port for the Express server (default: `3000`) | No |

**MongoDB Atlas example:**

```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/urbanharvest
PORT=3000
```

### Frontend (`frontend/.env`)

Create a file named `.env` inside the `frontend/` folder (optional for local development):

```env
VITE_API_URL=http://localhost:3000
```

| Variable       | Description                    | Required |
|---------------|--------------------------------|----------|
| `VITE_API_URL` | Backend API base URL          | No (defaults to `http://localhost:3000`) |

> **Note:** Never commit `.env` files. They are already listed in `.gitignore`.

---

## Running the Application

### Run both frontend and backend together (recommended)

From the project root:

```bash
npm run dev
```

This starts:
- **Backend** at `http://localhost:3000`
- **Frontend** at `http://localhost:5173`

### Run separately

**Backend only:**

```bash
cd backend
npm run dev
```

**Frontend only:**

```bash
cd frontend
npm run dev
```

### Production build (frontend)

```bash
cd frontend
npm run build
npm run preview
```

**Production backend:**

```bash
cd backend
npm start
```

---

## Frontend Routes

| Route            | Page           | Description |
|-----------------|----------------|-------------|
| `/`             | Home           | Landing page with hero, about, and location finder |
| `/events`       | Events         | Event listing, search, filter, and CRUD (when logged in) |
| `/events/:id`   | Event Details  | Single event view |
| `/products`     | Products       | Product catalog |
| `/workshops`    | Workshops      | Workshop listings |
| `/login`        | Login          | User sign-in |
| `/register`     | Register       | User registration |

---

## API Endpoints

Base URL: `http://localhost:3000` (or your deployed backend URL)

### Health check

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/`      | API status message |

### Authentication (`/api/auth`)

| Method | Endpoint           | Body                                      | Description |
|--------|--------------------|-------------------------------------------|-------------|
| POST   | `/api/auth/register` | `{ name, email, password }`           | Register a new user |
| POST   | `/api/auth/login`    | `{ email, password }`                   | Login and receive JWT token |

### Events (`/events`)

| Method | Endpoint       | Description |
|--------|----------------|-------------|
| GET    | `/events`      | Get all events |
| GET    | `/events/:id`  | Get event by ID |
| POST   | `/events`      | Create event (`title`, `description` required) |
| PUT    | `/events/:id`  | Update event |
| DELETE | `/events/:id`  | Delete event |

### Products (`/products`)

| Method | Endpoint         | Description |
|--------|------------------|-------------|
| GET    | `/products`      | Get all products |
| GET    | `/products/:id`  | Get product by ID |
| POST   | `/products`      | Create product (`name` required) |
| PUT    | `/products/:id`  | Update product |
| DELETE | `/products/:id`  | Delete product |

### Workshops (`/workshops`)

| Method | Endpoint           | Description |
|--------|--------------------|-------------|
| GET    | `/workshops`       | Get all workshops |
| GET    | `/workshops/:id`   | Get workshop by ID |
| POST   | `/workshops`       | Create workshop (`title` required) |
| PUT    | `/workshops/:id`   | Update workshop |
| DELETE | `/workshops/:id`   | Delete workshop |

---

## Authentication

1. Register at `/register` with name, email, and password.
2. Login at `/login` — a JWT token is stored in `localStorage` under the key `token`.
3. When logged in, the Events page shows options to add, edit, and delete events.
4. Use the **Logout** button in the navbar to clear the session.

---

## Progressive Web App (PWA)

Urban Harvest Hub is configured as an installable PWA:

- **Service worker** — auto-updates via `vite-plugin-pwa`
- **Web manifest** — app name, icons, theme color (`#2e7d32`)
- **Offline page** — `frontend/public/offline.html` shown when offline
- **Meta tags** — `mobile-web-app-capable`, Apple web app tags, and `theme-color`

To install on mobile: open the site in Chrome/Safari and choose **Add to Home Screen**.

---

## Internationalization

The app supports three languages via `react-i18next`:

| Language | Code | File |
|----------|------|------|
| English  | `en` | `frontend/src/locales/en.json` |
| Sinhala  | `si` | `frontend/src/locales/si.json` |
| Tamil    | `ta` | `frontend/src/locales/ta.json` |

Switch languages using the selector in the navbar.

---

## Styling & Responsiveness

- **Tailwind CSS 4** — utility classes and `@tailwindcss/vite` plugin
- **Custom components** — shared styles in `frontend/src/index.css` (`@layer components`)
- **Responsive breakpoints** — layouts adapt for phone, tablet, and desktop
- **Safe-area insets** — support for notched devices (iPhone, etc.)
- **Dark mode** — toggled via `body.dark` class

---

## Deployment

### Frontend (Vercel)

The frontend includes a `vercel.json` with SPA rewrites. Deploy the `frontend/` directory:

1. Connect your GitHub repo to [Vercel](https://vercel.com)
2. Set root directory to `frontend`
3. Add environment variable: `VITE_API_URL=<your-backend-url>`
4. Deploy

### Backend

Deploy the `backend/` folder to any Node.js host (Render, Railway, Heroku, etc.):

1. Set `MONGO_URI` and `PORT` environment variables
2. Run `npm start`
3. Ensure CORS allows your frontend domain

---

## Scripts Reference

### Root (`package.json`)

| Script | Command | Description |
|--------|---------|-------------|
| `dev`  | `npm run dev` | Run backend and frontend concurrently |

### Backend (`backend/package.json`)

| Script  | Command | Description |
|---------|---------|-------------|
| `start` | `npm start` | Start production server |
| `dev`   | `npm run dev` | Start with Nodemon (auto-reload) |

### Frontend (`frontend/package.json`)

| Script    | Command | Description |
|-----------|---------|-------------|
| `dev`     | `npm run dev` | Start Vite dev server |
| `build`   | `npm run build` | Production build to `dist/` |
| `preview` | `npm run preview` | Preview production build |
| `lint`    | `npm run lint` | Run ESLint |

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| MongoDB connection fails | Check `MONGO_URI` in `backend/.env` and ensure MongoDB is running |
| API requests fail from frontend | Verify backend is running on port 3000 and `VITE_API_URL` is correct |
| Blank events/products list | Backend may be down — frontend falls back to sample data for events/products |
| Styles not loading | Run `npm install` in `frontend/` and restart the dev server |
| PWA not installing | Use HTTPS in production; service worker requires a secure context |
| iOS input zoom on focus | Inputs use 16px font size to prevent auto-zoom |

---

## License

This project is for educational purposes. Update this section with your chosen license if needed.
