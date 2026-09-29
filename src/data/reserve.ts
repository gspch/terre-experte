export interface SectionForce {
  id: string;
  titre: string;
  statut: string;
  resume: string;
  points: { titre: string; detail: string }[];
  regimentIds: string[];
}

export const forcesPartenaires: SectionForce[] = [
  {
    id: "reserve",
    titre: "Réserve opérationnelle",
    statut: "Partie intégrante de l'armée de terre",
    resume:
      "Environ 24 000 réservistes servent sous l'uniforme quelques dizaines de jours par an, en renfort des unités d'active.",
    points: [
      { titre: "RO1 — volontaires", detail: "Civils ou anciens militaires sous contrat d'engagement à servir dans la réserve (ESR) de 1 à 5 ans, renouvelable." },
      { titre: "RO2 — disponibilité", detail: "Anciens militaires rappelables pendant 5 ans après leur départ, sans activité régulière." },
      { titre: "Compagnies de réserve", detail: "Chaque régiment compte une ou plusieurs unités de réserve, commandées et encadrées par des réservistes." },
      { titre: "24e RI", detail: "Seul régiment entièrement composé de réservistes, à Vincennes." },
      { titre: "Missions", detail: "Sentinelle, protection du territoire, renfort en opérations extérieures, aide aux populations." },
      { titre: "Devenir réserviste", detail: "17 à 72 ans selon le statut ; formation initiale d'environ deux à trois semaines ; solde versée par jour d'activité, cumulable avec un emploi." },
      { titre: "Garde nationale", detail: "Créée en 2016, elle fédère les réserves des armées, de la gendarmerie et de la police." },
    ],
    regimentIds: ["24e-ri"],
  },
  {
    id: "gendarmerie",
    titre: "Gendarmerie nationale",
    statut: "Force armée distincte — ministère de l'Intérieur",
    resume:
      "Les gendarmes sont des militaires, mais ils n'appartiennent pas à l'armée de terre : la gendarmerie est une force armée à part entière, rattachée au ministère de l'Intérieur depuis 2009.",
    points: [
      { titre: "Gendarmerie départementale", detail: "Sécurité publique dans les zones rurales et périurbaines (95 % du territoire)." },
      { titre: "Gendarmerie mobile", detail: "Maintien de l'ordre et renfort, escadrons blindés (Centaure)." },
      { titre: "Garde républicaine", detail: "Honneurs, protection des palais nationaux, régiment de cavalerie." },
      { titre: "GIGN", detail: "Unité d'intervention spécialisée contre le terrorisme et les prises d'otages." },
      { titre: "Prévôté", detail: "Gendarmes déployés en opération extérieure aux côtés de l'armée de terre pour la police judiciaire militaire." },
    ],
    regimentIds: [],
  },
  {
    id: "pompiers",
    titre: "Pompiers militaires",
    statut: "Unités de l'armée de terre (génie) et de la Marine",
    resume:
      "La plupart des pompiers français sont civils (professionnels ou volontaires des SDIS). Quelques unités sont militaires.",
    points: [
      { titre: "BSPP", detail: "Brigade de sapeurs-pompiers de Paris : unité de l'armée de terre, arme du génie, environ 8 500 militaires." },
      { titre: "UIISC 1, 5 et 7", detail: "Unités militaires du génie mises à disposition de la sécurité civile : feux de forêt, catastrophes, secours international." },
      { titre: "Marins-pompiers de Marseille", detail: "Unité de la Marine nationale, et non de l'armée de terre." },
    ],
    regimentIds: ["bspp", "uiisc-1", "uiisc-5", "uiisc-7"],
  },
];
