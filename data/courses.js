// Cours : d = domaine (voir data/domains.js), sections = { h: titre, p: paragraphe, points: liste }.
const COURSES = [
  {
    d: 1,
    title: "Les fondamentaux du cloud",
    summary: "Comprendre le cloud computing et les six avantages mis en avant par AWS.",
    sections: [
      {
        h: "Qu’est-ce que le cloud computing ?",
        p: "Le cloud computing est la mise à disposition à la demande de ressources informatiques (calcul, stockage, bases de données, réseau…) via Internet, avec une tarification à l’usage. Au lieu d’acheter et d’exploiter des serveurs, on consomme des services quand on en a besoin."
      },
      {
        h: "Les six avantages du cloud AWS",
        points: [
          "<b>Remplacer les dépenses d’investissement (CapEx) par des dépenses variables (OpEx)</b> : on paie seulement ce qu’on consomme.",
          "<b>Bénéficier d’économies d’échelle massives</b> : l’agrégation de millions de clients permet à AWS de baisser ses prix.",
          "<b>Arrêter de deviner la capacité</b> : on augmente ou réduit les ressources selon la demande réelle.",
          "<b>Gagner en rapidité et en agilité</b> : de nouvelles ressources sont disponibles en quelques minutes.",
          "<b>Ne plus payer l’exploitation de datacenters</b> : on se concentre sur ses clients et ses applications.",
          "<b>Se déployer mondialement en quelques minutes</b> : plusieurs Régions dans le monde, faible latence pour les utilisateurs."
        ]
      },
      {
        h: "Notions clés",
        points: [
          "<b>Élasticité</b> : ajuster automatiquement les ressources à la demande (à la hausse comme à la baisse).",
          "<b>Scalabilité</b> : verticale (instance plus puissante) ou horizontale (plus d’instances).",
          "<b>Haute disponibilité</b> : le système reste accessible malgré la panne d’un composant.",
          "<b>Tolérance aux pannes</b> : le système continue de fonctionner sans interruption en cas de panne.",
          "<b>TCO (coût total de possession)</b> : le cloud supprime électricité, refroidissement, locaux et renouvellement matériel."
        ]
      }
    ]
  },
  {
    d: 1,
    title: "Modèles de service et de déploiement",
    summary: "IaaS, PaaS, SaaS et les modèles cloud, hybride et sur site.",
    sections: [
      {
        h: "Modèles de service",
        points: [
          "<b>IaaS (Infrastructure as a Service)</b> : on gère l’OS, le middleware et les applications. Exemple : Amazon EC2.",
          "<b>PaaS (Platform as a Service)</b> : on déploie son code, la plateforme gère l’infrastructure. Exemple : AWS Elastic Beanstalk.",
          "<b>SaaS (Software as a Service)</b> : application complète gérée par le fournisseur. Exemple : une messagerie en ligne."
        ]
      },
      {
        h: "Modèles de déploiement",
        points: [
          "<b>Cloud (tout dans le cloud)</b> : toutes les parties de l’application s’exécutent dans le cloud.",
          "<b>Hybride</b> : connexion entre l’infrastructure sur site et les ressources cloud (ex. via Direct Connect ou VPN).",
          "<b>Sur site (on-premises / cloud privé)</b> : ressources déployées dans son propre datacenter avec des outils de virtualisation."
        ]
      },
      {
        h: "Serverless",
        p: "Le serverless (sans serveur) signifie qu’on ne provisionne ni ne gère aucun serveur : AWS gère la capacité, la disponibilité et la mise à l’échelle, et on paie à l’exécution. Exemples : AWS Lambda, Amazon DynamoDB, AWS Fargate, Amazon S3."
      }
    ]
  },
  {
    d: 1,
    title: "L’infrastructure mondiale AWS",
    summary: "Régions, Availability Zones, emplacements périphériques et infrastructures locales.",
    sections: [
      {
        h: "Régions et Availability Zones",
        points: [
          "<b>Région</b> : zone géographique contenant plusieurs Availability Zones isolées (au minimum 3 pour les nouvelles Régions).",
          "<b>Availability Zone (AZ)</b> : un ou plusieurs datacenters distincts, avec alimentation, réseau et connectivité redondants.",
          "Les AZ d’une Région sont reliées par un réseau à faible latence : déployer sur plusieurs AZ améliore la disponibilité."
        ]
      },
      {
        h: "Choisir une Région",
        points: [
          "<b>Conformité</b> : exigences légales de localisation des données.",
          "<b>Proximité</b> avec les utilisateurs pour réduire la latence.",
          "<b>Disponibilité des services</b> : tous les services ne sont pas présents dans toutes les Régions.",
          "<b>Tarification</b> : les prix varient selon la Région."
        ]
      },
      {
        h: "Au plus près des utilisateurs",
        points: [
          "<b>Emplacements périphériques (edge locations)</b> : utilisés par CloudFront et Route 53 pour mettre en cache et servir du contenu.",
          "<b>Local Zones</b> : ressources AWS proches de grandes villes pour une latence de l’ordre de la milliseconde.",
          "<b>Wavelength</b> : infrastructure AWS intégrée aux réseaux 5G des opérateurs.",
          "<b>AWS Outposts</b> : matériel AWS installé dans votre propre datacenter pour une expérience hybride."
        ]
      }
    ]
  },
  {
    d: 1,
    title: "Well-Architected, CAF et migration",
    summary: "Les bonnes pratiques d’architecture et la méthode pour migrer vers AWS.",
    sections: [
      {
        h: "Les 6 piliers du Well-Architected Framework",
        points: [
          "<b>Excellence opérationnelle</b> : exécuter, surveiller et améliorer les processus (infrastructure as code, petits changements réversibles).",
          "<b>Sécurité</b> : protéger données, systèmes et actifs (moindre privilège, traçabilité, chiffrement).",
          "<b>Fiabilité</b> : se remettre des pannes et répondre à la demande (multi-AZ, sauvegardes, reprise automatique).",
          "<b>Efficacité des performances</b> : utiliser les bonnes ressources de manière efficace (bon type d’instance, serverless).",
          "<b>Optimisation des coûts</b> : éviter les dépenses inutiles (bon dimensionnement, modèles de tarification).",
          "<b>Durabilité</b> : minimiser l’impact environnemental des charges de travail."
        ]
      },
      {
        h: "Principes de conception",
        points: [
          "Concevoir en prévoyant les pannes (design for failure).",
          "Découpler les composants (ex. Amazon SQS entre deux services).",
          "Mettre à l’échelle horizontalement plutôt que verticalement.",
          "Automatiser et traiter les serveurs comme jetables."
        ]
      },
      {
        h: "AWS Cloud Adoption Framework (CAF) — 6 perspectives",
        points: [
          "<b>Business, Personnes, Gouvernance</b> : capacités métier (stratégie, culture et formation, gestion des risques et programmes).",
          "<b>Plateforme, Sécurité, Opérations</b> : capacités techniques (architecture, identités et détection des menaces, supervision)."
        ]
      },
      {
        h: "Les 7 stratégies de migration (7 R)",
        points: [
          "<b>Rehost</b> (lift and shift) : déplacer tel quel.",
          "<b>Replatform</b> (lift, tinker and shift) : petites optimisations, ex. passer la base de données sur RDS.",
          "<b>Refactor / Re-architect</b> : repenser l’application en cloud native.",
          "<b>Repurchase</b> : passer à un produit SaaS.",
          "<b>Retire</b> : décommissionner ce qui n’est plus utile.",
          "<b>Retain</b> : conserver sur site pour l’instant.",
          "<b>Relocate</b> : déplacer en masse (ex. VMware Cloud on AWS)."
        ]
      },
      {
        h: "Outils de migration",
        points: [
          "<b>AWS Application Discovery Service</b> : inventorier les serveurs sur site.",
          "<b>AWS Application Migration Service</b> : réhéberger des serveurs sur AWS.",
          "<b>AWS Database Migration Service (DMS)</b> : migrer des bases avec un temps d’arrêt minimal.",
          "<b>Famille AWS Snow</b> (Snowcone, Snowball) : transférer physiquement de grandes quantités de données."
        ]
      }
    ]
  },
  {
    d: 2,
    title: "Le modèle de responsabilité partagée",
    summary: "Qui sécurise quoi : AWS « du » cloud, le client « dans » le cloud.",
    sections: [
      {
        h: "Principe",
        p: "AWS est responsable de la sécurité <b>du</b> cloud : datacenters, matériel, réseau mondial, hyperviseur. Le client est responsable de la sécurité <b>dans</b> le cloud : données, identités et accès, configuration des services, système d’exploitation des instances EC2, chiffrement, règles de pare-feu."
      },
      {
        h: "La responsabilité varie selon le service",
        points: [
          "<b>Amazon EC2 (IaaS)</b> : le client installe les correctifs de l’OS invité et des applications.",
          "<b>Amazon RDS (managé)</b> : AWS applique les correctifs de l’OS et du moteur de base de données ; le client gère les accès et les données.",
          "<b>AWS Lambda (serverless)</b> : AWS gère presque tout ; le client gère son code, ses permissions et ses données."
        ]
      },
      {
        h: "Contrôles partagés",
        points: [
          "<b>Gestion des correctifs</b> : AWS corrige l’infrastructure, le client ses OS invités et applications.",
          "<b>Gestion de la configuration</b> : AWS configure ses équipements, le client ses OS, bases et applications.",
          "<b>Sensibilisation et formation</b> : chacun forme ses propres équipes."
        ]
      }
    ]
  },
  {
    d: 2,
    title: "IAM : identités et accès",
    summary: "Utilisateurs, groupes, rôles, politiques et protection du compte root.",
    sections: [
      {
        h: "Les composants IAM",
        points: [
          "<b>Compte root</b> : accès total. Activer MFA, ne pas créer de clés d’accès, l’utiliser seulement pour les tâches qui l’exigent (ex. fermer le compte).",
          "<b>Utilisateur IAM</b> : identité pour une personne ou une application, avec des identifiants à long terme.",
          "<b>Groupe IAM</b> : ensemble d’utilisateurs partageant les mêmes permissions.",
          "<b>Rôle IAM</b> : identité temporaire assumée par un service (ex. EC2 accédant à S3), un utilisateur ou un compte externe.",
          "<b>Politique (policy)</b> : document JSON qui autorise ou refuse des actions sur des ressources."
        ]
      },
      {
        h: "Bonnes pratiques",
        points: [
          "Appliquer le <b>principe du moindre privilège</b>.",
          "Activer <b>MFA</b> (authentification multifacteur).",
          "Préférer les <b>rôles</b> et les identifiants temporaires aux clés d’accès stockées dans le code.",
          "Utiliser <b>IAM Identity Center</b> pour l’authentification unique (SSO) sur plusieurs comptes.",
          "Utiliser <b>IAM Access Analyzer</b> pour détecter les ressources partagées avec l’extérieur."
        ]
      },
      {
        h: "Accès aux services AWS",
        points: [
          "<b>Console de gestion AWS</b> : interface web (identifiant + mot de passe + MFA).",
          "<b>AWS CLI et SDK</b> : accès programmatique avec des clés d’accès ou des rôles.",
          "<b>Amazon Cognito</b> : authentification des utilisateurs finaux d’applications web et mobiles."
        ]
      }
    ]
  },
  {
    d: 2,
    title: "Services de sécurité",
    summary: "Protection réseau, détection des menaces, chiffrement et gestion des secrets.",
    sections: [
      {
        h: "Protection des applications et du réseau",
        points: [
          "<b>AWS Shield Standard</b> : protection DDoS gratuite et automatique pour tous les clients.",
          "<b>AWS Shield Advanced</b> : protection DDoS renforcée, équipe de réponse 24/7 et protection des coûts.",
          "<b>AWS WAF</b> : pare-feu applicatif web (couche 7) contre les injections SQL et le XSS.",
          "<b>AWS Firewall Manager</b> : gérer les règles de pare-feu de manière centralisée sur plusieurs comptes.",
          "<b>Security groups</b> : pare-feu avec état au niveau de l’instance (règles d’autorisation uniquement).",
          "<b>Network ACL</b> : pare-feu sans état au niveau du sous-réseau (autorisation et refus)."
        ]
      },
      {
        h: "Détection et analyse",
        points: [
          "<b>Amazon GuardDuty</b> : détection intelligente des menaces (CloudTrail, journaux de flux VPC, DNS).",
          "<b>Amazon Inspector</b> : analyse automatisée des vulnérabilités (EC2, images ECR, Lambda).",
          "<b>Amazon Macie</b> : découverte des données sensibles (PII) dans Amazon S3 grâce au machine learning.",
          "<b>Amazon Detective</b> : investigation de la cause racine des incidents de sécurité.",
          "<b>AWS Security Hub</b> : vue centralisée des alertes de sécurité et des contrôles de conformité."
        ]
      },
      {
        h: "Chiffrement et secrets",
        points: [
          "<b>AWS KMS</b> : créer et gérer des clés de chiffrement (chiffrement au repos).",
          "<b>AWS CloudHSM</b> : module matériel de sécurité dédié, contrôlé par le client.",
          "<b>AWS Secrets Manager</b> : stocker et faire tourner automatiquement les secrets (ex. identifiants de base de données).",
          "<b>AWS Certificate Manager (ACM)</b> : certificats SSL/TLS pour le chiffrement en transit."
        ]
      }
    ]
  },
  {
    d: 2,
    title: "Conformité, gouvernance et audit",
    summary: "Tracer les actions, contrôler la configuration et gérer plusieurs comptes.",
    sections: [
      {
        h: "Traçabilité et conformité",
        points: [
          "<b>AWS CloudTrail</b> : enregistre les appels d’API (qui a fait quoi, quand, d’où).",
          "<b>AWS Config</b> : historique des configurations des ressources et évaluation de leur conformité à des règles.",
          "<b>AWS Artifact</b> : télécharger les rapports de conformité AWS (SOC, PCI, ISO) et accepter des accords.",
          "<b>AWS Audit Manager</b> : automatiser la collecte de preuves pour les audits.",
          "La conformité de l’application et des données du client reste sa responsabilité, même sur une infrastructure certifiée."
        ]
      },
      {
        h: "Gestion multi-comptes",
        points: [
          "<b>AWS Organizations</b> : regrouper les comptes, facturation consolidée, unités organisationnelles (OU).",
          "<b>Service Control Policies (SCP)</b> : définir les permissions maximales autorisées dans les comptes d’une organisation.",
          "<b>AWS Control Tower</b> : mettre en place une zone d’atterrissage multi-comptes avec des garde-fous."
        ]
      },
      {
        h: "Autres ressources",
        points: [
          "<b>AWS Trusted Advisor</b> : recommandations (sécurité, coûts, performances, tolérance aux pannes, quotas).",
          "<b>Équipe AWS Trust &amp; Safety</b> : signaler une utilisation abusive de ressources AWS.",
          "<b>AWS Security Center et centre de conformité</b> : documentation, bulletins et programmes de conformité."
        ]
      }
    ]
  },
  {
    d: 3,
    title: "Services de calcul",
    summary: "EC2, mise à l’échelle, conteneurs et serverless.",
    sections: [
      {
        h: "Amazon EC2",
        points: [
          "Serveurs virtuels redimensionnables (IaaS) : on choisit l’AMI, le type d’instance, le stockage et le réseau.",
          "<b>Usage général</b> : charges équilibrées (serveurs web, dépôts de code).",
          "<b>Optimisées pour le calcul</b> : traitement par lots, HPC, serveurs de jeux, modélisation scientifique.",
          "<b>Optimisées pour la mémoire</b> : grandes bases de données en mémoire, analyses temps réel.",
          "<b>Calcul accéléré</b> : GPU pour le machine learning et le rendu graphique.",
          "<b>Optimisées pour le stockage</b> : fortes E/S sur des données locales (entrepôts de données)."
        ]
      },
      {
        h: "Mise à l’échelle et répartition",
        points: [
          "<b>Amazon EC2 Auto Scaling</b> : ajoute ou retire automatiquement des instances selon la demande.",
          "<b>Elastic Load Balancing (ELB)</b> : répartit le trafic entre plusieurs cibles et plusieurs AZ (Application, Network, Gateway Load Balancer)."
        ]
      },
      {
        h: "Conteneurs et serverless",
        points: [
          "<b>AWS Lambda</b> : exécute du code en réponse à des événements, facturé aux requêtes et à la durée (max. 15 minutes par exécution).",
          "<b>Amazon ECS</b> : orchestration de conteneurs AWS ; <b>Amazon EKS</b> : Kubernetes managé.",
          "<b>AWS Fargate</b> : moteur serverless pour exécuter des conteneurs sans gérer de serveurs.",
          "<b>Amazon ECR</b> : registre d’images de conteneurs."
        ]
      },
      {
        h: "Autres options",
        points: [
          "<b>AWS Elastic Beanstalk</b> (PaaS) : déployer une application web ; AWS gère capacité, équilibrage et mise à l’échelle.",
          "<b>Amazon Lightsail</b> : serveurs privés virtuels simples à prix mensuel fixe.",
          "<b>AWS Batch</b> : exécuter des traitements par lots à grande échelle.",
          "<b>AWS Outposts</b> : services AWS sur site."
        ]
      }
    ]
  },
  {
    d: 3,
    title: "Services de stockage",
    summary: "Stockage objet, bloc et fichier, classes S3 et sauvegarde.",
    sections: [
      {
        h: "Amazon S3 (stockage objet)",
        points: [
          "Stockage d’objets dans des buckets, durabilité de 99,999999999 % (11 neuf).",
          "<b>S3 Standard</b> : données fréquemment consultées.",
          "<b>S3 Intelligent-Tiering</b> : accès inconnus ou changeants, déplacement automatique entre niveaux.",
          "<b>S3 Standard-IA</b> : accès peu fréquent, récupération rapide.",
          "<b>S3 One Zone-IA</b> : accès peu fréquent, une seule AZ (données recréables).",
          "<b>S3 Glacier Instant / Flexible Retrieval</b> : archives à coût réduit.",
          "<b>S3 Glacier Deep Archive</b> : archivage le moins cher, récupération en 12 heures ou plus.",
          "<b>Politiques de cycle de vie</b> : déplacer ou supprimer automatiquement des objets ; <b>versioning</b> : protéger contre les suppressions accidentelles."
        ]
      },
      {
        h: "Stockage bloc et fichier",
        points: [
          "<b>Amazon EBS</b> : volumes bloc persistants attachés à une instance EC2 dans une AZ ; instantanés (snapshots) sauvegardés.",
          "<b>Stockage d’instance (instance store)</b> : stockage bloc temporaire, perdu à l’arrêt de l’instance.",
          "<b>Amazon EFS</b> : système de fichiers partagé, élastique, pour de nombreuses instances Linux dans plusieurs AZ.",
          "<b>Amazon FSx</b> : systèmes de fichiers managés (Windows File Server, Lustre, NetApp ONTAP, OpenZFS)."
        ]
      },
      {
        h: "Hybride et sauvegarde",
        points: [
          "<b>AWS Storage Gateway</b> : relier le stockage sur site au stockage cloud AWS.",
          "<b>AWS Backup</b> : gestion centralisée des sauvegardes de plusieurs services.",
          "<b>AWS DataSync</b> : transfert de données en ligne vers AWS ; <b>famille Snow</b> : transfert physique."
        ]
      }
    ]
  },
  {
    d: 3,
    title: "Bases de données",
    summary: "Relationnel, NoSQL, cache, entrepôt de données et bases spécialisées.",
    sections: [
      {
        h: "Relationnel",
        points: [
          "<b>Amazon RDS</b> : bases relationnelles managées (MySQL, PostgreSQL, MariaDB, Oracle, SQL Server).",
          "<b>Multi-AZ</b> : réplique de secours dans une autre AZ pour la haute disponibilité (basculement automatique).",
          "<b>Réplicas en lecture</b> : améliorer les performances de lecture.",
          "<b>Amazon Aurora</b> : compatible MySQL et PostgreSQL, hautes performances, stockage répliqué sur 3 AZ."
        ]
      },
      {
        h: "Non relationnel et spécialisé",
        points: [
          "<b>Amazon DynamoDB</b> : NoSQL clé-valeur serverless, latence de quelques millisecondes à toute échelle.",
          "<b>Amazon ElastiCache</b> : cache en mémoire (Redis, Valkey, Memcached) pour accélérer les applications.",
          "<b>Amazon MemoryDB</b> : base en mémoire durable compatible Redis.",
          "<b>Amazon Neptune</b> : base de données orientée graphe (réseaux sociaux, recommandations).",
          "<b>Amazon DocumentDB</b> : base de documents compatible MongoDB.",
          "<b>Amazon Redshift</b> : entrepôt de données pour l’analytique à grande échelle (OLAP)."
        ]
      },
      {
        h: "Base managée ou sur EC2 ?",
        p: "Installer une base sur EC2 donne un contrôle total mais le client gère correctifs, sauvegardes et haute disponibilité. Un service managé comme RDS délègue ces tâches à AWS. Pour migrer : AWS DMS et AWS Schema Conversion Tool (SCT) pour changer de moteur."
      }
    ]
  },
  {
    d: 3,
    title: "Réseau et diffusion de contenu",
    summary: "VPC, connectivité hybride, DNS et CDN.",
    sections: [
      {
        h: "Amazon VPC",
        points: [
          "<b>VPC</b> : réseau virtuel isolé logiquement dans une Région.",
          "<b>Sous-réseau public</b> : possède une route vers une <b>passerelle Internet</b>.",
          "<b>Sous-réseau privé</b> : pas d’accès direct depuis Internet ; une <b>passerelle NAT</b> permet les connexions sortantes.",
          "<b>Security groups</b> (instance, avec état) et <b>network ACL</b> (sous-réseau, sans état).",
          "<b>VPC peering</b> et <b>AWS Transit Gateway</b> : relier plusieurs VPC."
        ]
      },
      {
        h: "Connectivité hybride",
        points: [
          "<b>AWS Site-to-Site VPN</b> : connexion chiffrée via Internet, rapide à mettre en place.",
          "<b>AWS Direct Connect</b> : connexion réseau privée et dédiée, bande passante constante, ne passe pas par Internet.",
          "<b>AWS Client VPN</b> : accès des utilisateurs distants au VPC."
        ]
      },
      {
        h: "DNS et diffusion",
        points: [
          "<b>Amazon Route 53</b> : DNS, enregistrement de domaines, contrôles de santé et politiques de routage (latence, géolocalisation, basculement).",
          "<b>Amazon CloudFront</b> : CDN qui met le contenu en cache dans les emplacements périphériques.",
          "<b>AWS Global Accelerator</b> : améliore disponibilité et performances via le réseau mondial AWS avec des IP statiques."
        ]
      }
    ]
  },
  {
    d: 3,
    title: "Déploiement, supervision et intégration",
    summary: "Infrastructure as code, observabilité et communication entre applications.",
    sections: [
      {
        h: "Déploiement et gestion",
        points: [
          "<b>AWS CloudFormation</b> : infrastructure as code via des modèles JSON/YAML.",
          "<b>AWS CDK</b> : définir l’infrastructure dans un langage de programmation.",
          "<b>AWS Systems Manager</b> : gérer un parc d’instances (correctifs, Session Manager, Parameter Store).",
          "<b>AWS CodePipeline, CodeBuild, CodeDeploy</b> : intégration et déploiement continus."
        ]
      },
      {
        h: "Supervision",
        points: [
          "<b>Amazon CloudWatch</b> : métriques, journaux, alarmes et tableaux de bord.",
          "<b>AWS X-Ray</b> : tracer les requêtes dans les applications distribuées.",
          "<b>AWS Health Dashboard</b> : événements AWS qui affectent vos ressources."
        ]
      },
      {
        h: "Intégration d’applications",
        points: [
          "<b>Amazon SQS</b> : file d’attente de messages pour découpler les composants.",
          "<b>Amazon SNS</b> : notifications publication/abonnement (e-mail, SMS, Lambda, SQS).",
          "<b>Amazon EventBridge</b> : bus d’événements serverless et tâches planifiées.",
          "<b>AWS Step Functions</b> : orchestrer des workflows."
        ]
      },
      {
        h: "Analytique, IA et utilisateurs finaux",
        points: [
          "<b>Amazon Athena</b> : requêtes SQL directement sur les données S3, sans serveur.",
          "<b>Amazon Kinesis</b> : collecter et traiter des flux de données en temps réel.",
          "<b>AWS Glue</b> : ETL serverless ; <b>Amazon EMR</b> : big data (Spark, Hadoop) ; <b>Amazon QuickSight</b> : tableaux de bord BI.",
          "<b>Amazon SageMaker AI</b> : créer, entraîner et déployer des modèles de ML.",
          "<b>Amazon Bedrock</b> : créer des applications d’IA générative avec des modèles de fondation via API.",
          "<b>Amazon Q</b> : assistant d’IA générative pour les entreprises et les développeurs.",
          "Services d’IA prêts à l’emploi : <b>Rekognition</b> (images/vidéos), <b>Comprehend</b> (analyse de texte), <b>Transcribe</b> (parole vers texte), <b>Polly</b> (texte vers parole), <b>Translate</b>, <b>Lex</b> (chatbots), <b>Textract</b> (extraction de documents).",
          "<b>Amazon WorkSpaces</b> : bureaux virtuels ; <b>Amazon Connect</b> : centre de contact cloud."
        ]
      }
    ]
  },
  {
    d: 4,
    title: "Modèles de tarification",
    summary: "On-Demand, Reserved Instances, Savings Plans, Spot et offre gratuite.",
    sections: [
      {
        h: "Options d’achat EC2",
        points: [
          "<b>On-Demand</b> : paiement à la seconde ou à l’heure, sans engagement. Idéal pour des charges courtes et imprévisibles.",
          "<b>Reserved Instances</b> : engagement de 1 ou 3 ans sur une configuration, jusqu’à 72 % de réduction. Pour les charges stables.",
          "<b>Savings Plans</b> : engagement sur un montant horaire ($/h) pendant 1 ou 3 ans, jusqu’à 72 %, flexible (EC2, Fargate, Lambda).",
          "<b>Spot Instances</b> : capacité inutilisée, jusqu’à 90 % de réduction, mais interruptible avec un préavis de 2 minutes.",
          "<b>Dedicated Hosts</b> : serveur physique dédié, utile pour les licences liées au serveur (BYOL) et la conformité.",
          "<b>Paiement des réservations</b> : tout payé d’avance (réduction maximale), partiellement ou sans paiement initial."
        ]
      },
      {
        h: "Principes de facturation",
        points: [
          "On paie en fonction du calcul, du stockage et du transfert de données sortant.",
          "Le transfert de données entrant depuis Internet est généralement gratuit.",
          "<b>Lambda</b> : facturé au nombre de requêtes et à la durée d’exécution.",
          "<b>S3</b> : stockage utilisé, requêtes, classe de stockage et transfert sortant."
        ]
      },
      {
        h: "AWS Free Tier",
        points: [
          "<b>Toujours gratuit</b> : ex. 1 million de requêtes Lambda par mois.",
          "<b>Crédits ou gratuité limitée dans le temps</b> pour les nouveaux comptes.",
          "<b>Essais gratuits</b> de courte durée sur certains services."
        ]
      }
    ]
  },
  {
    d: 4,
    title: "Outils de facturation et plans de support",
    summary: "Maîtriser ses coûts et choisir le bon niveau de support AWS.",
    sections: [
      {
        h: "Outils de gestion des coûts",
        points: [
          "<b>AWS Pricing Calculator</b> : estimer le coût d’une architecture avant de la déployer.",
          "<b>AWS Cost Explorer</b> : visualiser et analyser les coûts passés, prévisions.",
          "<b>AWS Budgets</b> : définir des budgets et recevoir des alertes en cas de dépassement.",
          "<b>AWS Cost and Usage Report (CUR)</b> : rapport le plus détaillé des coûts et de l’utilisation.",
          "<b>Cost Anomaly Detection</b> : détecter les dépenses inhabituelles grâce au machine learning.",
          "<b>Balises de répartition des coûts (cost allocation tags)</b> : attribuer les dépenses par projet ou équipe.",
          "<b>Facturation consolidée (Organizations)</b> : une seule facture et remises sur volume partagées.",
          "<b>AWS Compute Optimizer</b> : recommandations de dimensionnement des ressources."
        ]
      },
      {
        h: "Plans de support",
        points: [
          "<b>Basic</b> (gratuit) : documentation, AWS re:Post, AWS Health Dashboard, contrôles essentiels de Trusted Advisor.",
          "<b>Developer</b> : support par e-mail aux heures ouvrées, conseils généraux.",
          "<b>Business</b> : accès 24/7 aux ingénieurs support (téléphone, chat, e-mail), tous les contrôles Trusted Advisor, réponse &lt; 1 h si système de production indisponible.",
          "<b>Enterprise On-Ramp</b> : pool de Technical Account Managers (TAM), réponse &lt; 30 min pour un système critique.",
          "<b>Enterprise</b> : TAM désigné, équipe Concierge pour la facturation, réponse &lt; 15 min pour un système critique."
        ]
      },
      {
        h: "Autres ressources",
        points: [
          "<b>AWS Marketplace</b> : catalogue de logiciels tiers prêts à déployer.",
          "<b>AWS Partner Network (APN)</b> : partenaires conseil et technologie.",
          "<b>AWS Professional Services</b> : experts AWS pour accompagner des projets.",
          "<b>AWS re:Post</b> : questions-réponses communautaires ; <b>AWS Knowledge Center</b> : réponses aux questions fréquentes."
        ]
      }
    ]
  }
];
