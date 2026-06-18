import { ArrowUpRight, Film } from "lucide-react";

export interface Movie {
  id: string;
  title: string;
  year?: string;
  genres: string[];
  description: string;
  imageUrl?: string;
}

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-colors hover:border-foreground/20">
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-surface-elevated">
        {movie.imageUrl ? (
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground/40">
            <Film size={40} strokeWidth={1.25} />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-lg font-semibold tracking-tight text-foreground">
            {movie.title}
            {movie.year && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                {movie.year}
              </span>
            )}
          </h3>
        </div>

        {movie.genres.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
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

        <p className="line-clamp-4 text-sm leading-relaxed text-muted-foreground">
          {movie.description}
        </p>

        <div className="mt-auto pt-2">
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm text-foreground/90 transition-colors hover:text-foreground"
          >
            More info
            <ArrowUpRight
              size={14}
              strokeWidth={2}
              className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </a>
        </div>
      </div>
    </article>
  );
}

export function MovieCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-border bg-surface">
      <div className="aspect-[2/3] w-full animate-pulse bg-surface-elevated" />
      <div className="flex flex-col gap-3 p-5">
        <div className="h-5 w-3/4 animate-pulse rounded-md bg-surface-elevated" />
        <div className="flex gap-1.5">
          <div className="h-4 w-14 animate-pulse rounded-full bg-surface-elevated" />
          <div className="h-4 w-16 animate-pulse rounded-full bg-surface-elevated" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-surface-elevated" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-surface-elevated" />
          <div className="h-3 w-4/6 animate-pulse rounded bg-surface-elevated" />
        </div>
      </div>
    </div>
  );
}
