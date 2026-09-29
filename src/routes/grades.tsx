import { createFileRoute } from "@tanstack/react-router";

import { Galon } from "@/components/galon";
import { corpsLabels, grades } from "@/data/grades";
import type { Corps } from "@/data/types";

export const Route = createFileRoute("/grades")({
  head: () => ({
    meta: [
      { title: "Grades et insignes de l'armée de terre française" },
      {
        name: "description",
        content:
          "Les 21 grades de l'armée de terre, du soldat de 2e classe au général d'armée : galons, appellations, codes OTAN et responsabilités.",
      },
      { property: "og:title", content: "Grades et insignes de l'armée de terre" },
      {
        property: "og:description",
        content: "Militaires du rang, sous-officiers et officiers : la hiérarchie expliquée grade par grade.",
      },
    ],
  }),
  component: GradesPage,
});

const ordre: Corps[] = ["rang", "sous-officiers", "officiers"];

function GradesPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <p className="rule-label">Hiérarchie</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Grades et insignes</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground">
        La hiérarchie de l'armée de terre se lit en trois corps. Le galon porté sur la poitrine ou la
        patte d'épaule indique le grade ; sa forme (chevron, barrette, étoile) et sa couleur
        permettent de situer un militaire en un coup d'œil. Les codes OTAN (OR pour les
        non-officiers, OF pour les officiers) donnent l'équivalence avec les armées alliées.
      </p>

      <p className="mt-4 text-xs text-muted-foreground">
        Les galons sont représentés de façon schématique : nombre et type de marques, sans
        reproduction fidèle des insignes officiels.
      </p>

      {ordre.map((corps) => (
        <section key={corps} className="mt-14">
          <h2 className="text-2xl text-foreground">{corpsLabels[corps].titre}</h2>
          <p className="mt-2 max-w-3xl text-sm text-muted-foreground">{corpsLabels[corps].resume}</p>

          <div className="mt-6 space-y-px bg-border">
            {grades
              .filter((g) => g.corps === corps)
              .map((g) => (
                <article
                  key={g.id}
                  id={g.id}
                  className="scroll-mt-20 bg-card p-5 transition-colors hover:bg-secondary/60"
                >
                  <div className="flex gap-5">
                    <Galon grade={g} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-xl text-foreground">{g.nom}</h3>
                        <span className="rule-label">
                          {g.abrev} · {g.otan}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-foreground">{g.role}</p>
                      <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
                        <div>
                          <dt className="rule-label">Insigne</dt>
                          <dd className="text-muted-foreground">{g.insigne}</dd>
                        </div>
                        <div>
                          <dt className="rule-label">Appellation</dt>
                          <dd className="text-muted-foreground">{g.appellation}</dd>
                        </div>
                        <div>
                          <dt className="rule-label">Quand</dt>
                          <dd className="text-muted-foreground">{g.temps}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  );
}
