---
title: "Comment Tester Angor : Un Guide Étape par Étape"
description: "Angor est un projet de financement participatif décentralisé tirant parti de la sécurité de Bitcoin et de la transparence de Nostr."
author: 'Équipe Angor'
role: 'Équipe de développement'
authorImage: ""
authorImageAlt: "Membre de l'équipe Angor"
pubDate: 2024-06-20
cardImage: "@/images/how-to-test-angor.webp"
cardImageAlt: "Guide pour tester la plateforme Angor"
readTime: 6
tags: ['Financement participatif', 'Bitcoin' ,'Nostr','Angor']
nostrPublicKey: 'npub1wrzguj625auyeysfuuxzf7ywhzlwfz9gm3fml2lul72gwqxw8n9swtcm02'
---

## Introduction au Test d'Angor
 
Angor est un projet de financement participatif décentralisé tirant parti de la sécurité de Bitcoin et de la transparence de Nostr. Les fonds des investisseurs sont libérés par étapes à travers des contrats de verrouillage temporel, et les fonds non dépensés peuvent être récupérés à tout moment (les fonds récupérés peuvent encourir une pénalité). Tester Angor implique de vérifier ces processus et de s'assurer que la plateforme fonctionne comme prévu.

## Guide Étape par Étape pour Tester Angor

### Étape 1 : Configuration Initiale

#### 1. Créer un Portefeuille sur Angor
Étapes : 
- Inscrivez-vous sur la plateforme Angor.
- Naviguez vers la section de création de portefeuille.
- Cliquez sur "Créer un Portefeuille."
- Angor configurera automatiquement le portefeuille pour vous.

#### 2. Obtenir des Pièces de Test
Étapes :
- Allez à la section des pièces de test.
- Cliquez sur "Obtenir des Pièces de Test."
- Les pièces de test seront ajoutées à votre portefeuille nouvellement créé.

### Étape 2 : Tester le Processus d'Investissement

#### 1. Choisir un Projet
Étapes :
- Parcourez les projets disponibles sur Angor.
- Sélectionnez un projet dans lequel investir.
- Examinez les détails du projet et les jalons.

#### 2. Faire un Investissement
Étapes :
- Naviguez vers la page du projet choisi.
- Cliquez sur le bouton "Investir".
- Entrez le montant que vous souhaitez investir dans le champ fourni.
- Cliquez sur "Soumettre" pour confirmer la transaction.
- Attendez que le fondateur approuve (c'est un processus manuel par le fondateur).
- Attendez que la transaction soit confirmée sur la blockchain. Cela peut prendre quelques minutes.

#### 3. Si vous testez en tant que fondateur et investisseur
- Allez à la page du projet et approuvez l'investissement.

### Étape 3 : Créer et Gérer un Projet (Pour les Fondateurs)

#### Créer un Nouveau Projet
Étapes :
- Naviguez vers la section "Créer un Projet" sur Angor.
- Entrez le nom du projet, la description, et les objectifs.
- Définissez les jalons du projet et les contrats de verrouillage temporel correspondants.
- Téléchargez une image de bannière pour rendre la page du projet plus attrayante.
- Cliquez sur "Soumettre" pour créer le projet.

#### Publier les Mises à Jour du Projet sur Nostr
Étapes :
- Exportez la clé privée depuis Angor.
- Importez la clé privée dans un client Nostr.
- Publiez des mises à jour sur les progrès du projet et l'achèvement des jalons sur Nostr.
- Assurez-vous que les mises à jour sont claires et informatives pour les investisseurs.

#### Dépenser les Fonds pour les Jalons
Étapes :
- En tant que fondateur, une fois qu'un jalon est atteint, signez la transaction pour dépenser les fonds pour ce jalon.
- Assurez-vous que la dépense s'aligne avec les exigences du jalon et les objectifs du projet.

### Étape 4 : Tester la Vérification des Jalons et la Libération des Fonds

#### 1. Surveiller les Progrès du Projet
Étapes :
- Vérifiez régulièrement les mises à jour du projet sur Angor.
- Surveillez les progrès du projet et le statut d'achèvement des jalons comme rapporté par le propriétaire du projet.

#### 2. Examiner le Statut des Jalons
Étapes :
- Quand un jalon est dû, vérifiez la mise à jour du statut du jalon fournie par le propriétaire du projet sur Angor.
- Assurez-vous que les progrès rapportés s'alignent avec la chronologie attendue et les exigences pour le jalon.

#### 3. Libération des Fonds
**Si Vous Êtes le Fondateur** :
- En tant que fondateur du projet, dépensez les fonds du premier jalon en signant la transaction.
- Vérifiez que les fonds sont libérés selon le contrat de verrouillage temporel une fois qu'un jalon est atteint.

**En Tant qu'Investisseur** :
- Attendez que le fondateur du projet approuve l'investissement et libère les fonds du jalon.
- Vérifiez que les fonds des jalons suivants sont libérés selon le contrat de verrouillage temporel à mesure que chaque jalon est atteint.

### Étape 5 : Tester la Récupération des Fonds

#### 1. Initier la Récupération des Fonds
Étapes :
- Si un projet ne parvient pas à atteindre ses jalons, allez à votre tableau de bord de projet.
- Cliquez sur l'option de récupération.
- Initiez le processus de récupération des fonds.

#### 2. Recevoir les Fonds Récupérés dans la Pénalité
Étapes :
- Confirmez la transaction de récupération.
- Vérifiez que vos fonds sont verrouillés dans la pénalité (cela montrera combien de jours restent pour récupérer les fonds).

#### 3. Recevoir les Fonds Hors de la Pénalité
Étapes :
- Attendez jusqu'à ce que la pénalité expire.
- Déplacez vos fonds hors de la pénalité vers votre portefeuille.

### Étape 6 : Expérience Utilisateur et Commentaires

#### 1. Évaluer l'Interface Utilisateur
Étapes :
- Naviguez à travers la plateforme Angor.
- Évaluez l'interface utilisateur pour la facilité d'utilisation, le design, et la fonctionnalité.
- Assurez-vous que toutes les fonctionnalités sont accessibles et intuitives.

#### 2. Soumettre des Commentaires
Étapes :
- Utilisez le référentiel Angor sur GitHub pour soumettre vos commentaires comme problèmes.
- Suggérez des améliorations ou fournissez des commentaires généraux.
- Vérifiez une réponse ou un accusé de réception de l'équipe Angor.
- Rejoignez notre Discord ou Telegram pour discuter davantage et poser des questions.
