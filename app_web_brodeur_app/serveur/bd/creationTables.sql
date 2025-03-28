-- Converted to PostgreSQL
-- predefined type, no DDL - MDSYS.SDO_GEOMETRY
-- predefined type, no DDL - XMLTYPE
CREATE TABLE affectation (id_affectation SERIAL PRIMARY KEY);
CREATE TABLE assignation (
    travail_id_travail INTEGER NOT NULL,
    id_assignation INTEGER NOT NULL,
    equipe_id_equipe INTEGER NOT NULL,
    PRIMARY KEY (travail_id_travail, id_assignation)
);
CREATE TABLE classe (
    id_classe SERIAL PRIMARY KEY,
    code_cours VARCHAR(200),
    description VARCHAR(2000),
    "session" VARCHAR(20),
    groupe INTEGER,
    professeur_id_professeur INTEGER NOT NULL,
    etat_classe VARCHAR(20),
    cours_id_cours INTEGER NOT NULL,
    cours_session_id_session INTEGER NOT NULL
);
CREATE TABLE cours (
    id_cours INTEGER NOT NULL,
    code_cours INTEGER,
    description_cours VARCHAR(4000),
    etat_cours VARCHAR(20),
    session_id_session INTEGER NOT NULL,
    PRIMARY KEY (id_cours, session_id_session)
);
CREATE TABLE critere (
    instrument_id_instrument INTEGER NOT NULL,
    id_critere SERIAL PRIMARY KEY,
    code_critere VARCHAR(200),
    description VARCHAR(2000),
    poids NUMERIC
);
CREATE TABLE equipe (
    id_equipe SERIAL PRIMARY KEY,
    code_equipe VARCHAR(200),
    nom VARCHAR(2000),
    classe_id_classe INTEGER NOT NULL,
    etat_equipe VARCHAR(20),
    id_cours INTEGER NOT NULL,
    id_session INTEGER NOT NULL,
    UNIQUE (classe_id_classe)
);
CREATE TABLE etudiant (
    id_etudiant SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200),
    utilisateur_id_utilisateur INTEGER,
    professeur_id_professeur INTEGER,
    etat_etudiant VARCHAR(20),
    UNIQUE (utilisateur_id_utilisateur)
);
CREATE TABLE etudiant_classe (
    etudiant_id_etudiant INTEGER NOT NULL,
    classe_id_classe INTEGER NOT NULL,
    PRIMARY KEY (etudiant_id_etudiant, classe_id_classe)
);
CREATE TABLE etudiant_equipe (
    equipe_id_equipe INTEGER NOT NULL,
    etudiant_id_etudiant INTEGER NOT NULL,
    PRIMARY KEY (equipe_id_equipe, etudiant_id_etudiant)
);
CREATE TABLE evaluation (
    travail_id_travail INTEGER NOT NULL,
    id_evaluation SERIAL PRIMARY KEY,
    etudiant_id_etudiant INTEGER NOT NULL,
    etudiant_id_etudiant1 INTEGER NOT NULL,
    date_evaluation DATE,
    instrument_id_instrument INTEGER NOT NULL,
    equipe_id_equipe INTEGER NOT NULL,
    code_evaluation VARCHAR(200),
    description VARCHAR(2000),
    classe_id_classe INTEGER NOT NULL,
    id_cours INTEGER NOT NULL,
    id_session INTEGER NOT NULL,
    etat_evaluation VARCHAR(20),
    UNIQUE (etudiant_id_etudiant1)
);
CREATE TABLE instrument (
    professeur_id_professeur INTEGER NOT NULL,
    id_instrument SERIAL PRIMARY KEY,
    code_instrument VARCHAR(200),
    nom VARCHAR(2000) NOT NULL,
    sur_denominateur NUMERIC
);
CREATE TABLE niveau_performance (
    reponse_id_reponse INTEGER NOT NULL,
    critere_id_critere INTEGER NOT NULL,
    id_niveau SERIAL PRIMARY KEY,
    code_niveau VARCHAR(200),
    description VARCHAR(2000),
    niveau NUMERIC,
    afficher_note CHAR(1) NOT NULL
);
CREATE TABLE professeur (
    id_professeur SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200) NOT NULL,
    utilisateur_id_utilisateur INTEGER,
    etat_professeur VARCHAR(20),
    UNIQUE (utilisateur_id_utilisateur)
);
CREATE TABLE reponse (
    evaluation_id_evaluation INTEGER NOT NULL,
    id_reponse SERIAL PRIMARY KEY,
    note NUMERIC,
    commentaire VARCHAR(2000)
);
CREATE TABLE "Session" (
    id_session SERIAL PRIMARY KEY,
    code_session VARCHAR(200),
    date_session DATE,
    etat_session VARCHAR(20)
);
CREATE TABLE session_utilisateur (
    id_session_utilisateur SERIAL PRIMARY KEY,
    sel VARCHAR(2000) NOT NULL,
    token_init VARCHAR(4000) NOT NULL,
    date_connexion DATE,
    date_jeton_expiration DATE,
    tentatives_echoues INTEGER,
    date_derniere_tentative DATE,
    ip_derniere_connexion INTEGER,
    type_utilisateur CHAR(1) NOT NULL,
    utilisateur_id_utilisateur INTEGER NOT NULL,
    etat_session_utilisateur VARCHAR(20)
);
CREATE TABLE travail (
    id_travail SERIAL PRIMARY KEY,
    code_travail VARCHAR(200),
    nom_travail VARCHAR(200),
    instrument_id_instrument INTEGER NOT NULL,
    date_cloture DATE,
    date_travail DATE,
    classe_id_classe INTEGER NOT NULL,
    id_cours INTEGER NOT NULL,
    id_session INTEGER NOT NULL,
    etat_travail VARCHAR(20)
);
CREATE TABLE utilisateur (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    prenom VARCHAR(200),
    nom_utilisateur VARCHAR(200),
    courriel VARCHAR(250),
    mot_passe VARCHAR(2000),
    etat_utilisateur VARCHAR(20),
    type_utilisateur CHAR(1) NOT NULL,
    professeur_id_professeur INTEGER,
    etudiant_id_etudiant INTEGER,
    date_creation DATE,
    UNIQUE (etudiant_id_etudiant),
    UNIQUE (professeur_id_professeur)
);
COMMENT ON COLUMN utilisateur.etat_utilisateur IS 'Actif/Inactif';
COMMENT ON COLUMN utilisateur.type_utilisateur IS 'E étudiant / P professeur / A admin';
ALTER TABLE assignation
ADD CONSTRAINT assignation_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe);
ALTER TABLE assignation
ADD CONSTRAINT assignation_travail_fk FOREIGN KEY (travail_id_travail) REFERENCES travail (id_travail);
ALTER TABLE classe
ADD CONSTRAINT classe_cours_fk FOREIGN KEY (cours_id_cours, cours_session_id_session) REFERENCES cours (id_cours, session_id_session);
ALTER TABLE classe
ADD CONSTRAINT classe_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur (id_professeur);
ALTER TABLE cours
ADD CONSTRAINT cours_session_fk FOREIGN KEY (session_id_session) REFERENCES "Session" (id_session);
ALTER TABLE critere
ADD CONSTRAINT critere_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument (id_instrument);
ALTER TABLE equipe
ADD CONSTRAINT equipe_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe (id_classe);
ALTER TABLE etudiant_classe
ADD CONSTRAINT etudiant_classe_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe (id_classe);
ALTER TABLE etudiant_classe
ADD CONSTRAINT etudiant_classe_etudiant_fk FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant (id_etudiant);
ALTER TABLE etudiant_equipe
ADD CONSTRAINT etudiant_equipe_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe);
ALTER TABLE etudiant_equipe
ADD CONSTRAINT etudiant_equipe_etudiant_fk FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant (id_etudiant);
ALTER TABLE etudiant
ADD CONSTRAINT etudiant_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur (id_professeur);
ALTER TABLE evaluation
ADD CONSTRAINT evaluation_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe (id_classe);
ALTER TABLE evaluation
ADD CONSTRAINT evaluation_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe (id_equipe);
ALTER TABLE evaluation
ADD CONSTRAINT evaluation_etudiant_fk FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant (id_etudiant);
ALTER TABLE evaluation
ADD CONSTRAINT evaluation_etudiant_fkv1 FOREIGN KEY (etudiant_id_etudiant1) REFERENCES etudiant (id_etudiant);
ALTER TABLE evaluation
ADD CONSTRAINT evaluation_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument (id_instrument);
ALTER TABLE evaluation
ADD CONSTRAINT evaluation_travail_fk FOREIGN KEY (travail_id_travail) REFERENCES travail (id_travail);
ALTER TABLE instrument
ADD CONSTRAINT instrument_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur (id_professeur);
ALTER TABLE niveau_performance
ADD CONSTRAINT niveau_performance_critere_fk FOREIGN KEY (critere_id_critere) REFERENCES critere (id_critere);
ALTER TABLE niveau_performance
ADD CONSTRAINT niveau_performance_reponse_fk FOREIGN KEY (reponse_id_reponse) REFERENCES reponse (id_reponse);
ALTER TABLE reponse
ADD CONSTRAINT reponse_evaluation_fk FOREIGN KEY (evaluation_id_evaluation) REFERENCES evaluation (id_evaluation);
ALTER TABLE session_utilisateur
ADD CONSTRAINT session_utilisateur_fk FOREIGN KEY (utilisateur_id_utilisateur) REFERENCES utilisateur (id_utilisateur);
ALTER TABLE travail
ADD CONSTRAINT travail_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe (id_classe);
ALTER TABLE travail
ADD CONSTRAINT travail_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument (id_instrument);
CREATE SEQUENCE utilisateur_id_utilisateur_seq START WITH 1;
CREATE OR REPLACE FUNCTION utilisateur_id_utilisateur_trg() RETURNS TRIGGER AS $$ BEGIN IF NEW.id_utilisateur IS NULL THEN NEW.id_utilisateur := nextval('utilisateur_id_utilisateur_seq');
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
RETURNS TRIGGER AS $$ BEGIN IF NEW.id_utilisateur IS NULL THEN NEW.id_utilisateur := nextval('utilisateur_id_utilisateur_seq');
END IF;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
CREATE TRIGGER utilisateur_id_utilisateur_trg BEFORE
INSERT ON utilisateur FOR EACH ROW EXECUTE FUNCTION utilisateur_id_utilisateur_trg();