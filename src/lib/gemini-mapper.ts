import type { Movie } from "@/components/MovieCard";

export interface GeminiMovie {
  title: string;
  year: string;
  genres: string[];
  description: string;
  geminiTake: string;
  tmdbQuery: string;
}

export function mapGeminiMoviesToMovies(
  geminiMovies: GeminiMovie[],
  posters: Record<string, string>,
): Movie[] {
  return geminiMovies.map((m, i) => ({
    id: `${i}-${m.title.toLowerCase().replace(/\s+/g, "-")}`,
    title: m.title,
    year: m.year,
    genres: m.genres,
    description: m.description,
    geminiTake: m.geminiTake,
    imageUrl: posters[m.tmdbQuery] ?? undefined,
  }));
}
