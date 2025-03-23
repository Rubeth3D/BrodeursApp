# Evaluation par les pairs

Projet fait par l'équipe de développement Brodeur Apps

## Table des matières

1. [Description](#description)
2. [Installation](#installation)
3. [Auteurs](#auteurs)

## Description

Projet visant à créer un logiciel pour aider les professeurs. Le logiciel permet de créer des activitées pour évaluer ses coéquipier après un projet en classe.

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

3. Installer les dépendances pour l'application react:

   ```bash
   npm i
   ```

4. Lancer l'application react:

   ```bash
   npm run dev
   ```

5. Ouvrir un deuxième cmd et ouvrir le dossier:

   ```bash
   cd app_web_brodeur_app/serveur/routes
   ```

6. Installer les packages express pour le dossier routes:

   ```bash
   npm i express
   ```

7. Ouvrir le dossier main:

    ```bash
    cd app_web_brodeur_app/serveur/main
    ```

8. Installer les packages express pour le dossier main:

    ```bash
    npm i express
    ```

9. Lancer le serveur express: 

    ```bash
    node serveur.js
    ``` 

10. Installer l'image de postgres sur docker :
    ```bash
    docker pull postgres
    ```
    

11. Installer la base de données dans un terminal:

    ```bash
    docker run --name postgres -e POSTGRES_PASSWORD=oracle -p 5000:5432 -d postgres

    docker exec -it postgres psql -U postgres

    ```

12. Création de la base de données :

    ```bash
      Ouvrir le dossier BrodeursApp\Modele E-A.

      Copier et coller le fichier 'postgreSQL_utilisateur_scriptDeCreation'
    ```

13. Remplir la base de données :

    ```bash

      Copier et coller le fichier 'postgreSQL_Remplir'
    ```

## Auteurs

L'équipe de développement Brodeur Apps est composé de trois étudiant du collège de bois-de-boulogne.
Arnaud Simard Desmeules, Rubeth Rokonuzzaman, Cedryk Leblanc.
