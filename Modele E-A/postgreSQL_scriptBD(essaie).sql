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

---pas officiel

-- Table affectation
CREATE TABLE affectation (
    id_affectation SERIAL PRIMARY KEY
);

-- Table assignation
CREATE TABLE assignation (
    travail_id_travail INTEGER NOT NULL,
    id_assignation SERIAL PRIMARY KEY,
    equipe_id_equipe INTEGER NOT NULL,
    CONSTRAINT assignation_pk PRIMARY KEY (travail_id_travail, id_assignation)
);

-- Table classe
CREATE TABLE classe (
    id_classe SERIAL PRIMARY KEY,
    code_cours VARCHAR(200),
    description VARCHAR(2000),
    "session" VARCHAR(20),
    groupe INTEGER,
    professeur_id_professeur INTEGER NOT NULL,
    etat_classe VARCHAR(20),
    cours_id_cours INTEGER NOT NULL,
    cours_session_id_session INTEGER NOT NULL,
    CONSTRAINT classe_cours_fk FOREIGN KEY (cours_id_cours, cours_session_id_session) REFERENCES cours(id_cours, session_id_session),
    CONSTRAINT classe_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur(id_professeur)
);

-- Table cours
CREATE TABLE cours (
    id_cours SERIAL PRIMARY KEY,
    code_cours INTEGER,
    description_cours VARCHAR(4000),
    etat_cours VARCHAR(20),
    session_id_session INTEGER NOT NULL,
    CONSTRAINT cours_session_fk FOREIGN KEY (session_id_session) REFERENCES "Session"(id_session)
);

-- Table critere
CREATE TABLE critere (
    instrument_id_instrument INTEGER NOT NULL,
    id_critere SERIAL PRIMARY KEY,
    code_critere VARCHAR(200),
    description VARCHAR(2000),
    poids INTEGER,
    CONSTRAINT critere_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument(id_instrument)
);

-- Table equipe
CREATE TABLE equipe (
    id_equipe SERIAL PRIMARY KEY,
    code_equipe VARCHAR(200),
    nom VARCHAR(2000),
    classe_id_classe INTEGER NOT NULL,
    etat_equipe VARCHAR(20),
    id_cours INTEGER NOT NULL,
    id_session INTEGER NOT NULL,
    CONSTRAINT equipe_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe(id_classe)
);

-- Table etudiant
CREATE TABLE etudiant (
    id_etudiant SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200),
    utilisateur_id_utilisateur INTEGER,
    professeur_id_professeur INTEGER,
    etat_etudiant VARCHAR(20),
    CONSTRAINT etudiant_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur(id_professeur)
);

-- Table etudiant_classe
CREATE TABLE etudiant_classe (
    etudiant_id_etudiant INTEGER NOT NULL,
    classe_id_classe INTEGER NOT NULL,
    CONSTRAINT etudiant_classe_pk PRIMARY KEY (etudiant_id_etudiant, classe_id_classe),
    CONSTRAINT etudiant_classe_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe(id_classe),
    CONSTRAINT etudiant_classe_etudiant_fk FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant(id_etudiant)
);

-- Table etudiant_equipe
CREATE TABLE etudiant_equipe (
    equipe_id_equipe INTEGER NOT NULL,
    etudiant_id_etudiant INTEGER NOT NULL,
    CONSTRAINT etudiant_equipe_pk PRIMARY KEY (equipe_id_equipe, etudiant_id_etudiant),
    CONSTRAINT etudiant_equipe_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe(id_equipe),
    CONSTRAINT etudiant_equipe_etudiant_fk FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant(id_etudiant)
);

-- Table evaluation
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
    CONSTRAINT evaluation_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe(id_classe),
    CONSTRAINT evaluation_equipe_fk FOREIGN KEY (equipe_id_equipe) REFERENCES equipe(id_equipe),
    CONSTRAINT evaluation_etudiant_fk FOREIGN KEY (etudiant_id_etudiant) REFERENCES etudiant(id_etudiant),
    CONSTRAINT evaluation_etudiant_fkv1 FOREIGN KEY (etudiant_id_etudiant1) REFERENCES etudiant(id_etudiant),
    CONSTRAINT evaluation_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument(id_instrument),
    CONSTRAINT evaluation_travail_fk FOREIGN KEY (travail_id_travail) REFERENCES travail(id_travail)
);

-- Table instrument
CREATE TABLE instrument (
    professeur_id_professeur INTEGER NOT NULL,
    id_instrument SERIAL PRIMARY KEY,
    code_instrument VARCHAR(200),
    nom VARCHAR(2000) NOT NULL,
    sur_denominateur INTEGER,
    CONSTRAINT instrument_professeur_fk FOREIGN KEY (professeur_id_professeur) REFERENCES professeur(id_professeur)
);

-- Table niveau_performance
CREATE TABLE niveau_performance (
    reponse_id_reponse INTEGER NOT NULL,
    critere_id_critere INTEGER NOT NULL,
    id_niveau SERIAL PRIMARY KEY,
    code_niveau VARCHAR(200),
    description VARCHAR(2000),
    niveau INTEGER,
    afficher_note VARCHAR(1) NOT NULL,
    CONSTRAINT niveau_performance_critere_fk FOREIGN KEY (critere_id_critere) REFERENCES critere(id_critere),
    CONSTRAINT niveau_performance_reponse_fk FOREIGN KEY (reponse_id_reponse) REFERENCES reponse(id_reponse)
);

-- Table professeur
CREATE TABLE professeur (
    id_professeur SERIAL PRIMARY KEY,
    nom_complet VARCHAR(200) NOT NULL,
    utilisateur_id_utilisateur INTEGER,
    etat_professeur VARCHAR(20),
    CONSTRAINT professeur__idx UNIQUE (utilisateur_id_utilisateur)
);

-- Table reponse
CREATE TABLE reponse (
    evaluation_id_evaluation INTEGER NOT NULL,
    id_reponse SERIAL PRIMARY KEY,
    note INTEGER,
    commentaire VARCHAR(2000),
    CONSTRAINT reponse_evaluation_fk FOREIGN KEY (evaluation_id_evaluation) REFERENCES evaluation(id_evaluation)
);

-- Table "Session"
CREATE TABLE "Session" (
    id_session SERIAL PRIMARY KEY,
    code_session VARCHAR(200),
    date_session DATE,
    etat_session VARCHAR(20)
);

-- Table session_utilisateur
CREATE TABLE session_utilisateur (
    id_session_utilisateur SERIAL PRIMARY KEY,
    sel VARCHAR(2000) NOT NULL,
    token_init VARCHAR(4000) NOT NULL,
    date_connexion DATE,
    date_jeton_expiration DATE,
    tentatives_echoues INTEGER,
    date_derniere_tentative DATE,
    ip_derniere_connexion INTEGER,
    type_utilisateur VARCHAR(1) NOT NULL,
    utilisateur_id_utilisateur INTEGER NOT NULL,
    etat_session_utilisateur VARCHAR(20),
    CONSTRAINT session_utilisateur_fk FOREIGN KEY (utilisateur_id_utilisateur) REFERENCES utilisateur(id_utilisateur)
);

-- Table travail
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
    etat_travail VARCHAR(20),
    CONSTRAINT travail_classe_fk FOREIGN KEY (classe_id_classe) REFERENCES classe(id_classe),
    CONSTRAINT travail_instrument_fk FOREIGN KEY (instrument_id_instrument) REFERENCES instrument(id_instrument)
);

-- Table utilisateur
CREATE TABLE utilisateur (
    id_utilisateur SERIAL PRIMARY KEY,
    nom VARCHAR(200) NOT NULL,
    prenom VARCHAR(200),
    nom_utilisateur VARCHAR(200),
    courriel VARCHAR(250),
    mot_passe VARCHAR(2000),
    etat_utilisateur VARCHAR(20),
    type_utilisateur VARCHAR(1) NOT NULL,
    professeur_id_professeur INTEGER,
    etudiant_id_etudiant INTEGER,
    date_creation DATE,
    CONSTRAINT utilisateur__idx UNIQUE (etudiant_id_etudiant),
    CONSTRAINT utilisateur__idxv1 UNIQUE (professeur_id_professeur)
);