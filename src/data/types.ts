export type ArmeId =
  | "infanterie"
  | "cavalerie"
  | "artillerie"
  | "genie"
  | "transmissions"
  | "train"
  | "materiel"
  | "alat"
  | "marine"
  | "legion"
  | "montagne"
  | "commandement";

export interface Arme {
  id: ArmeId;
  nom: string;
  couleur: string;
  devise?: string;
  role: string;
  ecoleId?: string;
}

export interface Regiment {
  id: string;
  nom: string;
  sigle: string;
  arme: ArmeId;
  brigade: string;
  garnison: string;
  departement: string;
  creation?: string;
  devise?: string;
  insigne: string;
  specialite: string;
  histoire: string;
  equipements: string[];
}

export interface Brigade {
  id: string;
  nom: string;
  sigle: string;
  division: string;
  etatMajor: string;
  specialite: string;
}

export interface Division {
  id: string;
  nom: string;
  sigle: string;
  etatMajor: string;
  role: string;
  brigades: string[];
}

export type Corps = "rang" | "sous-officiers" | "officiers";

export interface Grade {
  id: string;
  nom: string;
  abrev: string;
  corps: Corps;
  niveau: number;
  otan: string;
  appellation: string;
  insigne: string;
  galon: { type: "barre" | "chevron" | "etoile"; nombre: number; ton: "or" | "argent" | "laine" | "rouge" };
  temps: string;
  role: string;
}

export type EquipCategorie =
  | "individuel"
  | "appui"
  | "blindes"
  | "artillerie"
  | "aeromobile"
  | "combattant";

export interface Equipement {
  id: string;
  nom: string;
  categorie: EquipCategorie;
  constructeur: string;
  service: string;
  role: string;
  caracteristiques: { label: string; valeur: string }[];
  dotation: string;
  description: string;
  armes: ArmeId[];
}

export interface Ecole {
  id: string;
  nom: string;
  sigle: string;
  ville: string;
  forme: string;
  duree: string;
  creation?: string;
  categorie: "officiers" | "sous-officiers" | "arme" | "specialisation";
  description: string;
}

export interface Parcours {
  id: string;
  titre: string;
  entree: string;
  etapes: { titre: string; detail: string }[];
}

export interface TermeGlossaire {
  sigle: string;
  definition: string;
  categorie: string;
}

export type TypeEngagement = "theatre" | "operation" | "bataille";

export type ZoneOperation = "Asie" | "Afrique" | "Moyen-Orient" | "Europe";

export interface SourceDocumentaire {
  titre: string;
  organisme: string;
  url: string;
}

export interface Engagement {
  id: string;
  nom: string;
  type: TypeEngagement;
  zone: ZoneOperation;
  lieu: string;
  debut: string;
  fin: string;
  anneeDebut: number;
  resume: string;
  contexte: string;
  objectifs: string;
  deroulement: string;
  resultat: string;
  consequences: string;
  regimentIds: string[];
  equipementIds: string[];
  sources: SourceDocumentaire[];
}

