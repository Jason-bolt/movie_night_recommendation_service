# Reel — AI Movie Recommendations

Describe a mood, a memory, or a vibe — get back a curated set of films, picked by Gemini and illustrated with posters from TMDB.

![Built with TanStack Start](https://img.shields.io/badge/TanStack%20Start-grey) ![TypeScript](https://img.shields.io/badge/TypeScript-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38bdf8)

## How it works

1. You type a free-form description of what you want to watch (e.g. *"mind-bending sci-fi with quiet pacing"*).
2. A server function sends that prompt to **Gemini 2.5 Flash**, asking for up to 15 movie recommendations as structured JSON (title, year, genres, description, and a short "curator's take" on why it fits).
3. For each movie, the server looks up a poster image on **TMDB**. If no poster is found, the UI falls back to a placeholder film icon.
4. Results render as animated cards, 12 at a time with a "Load more" button. Clicking "More info" on any card opens a modal with the full plot summary and Gemini's personal take on the pick.

## Tech stack

| Layer | Choice |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) (React, file-based routing, SSR) |
| Language | TypeScript |
| Styling | Tailwind CSS + [shadcn/ui](https://ui.shadcn.com) components |
| Animation | Framer Motion |
| AI | Google Gemini API (`@google/genai`) |
| Movie posters | [TMDB API](https://www.themoviedb.org/documentation/api) |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up your environment variables

Copy the example file and fill in your own API keys:

```bash
cp .env.example .env
```

You'll need two keys:

- **`GEMINI_API_KEY`** — Get a free key from [Google AI Studio](https://aistudio.google.com) (click "Get API Key"). Make sure it's an AI Studio key, not a Google Cloud Console key — only AI Studio keys include the free tier.
- **`TMDB_API_KEY`** — Create a free account at [themoviedb.org](https://www.themoviedb.org/), then generate an API key (v3 or v4 read token both work) under your account settings → API.

Your `.env` should look like:

```
GEMINI_API_KEY=your_gemini_api_key_here
TMDB_API_KEY=your_tmdb_api_key_here
```

`.env` is gitignored — never commit real keys.

### 3. Run the dev server

```bash
npm run dev
```

The app will be available at the local URL printed in your terminal (typically `http://localhost:8080` or the next free port).

## Other scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local dev server with hot reload |
| `npm run build` | Build a production bundle |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run format` | Format the codebase with Prettier |

## Project structure

```
src/
├── components/
│   ├── MovieCard.tsx          # Movie card UI + the shared Movie type
│   ├── MovieDetailModal.tsx   # "More info" popup with Gemini's full take
│   ├── SearchInput.tsx        # The prompt input + suggestion chips
│   └── ui/                    # shadcn/ui primitives
├── lib/
│   ├── recommendations-server.ts  # Server function: calls Gemini + TMDB
│   ├── gemini-mapper.ts           # Maps Gemini's raw JSON into the Movie shape
│   └── mock-recommendations.ts    # Client-side entry point used by the UI
└── routes/
    ├── __root.tsx             # App shell, layout, error/404 boundaries
    └── index.tsx               # Home page: search, results grid, load more
```

## Notes on the free tier

Gemini's free tier has rate limits (requests per minute/day). If you see a `429` or quota error, you may have:

- Used a Google Cloud Console key instead of an AI Studio key (Cloud keys have no free tier by default)
- Hit the per-minute request limit — wait a moment and try again

The number of movies requested per search is capped at 15 to stay comfortably within free tier limits.
