# Urban Harvest Hub — Frontend

React + Vite frontend for **Urban Harvest Hub**.

For full project documentation (installation, API, deployment, environment variables, and features), see the main README:

**[../README.md](../README.md)**

## Quick start

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:5173`.

## Environment

Create `frontend/.env` if the API is not on the default host:

```env
VITE_API_URL=http://localhost:3000
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Stack

- React 19 + Vite 8
- Tailwind CSS 4 (`@tailwindcss/vite`)
- React Router, Axios, i18next
- PWA via `vite-plugin-pwa`
