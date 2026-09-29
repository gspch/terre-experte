import { createFileRoute } from "@tanstack/react-router";
import { MapPin } from "lucide-react";

import { ecoles, parcours } from "@/data/ecoles";

export const Route = createFileRoute("/ecoles")({
  head: () => ({
    meta: [
      { title: "Écoles militaires et parcours de carrière — armée de terre" },
      {
        name: "description",
        content:
          "Saint-Cyr Coëtquidan, ENSOA Saint-Maixent, écoles d'armes et centres de spécialisation, plus les parcours types du militaire du rang à l'officier.",
      },
      { property: "og:title", content: "Écoles militaires et parcours de carrière" },
      {
        property: "og:description",
        content: "Où et comment se forment les soldats, sous-officiers et officiers français.",
      },
    ],
  }),
  component: EcolesPage,
});

const groupes = [
  { cle: "officiers", titre: "Formation des officiers" },
  { cle: "sous-officiers", titre: "Formation des sous-officiers" },
  { cle: "arme", titre: "Écoles d'armes" },
  { cle: "specialisation", titre: "Centres de spécialisation" },
] as const;

function EcolesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="rule-label">Formation</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Écoles et parcours</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground">
        Dans l'armée de terre, on ne cesse jamais d'être élève. Chaque militaire suit une formation
        initiale, puis une spécialisation dans l'école de son arme, puis des stages tout au long de
        sa carrière. Voici les lieux où tout cela se passe.
      </p>

      {groupes.map((g) => (
        <section key={g.cle} className="mt-14">
          <h2 className="text-2xl text-foreground">{g.titre}</h2>
          <div className="mt-5 grid gap-px bg-border sm:grid-cols-2">
            {ecoles
              .filter((e) => e.categorie === g.cle)
              .map((e) => (
                <article key={e.id} id={e.id} className="scroll-mt-20 bg-card p-5">
                  <p className="stencil text-sm text-primary">{e.sigle}</p>
                  <h3 className="mt-2 text-lg text-foreground">{e.nom}</h3>
                  <p className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5" /> {e.ville}
                    {e.creation && <span>· depuis {e.creation}</span>}
                  </p>
                  <p className="mt-3 text-sm text-muted-foreground">{e.description}</p>
                  <dl className="mt-4 space-y-2 text-sm">
                    <div>
                      <dt className="rule-label">Forme</dt>
                      <dd className="text-muted-foreground">{e.forme}</dd>
                    </div>
                    <div>
                      <dt className="rule-label">Durée</dt>
                      <dd className="text-muted-foreground">{e.duree}</dd>
                    </div>
                  </dl>
                </article>
              ))}
          </div>
        </section>
      ))}

      <section className="mt-16">
        <h2 className="text-2xl text-foreground">Trois parcours types</h2>
        <div className="mt-5 space-y-6">
          {parcours.map((p) => (
            <article key={p.id} className="rounded-sm border border-border bg-card p-6">
              <h3 className="text-xl text-foreground">{p.titre}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.entree}</p>
              <ol className="mt-6 space-y-5 border-l border-border pl-6">
                {p.etapes.map((e, i) => (
                  <li key={e.titre} className="relative">
                    <span className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-primary font-mono text-[10px] text-primary-foreground">
                      {i + 1}
                    </span>
                    <p className="text-sm font-medium text-foreground">{e.titre}</p>
                    <p className="text-sm text-muted-foreground">{e.detail}</p>
                  </li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
