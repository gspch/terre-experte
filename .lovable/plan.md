# Réserve, forces voisines et catalogue régimentaire complet

## 1. Nouvelle page « Réserve et forces partenaires » (/reserve)
- **Réserve opérationnelle** : RO1 (volontaires sous contrat ESR) et RO2 (anciens militaires), compagnies de réserve intégrées à chaque régiment, 24e RI (régiment entièrement de réserve), missions (Sentinelle, renfort des opérations, secours), parcours d'engagement (formation initiale, jours par an, rémunération), Garde nationale.
- **Gendarmerie nationale** : force armée distincte de l'armée de terre, rattachée au ministère de l'Intérieur ; gendarmerie départementale, mobile, Garde républicaine, GIGN ; points de contact avec l'armée de terre (prévôté en opération).
- **Pompiers militaires** : Brigade de sapeurs-pompiers de Paris (BSPP, unité de l'armée de terre, arme du génie) ; formations militaires de la sécurité civile (UIISC 1, 5 et 7, génie) ; distinction avec la Marine (Marins-pompiers de Marseille) et les pompiers civils.
- Lien dans le menu, bloc sur l'accueil, entrées dans la recherche globale.

## 2. Compléter les régiments
Ajouter les unités d'active manquantes, rattachées à leur brigade, avec fiche complète (garnison, devise, spécialité, histoire, matériels) :
- Légion : 13e DBLE, 2e REG, 3e REI (Guyane), 4e RE, 1er REC déjà présent.
- Infanterie / chasseurs : 1er RTir, 110e RI, 2e RIMa déjà là ; 8e RPIMa déjà ; ajout 1er RCP déjà ; ajout 3e RIMa ; 6e BIMa, 5e RIAOM, 9e RIMa, RIMaP-NC, RSMA (outre-mer).
- Cavalerie : 1er RCh, 3e RH, 1er REC déjà, 1er RS déjà, RICM, 1er-11e cuirassiers (1er-11e RC), 4e RD, 13e RDP déjà.
- Artillerie : 68e RAA, 35e RAP, 1er RA déjà.
- Génie : 3e RG, 31e RG, 2e REG, 1er RG, 6e RG, BSPP, UIISC.
- ALAT : 3e RHC.
- Transmissions, train, matériel : 40e RT, 41e RT, 53e RT, 54e RT, 121e RT, 515e RT, 516e RT, 519e GTM, 2e RMAT, 4e RMAT, 6e RMAT, 7e RMAT, 8e RMAT.
- Réserve : 24e RI.
- Nouvelle arme de rattachement « sécurité civile » évitée : BSPP et UIISC classés en génie.
- Liste validée contre sources publiques (defense.gouv.fr, Wikipédia) ; les doublons existants ne sont pas recréés. Insignes : visuels libres ajoutés seulement quand une source fiable existe, sinon description.

## 3. Glossaire
Ajout de RO1, RO2, ESR, BSPP, UIISC, GIGN, Garde nationale, Sentinelle.

## Détails techniques
- Nouvelles données statiques `src/data/reserve.ts` ; route `src/routes/reserve.tsx` avec head() complet.
- Index de recherche enrichi dans `src/data/recherche.ts` (type « Réserve »).
- Chiffres clés de l'accueil mis à jour selon le nouveau nombre de régiments.
- Roadmap mise à jour, vérification typage et pages.
