# PASS Médecine — Mathématiques & Biostatistiques

Cours, QCM corrigés et examens blancs en français pour préparer l’UE de mathématiques et de biostatistiques du **PASS Médecine**.

## Utilisation

Ouvrir `index.html` dans un navigateur (double-clic, fonctionne en `file://` et hors ligne). Aucun build. Les formules mathématiques sont rendues par [KaTeX](https://katex.org) 0.16, fourni dans `vendor/katex/` (licence MIT) pour fonctionner sans connexion. La progression est enregistrée dans le stockage local du navigateur (clé `pass-maths-biostats-v1`) ; l’application fonctionne aussi sans stockage.

- **Programme** : les 50 objectifs par domaine, avec leurs notions, les cours associés, un état (« À découvrir », « En cours », « Maîtrisé »), la précision obtenue et un bouton « S’entraîner ». La case « Je maîtrise » permet de marquer un objectif révisé en autonomie.
- **Cours** : 28 modules regroupés par domaine, avec les objectifs traités et un badge « LU ».
- **Entraînement** : 320 questions commentées, filtrables (toutes, jamais répondues, erreurs à revoir, par domaine, par objectif). Raccourcis : touches A à E pour répondre, Entrée pour valider ou passer à la suite.
- **Examen blanc** : 40 QCM tirés selon la pondération, 60 minutes, note estimée sur 20 (seuil indicatif 10/20), correction à la fin, objectifs à retravailler.
- **Progression** : objectifs maîtrisés, cours lus, questions vues, précision par domaine, priorité de révision et historique des 20 derniers examens.

> Le format de l’examen blanc est une **simulation interne**. Le nombre de questions, la durée et le barème réels dépendent de la faculté : se référer à ses modalités officielles.

## Application installable (PWA)

Servie en **https** (ou sur `localhost`), l’application s’installe comme une application native et fonctionne **hors ligne** :

- **Android (Chrome)** : bouton « Installer l’app » dans l’en-tête, ou menu ⋮ → « Installer l’application ».
- **iPhone / iPad (Safari)** : bouton Partager → « Sur l’écran d’accueil ».
- **Ordinateur (Chrome, Edge)** : bouton « Installer l’app » ou icône d’installation dans la barre d’adresse.

Pour la publier, il suffit de déposer le dossier sur un hébergement statique en https (GitHub Pages, Netlify, Cloudflare Pages…). Pour tester en local :

```sh
python3 -m http.server 8000   # puis ouvrir http://localhost:8000
```

En `file://` (double-clic), l’application fonctionne normalement mais n’est pas installable : les navigateurs réservent le service worker à http(s).

Fichiers concernés : `manifest.webmanifest` (nom, couleurs, icônes), `sw.js` (cache hors ligne) et `icons/`. Le service worker charge les fichiers depuis le réseau quand c’est possible, donc une modification du contenu est visible au prochain chargement en ligne. Si l’on **ajoute ou supprime un fichier**, il faut mettre à jour la liste `ASSETS` de `sw.js` et incrémenter `CACHE` (`pass-maths-biostats-v2`…).

## Domaines

| Domaine | Poids | Cours | Questions | À l’examen blanc |
|---|---|---|---|---|
| 1. Bases mathématiques et calculs | 15 % | 4 | 48 | 6 |
| 2. Fonctions, exponentielles et logarithmes | 10 % | 3 | 32 | 4 |
| 3. Biomathématiques et modélisation | 10 % | 3 | 32 | 4 |
| 4. Probabilités | 20 % | 4 | 64 | 8 |
| 5. Variables aléatoires et lois de probabilité | 10 % | 3 | 32 | 4 |
| 6. Statistiques descriptives | 10 % | 3 | 32 | 4 |
| 7. Biostatistiques médicales | 15 % | 4 | 48 | 6 |
| 8. Estimation, intervalles de confiance et tests statistiques | 10 % | 4 | 32 | 4 |
| **Total** | 100 % | 28 | 320 | 40 |

Le domaine 8 regroupe les chapitres 8 (Estimation) et 9 (Tests statistiques) du programme : objectifs 8.1 à 8.4 pour l’estimation, 8.5 à 8.9 pour les tests.

## Couverture du programme

| Objectif | Intitulé | Modules | Questions |
|---|---|---|---|
| 1.1 | Fractions et pourcentages | 1 | 8 |
| 1.2 | Puissances | 1 | 7 |
| 1.3 | Racines | 1 | 6 |
| 1.4 | Équations | 1 | 7 |
| 1.5 | Proportions | 2 | 7 |
| 1.6 | Conversions | 1 | 7 |
| 1.7 | Notation scientifique | 1 | 6 |
| 2.1 | Fonctions | 1 | 6 |
| 2.2 | Variations | 1 | 7 |
| 2.3 | Exponentielle | 1 | 7 |
| 2.4 | Logarithme | 1 | 7 |
| 2.5 | Applications biomédicales | 1 | 5 |
| 3.1 | Modélisation | 1 | 6 |
| 3.2 | Croissance/décroissance | 1 | 7 |
| 3.3 | Équations différentielles simples | 1 | 7 |
| 3.4 | Modèles exponentiels | 1 | 6 |
| 3.5 | Applications biologiques | 1 | 6 |
| 4.1 | Événements | 1 | 12 |
| 4.2 | Probabilité conditionnelle | 1 | 14 |
| 4.3 | Indépendance | 1 | 12 |
| 4.4 | Arbres | 1 | 12 |
| 4.5 | Formule de Bayes | 1 | 14 |
| 5.1 | Espérance | 1 | 7 |
| 5.2 | Variance | 1 | 6 |
| 5.3 | Écart-type | 1 | 5 |
| 5.4 | Loi binomiale | 1 | 7 |
| 5.5 | Loi normale | 1 | 7 |
| 6.1 | Moyenne | 1 | 6 |
| 6.2 | Médiane | 1 | 5 |
| 6.3 | Variance | 1 | 5 |
| 6.4 | Écart-type | 1 | 5 |
| 6.5 | Quartiles | 2 | 6 |
| 6.6 | Représentations graphiques | 1 | 5 |
| 7.1 | Prévalence | 1 | 6 |
| 7.2 | Incidence | 1 | 6 |
| 7.3 | Sensibilité | 1 | 6 |
| 7.4 | Spécificité | 1 | 6 |
| 7.5 | Valeur prédictive positive | 1 | 6 |
| 7.6 | Valeur prédictive négative | 1 | 6 |
| 7.7 | Risque relatif | 1 | 6 |
| 7.8 | Odds ratio | 1 | 6 |
| 8.1 | Échantillonnage | 1 | 3 |
| 8.2 | Estimation d’une proportion | 1 | 3 |
| 8.3 | Intervalle de confiance | 1 | 4 |
| 8.4 | Marge d’erreur | 1 | 3 |
| 8.5 | H₀ et H₁ | 1 | 4 |
| 8.6 | p-value | 1 | 4 |
| 8.7 | Seuil de significativité | 1 | 3 |
| 8.8 | Erreurs de type I et II | 1 | 4 |
| 8.9 | Interprétation des résultats | 1 | 4 |

## Ajouter du contenu

Tout le contenu se trouve dans `data/`, chargé par des balises `<script>` avant `app.js`. Utiliser des guillemets doubles et l’apostrophe typographique ’ dans les textes.

- `data/domains.js` : domaines, pondération et `examCount` (questions tirées par domaine à l’examen blanc).
- `data/programme.js` : objectifs du programme.
  ```js
  { id: "4.2", d: 4, title: "Probabilité conditionnelle", notions: ["P(A|B)", "Probabilité d’une intersection"] }
  ```
- `data/courses.js` : cours. `o` liste les objectifs traités ; les textes peuvent contenir du `<b>`. Une section `extra: true` s’affiche comme « Complément · hors programme ».
  ```js
  { d: 4, o: ["4.2", "4.3"], title: "…", summary: "…", sections: [{ h: "Titre", p: "Paragraphe" }, { h: "Points clés", points: ["…"] }] }
  ```
- `data/questions.js` : questions. `c` est l’index de la bonne réponse, ou un tableau d’index pour une question à réponses multiples (5 réponses, « (Choisissez N réponses) » dans l’énoncé).
  ```js
  { d: 4, o: "4.2", q: "Énoncé ?", a: ["A", "B", "C", "D"], c: 1, e: "Explication." }
  { d: 4, o: "4.2", q: "Énoncé ? (Choisissez 2 réponses)", a: ["A", "B", "C", "D", "E"], c: [0, 3], e: "Explication." }
  ```

Le domaine `d` d’un cours ou d’une question doit être celui de ses objectifs. L’ordre des réponses est mélangé à l’affichage. La progression est associée au texte de l’énoncé : modifier un énoncé réinitialise la progression de cette question.

### Formules mathématiques

Les formules s’écrivent en LaTeX entre `\\(` et `\\)` dans les chaînes JavaScript (la barre oblique inverse est doublée) :

```js
{ d: 4, o: "4.2", q: "Que vaut \\(P(A \\mid B)\\) si \\(P(A \\cap B) = 0{,}12\\) ?", … }
```

- Virgule décimale : `0{,}5` (sans les accolades, LaTeX ajoute une espace après la virgule).
- Événement contraire : `\\overline{A}` ; moyenne : `\\bar{x}` ; test positif : `T^+`.
- Pourcentage dans une formule : `5\\,\\%`. Les nombres et pourcentages isolés restent en texte courant.
- Le rendu se fait après chaque affichage (fonction `math()` de `app.js`) ; une formule invalide s’affiche en rouge au lieu de bloquer la page.
