import { createServerFn } from "@tanstack/react-start";
import { GoogleGenAI } from "@google/genai";
import { mapGeminiMoviesToMovies, type GeminiMovie } from "./gemini-mapper";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

async function fetchTmdbPoster(query: string, apiKey: string): Promise<string | null> {
  try {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}&page=1`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = (await res.json()) as { results?: { poster_path?: string }[] };
    const posterPath = data.results?.[0]?.poster_path;
    return posterPath ? `${TMDB_IMAGE_BASE}${posterPath}` : null;
  } catch {
    return null;
  }
}

export const getRecommendationsFromGemini = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (typeof data !== "object" || data === null || typeof (data as { prompt?: unknown }).prompt !== "string") {
      throw new Error("prompt must be a string");
    }
    return data as { prompt: string };
  })
  .handler(async ({ data }) => {
    const { prompt } = data;

    const geminiKey = process.env.GEMINI_API_KEY;
    const tmdbKey = process.env.TMDB_API_KEY;

    if (!geminiKey) throw new Error("GEMINI_API_KEY not configured");

    const ai = new GoogleGenAI({ apiKey: geminiKey });

    const systemPrompt = `You are a passionate film curator. Given a description of the kind of movies someone wants to watch, return up to 15 movie recommendations as a JSON array.

Each movie object must have exactly these fields:
- title: string (the movie title)
- year: string (4-digit release year)
- genres: string[] (2-4 genres, e.g. ["Drama", "Sci-Fi"])
- description: string (2-3 sentence plot summary, no spoilers)
- geminiTake: string (2-3 sentences on why this movie fits the request — your personal curator's take)
- tmdbQuery: string (title + year for TMDB search, e.g. "Blade Runner 1982")

Return ONLY valid JSON. No markdown, no code blocks, no extra text. Just the raw JSON array.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser request: ${prompt}` }],
        },
      ],
    });

    const raw = response.text ?? "";
    const cleaned = raw.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();

    let geminiMovies: GeminiMovie[];
    try {
      geminiMovies = JSON.parse(cleaned);
      if (!Array.isArray(geminiMovies)) throw new Error("Not an array");
    } catch {
      throw new Error("Failed to parse Gemini response");
    }

    const posters: Record<string, string> = {};
    if (tmdbKey) {
      await Promise.all(
        geminiMovies.map(async (m) => {
          const url = await fetchTmdbPoster(m.tmdbQuery, tmdbKey);
          if (url) posters[m.tmdbQuery] = url;
        }),
      );
    }

    return mapGeminiMoviesToMovies(geminiMovies, posters);
  });
