import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { rechercher } from "@/data/recherche";
import { cn } from "@/lib/utils";

export function RechercheGlobale({ variant = "bar" }: { variant?: "bar" | "icone" }) {
  const [ouvert, setOuvert] = useState(false);
  const [q, setQ] = useState("");
  const resultats = useMemo(() => rechercher(q), [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOuvert((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={() => setOuvert(true)}
        aria-label="Rechercher"
        className={cn(
          "flex items-center gap-2 rounded-sm border border-border bg-background/70 text-muted-foreground transition-colors hover:border-primary hover:text-foreground",
          variant === "bar" ? "h-9 w-56 px-3 text-sm" : "h-9 w-9 justify-center",
        )}
      >
        <Search className="h-4 w-4 shrink-0" />
        {variant === "bar" && (
          <>
            <span className="truncate">Rechercher…</span>
            <kbd className="ml-auto font-mono text-[10px] tracking-widest">⌘K</kbd>
          </>
        )}
      </button>

      <Dialog open={ouvert} onOpenChange={setOuvert}>
        <DialogContent className="max-w-xl gap-0 overflow-hidden p-0">
          <DialogTitle className="sr-only">Recherche</DialogTitle>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Régiment, grade, véhicule, sigle…"
              className="h-14 w-full bg-transparent text-base outline-none placeholder:text-muted-foreground"
            />
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {q.trim().length < 2 && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">
                Saisissez au moins deux lettres.
              </p>
            )}
            {q.trim().length >= 2 && resultats.length === 0 && (
              <p className="px-3 py-6 text-center text-sm text-muted-foreground">Aucun résultat.</p>
            )}
            {resultats.map((r) => (
              <Link
                key={r.id}
                to={r.to}
                params={r.params as never}
                hash={r.hash}
                onClick={() => setOuvert(false)}
                className="flex items-start gap-3 rounded-sm px-3 py-2.5 transition-colors hover:bg-secondary"
              >
                <span className="rule-label mt-0.5 w-20 shrink-0">{r.type}</span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-foreground">{r.titre}</span>
                  <span className="block truncate text-xs text-muted-foreground">{r.sousTitre}</span>
                </span>
              </Link>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
