import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Star } from "lucide-react";

import { categoriesEquipement, equipements } from "@/data/equipements";
import { armes } from "@/data/organisation";
import { regiments } from "@/data/regiments";
import { engagements, labelsTypeEngagement } from "@/data/operations";
import { useFavoris } from "@/hooks/use-favoris";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/equipements/$equipement")({
  loader: ({ params }) => {
    const equipement = equipements.find((e) => e.id === params.equipement);
    if (!equipement) throw notFound();
    return { equipement };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Matériel introuvable" }, { name: "robots", content: "noindex" }] };
    }
    const e = loaderData.equipement;
    const titre = `${e.nom} — ${e.role}`;
    const desc = e.description.slice(0, 180);
    return {
      meta: [
        { title: titre },
        { name: "description", content: desc },
        { property: "og:title", content: titre },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: FicheEquipement,
  notFoundComponent: Introuvable,
});

function Introuvable() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl">Matériel introuvable</h1>
      <Link to="/equipements" className="mt-6 inline-block text-primary underline-offset-4 hover:underline">
        Revenir aux équipements
      </Link>
    </div>
  );
}

function FicheEquipement() {
  const { equipement: e } = Route.useLoaderData();
  const { estFavori, basculer, pret } = useFavoris();
  const favori = pret && estFavori(`eq-${e.id}`);
  const utilisateurs = regiments.filter((r) => r.equipements.includes(e.id));
  const operations = engagements.filter((engagement) => engagement.equipementIds.includes(e.id));

  return (
    <div>
      <div className="field-grid border-b border-border bg-sand/50">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <Link
            to="/equipements"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Équipements
          </Link>
          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="rule-label">{categoriesEquipement[e.categorie].titre}</p>
              <h1 className="mt-2 text-3xl sm:text-4xl">{e.nom}</h1>
              <p className="mt-3 text-lg text-muted-foreground">{e.role}</p>
            </div>
            <button
              type="button"
              onClick={() => basculer(`eq-${e.id}`)}
              className={cn(
                "inline-flex items-center gap-2 rounded-sm border px-3 py-2 text-sm transition-colors",
                favori
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              <Star className={cn("h-4 w-4", favori && "fill-current")} />
              {favori ? "En favori" : "Mettre en favori"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="stencil text-sm text-muted-foreground">Description</h2>
            <p className="mt-3 text-muted-foreground">{e.description}</p>
          </section>

          <section>
            <h2 className="stencil text-sm text-muted-foreground">Caractéristiques</h2>
            <dl className="mt-3 divide-y divide-border rounded-sm border border-border bg-card">
              {e.caracteristiques.map((c) => (
                <div key={c.label} className="flex flex-wrap justify-between gap-2 px-4 py-3">
                  <dt className="text-sm text-muted-foreground">{c.label}</dt>
                  <dd className="font-mono text-sm text-foreground">{c.valeur}</dd>
                </div>
              ))}
            </dl>
          </section>

          {utilisateurs.length > 0 && (
            <section>
              <h2 className="stencil text-sm text-muted-foreground">Unités qui l'emploient</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {utilisateurs.map((r) => (
                  <Link
                    key={r.id}
                    to="/organisation/$regiment"
                    params={{ regiment: r.id }}
                    className="rounded-sm border border-border bg-card px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                  >
                    {r.sigle}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {operations.length > 0 && (
            <section>
              <h2 className="stencil text-sm text-muted-foreground">Engagements documentés</h2>
              <div className="mt-3 divide-y divide-border border-y border-border">
                {operations.map((operation) => (
                  <Link key={operation.id} to="/operations/$operation" params={{ operation: operation.id }} className="flex items-center justify-between gap-4 py-3 text-sm transition-colors hover:text-primary">
                    <span>{operation.nom}</span>
                    <span className="rule-label shrink-0">{labelsTypeEngagement[operation.type]} · {operation.anneeDebut}</span>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          <div className="rounded-sm border border-border bg-card p-5">
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="rule-label">Constructeur</dt>
                <dd className="text-foreground">{e.constructeur}</dd>
              </div>
              <div>
                <dt className="rule-label">En service</dt>
                <dd className="text-foreground">{e.service}</dd>
              </div>
              <div>
                <dt className="rule-label">Dotation</dt>
                <dd className="text-foreground">{e.dotation}</dd>
              </div>
              <div>
                <dt className="rule-label">Armes concernées</dt>
                <dd className="text-foreground">
                  {e.armes.map((id) => armes.find((a) => a.id === id)?.nom).filter(Boolean).join(", ")}
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
