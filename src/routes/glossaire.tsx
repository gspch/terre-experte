import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { glossaire } from "@/data/glossaire";

export const Route = createFileRoute("/glossaire")({
  head: () => ({
    meta: [
      { title: "Glossaire militaire — sigles de l'armée de terre" },
      {
        name: "description",
        content:
          "GTIA, SCORPION, BSTAT, OPEX, NRBC : le vocabulaire et les sigles de l'armée de terre française expliqués simplement.",
      },
      { property: "og:title", content: "Glossaire militaire de l'armée de terre" },
      {
        property: "og:description",
        content: "Tous les sigles et termes indispensables pour comprendre l'armée de terre.",
      },
    ],
  }),
  component: GlossairePage,
});

function GlossairePage() {
  const [q, setQ] = useState("");
  const liste = useMemo(() => {
    const t = q.trim().toLowerCase();
    return glossaire
      .filter((g) => (t ? `${g.sigle} ${g.definition}`.toLowerCase().includes(t) : true))
      .sort((a, b) => a.sigle.localeCompare(b.sigle, "fr"));
  }, [q]);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <p className="rule-label">Vocabulaire</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Glossaire</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        L'armée parle par sigles. En voici la clé de lecture, du plus technique au plus
        traditionnel.
      </p>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Chercher un sigle ou un mot"
        className="mt-8 h-10 w-full rounded-sm border border-border bg-card px-3 text-sm outline-none focus:border-primary sm:max-w-sm"
      />

      <dl className="mt-8 divide-y divide-border border-y border-border">
        {liste.map((g) => (
          <div key={g.sigle} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-6">
            <dt className="stencil text-sm text-foreground">{g.sigle}</dt>
            <dd>
              <p className="text-sm text-muted-foreground">{g.definition}</p>
              <p className="rule-label mt-1">{g.categorie}</p>
            </dd>
          </div>
        ))}
      </dl>

      {liste.length === 0 && <p className="mt-6 text-sm text-muted-foreground">Aucun terme trouvé.</p>}
    </div>
  );
}
