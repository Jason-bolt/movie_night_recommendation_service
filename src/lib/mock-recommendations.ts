import type { Movie } from "@/components/MovieCard";
import { getRecommendationsFromGemini } from "./recommendations-server";

export async function getRecommendations(prompt: string): Promise<Movie[]> {
  return getRecommendationsFromGemini({ data: { prompt } });
}
