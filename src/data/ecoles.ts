import type { Ecole, Parcours } from "./types";

export const ecoles: Ecole[] = [
  {
    id: "saint-cyr",
    nom: "Académie militaire de Saint-Cyr Coëtquidan",
    sigle: "AMSCC",
    ville: "Guer (Morbihan)",
    forme: "Officiers de carrière, officiers sous contrat, officiers de réserve",
    duree: "3 ans (voie ESCC) ou 1 à 2 ans (4e bataillon)",
    creation: "1802, à Fontainebleau puis Saint-Cyr-l'École",
    categorie: "officiers",
    description:
      "Fondée par Napoléon Bonaparte, l'école forme les futurs chefs de l'armée de terre. Le cursus mêle formation militaire, académique (grade de master) et humaine. Sa devise, « Ils s'instruisent pour vaincre », résume l'esprit du lieu. Le triomphe et la remise du casoar rythment la scolarité.",
  },
  {
    id: "ensoa",
    nom: "École nationale des sous-officiers d'active",
    sigle: "ENSOA",
    ville: "Saint-Maixent-l'École (Deux-Sèvres)",
    forme: "Tous les sous-officiers d'active de l'armée de terre",
    duree: "8 mois pour la voie directe, 4 mois pour la voie semi-directe",
    creation: "1963",
    categorie: "sous-officiers",
    description:
      "Passage obligé de tous les sergents, l'ENSOA façonne l'encadrement de contact. L'élève y acquiert le commandement du groupe de combat avant de rejoindre son école d'arme pour la spécialisation technique. Devise : « S'élever par l'effort ».",
  },
  {
    id: "eia",
    nom: "École de l'infanterie",
    sigle: "EI",
    ville: "Draguignan (Var)",
    forme: "Cadres de l'infanterie, tous grades",
    duree: "Stages de 2 semaines à 6 mois",
    categorie: "arme",
    description:
      "Située au sein du pôle écoles Méditerranée, elle enseigne le combat débarqué, le combat en zone urbaine et l'emploi des véhicules SCORPION. Elle pilote la doctrine de la première arme de l'armée de terre.",
  },
  {
    id: "ea-saumur",
    nom: "École de cavalerie",
    sigle: "EC",
    ville: "Saumur (Maine-et-Loire)",
    forme: "Cadres de l'arme blindée cavalerie",
    duree: "Stages de spécialisation de 1 à 6 mois",
    creation: "1815",
    categorie: "arme",
    description:
      "Héritière de l'école de cavalerie du Cadre noir, elle forme les chefs de peloton, pilotes et tireurs sur Leclerc, Jaguar et Griffon. Le musée des blindés voisin conserve l'une des plus grandes collections mondiales.",
  },
  {
    id: "ea-artillerie",
    nom: "École d'artillerie",
    sigle: "EA",
    ville: "Draguignan (Var)",
    forme: "Artilleurs sol-sol, sol-air et renseignement de contact",
    duree: "Stages de 1 à 8 mois",
    categorie: "arme",
    description:
      "Elle enseigne la conduite des feux, la coordination dans la troisième dimension et l'emploi du CAESAr, du LRU et des systèmes sol-air. Devise de l'arme : « Ultima ratio regum ».",
  },
  {
    id: "esag",
    nom: "École du génie",
    sigle: "ESAG",
    ville: "Angers (Maine-et-Loire)",
    forme: "Sapeurs, spécialistes de l'aide à la mobilité, de la contre-mobilité et de l'infrastructure",
    duree: "Stages de 1 à 10 mois",
    creation: "1945 à Angers",
    categorie: "arme",
    description:
      "Elle forme au franchissement, au déminage, à la fortification et à la lutte contre les engins explosifs improvisés. Le génie est aussi l'arme du secours à la population.",
  },
  {
    id: "estransmissions",
    nom: "École des transmissions",
    sigle: "ETRS",
    ville: "Cesson-Sévigné (Ille-et-Vilaine)",
    forme: "Spécialistes des systèmes d'information, de communication et de la cyberdéfense",
    duree: "Stages de 2 semaines à 12 mois",
    categorie: "arme",
    description:
      "Au cœur du pôle rennais de cyberdéfense, elle forme les opérateurs des réseaux tactiques, de la guerre électronique et de la lutte informatique défensive.",
  },
  {
    id: "estrain",
    nom: "École du train et de la logistique opérationnelle",
    sigle: "ETLO",
    ville: "Bourges (Cher)",
    forme: "Logisticiens, transporteurs, spécialistes du ravitaillement",
    duree: "Stages de 1 à 9 mois",
    categorie: "arme",
    description:
      "Le train assure le mouvement et le soutien : convois, ravitaillement carburant, transit et mouvements dans la profondeur des théâtres.",
  },
  {
    id: "esmat",
    nom: "École du matériel",
    sigle: "EM",
    ville: "Bourges (Cher)",
    forme: "Maintenanciers des matériels terrestres et de l'armement",
    duree: "Stages de 1 à 12 mois",
    categorie: "arme",
    description:
      "Le matériel maintient en condition les véhicules, armements et systèmes électroniques. Sa devise : « Servir et maintenir ».",
  },
  {
    id: "ealat",
    nom: "École de l'aviation légère de l'armée de terre",
    sigle: "EALAT",
    ville: "Le Luc et Dax",
    forme: "Pilotes, mécaniciens et contrôleurs de l'ALAT",
    duree: "≈ 18 mois pour la formation de pilote",
    categorie: "arme",
    description:
      "La formation débute à Dax sur hélicoptère école, se poursuit au Luc-en-Provence pour la qualification tactique puis sur machine de combat : Tigre, Caïman ou Gazelle.",
  },
  {
    id: "emhm",
    nom: "École militaire de haute montagne",
    sigle: "EMHM",
    ville: "Chamonix (Haute-Savoie)",
    forme: "Qualifications montagne : skieur, alpiniste, chef de détachement",
    duree: "Stages de 2 à 12 semaines",
    creation: "1932",
    categorie: "specialisation",
    description:
      "Référence mondiale du combat en montagne, l'EMHM délivre les brevets qui autorisent l'engagement en terrain glaciaire et en très haute altitude, été comme hiver.",
  },
  {
    id: "cnec",
    nom: "Centre national d'entraînement commando",
    sigle: "CNEC — 1er choc",
    ville: "Mont-Louis et Collioure (Pyrénées-Orientales)",
    forme: "Brevets et stages commando, aguerrissement",
    duree: "Stages de 2 à 4 semaines",
    categorie: "specialisation",
    description:
      "Héritier du 1er bataillon de choc, le CNEC délivre les brevets commando. Ses parcours en falaise au-dessus de la Méditerranée sont devenus une image d'Épinal de l'aguerrissement français.",
  },
  {
    id: "etap",
    nom: "École des troupes aéroportées",
    sigle: "ETAP",
    ville: "Pau (Pyrénées-Atlantiques)",
    forme: "Brevet parachutiste militaire, chuteurs opérationnels, largueurs",
    duree: "3 semaines pour le brevet initial",
    categorie: "specialisation",
    description:
      "Tout parachutiste de l'armée française y obtient son brevet après six sauts. L'école forme aussi les chuteurs opérationnels et les spécialistes de la livraison par air.",
  },
  {
    id: "ecole-de-guerre",
    nom: "École de guerre",
    sigle: "EdG",
    ville: "Paris, École militaire",
    forme: "Officiers supérieurs destinés aux plus hautes responsabilités",
    duree: "1 an",
    categorie: "officiers",
    description:
      "Sélectionnés sur concours, les officiers y étudient la stratégie, l'interarmées et les relations internationales avant d'accéder aux fonctions de chef de corps et d'état-major.",
  },
];

export const parcours: Parcours[] = [
  {
    id: "militaire-du-rang",
    titre: "Engagé volontaire de l'armée de terre",
    entree: "Sans diplôme requis, de 17 ans et demi à 30 ans, après les tests du CIRFA.",
    etapes: [
      { titre: "Incorporation", detail: "Signature d'un contrat de 3 à 10 ans, affectation en régiment." },
      {
        titre: "Formation générale initiale",
        detail: "12 à 16 semaines : ordre serré, tir, secourisme, marche, aguerrissement.",
      },
      {
        titre: "Formation de spécialité initiale",
        detail: "Apprentissage du métier : pilote de blindé, sapeur, transmetteur, mécanicien…",
      },
      {
        titre: "Caporal puis caporal-chef",
        detail: "Chef d'équipe après le certificat pratique, puis expert et tuteur.",
      },
      {
        titre: "Passerelle sous-officier",
        detail: "Sélection interne vers l'ENSOA (voie semi-directe) pour devenir sergent.",
      },
    ],
  },
  {
    id: "sous-officier",
    titre: "Sous-officier",
    entree: "Baccalauréat, de 17 ans et demi à 25 ans, ou promotion interne.",
    etapes: [
      { titre: "ENSOA Saint-Maixent", detail: "8 mois de formation au commandement du groupe." },
      { titre: "École d'arme", detail: "Spécialisation technique de 3 à 8 mois selon l'arme." },
      { titre: "Chef de groupe", detail: "Premier commandement en régiment, projection en opération." },
      { titre: "BSTAT", detail: "Brevet supérieur qui ouvre l'accès au grade d'adjudant." },
      { titre: "Adjudant d'unité puis major", detail: "Responsabilités d'encadrement et d'expertise élargies." },
    ],
  },
  {
    id: "officier",
    titre: "Officier",
    entree: "Concours après classe préparatoire, sur titre (licence/master) ou promotion interne.",
    etapes: [
      { titre: "Saint-Cyr Coëtquidan", detail: "3 ans de formation militaire, académique et humaine." },
      { titre: "École d'application", detail: "1 an dans l'école de son arme : Draguignan, Saumur, Angers…" },
      { titre: "Chef de section", detail: "2 à 4 ans à la tête de 30 hommes, avec engagements opérationnels." },
      { titre: "Commandement d'unité", detail: "Capitaine : compagnie, escadron ou batterie." },
      { titre: "École de guerre", detail: "Accès aux responsabilités d'état-major et au commandement de régiment." },
    ],
  },
];
