# Armée de Terre — encyclopédie visuelle

Une application de consultation, sans compte, pour comprendre l'organisation de l'armée de terre française et devenir expert dans les détails. Style militaire sobre : kaki, sable, typographie technique, allure de document d'état-major.

## Les pages

**Accueil**
Vue d'ensemble : les quatre grands domaines, quelques chiffres clés (effectifs, nombre de régiments, divisions), et un accès direct à la recherche.

**Organisation**
Structure descendante : Chef d'état-major → divisions → brigades → régiments. Un schéma en arborescence dépliable, puis la liste complète des régiments avec filtres par arme (infanterie, cavalerie, artillerie, génie, transmissions, train, matériel, ALAT, troupes de marine, légion étrangère, chasseurs alpins…), par brigade et par ville de garnison. Chaque régiment a sa fiche : insigne décrit, devise, historique court, spécialité, garnison.

**Grades et insignes**
Les trois corps (militaires du rang, sous-officiers, officiers) présentés en échelle continue, du soldat de 2e classe au général d'armée. Chaque grade : galon reproduit en visuel, appellation d'usage, position hiérarchique, temps de service typique, équivalents dans les autres armées.

**Armes et équipements**
Fiches classées par catégorie : armement individuel (HK416F, FAMAS, Glock, FR F2…), appui (mortiers, Milan/MMP), véhicules (Griffon, Jaguar, Serval, Leclerc, VBCI), artillerie (CAESAr), hélicoptères (Tigre, Caracal, NH90), équipement du combattant (Félin). Chaque fiche : usage, calibre ou tonnage, portée, dotation, unités qui l'emploient.

**Écoles et parcours**
Saint-Cyr Coëtquidan, ENSOA Saint-Maixent, les écoles d'armes (Saumur, Draguignan, Angers, Rennes…), les centres de spécialisation (ENSOA montagne, CNEC commando). Pour chacune : ce qu'on y forme, durée, lieu. Plus des parcours types illustrés : engagé volontaire, sous-officier, officier.

**Glossaire**
Sigles et vocabulaire militaire, recherchables — indispensable pour naviguer le reste.

## Navigation et confort

- Recherche globale accessible partout : un régiment, un grade, un véhicule, un sigle.
- Fiches reliées entre elles : depuis un régiment on atteint son arme, son équipement et son école.
- Favoris conservés sur l'appareil (aucun compte nécessaire).
- Entièrement utilisable sur téléphone comme sur ordinateur.

## Contenu

Le contenu est rédigé à partir d'informations publiques sur l'armée de terre. Il sera structuré et vérifiable, mais il faut le considérer comme documentaire et non officiel ; vous pourrez le corriger ou l'enrichir ensuite. Les insignes régimentaires ne peuvent pas être reproduits fidèlement : ils seront représentés par des repères de couleur et d'arme, avec la description héraldique en texte.

## Détails techniques

- Données statiques en TypeScript sous `src/data/` (regiments, grades, equipment, schools, glossary), typées, avec index de recherche en mémoire.
- Routes séparées : `/`, `/organisation`, `/organisation/$regiment`, `/grades`, `/equipements`, `/equipements/$id`, `/ecoles`, `/glossaire` — chacune avec son propre `head()` (titre et description spécifiques).
- Design system étendu dans `src/styles.css` : palette kaki/sable/graphite en tokens sémantiques, typographie condensée type document technique.
- Favoris via `localStorage`, lu après hydratation.
- Aucune base de données ni authentification.

## Étapes

1. Design system et coquille de navigation (en-tête, recherche, pied de page).
2. Jeux de données : grades, armes/équipements, écoles, régiments, glossaire.
3. Pages de listes avec filtres, puis pages de fiches détaillées.
4. Recherche globale, liens croisés et favoris.
5. Relecture du contenu et finitions mobile.
