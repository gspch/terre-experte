import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, GraduationCap, Map, Network, Shield, Star } from "lucide-react";

import { chiffresCles } from "@/data/organisation";
import { RechercheGlobale } from "@/components/recherche-globale";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manuel interactif de l'armée de terre française" },
      {
        name: "description",
        content:
          "Organisation, régiments, grades et insignes, armement, véhicules et écoles de l'armée de terre française, expliqués pas à pas.",
      },
      { property: "og:title", content: "Manuel interactif de l'armée de terre française" },
      {
        property: "og:description",
        content:
          "Divisions, brigades, régiments, grades, armement et écoles : tout comprendre de l'armée de terre.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Accueil,
});

const domaines = [
  {
    to: "/operations",
    icone: Map,
    titre: "Opérations et batailles",
    resume: "De l’Indochine à l’Europe orientale : chronologie, contextes, unités engagées et conséquences.",
  },
  {
    to: "/organisation",
    icone: Network,
    titre: "Organisation",
    resume:
      "Du chef d'état-major au régiment : divisions, brigades, armes et près de quatre-vingt-dix unités détaillées.",
  },
  {
    to: "/grades",
    icone: Star,
    titre: "Grades et insignes",
    resume: "Les 21 grades, du soldat de 2e classe au général d'armée, avec galons et appellations.",
  },
  {
    to: "/equipements",
    icone: Boxes,
    titre: "Armes et équipements",
    resume: "Fusils, missiles, blindés SCORPION, artillerie et hélicoptères, fiche par fiche.",
  },
  {
    to: "/ecoles",
    icone: GraduationCap,
    titre: "Écoles et parcours",
    resume: "Saint-Cyr, ENSOA, écoles d'armes et centres de spécialisation, plus les carrières types.",
  },
  {
    to: "/reserve",
    icone: Shield,
    titre: "Réserve et forces partenaires",
    resume: "Réservistes, gendarmes et pompiers militaires : qui fait partie de l'armée de terre.",
  },
] as const;

function Accueil() {
  return (
    <div>
      <section className="field-grid border-b border-border bg-sand/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <p className="rule-label">Manuel interactif · édition 2026</p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-[1.05] sm:text-6xl">
            Comprendre l'armée de terre française,
            <span className="text-primary"> jusque dans le détail</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base text-muted-foreground sm:text-lg">
            Une encyclopédie visuelle de l'organisation, des régiments, des grades, de l'armement,
            des écoles et des engagements depuis 1945. Suivez les filiations et apprenez le vocabulaire.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              to="/organisation"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Explorer l'organisation
              <ArrowRight className="h-4 w-4" />
            </Link>
            <RechercheGlobale />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-card">
        <dl className="mx-auto grid max-w-6xl grid-cols-2 gap-px bg-border sm:grid-cols-3 lg:grid-cols-6">
          {chiffresCles.map((c) => (
            <div key={c.label} className="bg-card px-4 py-6">
              <dt className="font-display text-2xl text-foreground">{c.valeur}</dt>
              <dd className="rule-label mt-1 normal-case tracking-wide">{c.label}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="stencil text-sm text-muted-foreground">Les six domaines</h2>
        <div className="mt-6 grid gap-px bg-border sm:grid-cols-2">
          {domaines.map((d) => (
            <Link
              key={d.to}
              to={d.to}
              className="group flex flex-col bg-card p-6 transition-colors hover:bg-secondary sm:p-8"
            >
              <d.icone className="h-6 w-6 text-primary" />
              <h3 className="mt-5 text-2xl text-foreground">{d.titre}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d.resume}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                Consulter
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4">
        <div className="rounded-sm border border-border bg-card p-6 sm:p-8">
          <h2 className="text-2xl text-foreground">Par où commencer</h2>
          <ol className="mt-4 grid gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <li>
              <span className="rule-label block">01 — La structure</span>
              <p className="mt-2">
                Deux divisions, onze brigades et commandements : c'est la charpente. Commencez par{" "}
                <Link to="/organisation" className="text-primary underline-offset-4 hover:underline">
                  l'arborescence
                </Link>
                .
              </p>
            </li>
            <li>
              <span className="rule-label block">02 — La hiérarchie</span>
              <p className="mt-2">
                Trois corps, 21 grades. Repérer un galon permet de situer immédiatement qui commande
                quoi sur le terrain.
              </p>
            </li>
            <li>
              <span className="rule-label block">03 — Le vocabulaire</span>
              <p className="mt-2">
                GTIA, SCORPION, BSTAT : le{" "}
                <Link to="/glossaire" className="text-primary underline-offset-4 hover:underline">
                  glossaire
                </Link>{" "}
                décode les sigles qui reviennent partout.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
