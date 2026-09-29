import { equipements } from "./equipements";
import { ecoles } from "./ecoles";
import { glossaire } from "./glossaire";
import { grades } from "./grades";
import { regiments } from "./regiments";

export type ResultatType = "Régiment" | "Grade" | "Équipement" | "École" | "Sigle";

export interface Resultat {
  id: string;
  type: ResultatType;
  titre: string;
  sousTitre: string;
  to: string;
  params?: Record<string, string>;
  hash?: string;
  texte: string;
}

export const indexRecherche: Resultat[] = [
  ...regiments.map((r) => ({
    id: `reg-${r.id}`,
    type: "Régiment" as const,
    titre: r.sigle,
    sousTitre: `${r.nom} — ${r.garnison}`,
    to: "/organisation/$regiment",
    params: { regiment: r.id },
    texte: `${r.sigle} ${r.nom} ${r.garnison} ${r.departement} ${r.specialite} ${r.devise ?? ""}`.toLowerCase(),
  })),
  ...grades.map((g) => ({
    id: `grade-${g.id}`,
    type: "Grade" as const,
    titre: g.nom,
    sousTitre: `${g.abrev} — code OTAN ${g.otan}`,
    to: "/grades",
    hash: g.id,
    texte: `${g.nom} ${g.abrev} ${g.otan} ${g.role}`.toLowerCase(),
  })),
  ...equipements.map((e) => ({
    id: `eq-${e.id}`,
    type: "Équipement" as const,
    titre: e.nom,
    sousTitre: e.role,
    to: "/equipements/$equipement",
    params: { equipement: e.id },
    texte: `${e.nom} ${e.role} ${e.constructeur} ${e.description}`.toLowerCase(),
  })),
  ...ecoles.map((e) => ({
    id: `ecole-${e.id}`,
    type: "École" as const,
    titre: e.sigle,
    sousTitre: `${e.nom} — ${e.ville}`,
    to: "/ecoles",
    hash: e.id,
    texte: `${e.sigle} ${e.nom} ${e.ville} ${e.forme}`.toLowerCase(),
  })),
  ...glossaire.map((t) => ({
    id: `gl-${t.sigle}`,
    type: "Sigle" as const,
    titre: t.sigle,
    sousTitre: t.definition,
    to: "/glossaire",
    texte: `${t.sigle} ${t.definition}`.toLowerCase(),
  })),
];

export function rechercher(query: string, limite = 24): Resultat[] {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return [];
  const mots = q.split(/\s+/);
  return indexRecherche
    .map((r) => {
      let score = 0;
      for (const mot of mots) {
        if (!r.texte.includes(mot)) return null;
        score += r.titre.toLowerCase().startsWith(mot) ? 3 : r.titre.toLowerCase().includes(mot) ? 2 : 1;
      }
      return { r, score };
    })
    .filter((x): x is { r: Resultat; score: number } => x !== null)
    .sort((a, b) => b.score - a.score)
    .slice(0, limite)
    .map((x) => x.r);
}
