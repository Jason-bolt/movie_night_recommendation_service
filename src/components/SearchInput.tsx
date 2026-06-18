import { ArrowUp, Sparkles } from "lucide-react";
import { useState, type FormEvent } from "react";

interface SearchInputProps {
  onSubmit: (prompt: string) => void;
  isLoading?: boolean;
  suggestions?: string[];
}

export function SearchInput({ onSubmit, isLoading, suggestions = [] }: SearchInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || isLoading) return;
    onSubmit(trimmed);
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="group relative flex items-center gap-2 rounded-2xl border border-border bg-surface/80 px-4 py-3 backdrop-blur-xl transition-colors focus-within:border-foreground/30"
      >
        <Sparkles size={18} className="shrink-0 text-muted-foreground" strokeWidth={1.75} />
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Describe what you want to watch tonight…"
          className="min-w-0 flex-1 bg-transparent text-base text-foreground placeholder:text-muted-foreground/70 focus:outline-none"
          autoFocus
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          aria-label="Generate"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-foreground text-background transition-opacity disabled:opacity-30"
        >
          <ArrowUp size={18} strokeWidth={2.25} />
        </button>
      </form>

      {suggestions.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {suggestions.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setValue(s)}
              className="rounded-full border border-border bg-surface/60 px-3.5 py-1.5 text-xs text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
