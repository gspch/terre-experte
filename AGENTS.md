<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Architecture

- Le contenu encyclopédique (régiments, grades, équipements, écoles, glossaire, organisation) vit en données statiques typées sous `src/data/`, sans backend — l'app est en consultation seule et doit rester déployable sans base de données.
- L'index de recherche globale est dérivé de `src/data/` dans `src/data/recherche.ts` : toute nouvelle catégorie de contenu doit y être ajoutée pour rester trouvable.
- Les favoris sont stockés dans `localStorage` via `src/hooks/use-favoris.ts`, lus après hydratation pour éviter les écarts de rendu serveur/client.
- Les médias documentaires sont décrits dans un registre statique avec source, licence et texte alternatif, puis servis depuis les assets du projet pour garantir leur pérennité.
- Les engagements historiques depuis 1945 sont des données statiques reliées par identifiants aux régiments et équipements, afin de conserver une navigation bidirectionnelle sans backend.
