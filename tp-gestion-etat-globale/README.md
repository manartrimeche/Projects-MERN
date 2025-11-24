# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## À propos de ce projet

Ce dépôt `tp-gestion-etat-globale` est un  TP React créée avec Vite qui sert d'exemple comparant plusieurs approches de gestion d'état global :

- **Context API** (dossier `src/context`) — version basée sur React Context.
- **Redux** (dossier `src/store`) — implémentation avec un `slice` et un `store` (ex: `caractersSlice.js`, `store.js`).
- **Zustand** (dossier `src/store` ou `src/useCharactersStore.js`) — approche minimaliste et moderne avec `zustand`.

L'application affiche des personnages (cards) et propose un système de favoris, un filtre et une barre latérale. Les composants principaux se trouvent dans `src/components`, `src/componentsRedux` et `src/componentsZustand` pour faciliter la comparaison.

## Ce que nous avons appris

Ce projet a servi de terrain d'expérimentation pour comprendre les choix et compromis autour de la gestion d'état et de la structure d'une application React moderne. Points clés appris :

- **Fondamentaux React & Vite :** configuration d'un projet React rapide avec Vite, usage du HMR (hot module replacement), et organisation des entrées (`src/main.jsx`).
- **Context API :** simple à mettre en place pour de petits besoins globaux, facile à comprendre et sans dépendances externes, mais peut devenir verbeux et provoquer des re-renders si on partage beaucoup d'état ou d'objets complexes.
- **Redux (slice pattern) :** utile pour des applications où l'état global est prévisible et où l'on veut un historique d'actions ou un débogage facilité (Redux DevTools). Meilleur pour les grandes bases de code mais nécessite plus de boilerplate et une discipline sur les reducers/actions.
- **Zustand :** solution minimaliste et ergonomique pour la gestion d'état globale : API simple, aucun provider requis, moins de boilerplate, et bonnes performances quand on veut des sélecteurs fins pour limiter les re-renders.
- **Comparaison des approches :**
  - Context : simple pour petits projets ou états peu partagés.
  - Redux : adapté quand on a besoin d'outils d'architecture, middlewares, ou d'un modèle d'événements centralisé.
  - Zustand : compromis excellent pour projets moyens qui veulent simplicité + performances.
- **Conception de composants réutilisables :** séparation claire entre présentation (UI) et logique (gestion d'état), composants découplés pour permettre de brancher facilement Context/Redux/Zustand selon le dossier choisi.
- **Bonnes pratiques observées :** centraliser la logique métier dans les stores/slices, garder les composants purs quand possible, et limiter la prop-drilling via des hooks ou providers.
- **Performance & ergonomie :** apprendre à profiler les re-renders et à utiliser des sélecteurs/memoization pour réduire les updates inutiles.
- **Tests & qualité :** importance d'ajouter des tests unitaires pour les slices/stores et des tests d'intégration pour s'assurer du comportement global (favoris, filtres, persistance éventuelle).

Ces leçons doivent guider les étapes suivantes : ajouter des tests, documenter les contrats des stores, et choisir l'approche d'état qui convient au périmètre réel de l'application.

## Structure importante

- `src/` : code source principal
  - `components/` : composants utilisant Context (par défaut)
  - `componentsRedux/` : mêmes composants adaptés à Redux
  - `componentsZustand/` : mêmes composants adaptés à Zustand
  - `context/CharactersContext.jsx` : Context API
  - `store/` : Redux (`caractersSlice.js`, `store.js`) et `useCharactersStore.js` (Zustand)
  - `styles/` : styles globaux

## Installation

Installez les dépendances et lancez le site en développement :

```bash
npm install
npm run dev
```

Pour construire la version de production :

```bash
npm run build
npm run preview
```

## Scripts utiles

- `npm run dev` : démarre Vite en mode développement (HMR).
- `npm run build` : construit l'application pour la production.
- `npm run preview` : sert la version construite localement.

## Choisir/Tester une approche d'état

- Par défaut, l'application peut utiliser l'implémentation Context si les composants de `components/` sont montés dans `src/main.jsx`.
- Pour tester Redux : ouvrez `src/main.jsx` et importez/montez les composants depuis `componentsRedux/` et assurez-vous que le `Provider` Redux (`store.js`) est configuré.
- Pour tester Zustand : importez les composants depuis `componentsZustand/` (ou utilisez `useCharactersStore.js`) — aucune configuration provider supplémentaire n'est nécessaire.



