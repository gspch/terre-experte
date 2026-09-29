# Enrichissement visuel et histoire opérationnelle

## Objectif

Transformer le manuel actuel en une encyclopédie réellement visuelle, avec une illustration vérifiable pour chaque unité et chaque matériel, puis ajouter une section dédiée aux théâtres d’opérations et batailles majeures depuis 1945.

## Images et insignes

- Ajouter une image d’insigne à chacune des 51 fiches d’unités actuellement référencées.
- Ajouter une photographie à chacun des 20 matériels actuellement référencés.
- Compléter les pages principales avec quelques visuels utiles : armes, écoles et grands théâtres d’opérations, sans surcharger l’interface.
- Privilégier les sources institutionnelles françaises et les médias sous licence réutilisable ; conserver pour chaque image sa source, son auteur éventuel, sa licence et un texte alternatif descriptif.
- Héberger les fichiers dans les assets du projet plutôt que de dépendre d’images externes susceptibles de disparaître.
- Afficher les visuels dans les listes et en grand dans les fiches, avec cadrage cohérent, chargement différé et comportement adapté au téléphone.
- Remplacer la mention actuelle indiquant que les insignes ne sont pas reproduits par une notice claire sur les droits, les sources et le caractère non officiel du manuel.

## Nouvelle section « Opérations et batailles »

- Créer une page `/operations` accessible depuis le menu, l’accueil et le pied de page.
- Couvrir la période de 1945 à aujourd’hui à travers une sélection structurée de conflits, opérations et batailles marquantes : Indochine, Algérie, Suez, Kolwezi, guerre du Golfe, Balkans, Liban, Afghanistan, Sahel, République centrafricaine et engagements récents de réassurance en Europe.
- Distinguer clairement :
  - un **théâtre d’opérations**, cadre géographique et temporel ;
  - une **opération**, mission militaire identifiée ;
  - une **bataille ou action marquante**, épisode précis au sein d’un théâtre.
- Proposer une frise chronologique, des filtres par période, zone géographique et type d’engagement, ainsi qu’une vue détaillée pour chaque entrée.
- Chaque fiche présentera les dates, le lieu, le contexte, les objectifs, le déroulement synthétique, les unités françaises impliquées, les matériels associés, le résultat et les conséquences.
- Relier les opérations aux fiches des régiments et des équipements concernés ; afficher réciproquement les engagements connus sur ces fiches.
- Ajouter une carte schématique ou un repère géographique lorsque les données disponibles sont suffisamment fiables, sans afficher d’informations opérationnelles sensibles ou actuelles.

## Accueil, navigation et recherche

- Faire passer l’accueil de quatre à cinq grands domaines avec une entrée « Opérations et batailles ».
- Ajouter la nouvelle section à la navigation sur ordinateur et téléphone.
- Étendre la recherche globale aux théâtres, opérations et batailles.
- Préserver les filtres, favoris et liens croisés existants.

## Données et exactitude

- Étendre les données statiques typées existantes : métadonnées d’images pour les unités et matériels, nouveau catalogue historique pour les opérations.
- Vérifier les appellations, dates et unités impliquées à partir de sources publiques fiables ; afficher les références et distinguer les faits établis des synthèses pédagogiques.
- Maintenir le fonctionnement sans compte ni base de données.

## Présentation

- Conserver la direction visuelle kaki, sable et graphite, avec une mise en page de dossier d’état-major.
- Donner aux images un traitement documentaire : légendes courtes, crédits discrets, proportions stables et galerie légère quand plusieurs vues apportent une vraie valeur.
- Prévoir les états sans image, les erreurs de chargement et une lecture confortable sur mobile.

## Vérifications

- Contrôler que chaque unité et chaque matériel dispose bien d’un visuel et de ses crédits.
- Tester la chronologie, les filtres, la recherche et tous les liens croisés.
- Vérifier les pages principales et les fiches sur téléphone et ordinateur, ainsi que les métadonnées de partage propres à la nouvelle section.

## Détails techniques

- Les données restent sous `src/data/` et la nouvelle catégorie rejoint l’index de recherche central.
- Les médias téléchargés passent par le stockage d’assets du projet et sont référencés par des pointeurs légers.
- Les nouvelles pages utilisent les routes TanStack existantes et conservent un `head()` propre avec titre, description, Open Graph et Twitter Card.
- Le volume d’images sera optimisé pour éviter d’alourdir les listes : miniatures dans les catalogues, image adaptée dans les fiches, chargement différé hors écran.
