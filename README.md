# MyShop
Ceci est un pilote pour un projet de site de vente en ligne de cartes et objets anciens.
Il met l'accent sur la partie front-end en proposant une architecture SPA (Single Page Application)

## !! IMPORTANT !!
- Ce repo inclus fronted et backend applications 
https://github.com/MenAllen/MyShop.git

- Les applications suivantes sont à installer sur le PC:
	NodeJS
	Express
	MySQL
	VueJS
	
- 1 fichier SQL DatabaseInit.sql permet de créer la base vide
 	
- Installation et lancement du Backend:
	créer la database MySQL et vérifier qu'elle est connectable
	editer le fichier .env :
		DB_USER = database user
		DB_PASS = user password
		DB_NAME = database name
		TOKEN = A strig to be "SECRET_TOKEN"

	lancer "npm install" puis "node server".

- Installation et lancement du fronted:
	lancer "npm install" et lncer le fichier index.html dans un navigateur
	
## Outils & software utilisés
	Visual Studio Code avec les extensions Prettier & Live Server
	Git & Github
	Runtime NodeJS, Express
	MySQL, sequelize
	VueJS
	Languages: HTML, CSS, Javascript
	Bootstrap

## Applications spécifiques
	jsonwebtoken pour générer et décoder un token
	brcrypt pour hasher le password avant le stockage en base
	helmet pour protéger l'appli en configurant correctement les headers HTML
	joi pour valider les inputs des requetes http reçues

## Descrition
	L'application est basée sur 3 tables dans la BDD MySQL : User, Article, Order
		La table User permet la création d'un user et sa connexion
		La table Article permet la création et la suppression des articles par un user que constituent les photos ou objets anciens
		La table Order permet le stockage d'une commande d'un user
	A ce stade, la barre de navigation contient:
		Le logo qui permet d'afficher tous les artciles, une fois la connexion de l'utilisateur effectuée
		Un icone "user" pour accéder à la créaton, la connexion et la déconnexion d'un user
		Un icone "+" pour ajouter un article
		Un icone "panier" pour visualiser le panier et envoyer une commande
	Sur un article visualisé on peut:
		Voir son titre et son prix
		Ajouter l'article au panier
		Supprimer l'article
		Visualiser l'article et sa description en grand format
 

