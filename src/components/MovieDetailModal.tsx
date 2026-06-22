import { AnimatePresence, motion } from "framer-motion";
import { X, Film, Sparkles } from "lucide-react";
import { useEffect } from "react";
import type { Movie } from "./MovieCard";

interface MovieDetailModalProps {
  movie: Movie | null;
  onClose: () => void;
}

export function MovieDetailModal({ movie, onClose }: MovieDetailModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {movie && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/80 backdrop-blur-md"
            onClick={onClose}
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-2xl -translate-y-1/2 overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-label={movie.title}
          >
            <div className="flex gap-5 p-6 sm:p-8">
              {/* Poster */}
              <div className="hidden shrink-0 sm:block">
                <div className="relative h-48 w-32 overflow-hidden rounded-xl border border-border bg-surface-elevated">
                  {movie.imageUrl ? (
                    <img
                      src={movie.imageUrl}
                      alt={movie.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-muted-foreground/30">
                      <Film size={32} strokeWidth={1.25} />
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="flex min-w-0 flex-1 flex-col gap-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-foreground">
                      {movie.title}
                      {movie.year && (
                        <span className="ml-2 text-sm font-normal text-muted-foreground">
                          {movie.year}
                        </span>
                      )}
                    </h2>
                    {movie.genres.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {movie.genres.map((g) => (
                          <span
                            key={g}
                            className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-muted-foreground"
                          >
                            {g}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={onClose}
                    className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                    aria-label="Close"
                  >
                    <X size={15} strokeWidth={2} />
                  </button>
                </div>

                <p className="text-sm leading-relaxed text-muted-foreground">
                  {movie.description}
                </p>

                {movie.geminiTake && (
                  <div className="rounded-xl border border-border bg-background/30 p-4">
                    <div className="mb-2 flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
                      <Sparkles size={12} strokeWidth={2} />
                      Curator's take
                    </div>
                    <p className="text-sm leading-relaxed text-foreground/80">
                      {movie.geminiTake}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
