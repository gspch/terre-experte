import { createFileRoute, Link } from "@tanstack/react-router";

import { regiments } from "@/data/regiments";
import { forcesPartenaires } from "@/data/reserve";

export const Route = createFileRoute("/reserve")({
  head: () => ({
    meta: [
      { title: "Réserve, gendarmerie et pompiers militaires — Armée de terre" },
      {
        name: "description",
        content:
          "Réserve opérationnelle, gendarmerie nationale, BSPP et sécurité civile : qui fait partie de l'armée de terre et qui n'en fait pas partie.",
      },
      { property: "og:title", content: "Réserve et forces partenaires de l'armée de terre" },
      { property: "og:description", content: "Réservistes, gendarmes et pompiers militaires expliqués simplement." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ReservePage,
});

function ReservePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="rule-label">Au-delà de l'active</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Réserve et forces partenaires</h1>
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Réservistes, gendarmes, pompiers : ce qui relève de l'armée de terre, et ce qui n'en relève pas.
      </p>

      <nav className="mt-6 flex flex-wrap gap-2">
        {forcesPartenaires.map((f) => (
          <a key={f.id} href={`#${f.id}`} className="rounded-sm border border-border px-3 py-1.5 text-sm hover:border-primary">
            {f.titre}
          </a>
        ))}
      </nav>

      {forcesPartenaires.map((f) => {
        const unites = regiments.filter((r) => f.regimentIds.includes(r.id));
        return (
          <section key={f.id} id={f.id} className="mt-12 scroll-mt-20 border-t border-border pt-8">
            <p className="rule-label">{f.statut}</p>
            <h2 className="mt-2 text-3xl">{f.titre}</h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">{f.resume}</p>
            <dl className="mt-6 grid gap-4 sm:grid-cols-2">
              {f.points.map((p) => (
                <div key={p.titre} className="rounded-sm border border-border bg-card p-4">
                  <dt className="stencil text-sm">{p.titre}</dt>
                  <dd className="mt-1 text-sm text-muted-foreground">{p.detail}</dd>
                </div>
              ))}
            </dl>
            {unites.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {unites.map((u) => (
                  <Link
                    key={u.id}
                    to="/organisation/$regiment"
                    params={{ regiment: u.id }}
                    className="rounded-sm bg-secondary px-3 py-1.5 text-sm hover:text-primary"
                  >
                    {u.sigle} — {u.garnison}
                  </Link>
                ))}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
