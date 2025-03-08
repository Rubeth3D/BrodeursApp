-- Création des tables

CREATE TABLE session (
    id_session SERIAL PRIMARY KEY,
    code_session VARCHAR(200),
    date_session DATE,
    etat_session INTEGER
);

CREATE TABLE cours (
    id_cours SERIAL PRIMARY KEY,
    code_cours VARCHAR(200),
    description_cours VARCHAR(2000),
    etat_cours INTEGER,
    session_id_session INTEGER NOT NULL,
    CONSTRAINT cours_session_fk FOREIGN KEY (session_id_session) REFERENCES session(id_session)
);

CREATE TABLE professeur (
    id_professeur SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200) NOT NULL,
    etat_professeur INTEGER,
    utilisateur_id_user INTEGER NOT NULL
);

CREATE TABLE classe (
    id_classe SERIAL PRIMARY KEY,
    code_cours VARCHAR(200),
    description VARCHAR(2000),
    session VARCHAR(20),
    groupe INTEGER,
    professeur_id_professeur INTEGER NOT NULL,
    cours_id_cours INTEGER NOT NULL,
    etat_classe INTEGER,
    CONSTRAINT classe_cours_fk FOREIGN KEY (cours_id_cours) REFERENCES cours(id_cours),
    CONSTRAINT classe_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur(id_professeur)
);

CREATE TABLE equipe (
    id_equipe SERIAL PRIMARY KEY,
    code_equipe VARCHAR(200),
    nom VARCHAR(200),
    classe_id_classe INTEGER NOT NULL,
    etat_equipe INTEGER,
    CONSTRAINT equipe_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe(id_classe)
);

CREATE TABLE etudiant (
    id_etudiant SERIAL PRIMARY KEY,
    equipe_id_equipe INTEGER,
    nom_complet VARCHAR(200),
    etat_etudiant INTEGER,
    utilisateur_id_user INTEGER NOT NULL,
    CONSTRAINT etudiant_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe(id_equipe),
    CONSTRAINT etudiant_utilisateur_fk FOREIGN KEY (utilisateur_id_user) REFERENCES utilisateur(id_user)
);

CREATE TABLE etudiant_classe (
    etudiant_id_etudiant INTEGER NOT NULL,
    classe_id_classe INTEGER NOT NULL,
    PRIMARY KEY (etudiant_id_etudiant, classe_id_classe),
    CONSTRAINT etudiant_classe_etudiant_fk FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant(id_etudiant),
    CONSTRAINT etudiant_classe_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe(id_classe)
);

CREATE TABLE travail (
    id_travail SERIAL PRIMARY KEY,
    code_travail VARCHAR(200),
    nom_travail VARCHAR(200),
    instrument_id_instrument INTEGER,
    date_cloture DATE,
    date_travail DATE,
    classe_id_classe INTEGER NOT NULL,
    etat_travail INTEGER,
    CONSTRAINT travail_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe(id_classe),
    CONSTRAINT travail_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument(id_instrument),
    CONSTRAINT travail_check CHECK (instrument_id_instrument IS NULL AND date_cloture IS NULL)
);

CREATE TABLE assignation (
    travail_id_travail INTEGER NOT NULL,
    id_assignation SERIAL PRIMARY KEY,
    equipe_id_equipe INTEGER NOT NULL,
    CONSTRAINT assignation_travail_fk FOREIGN KEY (travail_id_travail) REFERENCES travail(id_travail),
    CONSTRAINT assignation_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe(id_equipe)
);

CREATE TABLE instrument (
    id_instrument SERIAL PRIMARY KEY,
    professeur_id_professeur INTEGER NOT NULL,
    code_instrument VARCHAR(200),
    nom VARCHAR(2000) NOT NULL,
    sur_denominateur INTEGER,
    etat_instrument INTEGER,
    CONSTRAINT instrument_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur(id_professeur)
);

CREATE TABLE critere (
    id_critere SERIAL PRIMARY KEY,
    instrument_id_instrument INTEGER NOT NULL,
    code_critere VARCHAR(200),
    description VARCHAR(2000),
    valeur INTEGER,
    etat_critere INTEGER,
    CONSTRAINT critere_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument(id_instrument)
);

CREATE TABLE evaluation (
    id_evaluation SERIAL PRIMARY KEY,
    travail_id_travail INTEGER NOT NULL,
    etudiant_id_etudiant INTEGER NOT NULL,
    etudiant_id_etudiant2 INTEGER NOT NULL,
    date_evaluation DATE,
    instrument_id_instrument INTEGER NOT NULL,
    equipe_id_equipe INTEGER NOT NULL,
    code_evaluation VARCHAR(200),
    description VARCHAR(2000),
    classe_id_classe INTEGER NOT NULL,
    evaluation_terminee INTEGER,
    etat_evaluation INTEGER,
    CONSTRAINT evaluation_travail_fk FOREIGN KEY (travail_id_travail) REFERENCES travail(id_travail),
    CONSTRAINT evaluation_etudiant_fk FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant(id_etudiant),
    CONSTRAINT evaluation_etudiant_fkv2 FOREIGN KEY (etudiant_id_etudiant2) REFERENCES etudiant(id_etudiant),
    CONSTRAINT evaluation_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe(id_classe),
    CONSTRAINT evaluation_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe(id_equipe),
    CONSTRAINT evaluation_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument(id_instrument)
);

CREATE TABLE reponse (
    id_reponse SERIAL PRIMARY KEY,
    evaluation_id_evaluation INTEGER NOT NULL,
    note INTEGER,
    commentaire VARCHAR(2000),
    niveau_performance_id_niveau INTEGER NOT NULL,
    etat_reponse INTEGER,
    CONSTRAINT reponse_evaluation_fk FOREIGN KEY (evaluation_id_evaluation) REFERENCES evaluation(id_evaluation),
    CONSTRAINT reponse_niveau_performance_fk FOREIGN KEY (niveau_performance_id_niveau) REFERENCES niveau_performance(id_niveau)
);

CREATE TABLE niveau_performance (
    id_niveau SERIAL PRIMARY KEY,
    reponse_id_reponse INTEGER NOT NULL,
    critere_id_critere INTEGER NOT NULL,
    code_niveau VARCHAR(200),
    description VARCHAR(2000),
    niveau INTEGER,
    afficher_note CHAR(1) NOT NULL,
    etat_niveauperformance INTEGER,
    CONSTRAINT niveau_performance_reponse_fk FOREIGN KEY (reponse_id_reponse) REFERENCES reponse(id_reponse),
    CONSTRAINT niveau_performance_critere_fk FOREIGN KEY (critere_id_critere) REFERENCES critere(id_critere)
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
