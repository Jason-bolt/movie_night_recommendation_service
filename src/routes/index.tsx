import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { MovieCard, MovieCardSkeleton, type Movie } from "@/components/MovieCard";
import { getRecommendations } from "@/lib/mock-recommendations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Reel — AI Movie Recommendations" },
      {
        name: "description",
        content: "Describe a mood, a memory, or a vibe. Get a curated set of films back.",
      },
      { property: "og:title", content: "Reel — AI Movie Recommendations" },
      {
        property: "og:description",
        content: "Describe a mood, a memory, or a vibe. Get a curated set of films back.",
      },
    ],
  }),
  component: Index,
});

const SUGGESTIONS = [
  "Horror movies for a rainy night",
  "Feel-good 90s comedies",
  "Mind-bending sci-fi with quiet pacing",
  "Romance that doesn't feel cheesy",
];

function Index() {
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Movie[]>([]);
  const [activePrompt, setActivePrompt] = useState("");

  const handleSubmit = async (prompt: string) => {
    setHasSearched(true);
    setIsLoading(true);
    setActivePrompt(prompt);
    setResults([]);
    try {
      const movies = await getRecommendations(prompt);
      setResults(movies);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky search header */}
      <motion.header
        layout
        transition={{ type: "spring", stiffness: 220, damping: 28 }}
        className={
          hasSearched
            ? "sticky top-0 z-30 border-b border-border bg-background/70 backdrop-blur-xl"
            : "relative"
        }
      >
        <motion.div
          layout
          className={
            hasSearched
              ? "mx-auto w-full max-w-3xl px-6 py-4"
              : "mx-auto flex min-h-[70vh] w-full max-w-3xl flex-col justify-center px-6 py-16"
          }
        >
          <AnimatePresence mode="wait">
            {!hasSearched && (
              <motion.div
                key="hero"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="mb-10 text-center"
              >
                <h1
                  className="text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  What should we watch?
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
                  Describe a mood, a memory, or a vibe. Get a curated set of films back.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <SearchInput
            onSubmit={handleSubmit}
            isLoading={isLoading}
            suggestions={hasSearched ? [] : SUGGESTIONS}
          />
        </motion.div>
      </motion.header>

      {/* Results */}
      <main className="mx-auto w-full max-w-6xl px-6 pb-24 pt-10">
        {hasSearched && (
          <div className="mb-8 flex items-center gap-3 text-sm text-muted-foreground">
            <span className="uppercase tracking-[0.2em] text-muted-foreground/70">
              Results for
            </span>
            <span className="truncate text-foreground">"{activePrompt}"</span>
          </div>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <MovieCardSkeleton key={i} />
            ))}
          </div>
        )}

        <AnimatePresence>
          {!isLoading && results.length > 0 && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {results.map((movie, i) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
