import type { Movie } from "@/components/MovieCard";

// Placeholder generator. Swap with Gemini API call later.
// Signature kept simple so it's trivial to replace:
//   export async function getRecommendations(prompt: string): Promise<Movie[]>
export async function getRecommendations(prompt: string): Promise<Movie[]> {
  await new Promise((r) => setTimeout(r, 1100));

  const seed = prompt.toLowerCase();
  const base: Movie[] = [
    {
      id: "1",
      title: "Lost in Translation",
      year: "2003",
      genres: ["Drama", "Romance"],
      description:
        "A faded movie star and a neglected young woman form an unlikely bond after crossing paths in a Tokyo hotel.",
    },
    {
      id: "2",
      title: "Blade Runner 2049",
      year: "2017",
      genres: ["Sci-Fi", "Noir"],
      description:
        "A young blade runner's discovery of a long-buried secret leads him on a quest to find a former blade runner who has been missing for thirty years.",
    },
    {
      id: "3",
      title: "Past Lives",
      year: "2023",
      genres: ["Drama", "Romance"],
      description:
        "Two childhood friends reunite in New York for one fateful week as they confront notions of love, destiny, and the choices that make a life.",
    },
    {
      id: "4",
      title: "The Grand Budapest Hotel",
      year: "2014",
      genres: ["Comedy", "Drama"],
      description:
        "A legendary concierge at a famous European hotel and his trusted lobby boy become embroiled in the theft of a priceless Renaissance painting.",
    },
    {
      id: "5",
      title: "Arrival",
      year: "2016",
      genres: ["Sci-Fi", "Drama"],
      description:
        "A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecraft appear around the world.",
    },
    {
      id: "6",
      title: "Call Me by Your Name",
      year: "2017",
      genres: ["Drama", "Romance"],
      description:
        "In Northern Italy in 1983, seventeen-year-old Elio begins a relationship with visiting Oliver, his father's research assistant.",
    },
  ];

  return base.map((m) => ({
    ...m,
    description: seed ? `${m.description}` : m.description,
  }));
}
