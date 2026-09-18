# AWS Ready

Cours, banque de questions et examens blancs en français pour préparer **AWS Certified Cloud Practitioner (CLF-C02)**.

## Utilisation

Ouvrir `index.html` dans un navigateur. Aucun build ni dépendance n'est nécessaire. La progression est conservée dans le stockage local du navigateur.

- **Cours** : 15 modules organisés selon les 4 domaines officiels de l'examen.
- **Entraînement** : questions commentées, filtrables par domaine, « jamais répondues » ou « erreurs à revoir ». Raccourcis : touches A à E pour répondre, Entrée pour continuer.
- **Examen blanc** : 65 questions tirées selon la pondération officielle, chronomètre de 90 minutes, score estimé sur 1000 (réussite à 700), corrections à la fin.
- **Progression** : précision par domaine, domaine prioritaire à réviser, historique des examens.

## Domaines de l'examen

| Domaine | Poids | Questions à l'examen blanc |
|---|---|---|
| 1. Concepts du cloud | 24 % | 16 |
| 2. Sécurité et conformité | 30 % | 19 |
| 3. Technologie et services cloud | 34 % | 22 |
| 4. Facturation, tarification et support | 12 % | 8 |

## Ajouter du contenu

Tout le contenu se trouve dans `data/` :

- `data/domains.js` : domaines, pondération et nombre de questions tirées à l'examen blanc.
- `data/courses.js` : cours (`d` = domaine, `sections` avec titre `h`, paragraphe `p` et liste `points`).
- `data/questions.js` : questions au format suivant.

```js
{ d: 2, q: "Énoncé ?", a: ["Réponse A", "Réponse B", "Réponse C", "Réponse D"], c: 1, e: "Explication." }
// Question à réponses multiples : c est un tableau d'index
{ d: 3, q: "Énoncé ? (Choisissez 2 réponses)", a: ["…", "…", "…", "…", "…"], c: [0, 3], e: "Explication." }
```

L'ordre des réponses est mélangé à l'affichage. La progression est associée au texte de la question : modifier un énoncé réinitialise la progression de cette question.

Le score de l'examen blanc est une estimation linéaire : AWS n'en publie pas le calcul exact.
