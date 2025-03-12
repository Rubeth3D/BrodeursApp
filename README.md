# Evaluation par les pairs

Projet fait par l'équipe de développement Brodeur Apps

## Table des matières

1. [Description](#description)
2. [Installation](#installation)
3. [Utilisation](#utilisation)
4. [Contribuer](#contribuer)
5. [License](#license)
6. [Auteurs](#auteurs)

## Description

Projet visant à créer un logiciel pour aider les professeurs. Le logiciel permet de créer des activitées pour évaluer ses coéquipier pendant un projet en classe.

## Installation

Étapes pour installer et configurer votre projet localement.

### Prérequis

- Logiciel requis pour faire fonctionner le projet:
- `Node.js`
- `Express.js`
- `React.js`
- `PostgreSQL`
- `Docker`
- `PgAdmin 4 //pas obligatoire`

### Étapes d'installation

1. Clonez le repository :

   ```bash
   git clone https://github.com/Rubeth3D/BrodeursApp.git
   ```

2. Ouvrir un premier cmd et ouvrir le dossier:

   ```bash
   cd app_web_brodeur_app/client/react-app
   ```

3. Initialiser le package json pour l'application react:

   ```bash
   npm install init
   ```

4. Installer les dépendances pour l'application react:

   ```bash
   npm install
   ```

5. Installer bootstrap pour l'application react:

   ```bash
   npm install bootstrap

   npm i react-router-dom
   ```

6. Installer react-dom pour l'application react:

   ```bash
   npm i react-router-dom
   ```

7. Lancer l'application react:

   ```bash
   npm  run dev
   ```

8. Ouvrir un deuxième cmd et ouvrir le dossier:

   ```bash
   cd app_web_brodeur_app/serveur/main
   ```

9. Installer les packages express pour le dossier main:

   ```bash
   npm i express
   ```

10. Ouvrir le dossier routes:

    ```bash
    cd app_web_brodeur_app/serveur/routes
    ```

11. Installer les packages express pour le dossier routes:

    ```bash
    npm i express
    ```

12. Lancer l'application react:

    ```bash
    npm i express : main et routes
    ```

13. Lancer docker:

    ```bash
    docker run --name postgres -e POSTGRES_PASSWORD=oracle -p 5000:5432 -d postgres

    docker exec -it postgres psql -U postgres

     Script créer tables

    \dt : voir les tables


    ```

14. Lancer le projet :
    ```bash
    npm start
    ```

## Utilisation

Expliquez comment utiliser le projet une fois qu'il est installé. Si nécessaire, fournissez des exemples de commandes, d'options ou de configurations.

Exemple d'utilisation basique :

```bash
node index.js

```

## Auteurs

L'équipe de développement Brodeur Apps est composé de trois étudiant du collège de bois-de-boulogne.
Arnaud Simard Desmeules, Rubeth Rokonuzzaman, Cedryk Leblanc.
