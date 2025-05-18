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
- `MongoDB`
- `Docker`
- `PgAdmin 4 //pas obligatoire`

### Étapes d'installation

1.  Clonez le repository :

    ```bash
    git clone https://github.com/Rubeth3D/BrodeursApp.git
    ```

2.  Ouvrir un premier cmd et ouvrir le dossier:

    ```bash
    cd app_web_brodeur_app/client/react-app
    ```

3.  Installer les dépendances pour l'application react:

    ```bash
    npm i
    ```

4.  Lancer l'application react:

    ```bash
    npm run dev
    ```

5.  Ouvrir un deuxième cmd et ouvrir le dossier:

    ```bash
    cd app_web_brodeur_app/serveur/routes
    ```

6.  Installer les packages express pour le dossier routes:

    ```bash
    npm i express
    ```

7.  Ouvrir le dossier main:

    ```bash
    cd app_web_brodeur_app/serveur/main
    ```

8.  Installer les packages express pour le dossier main:

    ```bash
    npm i express
    ```

9.  Lancer le serveur express:

    ```bash
    node serveur.js
    ```

10. Installer l'image de postgres sur docker :

    ```bash
    docker pull postgres
    ```

11. Installer la base de données dans un terminal:

    ```bash
    docker run --name postgresBrodeurApps -e POSTGRES_PASSWORD=oracle -p 5000:5432 -d postgres

    docker exec -it postgresBrodeurApps psql -U postgres
    ```

12. Création de la base de données :

    ```bash
    Ouvrir le dossier BrodeursApp\app_web_brodeur_app\serveur\bd

    Copier et coller le fichier 'creationTables.sql'
    ```

13. Remplir la base de données :

    ```bash
    Ouvrir le dossier BrodeursApp\app_web_brodeur_app\serveur\bd

    Copier et coller le fichier 'Insertion.sql'
    ```

14. Installer l'image de mongodb sur docker:

    ```bash

    docker pull mongo:latest
    ```

15. Installer la base de données dans un terminal

    ```bash

    docker run -d --name mongoBrodeurApps -e MONGO_INITDB_ROOT_USERNAME=mongoadmin -e MONGO_INITDB_ROOT_PASSWORD=mongo -p 2717:27017 mongo:latest
    ```

16. Creer la collection sur docker

    ```bash
    Entrer la commande : docker exec -it mongoBrodeurApps mongosh -u mongoadmin -p mongo

    ```
17. Creation des collections pour la base de données Mongo
    ```bash
    Ouvrez le fichier BrodeursApp\app_web_brodeur_app\serveur\bd\MongoBD

    Copier et coller le fichier 'ScriptMongo.js'
    ```

18. Connexion aux deux bd

````.env
créer le fichier .env dans le dossier serveur et copier coller ces deux URL:
POSTGRES_URL=postgres://postgres:oracle@localhost:5000
MONGO_URL=mongodb://mongoadmin:mongo@localhost:2717
CLIENT_ID=1038961685497-3thcq7c3b0tdhn6epgpgsn9psi1vnlv1.apps.googleusercontent.com
CLIENT_SECRET=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
REDIRECT_URL=https://developers.google.com/oauthplayground
REFRESH_TOKEN=1//04byMDHtlM0OVCgYIARAAGAQSNwF-L9IrCZs45sYpD5OZ2tqtd_IerfNHrMFkTrmG9LHbR4PWGSAwJu-97dORvUTTfDiGcgRugAs 
ACCESS_TOKEN=ya29.a0AW4Xtxi0hNaCyyiJq842aNKEm8ghBOXVv4NdC3laaqucyUAW6iX_F2Zwhn425DxcowGJ024I5WkE0sNJR5vfyRaIjfReFkfSF-q5NkwDIg0VKGQWol1L_SC15DQlrBUIJxJMNKxIuwc7NZlSK17hHqak53PvtupTqFpvadTWaCgYKASkSARYSFQHGX2Mic4d5RAm2KUr_HzqFC1NBKg0175

Connexion
Lancer la commande node : node .\main\serveur.js\ depuis le dossier serveur
````

19. Installation Passeport.js

```bash
Entrez la commande pour l'installation le passport.js: $ npm install passport
````

## Auteurs

L'équipe de développement Brodeur Apps est composé de trois étudiant du collège de bois-de-boulogne.
Arnaud Simard Desmeules, Rubeth Rokonuzzaman, Cedryk Leblanc.

