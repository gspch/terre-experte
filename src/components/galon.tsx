import type { Grade } from "@/data/types";
import { cn } from "@/lib/utils";

const tons: Record<Grade["galon"]["ton"], string> = {
  or: "bg-accent",
  argent: "bg-muted-foreground",
  laine: "bg-primary/60",
  rouge: "bg-destructive",
};

export function Galon({ grade, className }: { grade: Grade; className?: string }) {
  const { type, nombre, ton } = grade.galon;

  return (
    <div
      className={cn(
        "flex h-14 w-11 shrink-0 flex-col items-center justify-center gap-[3px] rounded-sm border border-border bg-graphite/90 px-1.5 py-1.5",
        className,
      )}
      aria-hidden="true"
    >
      {type === "etoile" &&
        Array.from({ length: Math.ceil(nombre / 3) }).map((_, ligne) => (
          <div key={ligne} className="flex gap-[2px]">
            {Array.from({ length: Math.min(3, nombre - ligne * 3) }).map((__, i) => (
              <Etoile key={i} className={tons[ton]} />
            ))}
          </div>
        ))}

      {type === "barre" &&
        (nombre === 0 ? (
          <div className="h-[3px] w-full rounded-full bg-border/40" />
        ) : (
          Array.from({ length: nombre }).map((_, i) => (
            <div key={i} className={cn("h-[3px] w-full rounded-full", tons[ton])} />
          ))
        ))}

      {type === "chevron" &&
        (nombre === 0 ? (
          <div className="h-[3px] w-full rounded-full bg-border/40" />
        ) : (
          Array.from({ length: nombre }).map((_, i) => (
            <div
              key={i}
              className={cn("h-2 w-full", i === nombre - 1 && ton === "or" ? tons.or : tons.laine)}
              style={{
                clipPath: "polygon(0 100%, 50% 25%, 100% 100%, 100% 65%, 50% 0, 0 65%)",
              }}
            />
          ))
        ))}
    </div>
  );
}

function Etoile({ className }: { className?: string }) {
  return (
    <div
      className={cn("h-2 w-2", className)}
      style={{
        clipPath:
          "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      }}
    />
  );
}
