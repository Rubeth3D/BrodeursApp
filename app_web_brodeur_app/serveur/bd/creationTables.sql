-- Fait Par Chatgpt --

-- Création de la table session
CREATE TABLE session (
    id_session   BIGSERIAL PRIMARY KEY,
    code_session VARCHAR(200),
    date_session DATE,
    etat_session VARCHAR(1)
);

-- Création de la table professeur
CREATE TABLE professeur (
    id_professeur       BIGSERIAL PRIMARY KEY,
    nom_complet         VARCHAR(200) NOT NULL,
    etat_professeur     VARCHAR(1),
    utilisateur_id_user INTEGER NOT NULL
);

-- Création de la table utilisateur
CREATE TABLE utilisateur (
    id_user          BIGSERIAL PRIMARY KEY,
    nom_user         VARCHAR(200) NOT NULL,
    mot_de_passe     VARCHAR(200) NOT NULL,
    email            VARCHAR(200) NOT NULL,
    type_utilisateur CHAR(1) NOT NULL,
    id_professeur    INTEGER ,
    id_etudiant      INTEGER ,
    etat_utilisateur CHAR(1) NOT NULL
);

-- Création de la table cours
CREATE TABLE cours (
    id_cours           BIGSERIAL PRIMARY KEY,
    code_cours         VARCHAR(200),
    description_cours  VARCHAR(2000),
    etat_cours         VARCHAR(1),
    session_id_session INTEGER
);

-- Création de la table classe
CREATE TABLE classe (
    id_classe                BIGSERIAL PRIMARY KEY,
    code_cours               VARCHAR(200),
    description              VARCHAR(2000),
    groupe                   INTEGER,
    professeur_id_professeur INTEGER NOT NULL,
    cours_id_cours           INTEGER NOT NULL,
    etat_classe              VARCHAR(1)
);

-- Création de la table instrument
CREATE TABLE instrument (
    professeur_id_professeur INTEGER NOT NULL,
    id_instrument            BIGSERIAL PRIMARY KEY,
    code_instrument          VARCHAR(200),
    nom                      VARCHAR(2000) NOT NULL,
    sur_denominateur         INTEGER,
    etat_instrument          VARCHAR(1)
);

-- Création de la table critere
CREATE TABLE critere (
    instrument_id_instrument INTEGER NOT NULL,
    id_critere               BIGSERIAL PRIMARY KEY,
    code_critere             VARCHAR(200),
    description              VARCHAR(2000),
    valeur                   INTEGER,
    etat_critere             VARCHAR(1)
);

-- Création de la table etudiant
CREATE TABLE etudiant (
    equipe_id_equipe    INTEGER,
    id_etudiant         BIGSERIAL PRIMARY KEY,
    nom_complet         VARCHAR(200),
    etat_etudiant       VARCHAR(1),
    utilisateur_id_user INTEGER NOT NULL
);

-- Création de la table etudiant_classe
CREATE TABLE etudiant_classe (
    etudiant_id_etudiant INTEGER NOT NULL,
    classe_id_classe     INTEGER NOT NULL,
    PRIMARY KEY (etudiant_id_etudiant, classe_id_classe)
);

-- Création de la table equipe
CREATE TABLE equipe (
    id_equipe        BIGSERIAL PRIMARY KEY,
    code_equipe      VARCHAR(200),
    nom              VARCHAR(200),
    classe_id_classe INTEGER NOT NULL,
    etat_equipe      VARCHAR(1)
);

-- Création de la table assignation
CREATE TABLE assignation (
    travail_id_travail INTEGER NOT NULL,
    id_assignation     BIGSERIAL PRIMARY KEY,
    equipe_id_equipe   INTEGER NOT NULL
);

-- Création de la table evaluation
CREATE TABLE evaluation (
    travail_id_travail       INTEGER NOT NULL,
    id_evaluation            BIGSERIAL PRIMARY KEY,
    etudiant_id_etudiant     INTEGER NOT NULL,
    date_evaluation          DATE,
    instrument_id_instrument INTEGER NOT NULL,
    equipe_id_equipe         INTEGER NOT NULL,
    code_evaluation          VARCHAR(200),
    description              VARCHAR(2000),
    classe_id_classe         INTEGER NOT NULL,
    evaluation_terminee      INTEGER,
    etat_evaluation          VARCHAR(1)
);

-- Création de la table travail
CREATE TABLE travail (
    id_travail               BIGSERIAL PRIMARY KEY,
    code_travail             VARCHAR(200),
    nom_travail              VARCHAR(200),
    instrument_id_instrument INTEGER,
    date_cloture             DATE,
    date_travail             DATE,
    classe_id_classe         INTEGER NOT NULL,
    etat_travail             VARCHAR(1)
);

-- Création de la table reponse
CREATE TABLE reponse (
    evaluation_id_evaluation     INTEGER NOT NULL,
    id_reponse                   BIGSERIAL PRIMARY KEY,
    note                         INTEGER,
    commentaire                  VARCHAR(2000),
    niveau_performance_id_niveau INTEGER NOT NULL,
    etat_reponse                 VARCHAR(1)
);

-- Ajout des clés étrangères et des contraintes

-- Clé étrangère pour cours
ALTER TABLE cours ADD CONSTRAINT cours_session_fk FOREIGN KEY (session_id_session)
    REFERENCES session (id_session);

-- Clé étrangère pour classe
ALTER TABLE classe ADD CONSTRAINT classe_cours_fk FOREIGN KEY (cours_id_cours)
    REFERENCES cours (id_cours);

ALTER TABLE classe ADD CONSTRAINT classe_professeur_fk FOREIGN KEY (professeur_id_professeur)
    REFERENCES professeur (id_professeur);

-- Clé étrangère pour instrument
ALTER TABLE instrument ADD CONSTRAINT instrument_professeur_fk FOREIGN KEY (professeur_id_professeur)
    REFERENCES professeur (id_professeur);

-- Clé étrangère pour critere
ALTER TABLE critere ADD CONSTRAINT critere_instrument_fk FOREIGN KEY (instrument_id_instrument)
    REFERENCES instrument (id_instrument);

-- Clé étrangère pour etudiant
ALTER TABLE etudiant ADD CONSTRAINT etudiant_equipe_fk FOREIGN KEY (equipe_id_equipe)
    REFERENCES equipe (id_equipe);

ALTER TABLE etudiant ADD CONSTRAINT etudiant_utilisateur_fk FOREIGN KEY (utilisateur_id_user)
    REFERENCES utilisateur (id_user);

-- Clé étrangère pour etudiant_classe
ALTER TABLE etudiant_classe ADD CONSTRAINT etudiant_classe_classe_fk FOREIGN KEY (classe_id_classe)
    REFERENCES classe (id_classe);

ALTER TABLE etudiant_classe ADD CONSTRAINT etudiant_classe_etudiant_fk FOREIGN KEY (etudiant_id_etudiant)
    REFERENCES etudiant (id_etudiant);

-- Clé étrangère pour equipe
ALTER TABLE equipe ADD CONSTRAINT equipe_classe_fk FOREIGN KEY (classe_id_classe)
    REFERENCES classe (id_classe);

-- Clé étrangère pour assignation
ALTER TABLE assignation ADD CONSTRAINT assignation_equipe_fk FOREIGN KEY (equipe_id_equipe)
    REFERENCES equipe (id_equipe);

ALTER TABLE assignation ADD CONSTRAINT assignation_travail_fk FOREIGN KEY (travail_id_travail)
    REFERENCES travail (id_travail);

-- Clé étrangère pour evaluation
ALTER TABLE evaluation ADD CONSTRAINT evaluation_classe_fk FOREIGN KEY (classe_id_classe)
    REFERENCES classe (id_classe);

ALTER TABLE evaluation ADD CONSTRAINT evaluation_equipe_fk FOREIGN KEY (equipe_id_equipe)
    REFERENCES equipe (id_equipe);

ALTER TABLE evaluation ADD CONSTRAINT evaluation_etudiant_fk FOREIGN KEY (etudiant_id_etudiant)
    REFERENCES etudiant (id_etudiant);

ALTER TABLE evaluation ADD CONSTRAINT evaluation_instrument_fk FOREIGN KEY (instrument_id_instrument)
    REFERENCES instrument (id_instrument);

ALTER TABLE evaluation ADD CONSTRAINT evaluation_travail_fk FOREIGN KEY (travail_id_travail)
    REFERENCES travail (id_travail);

-- Clé étrangère pour travail
ALTER TABLE travail ADD CONSTRAINT travail_classe_fk FOREIGN KEY (classe_id_classe)
    REFERENCES classe (id_classe);

ALTER TABLE travail ADD CONSTRAINT travail_instrument_fk FOREIGN KEY (instrument_id_instrument)
    REFERENCES instrument (id_instrument);

-- Clé étrangère pour reponse
ALTER TABLE reponse ADD CONSTRAINT reponse_evaluation_fk FOREIGN KEY (evaluation_id_evaluation)
    REFERENCES evaluation (id_evaluation);
