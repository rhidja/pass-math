// Cours : d = domaine, o = objectifs traités (voir data/programme.js).
// sections = { h: titre, p: paragraphe, points: liste } ; extra: true signale un complément hors programme.
const COURSES = [
  // ── Domaine 1 : Bases mathématiques et calculs ───────────────────────────
  {
    d: 1,
    o: ["1.1", "1.5"],
    title: "Fractions, pourcentages et proportions",
    summary: "Calculer vite et juste avec les fractions, les pourcentages et la proportionnalité.",
    sections: [
      {
        h: "Opérations sur les fractions",
        points: [
          "<b>Simplification</b> : on divise numérateur et dénominateur par un même diviseur commun. 18/24 = 3/4 (division par 6).",
          "<b>Addition</b> : on réduit au même dénominateur. 1/3 + 1/4 = 4/12 + 3/12 = 7/12.",
          "<b>Multiplication</b> : numérateurs entre eux, dénominateurs entre eux. 2/3 × 5/7 = 10/21.",
          "<b>Division</b> : on multiplie par l’inverse. (3/4) ÷ (9/8) = 3/4 × 8/9 = 24/36 = 2/3.",
          "Piège classique : a/b + c/d n’est <b>jamais</b> égal à (a + c)/(b + d)."
        ]
      },
      {
        h: "Pourcentages et évolutions",
        points: [
          "<b>Pourcentage d’une quantité</b> : t % de N vaut N × t/100. 15 % de 240 patients = 36 patients.",
          "<b>Évolution en pourcentage</b> : taux = (valeur finale − valeur initiale) / valeur initiale. De 80 à 92 : +15 %.",
          "<b>Coefficient multiplicateur</b> : une hausse de t % multiplie par (1 + t/100), une baisse par (1 − t/100).",
          "Évolutions successives : on <b>multiplie</b> les coefficients. +10 % puis −10 % donne 1,1 × 0,9 = 0,99, soit −1 % et non 0 %.",
          "Évolution réciproque : après une baisse de 20 % (× 0,8), il faut × 1,25, soit +25 %, pour revenir à la valeur initiale."
        ]
      },
      {
        h: "Proportionnalité et règle de trois",
        p: "Deux grandeurs sont proportionnelles si l’une s’obtient en multipliant l’autre par un coefficient constant. La <b>proportionnalité</b> permet la <b>règle de trois</b> : si 5 mL contiennent 250 mg de principe actif, 1 mL en contient 50 mg et 8 mL en contiennent 400 mg."
      },
      {
        h: "Dilution",
        points: [
          "Lors d’une <b>dilution</b>, la quantité de soluté se conserve : C₁ × V₁ = C₂ × V₂.",
          "<b>Facteur de dilution</b> F = C₁ / C₂ = V₂ / V₁. Diluer 10 mL dans un volume final de 50 mL donne F = 5.",
          "Exemple : pour obtenir 100 mL à 2 g/L à partir d’une solution à 10 g/L, on prélève V₁ = 2 × 100 / 10 = 20 mL.",
          "Piège : V₂ est le volume <b>final</b>, pas le volume d’eau ajouté (ici 80 mL d’eau)."
        ]
      }
    ]
  },
  {
    d: 1,
    o: ["1.2", "1.3", "1.7"],
    title: "Puissances, racines et notation scientifique",
    summary: "Les règles de calcul indispensables pour manipuler les très grands et très petits nombres.",
    sections: [
      {
        h: "Règles de calcul sur les puissances",
        points: [
          "aⁿ × aᵐ = aⁿ⁺ᵐ ; aⁿ / aᵐ = aⁿ⁻ᵐ ; (aⁿ)ᵐ = aⁿˣᵐ.",
          "(ab)ⁿ = aⁿbⁿ ; a⁰ = 1 (a ≠ 0) ; a⁻ⁿ = 1/aⁿ.",
          "<b>Puissances de 10</b> : 10³ × 10⁻⁵ = 10⁻² ; 10⁴ / 10⁻² = 10⁶ ; (10⁻³)² = 10⁻⁶.",
          "Pièges : aⁿ + aᵐ ne se simplifie pas ; (a + b)² = a² + 2ab + b², et non a² + b²."
        ]
      },
      {
        h: "Racine carrée et propriétés des racines",
        points: [
          "La <b>racine carrée</b> de a ≥ 0 est le nombre positif dont le carré vaut a : √49 = 7.",
          "<b>Propriétés des racines</b> : √(ab) = √a × √b et √(a/b) = √a / √b (a ≥ 0, b > 0).",
          "Mais √(a + b) ≠ √a + √b : √(9 + 16) = 5, alors que √9 + √16 = 7.",
          "<b>Écriture en puissance 1/2</b> : √a = a^(1/2). Ainsi √(10⁶) = 10³ et √(10⁻⁴) = 10⁻².",
          "√(x²) = |x| : pour x = −3, √9 = 3."
        ]
      },
      {
        h: "Notation scientifique",
        points: [
          "<b>Écriture scientifique</b> : a × 10ⁿ avec 1 ≤ a < 10 et n entier. 0,00042 = 4,2 × 10⁻⁴ ; 36 000 = 3,6 × 10⁴.",
          "Produit : (3 × 10⁴) × (2 × 10⁻⁷) = 6 × 10⁻³. Quotient : (8 × 10⁵) / (4 × 10²) = 2 × 10³.",
          "Si la mantisse sort de [1 ; 10[, on la réajuste : 25 × 10³ = 2,5 × 10⁴.",
          "<b>Ordre de grandeur</b> : la puissance de 10 la plus proche. Un globule rouge mesure environ 7 µm, soit un ordre de grandeur de 10⁻⁵ m."
        ]
      }
    ]
  },
  {
    d: 1,
    o: ["1.4"],
    title: "Équations",
    summary: "Résoudre les équations du premier et du second degré et isoler une variable dans une formule.",
    sections: [
      {
        h: "Équation du premier degré",
        p: "Une <b>équation du premier degré</b> s’écrit ax + b = 0 avec a ≠ 0 ; son unique solution est x = −b/a. On peut ajouter, soustraire, multiplier ou diviser les deux membres par un même nombre non nul. Exemple : 3x − 7 = 11 donne 3x = 18, puis x = 6."
      },
      {
        h: "Équation du second degré",
        points: [
          "<b>Équation du second degré</b> : ax² + bx + c = 0 (a ≠ 0). Discriminant Δ = b² − 4ac.",
          "Δ > 0 : deux solutions x = (−b − √Δ)/(2a) et x = (−b + √Δ)/(2a).",
          "Δ = 0 : une solution double x = −b/(2a). Δ < 0 : aucune solution réelle.",
          "Somme des racines = −b/a, produit = c/a : utile pour vérifier. x² − 5x + 6 = 0 a pour solutions 2 et 3.",
          "Cas rapides : x² = 9 donne x = 3 ou x = −3 ; x(x − 4) = 0 donne x = 0 ou x = 4 (produit nul)."
        ]
      },
      {
        h: "Isoler une variable dans une formule",
        points: [
          "Pour <b>isoler une variable</b>, on applique les mêmes opérations aux deux membres jusqu’à obtenir la variable seule.",
          "Exemple : C = n / V donne n = C × V, puis V = n / C.",
          "Exemple : IMC = m / t² donne m = IMC × t² et t = √(m / IMC).",
          "Piège : on ne « passe » pas un terme d’un côté en changeant l’opération au hasard ; vérifier toujours en remplaçant dans la formule initiale."
        ]
      }
    ]
  },
  {
    d: 1,
    o: ["1.6", "1.5"],
    title: "Conversions, unités et concentrations",
    summary: "Unités SI, préfixes et conversions de volumes et de concentrations sans erreur.",
    sections: [
      {
        h: "Unités SI",
        p: "Les <b>unités SI</b> de base utiles en santé sont le mètre (m), le kilogramme (kg), la seconde (s), la mole (mol) et le kelvin (K). Les autres unités en dérivent : un volume s’exprime en m³, une concentration molaire en mol/m³, usuellement en mol/L."
      },
      {
        h: "Préfixes",
        points: [
          "<b>Préfixes</b> : kilo (k) = 10³, déci (d) = 10⁻¹, centi (c) = 10⁻², milli (m) = 10⁻³, micro (µ) = 10⁻⁶, nano (n) = 10⁻⁹, pico (p) = 10⁻¹².",
          "Volumes : 1 L = 1 dm³ = 1000 mL ; 1 mL = 1 cm³ ; 1 m³ = 1000 L.",
          "Aux unités carrées ou cubiques, on élève aussi le facteur : 1 m² = 10⁴ cm² ; 1 m³ = 10⁶ cm³.",
          "Méthode : remplacer le préfixe par sa puissance de 10. 250 µg = 250 × 10⁻⁶ g = 2,5 × 10⁻⁴ g = 0,25 mg."
        ]
      },
      {
        h: "Concentration",
        points: [
          "<b>Concentration</b> massique : Cm = m / V (g/L). Concentration molaire : C = n / V (mol/L).",
          "Lien : Cm = C × M, où M est la masse molaire (g/mol). Le glucose (M = 180 g/mol) à 0,005 mol/L vaut 0,9 g/L.",
          "1 g/L = 1 mg/mL = 100 mg/dL. Une glycémie de 1,26 g/L vaut donc 126 mg/dL.",
          "Pièges : convertir le volume dans la bonne unité avant de diviser, et ne pas confondre mg/L et mg/mL (facteur 1000)."
        ]
      }
    ]
  },

  // ── Domaine 2 : Fonctions, exponentielles et logarithmes ─────────────────
  {
    d: 2,
    o: ["2.1", "2.2"],
    title: "Fonctions et variations",
    summary: "Ensemble de définition, fonctions usuelles, dérivée et étude des variations.",
    sections: [
      {
        h: "Vocabulaire des fonctions",
        points: [
          "L’<b>ensemble de définition</b> est l’ensemble des x pour lesquels f(x) existe. Interdits classiques : diviser par 0, racine d’un nombre négatif, logarithme d’un nombre ≤ 0.",
          "<b>Image et antécédent</b> : si f(2) = 5, alors 5 est l’image de 2 et 2 est un antécédent de 5. Un nombre a une seule image, mais peut avoir plusieurs antécédents (ou aucun).",
          "<b>Fonctions usuelles</b> : affine (ax + b), carré (x²), inverse (1/x, définie sur ℝ*), racine carrée (définie sur [0 ; +∞[), exponentielle (sur ℝ), logarithme népérien (sur ]0 ; +∞[)."
        ]
      },
      {
        h: "Dérivée",
        points: [
          "La <b>dérivée</b> f′(a) est le coefficient directeur de la tangente en a : la vitesse de variation de f.",
          "Dérivées usuelles : (k)′ = 0 ; (xⁿ)′ = n·xⁿ⁻¹ ; (1/x)′ = −1/x² ; (√x)′ = 1/(2√x) ; (eˣ)′ = eˣ ; (ln x)′ = 1/x.",
          "Règles : (u + v)′ = u′ + v′ ; (ku)′ = ku′ ; (uv)′ = u′v + uv′ ; (e^u)′ = u′e^u ; (ln u)′ = u′/u.",
          "Exemple : f(x) = e^(−0,2x) a pour dérivée f′(x) = −0,2·e^(−0,2x)."
        ]
      },
      {
        h: "Sens de variation et extremum",
        points: [
          "<b>Sens de variation</b> : si f′ > 0 sur un intervalle, f y est croissante ; si f′ < 0, décroissante.",
          "Un <b>extremum</b> local d’une fonction dérivable est atteint en un point où f′ s’annule <b>en changeant de signe</b>.",
          "Exemple : f(x) = x² − 6x + 1 ; f′(x) = 2x − 6 s’annule en 3 : minimum f(3) = −8.",
          "Piège : f′(a) = 0 ne suffit pas. Pour f(x) = x³, f′(0) = 0 mais f est croissante sur ℝ, sans extremum."
        ]
      }
    ]
  },
  {
    d: 2,
    o: ["2.3", "2.4"],
    title: "Exponentielle et logarithme",
    summary: "Propriétés algébriques, limites et résolution d’équations avec exp et ln.",
    sections: [
      {
        h: "Propriétés algébriques de l’exponentielle",
        points: [
          "e⁰ = 1 ; e ≈ 2,718 ; eˣ > 0 pour tout réel x.",
          "e^(a+b) = eᵃ × eᵇ ; e^(a−b) = eᵃ / eᵇ ; e^(−a) = 1/eᵃ ; (eᵃ)ⁿ = e^(na).",
          "La fonction exponentielle est strictement croissante sur ℝ et égale à sa dérivée."
        ]
      },
      {
        h: "Limites de l’exponentielle",
        points: [
          "<b>Limites de l’exponentielle</b> : eˣ → +∞ quand x → +∞ ; eˣ → 0 quand x → −∞.",
          "Donc e^(−kt) → 0 quand t → +∞ (k > 0) : c’est la base des modèles de décroissance.",
          "Croissances comparées : eˣ l’emporte sur toute puissance de x en +∞."
        ]
      },
      {
        h: "Logarithme népérien et logarithme décimal",
        points: [
          "Le <b>logarithme népérien</b> ln est la réciproque de l’exponentielle : pour x > 0, y = ln x ⇔ x = eʸ. ln 1 = 0 ; ln e = 1.",
          "Le <b>logarithme décimal</b> log est défini par log x = ln x / ln 10 : log 10ⁿ = n. log 1000 = 3 ; log 0,01 = −2.",
          "<b>Propriétés du logarithme</b> (a, b > 0) : ln(ab) = ln a + ln b ; ln(a/b) = ln a − ln b ; ln(aⁿ) = n·ln a ; ln(1/a) = −ln a.",
          "Valeurs utiles : ln 2 ≈ 0,693 ; ln 10 ≈ 2,303 ; log 2 ≈ 0,301.",
          "Piège : ln(a + b) ≠ ln a + ln b."
        ]
      },
      {
        h: "Équation avec logarithme",
        points: [
          "Pour résoudre eˣ = k (k > 0), on applique ln : x = ln k. Si k ≤ 0, il n’y a pas de solution.",
          "Pour résoudre ln x = a, on applique exp : x = eᵃ.",
          "Exemple : e^(0,1t) = 2 donne 0,1t = ln 2, donc t = 10 ln 2 ≈ 6,93.",
          "Toujours vérifier l’ensemble de définition : ln(x − 3) n’existe que pour x > 3."
        ]
      }
    ]
  },
  {
    d: 2,
    o: ["2.5"],
    title: "Applications biomédicales : pH et échelles logarithmiques",
    summary: "Le logarithme décimal au service du pH et des grandeurs qui varient sur plusieurs ordres de grandeur.",
    sections: [
      {
        h: "Le pH",
        points: [
          "<b>pH</b> = −log[H₃O⁺], la concentration étant exprimée en mol/L. Réciproquement [H₃O⁺] = 10^(−pH).",
          "pH 7 : [H₃O⁺] = 10⁻⁷ mol/L. Le pH du plasma est normalement compris entre 7,35 et 7,45.",
          "Quand le pH baisse de 1, [H₃O⁺] est multipliée par 10 ; baisse de 2, par 100.",
          "Une baisse de 0,3 unité de pH correspond environ à un doublement de [H₃O⁺], car log 2 ≈ 0,3."
        ]
      },
      {
        h: "Échelle logarithmique",
        points: [
          "Une <b>échelle logarithmique</b> place les valeurs selon leur logarithme : 1, 10, 100, 1000 sont équidistants.",
          "Elle sert à représenter des grandeurs qui couvrent plusieurs ordres de grandeur (concentrations, charges virales, populations bactériennes).",
          "Sur un graphique à ordonnée logarithmique, une croissance exponentielle apparaît comme une <b>droite</b>.",
          "Une charge virale qui passe de 10⁵ à 10³ copies/mL a diminué de 2 log, c’est-à-dire d’un facteur 100."
        ]
      }
    ]
  },

  // ── Domaine 3 : Biomathématiques et modélisation ─────────────────────────
  {
    d: 3,
    o: ["3.1", "3.2"],
    title: "Modéliser une croissance ou une décroissance",
    summary: "Passer d’un phénomène biologique à un modèle mathématique et en tirer taux, temps de doublement et demi-vie.",
    sections: [
      {
        h: "Démarche de modélisation",
        points: [
          "Identifier la <b>grandeur modélisée</b> (nombre de bactéries, concentration plasmatique…) et la variable (le temps t).",
          "Énoncer les <b>hypothèses du modèle</b> : par exemple, « la vitesse d’élimination est proportionnelle à la quantité présente ».",
          "Faire le <b>choix du modèle</b> : variation constante par unité de temps → modèle linéaire ; variation proportionnelle à la quantité → modèle exponentiel.",
          "Confronter le modèle aux données : un modèle n’est valable que dans son domaine de validité (une croissance exponentielle finit toujours par être limitée par le milieu)."
        ]
      },
      {
        h: "Taux de croissance",
        points: [
          "Le <b>taux de croissance</b> relatif mesure la variation rapportée à la quantité : dN/dt = kN.",
          "k > 0 : croissance ; k < 0 : décroissance. L’unité de k est l’inverse d’un temps (h⁻¹, j⁻¹…).",
          "En temps discret, une population qui augmente de 20 % par heure est multipliée par 1,2 chaque heure : N(n) = N₀ × 1,2ⁿ."
        ]
      },
      {
        h: "Temps de doublement et demi-vie",
        points: [
          "<b>Temps de doublement</b> d’une croissance N₀e^(kt) : T₂ = ln 2 / k. Il ne dépend pas de N₀.",
          "<b>Demi-vie</b> d’une décroissance N₀e^(−kt) : t½ = ln 2 / k, temps pour que la quantité soit divisée par 2.",
          "Après n demi-vies, il reste N₀ / 2ⁿ : 1/8 après 3 demi-vies, environ 3 % après 5 demi-vies.",
          "Exemple : k = 0,1 h⁻¹ donne t½ = 0,693 / 0,1 ≈ 6,9 h."
        ]
      }
    ]
  },
  {
    d: 3,
    o: ["3.3", "3.4"],
    title: "Équations différentielles et modèles exponentiels",
    summary: "Résoudre y′ = ay et y′ = ay + b, puis exploiter le modèle N(t) = N₀·e^(kt).",
    sections: [
      {
        h: "L’équation y′ = ay",
        points: [
          "Les solutions de <b>y′ = ay</b> sont les fonctions y(t) = C·e^(at), C réel.",
          "La <b>condition initiale</b> y(0) = y₀ fixe la constante : C = y₀, donc y(t) = y₀·e^(at).",
          "Exemple : y′ = −0,5y avec y(0) = 8 donne y(t) = 8e^(−0,5t)."
        ]
      },
      {
        h: "L’équation y′ = ay + b",
        points: [
          "Les solutions de <b>y′ = ay + b</b> (a ≠ 0) sont y(t) = C·e^(at) − b/a.",
          "La solution constante y = −b/a est l’état d’équilibre. Si a < 0, toutes les solutions tendent vers −b/a.",
          "Exemple : perfusion à débit constant avec élimination proportionnelle, y′ = −0,2y + 4 : l’équilibre vaut 4 / 0,2 = 20.",
          "Avec la condition initiale y(0) = 0 : C = 20, donc y(t) = 20 − 20e^(−0,2t)."
        ]
      },
      {
        h: "Le modèle exponentiel N(t) = N₀·e^(kt)",
        points: [
          "<b>N(t) = N₀·e^(kt)</b> : N₀ est la valeur initiale, k le taux de croissance (k < 0 pour une décroissance).",
          "Sur un intervalle de temps fixe Δt, N est multipliée par le même facteur e^(kΔt), quelle que soit la date.",
          "<b>Linéarisation par le logarithme</b> : ln N(t) = ln N₀ + kt. Le graphe de ln N en fonction de t est une droite de pente k et d’ordonnée à l’origine ln N₀.",
          "Déterminer k à partir de deux mesures : k = ln(N₂ / N₁) / (t₂ − t₁)."
        ]
      }
    ]
  },
  {
    d: 3,
    o: ["3.5"],
    title: "Applications biologiques",
    summary: "Croissance bactérienne, élimination des médicaments et radioactivité : trois exemples du même modèle.",
    sections: [
      {
        h: "Croissance bactérienne",
        points: [
          "En phase exponentielle, la <b>croissance bactérienne</b> suit N(t) = N₀·e^(kt), ou N₀ × 2^(t/T) si T est le temps de génération.",
          "Avec T = 20 min, une culture est multipliée par 2³ = 8 en 1 h et par 2⁶ = 64 en 2 h.",
          "Cette phase ne dure pas : l’épuisement des nutriments conduit à une phase stationnaire."
        ]
      },
      {
        h: "Élimination d’un médicament",
        points: [
          "Pour une <b>élimination d’un médicament</b> d’ordre 1 après injection IV unique : C(t) = C₀·e^(−kₑt), kₑ constante d’élimination.",
          "La demi-vie d’élimination vaut t½ = ln 2 / kₑ. Au bout de 4 à 5 demi-vies, le médicament est considéré comme presque totalement éliminé (6,25 % puis environ 3 % restants).",
          "Exemple : C₀ = 40 mg/L, t½ = 6 h ; à 18 h (3 demi-vies), C = 40 / 8 = 5 mg/L."
        ]
      },
      {
        h: "Décroissance radioactive",
        points: [
          "<b>Décroissance radioactive</b> : N(t) = N₀·e^(−λt), λ constante radioactive, et l’activité A(t) = λN(t) suit la même loi.",
          "La période (demi-vie) T = ln 2 / λ est propre à chaque isotope. Le technétium 99m utilisé en scintigraphie a une période d’environ 6 heures.",
          "Après 24 h, soit 4 périodes de 6 h, il reste 1/16 de l’activité initiale."
        ]
      }
    ]
  },

  // ── Domaine 4 : Probabilités ────────────────────────────────────────────
  {
    d: 4,
    o: ["4.1"],
    title: "Événements et calcul de probabilités",
    summary: "Le vocabulaire des événements et les règles de calcul de base.",
    sections: [
      {
        h: "Univers et événements",
        points: [
          "L’<b>univers</b> Ω est l’ensemble des issues possibles d’une expérience aléatoire. Un événement est une partie de Ω.",
          "<b>Union</b> A ∪ B : « A ou B » (au moins l’un des deux se réalise).",
          "<b>Intersection</b> A ∩ B : « A et B » (les deux se réalisent).",
          "<b>Événement contraire</b> Ā : « A ne se réalise pas ». P(Ā) = 1 − P(A).",
          "<b>Événements incompatibles</b> : A ∩ B = ∅, ils ne peuvent pas se réaliser ensemble."
        ]
      },
      {
        h: "Règles de calcul",
        points: [
          "0 ≤ P(A) ≤ 1 ; P(Ω) = 1 ; P(∅) = 0.",
          "Formule générale : P(A ∪ B) = P(A) + P(B) − P(A ∩ B).",
          "Si A et B sont incompatibles : P(A ∪ B) = P(A) + P(B).",
          "Équiprobabilité : P(A) = nombre d’issues favorables / nombre d’issues possibles.",
          "Astuce « au moins un » : P(au moins un) = 1 − P(aucun)."
        ]
      },
      {
        h: "Exemple",
        p: "Dans une promotion, 30 % des étudiants pratiquent un sport (S), 40 % jouent d’un instrument (I) et 12 % font les deux. P(S ∪ I) = 0,30 + 0,40 − 0,12 = 0,58. La probabilité de ne faire ni l’un ni l’autre vaut 1 − 0,58 = 0,42."
      }
    ]
  },
  {
    d: 4,
    o: ["4.2", "4.3"],
    title: "Probabilité conditionnelle et indépendance",
    summary: "Calculer P(A|B), la probabilité d’une intersection, et reconnaître deux événements indépendants.",
    sections: [
      {
        h: "Probabilité conditionnelle",
        points: [
          "Si P(B) > 0, la probabilité de A sachant B est <b>P(A|B)</b> = P(A ∩ B) / P(B).",
          "On restreint l’univers aux issues où B est réalisé.",
          "<b>Probabilité d’une intersection</b> : P(A ∩ B) = P(B) × P(A|B) = P(A) × P(B|A).",
          "P(Ā|B) = 1 − P(A|B).",
          "Piège majeur : P(A|B) ≠ P(B|A). La probabilité d’avoir de la fièvre sachant qu’on a la grippe n’est pas celle d’avoir la grippe sachant qu’on a de la fièvre."
        ]
      },
      {
        h: "Indépendance",
        points: [
          "<b>Définition de l’indépendance</b> : A et B sont indépendants si P(A ∩ B) = P(A) × P(B).",
          "De façon équivalente (P(B) > 0) : P(A|B) = P(A). Savoir que B est réalisé ne change rien à la probabilité de A.",
          "Si A et B sont indépendants, Ā et B, A et B̄, Ā et B̄ le sont aussi.",
          "Épreuves répétées indépendantes : on multiplie les probabilités. Deux tests indépendants positifs chacun avec probabilité 0,1 : P(les deux) = 0,01."
        ]
      },
      {
        h: "Indépendants vs incompatibles",
        points: [
          "<b>Incompatibles</b> : P(A ∩ B) = 0. <b>Indépendants</b> : P(A ∩ B) = P(A)P(B).",
          "Deux événements de probabilités non nulles incompatibles ne sont <b>jamais</b> indépendants : si l’un se réalise, l’autre devient impossible.",
          "Indépendance ≠ absence de lien biologique « évident » : elle se vérifie par le calcul."
        ]
      }
    ]
  },
  {
    d: 4,
    o: ["4.4"],
    title: "Arbres pondérés et probabilités totales",
    summary: "Construire et lire un arbre pondéré, puis appliquer la formule des probabilités totales.",
    sections: [
      {
        h: "Construire un arbre pondéré",
        points: [
          "Un <b>arbre pondéré</b> représente une expérience en plusieurs étapes. Le premier niveau porte P(B) et P(B̄), le second les probabilités conditionnelles P(A|B), P(Ā|B)…",
          "La somme des probabilités issues d’un même nœud vaut 1.",
          "La probabilité d’un chemin est le produit des probabilités de ses branches : P(B ∩ A) = P(B) × P(A|B)."
        ]
      },
      {
        h: "Formule des probabilités totales",
        points: [
          "Si B et B̄ forment une partition de Ω : P(A) = P(B)·P(A|B) + P(B̄)·P(A|B̄).",
          "Plus généralement, pour une partition B₁, …, Bₙ : P(A) = Σ P(Bᵢ)·P(A|Bᵢ).",
          "On additionne tous les chemins qui mènent à A."
        ]
      },
      {
        h: "Exemple médical",
        p: "Une maladie touche 5 % d’une population. Un test est positif chez 90 % des malades et chez 8 % des non-malades. Par la <b>formule des probabilités totales</b>, P(T+) = 0,05 × 0,90 + 0,95 × 0,08 = 0,045 + 0,076 = 0,121. Environ 12,1 % des tests sont positifs."
      }
    ]
  },
  {
    d: 4,
    o: ["4.5"],
    title: "Formule de Bayes",
    summary: "Inverser un conditionnement : de P(test positif | malade) à P(malade | test positif).",
    sections: [
      {
        h: "La formule de Bayes",
        points: [
          "<b>Formule de Bayes</b> : P(B|A) = P(A|B)·P(B) / P(A).",
          "Avec le dénominateur développé : P(B|A) = P(B)P(A|B) / [P(B)P(A|B) + P(B̄)P(A|B̄)].",
          "Elle sert à l’<b>inversion du conditionnement</b> : on connaît P(A|B), on cherche P(B|A)."
        ]
      },
      {
        h: "Exemple : interpréter un test",
        p: "En reprenant la maladie de prévalence 5 %, avec P(T+|M) = 0,90 et P(T+|M̄) = 0,08 : P(M|T+) = 0,045 / 0,121 ≈ 0,37. Seulement 37 % des personnes testées positives sont malades, bien que le test détecte 90 % des malades. Quand la maladie est rare, les faux positifs issus de la grande population non malade pèsent lourd."
      },
      {
        h: "Pièges classiques",
        points: [
          "Confondre P(T+|M) (qualité du test) et P(M|T+) (ce qui intéresse le patient).",
          "Oublier le terme P(B̄)P(A|B̄) au dénominateur.",
          "Méthode sûre : un arbre, ou un tableau sur un effectif fictif (par exemple 10 000 personnes)."
        ]
      }
    ]
  },

  // ── Domaine 5 : Variables aléatoires et lois de probabilité ──────────────
  {
    d: 5,
    o: ["5.1", "5.2", "5.3"],
    title: "Variables aléatoires : espérance, variance, écart-type",
    summary: "Décrire une variable aléatoire discrète par sa loi, sa moyenne théorique et sa dispersion.",
    sections: [
      {
        h: "Loi d’une variable aléatoire discrète",
        p: "Une variable aléatoire X associe un nombre à chaque issue. La <b>loi d’une variable aléatoire discrète</b> donne les valeurs xᵢ prises par X et les probabilités pᵢ = P(X = xᵢ), avec Σ pᵢ = 1."
      },
      {
        h: "Espérance",
        points: [
          "<b>Espérance</b> : E(X) = Σ xᵢ·pᵢ. C’est la moyenne théorique de X sur un grand nombre de répétitions.",
          "Exemple : X vaut 0, 1, 2 avec les probabilités 0,5 ; 0,3 ; 0,2 : E(X) = 0 + 0,3 + 0,4 = 0,7.",
          "<b>Linéarité de l’espérance</b> : E(aX + b) = aE(X) + b et E(X + Y) = E(X) + E(Y)."
        ]
      },
      {
        h: "Variance",
        points: [
          "<b>Variance d’une variable aléatoire</b> : V(X) = E[(X − E(X))²] = E(X²) − [E(X)]².",
          "Avec l’exemple précédent : E(X²) = 0 + 0,3 + 0,8 = 1,1, donc V(X) = 1,1 − 0,49 = 0,61.",
          "<b>V(aX + b)</b> = a²·V(X) : ajouter une constante ne change pas la dispersion ; multiplier par a multiplie la variance par a².",
          "Une variance est toujours positive ou nulle."
        ]
      },
      {
        h: "Écart-type",
        points: [
          "<b>Écart-type d’une variable aléatoire</b> : σ(X) = √V(X). Il s’exprime dans la même unité que X.",
          "σ(aX + b) = |a|·σ(X).",
          "<b>Interprétation de l’écart-type</b> : il mesure la dispersion typique des valeurs autour de l’espérance ; plus il est grand, plus les valeurs sont étalées."
        ]
      }
    ]
  },
  {
    d: 5,
    o: ["5.4"],
    title: "Loi binomiale",
    summary: "Compter les succès lors de n épreuves de Bernoulli identiques et indépendantes.",
    sections: [
      {
        h: "Épreuve de Bernoulli",
        p: "Une <b>épreuve de Bernoulli</b> n’a que deux issues : succès (probabilité p) ou échec (probabilité 1 − p). Répéter n fois, de façon identique et indépendante, une épreuve de Bernoulli forme un schéma de Bernoulli. Le nombre X de succès suit alors la loi binomiale B(n ; p)."
      },
      {
        h: "Formule de P(X = k)",
        points: [
          "<b>P(X = k)</b> = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ, pour k entre 0 et n.",
          "C(n, k) = n! / (k!(n − k)!) compte les façons de placer k succès parmi n épreuves. C(5, 2) = 10 ; C(n, 0) = C(n, n) = 1 ; C(n, 1) = n.",
          "P(X = 0) = (1 − p)ⁿ, d’où P(X ≥ 1) = 1 − (1 − p)ⁿ.",
          "Exemple : un traitement efficace dans 80 % des cas, 3 patients : P(X = 2) = 3 × 0,8² × 0,2 = 0,384."
        ]
      },
      {
        h: "Espérance et variance",
        points: [
          "<b>Espérance np</b> : nombre moyen de succès. Pour B(100 ; 0,3), E(X) = 30.",
          "<b>Variance np(1 − p)</b> : pour B(100 ; 0,3), V(X) = 21 et σ ≈ 4,58.",
          "Conditions à vérifier avant d’utiliser la loi binomiale : deux issues, même p à chaque épreuve, épreuves indépendantes, n fixé à l’avance."
        ]
      }
    ]
  },
  {
    d: 5,
    o: ["5.5"],
    title: "Loi normale",
    summary: "La loi en cloche : centrage, réduction et valeurs à connaître par cœur.",
    sections: [
      {
        h: "Loi normale N(μ, σ²)",
        points: [
          "Une variable X de loi normale N(μ, σ²) a une densité en cloche, symétrique autour de sa moyenne μ, d’écart-type σ.",
          "Moyenne, médiane et mode sont égaux à μ. P(X = a) = 0 : on calcule des probabilités d’intervalles.",
          "Beaucoup de grandeurs biologiques (taille adulte, certaines constantes sanguines) sont approximativement normales."
        ]
      },
      {
        h: "Centrage et réduction",
        points: [
          "<b>Centrage et réduction</b> : si X suit N(μ, σ²), alors Z = (X − μ) / σ suit la <b>loi normale centrée réduite</b> N(0, 1).",
          "On note Φ(z) = P(Z ≤ z). Par symétrie : Φ(0) = 0,5 et Φ(−z) = 1 − Φ(z).",
          "Exemple : taille X ~ N(170, 8²) ; P(X ≤ 186) = P(Z ≤ 2) = Φ(2)."
        ]
      },
      {
        h: "Valeurs à connaître",
        points: [
          "<b>Règle 68-95-99,7</b> : environ 68 % des valeurs dans [μ − σ ; μ + σ], 95 % dans [μ − 2σ ; μ + 2σ], 99,7 % dans [μ − 3σ ; μ + 3σ].",
          "<b>Valeur 1,96</b> : P(−1,96 ≤ Z ≤ 1,96) = 0,95 exactement, soit Φ(1,96) = 0,975.",
          "Il reste donc 2,5 % de chaque côté au-delà de ±1,96 σ.",
          "C’est la valeur utilisée pour les intervalles de confiance à 95 % (domaine 8)."
        ]
      }
    ]
  },

  // ── Domaine 6 : Statistiques descriptives ───────────────────────────────
  {
    d: 6,
    o: ["6.1", "6.2", "6.5"],
    title: "Paramètres de position",
    summary: "Moyenne, médiane et quartiles : résumer une série par des valeurs centrales.",
    sections: [
      {
        h: "Moyenne",
        points: [
          "<b>Moyenne arithmétique</b> : x̄ = (x₁ + … + xₙ) / n.",
          "<b>Moyenne pondérée</b> : x̄ = Σ nᵢxᵢ / Σ nᵢ, avec nᵢ les effectifs (ou coefficients).",
          "Exemple : 3 patients à 60 kg et 2 à 85 kg : x̄ = (180 + 170) / 5 = 70 kg.",
          "La moyenne est sensible aux valeurs extrêmes."
        ]
      },
      {
        h: "Médiane",
        points: [
          "<b>Calcul de la médiane</b> : on ordonne la série. Si n est impair, la médiane est la valeur du milieu (rang (n + 1)/2) ; si n est pair, la moyenne des deux valeurs centrales.",
          "Série 3, 5, 8, 9, 40 : médiane = 8 (alors que la moyenne vaut 13).",
          "<b>Robustesse aux valeurs extrêmes</b> : la médiane change peu si une valeur aberrante apparaît, contrairement à la moyenne.",
          "Pour une distribution asymétrique (durées de séjour, revenus), la médiane décrit mieux la valeur « typique »."
        ]
      },
      {
        h: "Quartiles",
        points: [
          "Le <b>premier quartile</b> Q1 est la plus petite valeur de la série telle qu’au moins 25 % des données lui soient inférieures ou égales.",
          "Le <b>troisième quartile</b> Q3 est la plus petite valeur telle qu’au moins 75 % des données lui soient inférieures ou égales.",
          "Série ordonnée de 12 valeurs : Q1 est la 3ᵉ valeur (12 × 0,25 = 3), Q3 la 9ᵉ (12 × 0,75 = 9). Si le calcul donne un nombre décimal, on arrondit à l’entier supérieur.",
          "D’autres conventions de calcul existent (logiciels, interpolation) : utilise celle de ton cours."
        ]
      }
    ]
  },
  {
    d: 6,
    o: ["6.3", "6.4", "6.5"],
    title: "Paramètres de dispersion",
    summary: "Variance, écart-type et écart interquartile : mesurer l’étalement des données.",
    sections: [
      {
        h: "Variance d’une série statistique",
        points: [
          "<b>Variance d’une série statistique</b> : V = (1/n) Σ (xᵢ − x̄)², la moyenne des carrés des écarts à la moyenne.",
          "<b>Formule de König-Huygens</b> : V = (1/n) Σ xᵢ² − x̄², « moyenne des carrés moins carré de la moyenne ».",
          "Exemple : série 2, 4, 6 ; x̄ = 4 ; V = (4 + 0 + 4) / 3 = 8/3 ≈ 2,67.",
          "La variance s’exprime dans l’unité au carré (kg², mmHg²…)."
        ]
      },
      {
        h: "Écart-type d’une série",
        points: [
          "<b>Écart-type d’une série</b> : s = √V, dans la même unité que les données.",
          "La <b>dispersion</b> est d’autant plus grande que l’écart-type est grand. Deux séries peuvent avoir la même moyenne et des dispersions très différentes.",
          "Si on ajoute une constante à toutes les valeurs, l’écart-type ne change pas ; si on les multiplie par a, il est multiplié par |a|."
        ]
      },
      {
        h: "Écart interquartile",
        points: [
          "<b>Écart interquartile</b> : Q3 − Q1. L’intervalle [Q1 ; Q3] contient environ la moitié centrale des données.",
          "Comme la médiane, il est robuste aux valeurs extrêmes, contrairement à l’écart-type.",
          "Couple usuel : moyenne et écart-type pour une distribution symétrique ; médiane et écart interquartile pour une distribution asymétrique."
        ]
      },
      {
        h: "Variance estimée",
        extra: true,
        p: "Pour estimer la variance d’une population à partir d’un échantillon, on divise par n − 1 au lieu de n : s² = Σ (xᵢ − x̄)² / (n − 1). Vérifie la convention de ta faculté."
      }
    ]
  },
  {
    d: 6,
    o: ["6.6"],
    title: "Représentations graphiques",
    summary: "Choisir et lire le bon graphique : diagramme en barres, histogramme, boîte à moustaches.",
    sections: [
      {
        h: "Diagramme en barres",
        points: [
          "Le <b>diagramme en barres</b> représente une variable qualitative (groupe sanguin) ou quantitative discrète (nombre d’enfants).",
          "Les barres sont séparées ; leur hauteur est proportionnelle à l’effectif ou à la fréquence.",
          "Le diagramme circulaire est une alternative pour des proportions d’un tout (angle = fréquence × 360°)."
        ]
      },
      {
        h: "Histogramme",
        points: [
          "L’<b>histogramme</b> représente une variable quantitative continue regroupée en classes (tranches d’âge, de poids).",
          "Les rectangles sont accolés ; c’est leur <b>aire</b> qui est proportionnelle à l’effectif.",
          "Si les classes n’ont pas la même amplitude, la hauteur doit être l’effectif divisé par l’amplitude (densité), sinon le graphique est trompeur.",
          "L’histogramme montre la forme de la distribution : symétrique, asymétrique, unimodale, bimodale."
        ]
      },
      {
        h: "Boîte à moustaches",
        points: [
          "La <b>boîte à moustaches</b> résume une série : la boîte va de Q1 à Q3, un trait marque la médiane, les moustaches s’étendent vers les valeurs extrêmes.",
          "La longueur de la boîte est l’écart interquartile.",
          "Une médiane décentrée dans la boîte ou des moustaches inégales signalent une asymétrie.",
          "Elle permet de comparer facilement plusieurs groupes côte à côte."
        ]
      }
    ]
  },

  // ── Domaine 7 : Biostatistiques médicales ───────────────────────────────
  {
    d: 7,
    o: ["7.1", "7.2"],
    title: "Prévalence et incidence",
    summary: "Mesurer la fréquence d’une maladie : cas existants ou nouveaux cas.",
    sections: [
      {
        h: "Prévalence",
        points: [
          "<b>Définition de la prévalence</b> : proportion de personnes atteintes par la maladie dans une population, à un instant donné.",
          "<b>Calcul de la prévalence</b> : nombre de cas existants / effectif total de la population. 300 diabétiques sur 5000 personnes : prévalence = 6 %.",
          "C’est une proportion, sans unité, comprise entre 0 et 1."
        ]
      },
      {
        h: "Incidence",
        points: [
          "L’incidence mesure l’apparition de <b>nouveaux cas</b> pendant une période, dans une population initialement indemne.",
          "<b>Incidence cumulée</b> : nouveaux cas pendant la période / nombre de personnes à risque au début. 40 nouveaux cas en un an parmi 2000 personnes indemnes : 2 % par an.",
          "<b>Taux d’incidence</b> : nouveaux cas / somme des durées de suivi (personnes-temps). 12 cas pour 4000 personnes-années = 3 pour 1000 personnes-années."
        ]
      },
      {
        h: "Prévalence vs incidence",
        points: [
          "Prévalence = « stock » de malades ; incidence = « flux » de nouveaux malades.",
          "En situation stable, prévalence ≈ incidence × durée moyenne de la maladie.",
          "Un traitement qui prolonge la survie sans guérir augmente la prévalence, sans changer l’incidence.",
          "Une maladie aiguë de courte durée peut avoir une incidence élevée et une prévalence faible."
        ]
      }
    ]
  },
  {
    d: 7,
    o: ["7.3", "7.4"],
    title: "Sensibilité et spécificité",
    summary: "Les qualités intrinsèques d’un test diagnostique, lues dans le tableau de contingence.",
    sections: [
      {
        h: "Tableau de contingence",
        points: [
          "Le <b>tableau de contingence</b> croise le résultat du test (T+ / T−) et le statut réel (M / M̄).",
          "VP (vrais positifs) : malades testés positifs. FN (<b>faux négatifs</b>) : malades testés négatifs.",
          "FP (<b>faux positifs</b>) : non-malades testés positifs. VN (vrais négatifs) : non-malades testés négatifs.",
          "Malades = VP + FN ; non-malades = FP + VN."
        ]
      },
      {
        h: "Sensibilité",
        points: [
          "<b>Calcul de la sensibilité</b> : Se = VP / (VP + FN) = P(T+ | M). C’est la capacité à détecter les malades.",
          "1 − Se est la proportion de faux négatifs parmi les malades.",
          "Un test très sensible, s’il est négatif, permet d’écarter la maladie : il est adapté au dépistage.",
          "Exemple : 90 VP et 10 FN : Se = 90 / 100 = 90 %."
        ]
      },
      {
        h: "Spécificité",
        points: [
          "<b>Calcul de la spécificité</b> : Sp = VN / (VN + FP) = P(T− | M̄). C’est la capacité à reconnaître les non-malades.",
          "1 − Sp est la proportion de faux positifs parmi les non-malades.",
          "Un test très spécifique, s’il est positif, permet de confirmer la maladie.",
          "Se et Sp sont des qualités propres au test : elles ne dépendent pas de la prévalence."
        ]
      },
      {
        h: "Compromis sensibilité-spécificité",
        p: "Pour un test quantitatif (glycémie, marqueur sanguin), le seuil de positivité règle le <b>compromis sensibilité-spécificité</b> : abaisser le seuil augmente la sensibilité (moins de faux négatifs) mais diminue la spécificité (plus de faux positifs), et inversement."
      }
    ]
  },
  {
    d: 7,
    o: ["7.5", "7.6"],
    title: "Valeurs prédictives",
    summary: "Ce que le résultat d’un test signifie pour le patient, et pourquoi cela dépend de la prévalence.",
    sections: [
      {
        h: "Définitions et calcul",
        points: [
          "<b>Calcul de la VPP</b> : VPP = VP / (VP + FP) = P(M | T+), probabilité d’être malade quand le test est positif.",
          "<b>Calcul de la VPN</b> : VPN = VN / (VN + FN) = P(M̄ | T−), probabilité d’être indemne quand le test est négatif.",
          "Dans le tableau de contingence, Se et Sp se lisent en colonnes (statut réel), VPP et VPN en lignes (résultat du test)."
        ]
      },
      {
        h: "Influence de la prévalence",
        points: [
          "<b>Influence de la prévalence sur la VPP</b> : à Se et Sp fixées, la VPP augmente quand la prévalence augmente.",
          "<b>Influence de la prévalence sur la VPN</b> : la VPN diminue quand la prévalence augmente.",
          "Par la formule de Bayes : VPP = Se·p / [Se·p + (1 − Sp)(1 − p)], p étant la prévalence.",
          "Conséquence : un même test a une VPP faible en dépistage de masse (maladie rare) et plus élevée chez des patients symptomatiques."
        ]
      },
      {
        h: "Exemple chiffré",
        p: "Test Se = 90 %, Sp = 95 %, 1000 personnes, prévalence 10 % : 100 malades (90 VP, 10 FN) et 900 non-malades (855 VN, 45 FP). VPP = 90 / 135 ≈ 67 % ; VPN = 855 / 865 ≈ 98,8 %."
      }
    ]
  },
  {
    d: 7,
    o: ["7.7", "7.8"],
    title: "Risque relatif et odds ratio",
    summary: "Mesurer l’association entre une exposition et une maladie selon le type d’étude.",
    sections: [
      {
        h: "Risque relatif",
        points: [
          "Dans une <b>étude de cohorte</b>, on suit des exposés et des non-exposés et on compte les nouveaux cas : on peut calculer des risques.",
          "<b>Calcul du risque relatif</b> : RR = risque chez les exposés / risque chez les non-exposés = [a/(a + b)] / [c/(c + d)].",
          "Notation du tableau : a = exposés malades, b = exposés non malades, c = non-exposés malades, d = non-exposés non malades.",
          "Exemple : 30 cas sur 1000 fumeurs, 10 cas sur 1000 non-fumeurs : RR = 0,03 / 0,01 = 3."
        ]
      },
      {
        h: "Interprétation du risque relatif",
        points: [
          "RR = 1 : pas d’association. RR > 1 : l’exposition est associée à un risque accru (facteur de risque). RR < 1 : risque diminué (facteur protecteur).",
          "RR = 3 signifie que les exposés ont un risque 3 fois plus élevé que les non-exposés.",
          "Une association statistique ne prouve pas à elle seule une causalité."
        ]
      },
      {
        h: "Odds ratio",
        points: [
          "Dans une <b>étude cas-témoins</b>, on part de malades (cas) et de non-malades (témoins) et on recherche l’exposition passée. Le nombre de cas est fixé par l’enquêteur : on ne peut pas calculer de risque.",
          "La cote (odds) d’un événement est p / (1 − p).",
          "<b>Calcul de l’odds ratio</b> : OR = (a/b) / (c/d) = (a × d) / (b × c), le rapport des produits croisés.",
          "Exemple : a = 40, b = 60, c = 20, d = 80 : OR = (40 × 80) / (60 × 20) ≈ 2,67.",
          "Interprétation : comme le RR, OR = 1 signifie absence d’association, OR > 1 association positive."
        ]
      },
      {
        h: "Odds ratio vs risque relatif",
        points: [
          "L’OR est calculable dans tous les types d’études ; le RR nécessite une étude de cohorte.",
          "Quand la maladie est rare (moins de 10 % environ), l’OR est une bonne approximation du RR.",
          "Quand la maladie est fréquente, l’OR s’éloigne de 1 davantage que le RR et surestime l’association."
        ]
      }
    ]
  },

  // ── Domaine 8 : Estimation, intervalles de confiance et tests ───────────
  {
    d: 8,
    o: ["8.1", "8.2"],
    title: "Échantillonnage et estimation",
    summary: "Pourquoi un échantillon ne donne jamais exactement la vérité, et comment estimer une proportion.",
    sections: [
      {
        h: "Population et échantillon",
        points: [
          "La <b>population</b> est l’ensemble des individus étudiés ; l’<b>échantillon</b> est la partie observée.",
          "Pour que les résultats soient généralisables, l’échantillon doit être représentatif : on le tire au sort (échantillon aléatoire).",
          "Les paramètres de la population (p, μ) sont inconnus ; on les estime à partir des valeurs observées dans l’échantillon."
        ]
      },
      {
        h: "Fluctuation d’échantillonnage",
        points: [
          "Deux échantillons tirés dans la même population donnent des résultats différents : c’est la <b>fluctuation d’échantillonnage</b>.",
          "Cette variabilité diminue quand la taille n de l’échantillon augmente, en √n.",
          "Elle explique qu’un écart observé entre deux groupes puisse être dû au hasard seul : c’est le point de départ des tests statistiques."
        ]
      },
      {
        h: "Estimer une proportion",
        points: [
          "La <b>proportion observée</b> f = k / n (k individus présentant le caractère parmi n) est l’<b>estimateur ponctuel</b> de la proportion p de la population.",
          "Exemple : 42 porteurs d’un marqueur sur 200 sujets : f = 0,21, estimation ponctuelle de p.",
          "Une estimation ponctuelle seule ne dit rien de sa précision : on l’accompagne d’un intervalle de confiance."
        ]
      }
    ]
  },
  {
    d: 8,
    o: ["8.3", "8.4"],
    title: "Intervalle de confiance et marge d’erreur",
    summary: "Encadrer une proportion inconnue et comprendre ce qui rend l’estimation plus précise.",
    sections: [
      {
        h: "IC à 95 % d’une proportion",
        points: [
          "<b>IC à 95 % d’une proportion</b> : [f − 1,96·√(f(1 − f)/n) ; f + 1,96·√(f(1 − f)/n)].",
          "Conditions usuelles d’utilisation : n ≥ 30, n·f ≥ 5 et n·(1 − f) ≥ 5.",
          "Exemple : f = 0,20 et n = 400 : √(0,2 × 0,8 / 400) = 0,02 ; IC = [0,20 − 0,039 ; 0,20 + 0,039] ≈ [0,161 ; 0,239]."
        ]
      },
      {
        h: "Interprétation de l’intervalle de confiance",
        points: [
          "Si l’on répétait l’échantillonnage un grand nombre de fois, environ 95 % des intervalles ainsi construits contiendraient la vraie valeur p.",
          "Le paramètre p est fixe ; c’est l’intervalle qui varie d’un échantillon à l’autre.",
          "Un IC à 99 % (1,96 remplacé par 2,58) est plus large qu’un IC à 95 % : plus de confiance, moins de précision."
        ]
      },
      {
        h: "Marge d’erreur",
        points: [
          "La <b>marge d’erreur</b> est la demi-largeur de l’intervalle : 1,96·√(f(1 − f)/n).",
          "<b>Influence de la taille de l’échantillon</b> : la marge d’erreur est proportionnelle à 1/√n. Pour la diviser par 2, il faut multiplier n par 4.",
          "À n fixé, la marge d’erreur est maximale pour f = 0,5.",
          "Taille nécessaire pour une marge e donnée : n ≥ 1,96²·f(1 − f) / e²."
        ]
      }
    ]
  },
  {
    d: 8,
    o: ["8.5", "8.7"],
    title: "Principe d’un test : hypothèses et seuil",
    summary: "Formuler H₀ et H₁, fixer le seuil α et appliquer la règle de décision.",
    sections: [
      {
        h: "Hypothèse nulle et hypothèse alternative",
        points: [
          "L’<b>hypothèse nulle</b> H₀ est l’hypothèse d’absence d’effet ou de différence : « le nouveau traitement a la même efficacité que le placebo ».",
          "L’<b>hypothèse alternative</b> H₁ est ce que l’on cherche à mettre en évidence : « les efficacités diffèrent ».",
          "Le test est construit en supposant H₀ vraie. On cherche si les données observées sont compatibles avec H₀.",
          "Test bilatéral : H₁ « différent » ; test unilatéral : H₁ « supérieur » (ou « inférieur »), choisi avant de voir les données."
        ]
      },
      {
        h: "Seuil α et règle de décision",
        points: [
          "Le <b>seuil α</b> (souvent 5 %) est fixé <b>avant</b> l’étude. C’est le risque maximal accepté de rejeter H₀ à tort.",
          "<b>Règle de décision</b> : si p-value ≤ α, on rejette H₀ ; le résultat est dit statistiquement significatif.",
          "Si p-value > α, on ne rejette pas H₀. Cela ne prouve pas que H₀ est vraie : on conclut seulement que les données ne permettent pas de mettre en évidence une différence.",
          "Choisir un seuil plus strict (α = 1 %) rend le rejet de H₀ plus difficile."
        ]
      }
    ]
  },
  {
    d: 8,
    o: ["8.6", "8.8", "8.9"],
    title: "p-value, erreurs et interprétation",
    summary: "Lire correctement une p-value, connaître les risques α et β et distinguer significatif et important.",
    sections: [
      {
        h: "Définition de la p-value",
        points: [
          "<b>Définition de la p-value</b> : probabilité, si H₀ est vraie, d’observer un résultat au moins aussi éloigné de H₀ que celui obtenu.",
          "Plus la p-value est petite, plus les données sont difficilement compatibles avec H₀.",
          "<b>Interprétation de la p-value</b> : p = 0,03 signifie que, si H₀ était vraie, un écart au moins aussi grand serait observé dans environ 3 % des études.",
          "Pièges : la p-value n’est <b>pas</b> la probabilité que H₀ soit vraie, ni la probabilité que le résultat soit dû au hasard, ni une mesure de l’importance de l’effet."
        ]
      },
      {
        h: "Erreurs de type I et II",
        points: [
          "<b>Risque α</b> (erreur de type I) : rejeter H₀ alors qu’elle est vraie. Conclure à tort à une efficacité (faux positif).",
          "<b>Risque β</b> (erreur de type II) : ne pas rejeter H₀ alors qu’elle est fausse. Passer à côté d’un effet réel (faux négatif).",
          "<b>Puissance</b> = 1 − β : probabilité de mettre en évidence un effet qui existe réellement.",
          "La puissance augmente avec la taille de l’échantillon, avec l’ampleur de l’effet réel, et avec α. À effectif fixé, diminuer α augmente β."
        ]
      },
      {
        h: "Interprétation des résultats",
        points: [
          "<b>Significativité statistique</b> ne veut pas dire importance : avec un très grand effectif, une différence minime peut être significative.",
          "La <b>pertinence clinique</b> s’apprécie sur l’ampleur de l’effet et son intervalle de confiance, pas sur la p-value seule.",
          "Un résultat non significatif avec un petit effectif peut simplement refléter un manque de puissance.",
          "Multiplier les tests sur les mêmes données augmente le risque d’obtenir au moins un résultat significatif par hasard."
        ]
      }
    ]
  }
];
