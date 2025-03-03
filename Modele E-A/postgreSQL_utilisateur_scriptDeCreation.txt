-- Conversion pour PostgreSQL

CREATE TABLE assignation (
    travail_id_travail INTEGER NOT NULL,
    id_assignation SERIAL PRIMARY KEY,
    equipe_id_equipe INTEGER NOT NULL
);

CREATE TABLE classe (
    id_classe SERIAL PRIMARY KEY,
    code_cours VARCHAR(200),
    description TEXT,
    session VARCHAR(20),
    groupe INTEGER,
    professeur_id_professeur INTEGER NOT NULL,
    cours_id_cours INTEGER NOT NULL,
    etat_classe INTEGER
);

CREATE TABLE cours (
    id_cours SERIAL PRIMARY KEY,
    code_cours VARCHAR(200),
    description_cours TEXT,
    etat_cours INTEGER,
    session_id_session INTEGER NOT NULL
);

CREATE TABLE critere (
    instrument_id_instrument INTEGER NOT NULL,
    id_critere SERIAL PRIMARY KEY,
    code_critere VARCHAR(200),
    description TEXT,
    valeur INTEGER,
    etat_critere INTEGER
);

CREATE TABLE equipe (
    id_equipe SERIAL PRIMARY KEY,
    code_equipe VARCHAR(200),
    nom VARCHAR(200),
    classe_id_classe INTEGER NOT NULL,
    etat_equipe INTEGER
);

CREATE TABLE etudiant (
    equipe_id_equipe INTEGER,
    id_etudiant SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200),
    etat_etudiant INTEGER,
    utilisateur_id_user INTEGER NOT NULL
);

CREATE TABLE professeur (
    id_professeur SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200) NOT NULL,
    etat_professeur INTEGER,
    utilisateur_id_user INTEGER NOT NULL
);

CREATE TABLE utilisateur (
    id_user SERIAL PRIMARY KEY,
    nom_user VARCHAR(200) NOT NULL,
    mot_de_passe VARCHAR(200) NOT NULL,
    email VARCHAR(200) NOT NULL,
    type_utilisateur CHAR(1),
    id_professeur INTEGER NOT NULL,
    id_etudiant INTEGER NOT NULL,
    etat_utilisateur INTEGER
);

ALTER TABLE assignation ADD CONSTRAINT assignation_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe);
ALTER TABLE assignation ADD CONSTRAINT assignation_travail_fk FOREIGN KEY (travail_id_travail) REFERENCES travail (id_travail);

ALTER TABLE classe ADD CONSTRAINT classe_cours_fk FOREIGN KEY (cours_id_cours) REFERENCES cours (id_cours);
ALTER TABLE classe ADD CONSTRAINT classe_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur (id_professeur);

ALTER TABLE cours ADD CONSTRAINT cours_session_fk FOREIGN KEY (session_id_session) REFERENCES "Session" (id_session);

ALTER TABLE critere ADD CONSTRAINT critere_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument (id_instrument);

ALTER TABLE equipe ADD CONSTRAINT equipe_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe (id_classe);

ALTER TABLE etudiant ADD CONSTRAINT etudiant_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe);
ALTER TABLE etudiant ADD CONSTRAINT etudiant_utilisateur_fk FOREIGN KEY (utilisateur_id_user) REFERENCES utilisateur (id_user);

ALTER TABLE professeur ADD CONSTRAINT professeur_utilisateur_fk FOREIGN KEY (utilisateur_id_user) REFERENCES utilisateur (id_user);

ALTER TABLE utilisateur ADD CONSTRAINT utilisateur_professeur_fk FOREIGN KEY (id_professeur) REFERENCES professeur (id_professeur);
ALTER TABLE utilisateur ADD CONSTRAINT utilisateur_etudiant_fk FOREIGN KEY (id_etudiant) REFERENCES etudiant (id_etudiant);
