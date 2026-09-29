import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { categoriesEquipement, equipements } from "@/data/equipements";
import { mediasEquipements } from "@/data/medias-equipements";
import type { EquipCategorie } from "@/data/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/equipements/")({
  head: () => ({
    meta: [
      { title: "Armement et équipements de l'armée de terre" },
      {
        name: "description",
        content:
          "Fusils, missiles, blindés SCORPION, chars Leclerc, artillerie CAESAr et hélicoptères : les matériels de l'armée de terre française, fiche par fiche.",
      },
      { property: "og:title", content: "Armement et équipements de l'armée de terre" },
      {
        property: "og:description",
        content: "HK416F, Griffon, Jaguar, Leclerc XLR, CAESAr, Tigre : caractéristiques et emploi.",
      },
    ],
  }),
  component: EquipementsPage,
});

const cles = Object.keys(categoriesEquipement) as EquipCategorie[];

function EquipementsPage() {
  const [cat, setCat] = useState<EquipCategorie | "toutes">("toutes");
  const liste = useMemo(
    () => equipements.filter((e) => (cat === "toutes" ? true : e.categorie === cat)),
    [cat],
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <p className="rule-label">Matériels</p>
      <h1 className="mt-3 text-4xl sm:text-5xl">Armes et équipements</h1>
      <p className="mt-4 max-w-3xl text-muted-foreground">
        De l'arme individuelle au char de bataille, chaque matériel répond à un besoin tactique
        précis. Le programme SCORPION relie désormais ces véhicules entre eux : c'est le combat
        collaboratif, où chaque engin partage ce qu'il voit avec les autres.
      </p>

      <div className="mt-8 flex flex-wrap gap-2">
        <Bouton actif={cat === "toutes"} onClick={() => setCat("toutes")}>
          Tout
        </Bouton>
        {cles.map((c) => (
          <Bouton key={c} actif={cat === c} onClick={() => setCat(c)}>
            {categoriesEquipement[c].titre}
          </Bouton>
        ))}
      </div>

      {cat !== "toutes" && (
        <p className="mt-5 max-w-2xl text-sm text-muted-foreground">
          {categoriesEquipement[cat].resume}
        </p>
      )}

      <div className="mt-8 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {liste.map((e) => (
          <Link
            key={e.id}
            to="/equipements/$equipement"
            params={{ equipement: e.id }}
            className="group flex flex-col overflow-hidden bg-card transition-colors hover:bg-secondary"
          >
            <img src={mediasEquipements[e.id].src} alt={mediasEquipements[e.id].alt} loading="lazy" className="aspect-[16/9] w-full object-cover grayscale-[20%] transition-transform duration-300 group-hover:scale-[1.02]" />
            <span className="flex flex-1 flex-col p-5">
              <span className="rule-label">{categoriesEquipement[e.categorie].titre}</span>
              <span className="mt-2 text-xl text-foreground">{e.nom}</span>
              <span className="mt-1 text-sm text-muted-foreground">{e.role}</span>
              <span className="mt-4 font-mono text-xs text-muted-foreground">{e.caracteristiques[0]?.label} : {e.caracteristiques[0]?.valeur}</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function Bouton({
  actif,
  onClick,
  children,
}: {
  actif: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-sm border px-3 py-2 text-sm transition-colors",
        actif
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
