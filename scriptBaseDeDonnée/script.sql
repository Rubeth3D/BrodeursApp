-- Conversion du script Oracle vers PostgreSQL

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
    etat_classe CHAR(1)
);

CREATE TABLE cours (
    id_cours SERIAL PRIMARY KEY,
    code_cours VARCHAR(200),
    description_cours TEXT,
    etat_cours CHAR(1),
    session_id_session INTEGER NOT NULL
);

CREATE TABLE critere (
    instrument_id_instrument INTEGER NOT NULL,
    id_critere SERIAL PRIMARY KEY,
    code_critere VARCHAR(200),
    description TEXT,
    valeur INTEGER,
    etat_critere CHAR(1)
);

CREATE TABLE equipe (
    id_equipe SERIAL PRIMARY KEY,
    code_equipe VARCHAR(200),
    nom VARCHAR(2000),
    classe_id_classe INTEGER NOT NULL,
    etat_equipe CHAR(1)
);

CREATE TABLE etudiant (
    equipe_id_equipe INTEGER,
    id_etudiant SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200),
    etat_etudiant CHAR(1)
);

CREATE TABLE etudiant_classe (
    etudiant_id_etudiant INTEGER NOT NULL,
    classe_id_classe INTEGER NOT NULL,
    PRIMARY KEY (etudiant_id_etudiant, classe_id_classe)
);

CREATE TABLE evaluation (
    travail_id_travail INTEGER NOT NULL,
    id_evaluation SERIAL PRIMARY KEY,
    etudiant_id_etudiant INTEGER NOT NULL,
    etudiant_id_etudiant2 INTEGER NOT NULL,
    date_evaluation DATE,
    instrument_id_instrument INTEGER NOT NULL,
    equipe_id_equipe INTEGER NOT NULL,
    code_evaluation VARCHAR(200),
    description TEXT,
    classe_id_classe INTEGER NOT NULL,
    evaluation_terminee CHAR(1),
    etat_evaluation CHAR(1)
);

CREATE TABLE instrument (
    professeur_id_professeur INTEGER NOT NULL,
    id_instrument SERIAL PRIMARY KEY,
    code_instrument VARCHAR(200),
    nom TEXT NOT NULL,
    sur_denominateur INTEGER,
    etat_instrument CHAR(1)
);

CREATE TABLE niveau_performance (
    reponse_id_reponse INTEGER NOT NULL,
    critere_id_critere INTEGER NOT NULL,
    id_niveau SERIAL PRIMARY KEY,
    code_niveau VARCHAR(200),
    description TEXT,
    niveau INTEGER,
    afficher_note CHAR(1) NOT NULL,
    etat_niveauperformance CHAR(1)
);

CREATE TABLE professeur (
    id_professeur SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200) NOT NULL,
    etat_professeur CHAR(1)
);

CREATE TABLE reponse (
    evaluation_id_evaluation INTEGER NOT NULL,
    id_reponse SERIAL PRIMARY KEY,
    note INTEGER,
    commentaire TEXT,
    niveau_performance_id_niveau INTEGER NOT NULL,
    etat_reponse CHAR(1)
);

CREATE TABLE session (
    id_session SERIAL PRIMARY KEY,
    code_session VARCHAR(200),
    date_session DATE,
    etat_session CHAR(1)
);

CREATE TABLE travail (
    id_travail SERIAL PRIMARY KEY,
    code_travail VARCHAR(200),
    nom_travail VARCHAR(200),
    instrument_id_instrument INTEGER,
    date_cloture DATE,
    date_travail DATE,
    classe_id_classe INTEGER NOT NULL,
    etat_travail CHAR(1),
    CONSTRAINT travail_instrument_chk CHECK (instrument_id_instrument IS NULL AND date_cloture IS NULL)
);

-- Création des clés étrangères
ALTER TABLE assignation ADD CONSTRAINT assignation_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe);
ALTER TABLE assignation ADD CONSTRAINT assignation_travail_fk FOREIGN KEY (travail_id_travail) REFERENCES travail (id_travail);
ALTER TABLE classe ADD CONSTRAINT classe_cours_fk FOREIGN KEY (cours_id_cours) REFERENCES cours (id_cours);
ALTER TABLE classe ADD CONSTRAINT classe_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur (id_professeur);
ALTER TABLE cours ADD CONSTRAINT cours_session_fk FOREIGN KEY (session_id_session) REFERENCES session (id_session);
ALTER TABLE critere ADD CONSTRAINT critere_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument (id_instrument);
ALTER TABLE equipe ADD CONSTRAINT equipe_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe (id_classe);
ALTER TABLE etudiant_classe ADD CONSTRAINT etudiant_classe_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe (id_classe);
ALTER TABLE etudiant_classe ADD CONSTRAINT etudiant_classe_etudiant_fk FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant (id_etudiant);
ALTER TABLE etudiant ADD CONSTRAINT etudiant_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe);
ALTER TABLE evaluation ADD CONSTRAINT evaluation_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe (id_classe);
ALTER TABLE evaluation ADD CONSTRAINT evaluation_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe);
ALTER TABLE evaluation ADD CONSTRAINT evaluation_etudiant_fk FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant (id_etudiant);
ALTER TABLE evaluation ADD CONSTRAINT evaluation_etudiant_fkv2 FOREIGN KEY (etudiant_id_etudiant2) REFERENCES etudiant (id_etudiant);
ALTER TABLE evaluation ADD CONSTRAINT evaluation_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument (id_instrument);
ALTER TABLE evaluation ADD CONSTRAINT evaluation_travail_fk FOREIGN KEY (travail_id_travail) REFERENCES travail (id_travail);
ALTER TABLE instrument ADD CONSTRAINT instrument_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur (id_professeur);
ALTER TABLE niveau_performance ADD CONSTRAINT niveau_performance_critere_fk FOREIGN KEY (critere_id_critere) REFERENCES critere (id_critere);
ALTER TABLE niveau_performance ADD CONSTRAINT niveau_performance_reponse_fk FOREIGN KEY (reponse_id_reponse) REFERENCES reponse (id_reponse);
ALTER TABLE reponse ADD CONSTRAINT reponse_evaluation_fk FOREIGN KEY (evaluation_id_evaluation) REFERENCES evaluation (id_evaluation);
ALTER TABLE reponse ADD CONSTRAINT reponse_niveau_performance_fk FOREIGN KEY (niveau_performance_id_niveau) REFERENCES niveau_performance (id_niveau);
ALTER TABLE travail ADD CONSTRAINT travail_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe (id_classe);
ALTER TABLE travail ADD CONSTRAINT travail_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument (id_instrument);
