-- Création des tables
CREATE TABLE affectation (
    id_affectation SERIAL PRIMARY KEY
);

CREATE TABLE classe (
    id_classe SERIAL PRIMARY KEY,
    code_cours VARCHAR(200),
    description VARCHAR(2000),
    session VARCHAR(20),
    groupe INT,
    professeur_id_professeur INT NOT NULL,
    etat_classe VARCHAR(20),
    cours_id_cours INT NOT NULL,
    cours_session_id_session INT NOT NULL
);

CREATE TABLE cours (
    id_cours SERIAL,
    code_cours INT,
    description_cours VARCHAR(4000),
    etat_cours VARCHAR(20),
    session_id_session INT NOT NULL,
    PRIMARY KEY (id_cours, session_id_session)
);

CREATE TABLE instrument (
    professeur_id_professeur INT NOT NULL,
    id_instrument SERIAL PRIMARY KEY,
    code_instrument VARCHAR(200),
    nom VARCHAR(2000) NOT NULL,
    sur_denominateur INT
);

CREATE TABLE travail (
    id_travail SERIAL PRIMARY KEY,
    code_travail VARCHAR(200),
    nom_travail VARCHAR(200),
    instrument_id_instrument INT NOT NULL,
    date_cloture DATE,
    date_travail DATE,
    classe_id_classe INT NOT NULL,
    id_cours INT NOT NULL,
    id_session INT NOT NULL,
    etat_travail VARCHAR(20),
    FOREIGN KEY (instrument_id_instrument) REFERENCES instrument(id_instrument),
    FOREIGN KEY (classe_id_classe) REFERENCES classe(id_classe)
);

CREATE TABLE equipe (
    id_equipe SERIAL PRIMARY KEY,
    code_equipe VARCHAR(200),
    nom VARCHAR(200),
    classe_id_classe INT NOT NULL,
    etat_equipe VARCHAR(20),
    id_cours INT NOT NULL,
    id_session INT NOT NULL
);

CREATE TABLE etudiant (
    equipe_id_equipe INT,
    id_etudiant SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200),
    utilisateur_id_utilisateur INT UNIQUE,
    professeur_id_professeur INT,
    etat_etudiant VARCHAR(20)
);

CREATE TABLE etudiant_classe (
    etudiant_id_etudiant INT NOT NULL,
    classe_id_classe INT NOT NULL,
    PRIMARY KEY (etudiant_id_etudiant, classe_id_classe)
);

CREATE TABLE evaluation (
    travail_id_travail INT NOT NULL,
    id_evaluation SERIAL PRIMARY KEY,
    etudiant_id_etudiant INT NOT NULL,
    etudiant_id_etudiant2 INT NOT NULL,
    date_evaluation DATE,
    instrument_id_instrument INT NOT NULL,
    equipe_id_equipe INT NOT NULL,
    code_evaluation VARCHAR(200),
    description VARCHAR(2000),
    classe_id_classe INT NOT NULL,
    id_cours INT NOT NULL,
    id_session INT NOT NULL,
    etat_evaluation VARCHAR(20)
);

CREATE TABLE critere (
    instrument_id_instrument INT NOT NULL,
    id_critere SERIAL PRIMARY KEY,
    code_critere VARCHAR(200),
    description VARCHAR(2000),
    poids INT
);

CREATE TABLE assignation (
    travail_id_travail INT NOT NULL,
    id_assignation SERIAL,
    equipe_id_equipe INT NOT NULL,
    PRIMARY KEY (travail_id_travail, id_assignation),
    FOREIGN KEY (travail_id_travail) REFERENCES travail (id_travail),
    FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe)
);

CREATE TABLE professeur (
    id_professeur SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200) NOT NULL,
    utilisateur_id_utilisateur INT UNIQUE,
    etat_professeur VARCHAR(20)
);

CREATE TABLE utilisateur (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    prenom VARCHAR(200),
    nom_utilisateur VARCHAR(200),
    courriel VARCHAR(250),
    mot_passe VARCHAR(2000),
    etat_utilisateur VARCHAR(20) CHECK (etat_utilisateur IN ('Actif', 'Inactif')), --Seulement Actif ou Inactif
    type_utilisateur CHAR(1) CHECK (type_utilisateur IN ('E', 'P', 'A')), --Seulement E, P ou A
    professeur_id_professeur INT UNIQUE,
    etudiant_id_etudiant INT UNIQUE,
    CONSTRAINT check_utilisateur CHECK (
        (etudiant_id_etudiant IS NOT NULL AND professeur_id_professeur IS NULL) OR
        (professeur_id_professeur IS NOT NULL AND etudiant_id_etudiant IS NULL) OR
        (etudiant_id_etudiant IS NULL AND professeur_id_professeur IS NULL)
    )
);

-- Création des clés étrangères
ALTER TABLE classe ADD FOREIGN KEY (cours_id_cours, cours_session_id_session) REFERENCES cours (id_cours, session_id_session);
ALTER TABLE classe ADD FOREIGN KEY (professeur_id_professeur) REFERENCES professeur (id_professeur);

ALTER TABLE etudiant ADD FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe);
ALTER TABLE etudiant ADD FOREIGN KEY (professeur_id_professeur) REFERENCES professeur (id_professeur);
ALTER TABLE etudiant ADD FOREIGN KEY (utilisateur_id_utilisateur) REFERENCES utilisateur (id_utilisateur);

ALTER TABLE evaluation ADD FOREIGN KEY (classe_id_classe) REFERENCES classe (id_classe);
ALTER TABLE evaluation ADD FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe);
ALTER TABLE evaluation ADD FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant (id_etudiant);
ALTER TABLE evaluation ADD FOREIGN KEY (etudiant_id_etudiant2) REFERENCES etudiant (id_etudiant);
ALTER TABLE evaluation ADD FOREIGN KEY (instrument_id_instrument) REFERENCES instrument (id_instrument);
ALTER TABLE evaluation ADD FOREIGN KEY (travail_id_travail) REFERENCES travail (id_travail);

ALTER TABLE professeur ADD FOREIGN KEY (utilisateur_id_utilisateur) REFERENCES utilisateur (id_utilisateur);

ALTER TABLE utilisateur ADD FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant (id_etudiant);
ALTER TABLE utilisateur ADD FOREIGN KEY (professeur_id_professeur) REFERENCES professeur (id_professeur);
