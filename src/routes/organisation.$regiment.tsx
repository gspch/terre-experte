import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MapPin, Star } from "lucide-react";

import { useFavoris } from "@/hooks/use-favoris";
import { armes, brigades, divisions } from "@/data/organisation";
import { ecoles } from "@/data/ecoles";
import { equipements } from "@/data/equipements";
import { regiments } from "@/data/regiments";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/organisation/$regiment")({
  loader: ({ params }) => {
    const regiment = regiments.find((r) => r.id === params.regiment);
    if (!regiment) throw notFound();
    return { regiment };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Unité introuvable" }, { name: "robots", content: "noindex" }],
      };
    }
    const r = loaderData.regiment;
    const titre = `${r.nom} (${r.sigle}) — ${r.garnison}`;
    const desc = `${r.specialite} Garnison : ${r.garnison}. ${r.histoire}`.slice(0, 180);
    return {
      meta: [
        { title: titre },
        { name: "description", content: desc },
        { property: "og:title", content: titre },
        { property: "og:description", content: desc },
      ],
    };
  },
  component: FicheRegiment,
  notFoundComponent: RegimentIntrouvable,
});

function RegimentIntrouvable() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center">
      <h1 className="text-3xl">Unité introuvable</h1>
      <p className="mt-3 text-muted-foreground">Cette unité n'est pas référencée dans le manuel.</p>
      <Link to="/organisation" className="mt-6 inline-block text-primary underline-offset-4 hover:underline">
        Revenir à la liste des régiments
      </Link>
    </div>
  );
}

function FicheRegiment() {
  const { regiment: r } = Route.useLoaderData();
  const { estFavori, basculer, pret } = useFavoris();
  const arme = armes.find((a) => a.id === r.arme)!;
  const brigade = brigades.find((b) => b.id === r.brigade);
  const division = divisions.find((d) => d.brigades.includes(r.brigade));
  const ecole = ecoles.find((e) => e.id === arme.ecoleId);
  const materiels = equipements.filter((e) => r.equipements.includes(e.id));
  const favori = pret && estFavori(`reg-${r.id}`);

  return (
    <div>
      <div className="field-grid border-b border-border bg-sand/50">
        <div className="mx-auto max-w-5xl px-4 py-10">
          <Link
            to="/organisation"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" /> Organisation
          </Link>
          <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="stencil text-sm text-primary">{r.sigle}</p>
              <h1 className="mt-2 text-3xl sm:text-4xl">{r.nom}</h1>
              {r.devise && <p className="mt-3 text-lg italic text-accent">{r.devise}</p>}
            </div>
            <button
              type="button"
              onClick={() => basculer(`reg-${r.id}`)}
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
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" /> {r.garnison} ({r.departement})
            </span>
            {r.creation && <span>Créé en {r.creation}</span>}
            <span>{arme.nom}</span>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-10">
          <section>
            <h2 className="stencil text-sm text-muted-foreground">Spécialité</h2>
            <p className="mt-3 text-lg text-foreground">{r.specialite}</p>
          </section>

          <section>
            <h2 className="stencil text-sm text-muted-foreground">Histoire et traditions</h2>
            <p className="mt-3 text-muted-foreground">{r.histoire}</p>
          </section>

          <section>
            <h2 className="stencil text-sm text-muted-foreground">Insigne</h2>
            <p className="mt-3 text-muted-foreground">{r.insigne}</p>
            <p className="mt-2 text-xs text-muted-foreground">
              Description héraldique — l'insigne lui-même n'est pas reproduit.
            </p>
          </section>

          <section>
            <h2 className="stencil text-sm text-muted-foreground">Principaux matériels</h2>
            <div className="mt-3 grid gap-px bg-border sm:grid-cols-2">
              {materiels.map((e) => (
                <Link
                  key={e.id}
                  to="/equipements/$equipement"
                  params={{ equipement: e.id }}
                  className="bg-card p-4 transition-colors hover:bg-secondary"
                >
                  <span className="block text-sm font-medium text-foreground">{e.nom}</span>
                  <span className="block text-xs text-muted-foreground">{e.role}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="space-y-6">
          <div className="rounded-sm border border-border bg-card p-5">
            <h2 className="stencil text-sm text-muted-foreground">Rattachement</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="rule-label">Division</dt>
                <dd className="text-foreground">{division?.nom ?? "—"}</dd>
              </div>
              <div>
                <dt className="rule-label">Brigade</dt>
                <dd className="text-foreground">{brigade?.nom ?? "—"}</dd>
              </div>
              <div>
                <dt className="rule-label">Arme</dt>
                <dd className="text-foreground">{arme.nom}</dd>
              </div>
              <div>
                <dt className="rule-label">Couleur d'arme</dt>
                <dd className="text-foreground">{arme.couleur}</dd>
              </div>
            </dl>
          </div>

          {ecole && (
            <Link
              to="/ecoles"
              hash={ecole.id}
              className="block rounded-sm border border-border bg-card p-5 transition-colors hover:bg-secondary"
            >
              <h2 className="stencil text-sm text-muted-foreground">École d'arme</h2>
              <p className="mt-3 text-sm font-medium text-foreground">{ecole.nom}</p>
              <p className="text-xs text-muted-foreground">{ecole.ville}</p>
            </Link>
          )}

          <div className="rounded-sm border border-border bg-card p-5">
            <h2 className="stencil text-sm text-muted-foreground">Même brigade</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {regiments
                .filter((x) => x.brigade === r.brigade && x.id !== r.id)
                .slice(0, 8)
                .map((x) => (
                  <li key={x.id}>
                    <Link
                      to="/organisation/$regiment"
                      params={{ regiment: x.id }}
                      className="text-muted-foreground hover:text-primary"
                    >
                      {x.sigle} — {x.garnison}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}
