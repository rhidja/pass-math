// Objectifs du programme détaillé : un objectif par ligne de chapitre, avec l'intitulé du programme.
// notions : découpage de l'objectif en notions à maîtriser (validé avec l'utilisatrice).
const OBJECTIVES = [
  // Chapitre 1 — Bases mathématiques
  { id: "1.1", d: 1, title: "Fractions et pourcentages", notions: ["Opérations sur les fractions", "Simplification", "Pourcentage d’une quantité", "Évolution en pourcentage", "Coefficient multiplicateur"] },
  { id: "1.2", d: 1, title: "Puissances", notions: ["Règles de calcul sur les puissances", "Puissances de 10"] },
  { id: "1.3", d: 1, title: "Racines", notions: ["Racine carrée", "Propriétés des racines", "Écriture en puissance 1/2"] },
  { id: "1.4", d: 1, title: "Équations", notions: ["Équation du premier degré", "Équation du second degré", "Isoler une variable"] },
  { id: "1.5", d: 1, title: "Proportions", notions: ["Proportionnalité", "Règle de trois", "Dilution"] },
  { id: "1.6", d: 1, title: "Conversions", notions: ["Unités SI", "Préfixes", "Concentration"] },
  { id: "1.7", d: 1, title: "Notation scientifique", notions: ["Écriture scientifique", "Ordre de grandeur"] },

  // Chapitre 2 — Fonctions et exponentielles
  { id: "2.1", d: 2, title: "Fonctions", notions: ["Ensemble de définition", "Image et antécédent", "Fonctions usuelles"] },
  { id: "2.2", d: 2, title: "Variations", notions: ["Dérivée", "Sens de variation", "Extremum"] },
  { id: "2.3", d: 2, title: "Exponentielle", notions: ["Propriétés algébriques de l’exponentielle", "Limites de l’exponentielle"] },
  { id: "2.4", d: 2, title: "Logarithme", notions: ["Logarithme népérien", "Logarithme décimal", "Propriétés du logarithme", "Équation avec logarithme"] },
  { id: "2.5", d: 2, title: "Applications biomédicales", notions: ["pH", "Échelle logarithmique"] },

  // Chapitre 3 — Biomathématiques
  { id: "3.1", d: 3, title: "Modélisation", notions: ["Grandeur modélisée", "Hypothèses du modèle", "Choix du modèle"] },
  { id: "3.2", d: 3, title: "Croissance/décroissance", notions: ["Taux de croissance", "Temps de doublement", "Demi-vie"] },
  { id: "3.3", d: 3, title: "Équations différentielles simples", notions: ["y′ = ay", "y′ = ay + b", "Condition initiale"] },
  { id: "3.4", d: 3, title: "Modèles exponentiels", notions: ["N(t) = N₀·e^(kt)", "Linéarisation par le logarithme"] },
  { id: "3.5", d: 3, title: "Applications biologiques", notions: ["Croissance bactérienne", "Élimination d’un médicament", "Décroissance radioactive"] },

  // Chapitre 4 — Probabilités
  { id: "4.1", d: 4, title: "Événements", notions: ["Univers", "Union", "Intersection", "Événement contraire", "Événements incompatibles"] },
  { id: "4.2", d: 4, title: "Probabilité conditionnelle", notions: ["P(A|B)", "Probabilité d’une intersection"] },
  { id: "4.3", d: 4, title: "Indépendance", notions: ["Définition de l’indépendance", "Indépendants vs incompatibles"] },
  { id: "4.4", d: 4, title: "Arbres", notions: ["Arbre pondéré", "Formule des probabilités totales"] },
  { id: "4.5", d: 4, title: "Formule de Bayes", notions: ["Formule de Bayes", "Inversion du conditionnement"] },

  // Chapitre 5 — Variables aléatoires
  { id: "5.1", d: 5, title: "Espérance", notions: ["Loi d’une variable aléatoire discrète", "Espérance", "Linéarité de l’espérance"] },
  { id: "5.2", d: 5, title: "Variance", notions: ["Variance d’une variable aléatoire", "V(aX + b)"] },
  { id: "5.3", d: 5, title: "Écart-type", notions: ["Écart-type d’une variable aléatoire", "Interprétation de l’écart-type"] },
  { id: "5.4", d: 5, title: "Loi binomiale", notions: ["Épreuve de Bernoulli", "P(X = k)", "Espérance np", "Variance np(1 − p)"] },
  { id: "5.5", d: 5, title: "Loi normale", notions: ["Loi normale centrée réduite", "Centrage et réduction", "Règle 68-95-99,7", "Valeur 1,96"] },

  // Chapitre 6 — Statistiques
  { id: "6.1", d: 6, title: "Moyenne", notions: ["Moyenne arithmétique", "Moyenne pondérée"] },
  { id: "6.2", d: 6, title: "Médiane", notions: ["Calcul de la médiane", "Robustesse aux valeurs extrêmes"] },
  { id: "6.3", d: 6, title: "Variance", notions: ["Variance d’une série statistique", "Formule de König-Huygens"] },
  { id: "6.4", d: 6, title: "Écart-type", notions: ["Écart-type d’une série", "Dispersion"] },
  { id: "6.5", d: 6, title: "Quartiles", notions: ["Premier quartile", "Troisième quartile", "Écart interquartile"] },
  { id: "6.6", d: 6, title: "Représentations graphiques", notions: ["Histogramme", "Boîte à moustaches", "Diagramme en barres"] },

  // Chapitre 7 — Biostatistiques médicales
  { id: "7.1", d: 7, title: "Prévalence", notions: ["Définition de la prévalence", "Calcul de la prévalence"] },
  { id: "7.2", d: 7, title: "Incidence", notions: ["Incidence cumulée", "Taux d’incidence", "Prévalence vs incidence"] },
  { id: "7.3", d: 7, title: "Sensibilité", notions: ["Tableau de contingence", "Calcul de la sensibilité", "Faux négatifs"] },
  { id: "7.4", d: 7, title: "Spécificité", notions: ["Calcul de la spécificité", "Faux positifs", "Compromis sensibilité-spécificité"] },
  { id: "7.5", d: 7, title: "Valeur prédictive positive", notions: ["Calcul de la VPP", "Influence de la prévalence sur la VPP"] },
  { id: "7.6", d: 7, title: "Valeur prédictive négative", notions: ["Calcul de la VPN", "Influence de la prévalence sur la VPN"] },
  { id: "7.7", d: 7, title: "Risque relatif", notions: ["Étude de cohorte", "Calcul du risque relatif", "Interprétation du risque relatif"] },
  { id: "7.8", d: 7, title: "Odds ratio", notions: ["Étude cas-témoins", "Calcul de l’odds ratio", "Odds ratio vs risque relatif"] },

  // Chapitre 8 — Estimation
  { id: "8.1", d: 8, title: "Échantillonnage", notions: ["Population et échantillon", "Fluctuation d’échantillonnage"] },
  { id: "8.2", d: 8, title: "Estimation d’une proportion", notions: ["Proportion observée", "Estimateur ponctuel"] },
  { id: "8.3", d: 8, title: "Intervalle de confiance", notions: ["IC à 95 % d’une proportion", "Interprétation de l’intervalle de confiance"] },
  { id: "8.4", d: 8, title: "Marge d’erreur", notions: ["Marge d’erreur", "Influence de la taille de l’échantillon"] },

  // Chapitre 9 — Tests statistiques
  { id: "8.5", d: 8, title: "H₀ et H₁", notions: ["Hypothèse nulle", "Hypothèse alternative"] },
  { id: "8.6", d: 8, title: "p-value", notions: ["Définition de la p-value", "Interprétation de la p-value"] },
  { id: "8.7", d: 8, title: "Seuil de significativité", notions: ["Seuil α", "Règle de décision"] },
  { id: "8.8", d: 8, title: "Erreurs de type I et II", notions: ["Risque α", "Risque β", "Puissance"] },
  { id: "8.9", d: 8, title: "Interprétation des résultats", notions: ["Significativité statistique", "Pertinence clinique"] }
];
