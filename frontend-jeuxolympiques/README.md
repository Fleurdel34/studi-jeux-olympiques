# Studi-jeux-olympiques

Présentation

Création d'une application gérant un système permettant la réservation de ticket avec la mise en place: 

    front-end : site web dynamique et responsive
    back-end : composant d'accès à la base de données
    base de données : manipulation des données

Pré-requis

Afin de pouvoir lancer le projet en local, vous devez avoir ces outils sur votre machine :

    pour la partie back
        Java JDK 21
        Maven
    pour la partie front
        nodeJS (LTS)
        npm
        Angular CLI
    pour la partie base de données
        MariaDB

Technologies utilisées

Ce projet utilise Angular 18.0.6 en front, Spring Boot 3.3.1 en back-end

Pour lancer le projet, il faut lancer les commandes suivantes dans l'ordre :

    mvn clean install dans le dossier back
    npm install dans le dossier front
    npm start dans le dossier front
    mvn spring-boot:run dans le dossier back
    ng serve : ouvrir votre navigateur sur l'adresse http://localhost:4200

Fonctionnalités

    Ajouter un utilisateur
    Supprimer un utilisateur
    Modifier les données d'un utilisateur
    Récupérer les données d'un utilisateur
