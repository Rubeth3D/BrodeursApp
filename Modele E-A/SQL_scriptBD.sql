-- Généré par Oracle SQL Developer Data Modeler 24.3.1.347.1153
--   à :        2025-03-23 17:17:45 HAE
--   site :      Oracle Database 21c
--   type :      Oracle Database 21c



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE affectation (
    id_affectation NUMBER NOT NULL
);

ALTER TABLE affectation ADD CONSTRAINT affectation_pk PRIMARY KEY ( id_affectation );

CREATE TABLE assignation (
    travail_id_travail NUMBER NOT NULL,
    id_assignation     NUMBER NOT NULL,
    equipe_id_equipe   NUMBER NOT NULL
);

ALTER TABLE assignation ADD CONSTRAINT assignation_pk PRIMARY KEY ( travail_id_travail,
                                                                    id_assignation );

CREATE TABLE classe (
    id_classe                NUMBER NOT NULL,
    code_cours               VARCHAR2(200),
    description              VARCHAR2(2000),
    "session"                VARCHAR2(20),
    groupe                   NUMBER,
    professeur_id_professeur NUMBER NOT NULL,
    etat_classe              VARCHAR2(20),
    cours_id_cours           NUMBER NOT NULL,
    cours_session_id_session NUMBER NOT NULL
);

ALTER TABLE classe ADD CONSTRAINT classe_pk PRIMARY KEY ( id_classe );

CREATE TABLE cours (
    id_cours           NUMBER NOT NULL,
    code_cours         NUMBER,
    description_cours  VARCHAR2(4000),
    etat_cours         VARCHAR2(20),
    session_id_session NUMBER NOT NULL
);

ALTER TABLE cours ADD CONSTRAINT cours_pk PRIMARY KEY ( id_cours,
                                                        session_id_session );

CREATE TABLE critere (
    instrument_id_instrument NUMBER NOT NULL,
    id_critere               NUMBER NOT NULL,
    code_critere             VARCHAR2(200),
    description              VARCHAR2(2000),
    poids                    NUMBER
);

ALTER TABLE critere ADD CONSTRAINT critere_pk PRIMARY KEY ( id_critere );

CREATE TABLE equipe (
    id_equipe        NUMBER NOT NULL,
    code_equipe      VARCHAR2(200),
    nom              VARCHAR2(200),
    classe_id_classe NUMBER NOT NULL,
    etat_equipe      VARCHAR2(20),
    id_cours         NUMBER NOT NULL,
    id_session       NUMBER NOT NULL
);

ALTER TABLE equipe ADD CONSTRAINT equipe_pk PRIMARY KEY ( id_equipe );

CREATE TABLE etudiant (
    equipe_id_equipe           NUMBER,
    id_etudiant                NUMBER NOT NULL,
    nom_complet                VARCHAR2(200),
    utilisateur_id_utilisateur NUMBER,
    professeur_id_professeur   NUMBER,
    etat_etudiant              VARCHAR2(20)
);

CREATE UNIQUE INDEX etudiant__idx ON
    etudiant (
        utilisateur_id_utilisateur
    ASC );

ALTER TABLE etudiant ADD CONSTRAINT etudiant_pk PRIMARY KEY ( id_etudiant );

CREATE TABLE etudiant_classe (
    etudiant_id_etudiant NUMBER NOT NULL,
    classe_id_classe     NUMBER NOT NULL
);

ALTER TABLE etudiant_classe ADD CONSTRAINT etudiant_classe_pk PRIMARY KEY ( etudiant_id_etudiant,
                                                                            classe_id_classe );

CREATE TABLE evaluation (
    travail_id_travail       NUMBER NOT NULL,
    id_evaluation            NUMBER NOT NULL,
    etudiant_id_etudiant     NUMBER NOT NULL,
    etudiant_id_etudiant2    NUMBER NOT NULL,
    date_evaluation          DATE,
    instrument_id_instrument NUMBER NOT NULL,
    equipe_id_equipe         NUMBER NOT NULL,
    code_evaluation          VARCHAR2(200),
    description              VARCHAR2(2000),
    classe_id_classe         NUMBER NOT NULL,
    id_cours                 NUMBER NOT NULL,
    id_session               NUMBER NOT NULL,
    etat_evaluation          VARCHAR2(20)
);

ALTER TABLE evaluation ADD CONSTRAINT evaluation_pk PRIMARY KEY ( id_evaluation );

CREATE TABLE instrument (
    professeur_id_professeur NUMBER NOT NULL,
    id_instrument            NUMBER NOT NULL,
    code_instrument          VARCHAR2(200),
    nom                      VARCHAR2(2000) NOT NULL,
    sur_denominateur         NUMBER
);

ALTER TABLE instrument ADD CONSTRAINT instrument_pk PRIMARY KEY ( id_instrument );

CREATE TABLE niveau_performance (
    reponse_id_reponse NUMBER NOT NULL,
    critere_id_critere NUMBER NOT NULL,
    id_niveau          NUMBER NOT NULL,
    code_niveau        VARCHAR2(200),
    description        VARCHAR2(2000),
    niveau             NUMBER,
    afficher_note      VARCHAR2(1) NOT NULL
);

ALTER TABLE niveau_performance ADD CONSTRAINT niveau_performance_pk PRIMARY KEY ( id_niveau );

CREATE TABLE professeur (
    id_professeur              NUMBER NOT NULL,
    nom_complet                VARCHAR2(200) NOT NULL,
    utilisateur_id_utilisateur NUMBER,
    etat_professeur            VARCHAR2(20)
);

CREATE UNIQUE INDEX professeur__idx ON
    professeur (
        utilisateur_id_utilisateur
    ASC );

ALTER TABLE professeur ADD CONSTRAINT professeur_pk PRIMARY KEY ( id_professeur );

CREATE TABLE reponse (
    evaluation_id_evaluation NUMBER NOT NULL,
    id_reponse               NUMBER NOT NULL,
    note                     NUMBER,
    commentaire              VARCHAR2(2000)
);

ALTER TABLE reponse ADD CONSTRAINT reponse_pk PRIMARY KEY ( id_reponse );

CREATE TABLE "Session" (
    id_session   NUMBER NOT NULL,
    code_session VARCHAR2(200),
    date_session DATE,
    etat_session VARCHAR2(20)
);

ALTER TABLE "Session" ADD CONSTRAINT session_pk PRIMARY KEY ( id_session );

CREATE TABLE session_utilisateur (
    id_session_utilisateur     NUMBER NOT NULL,
    sel                        VARCHAR2(2000) NOT NULL,
    token_init                 VARCHAR2(4000) NOT NULL,
    date_connexion             DATE,
    date_jeton_expiration      DATE,
    tentatives_echoues         NUMBER,
    date_derniere_tentative    DATE,
    ip_derniere_connexion      NUMBER,
    type_utilisateur           VARCHAR2(1) NOT NULL,
    utilisateur_id_utilisateur NUMBER NOT NULL,
    etat_session_utilisateur   VARCHAR2(20)
);

ALTER TABLE session_utilisateur ADD CONSTRAINT session_utilisateur_pk PRIMARY KEY ( id_session_utilisateur );

CREATE TABLE travail (
    id_travail               NUMBER NOT NULL,
    code_travail             VARCHAR2(200),
    nom_travail              VARCHAR2(200),
    instrument_id_instrument NUMBER NOT NULL,
    date_cloture             DATE,
    date_travail             DATE,
    classe_id_classe         NUMBER NOT NULL,
    id_cours                 NUMBER NOT NULL,
    id_session               NUMBER NOT NULL,
    etat_travail             VARCHAR2(20)
);

ALTER TABLE travail ADD CONSTRAINT travail_pk PRIMARY KEY ( id_travail );

CREATE TABLE utilisateur (
    id_utilisateur           NUMBER NOT NULL,
    nom                      VARCHAR2(200) NOT NULL,
    prenom                   VARCHAR2(200),
    nom_utilisateur          VARCHAR2(200),
    courriel                 VARCHAR2(250),
    mot_passe                VARCHAR2(2000),
    etat_utilisateur         VARCHAR2(20),
    type_utilisateur         VARCHAR2(1) NOT NULL,
    professeur_id_professeur NUMBER,
    etudiant_id_etudiant     NUMBER
);

ALTER TABLE utilisateur
    ADD CONSTRAINT arc_1
        CHECK ( ( ( etudiant_id_etudiant IS NOT NULL )
                  AND ( professeur_id_professeur IS NULL ) )
                OR ( ( professeur_id_professeur IS NOT NULL )
                     AND ( etudiant_id_etudiant IS NULL ) )
                OR ( ( etudiant_id_etudiant IS NULL )
                     AND ( professeur_id_professeur IS NULL ) ) );

COMMENT ON COLUMN utilisateur.etat_utilisateur IS
    'Actif/Inactif';

COMMENT ON COLUMN utilisateur.type_utilisateur IS
    'E étudiant / P professeur / A admin';

CREATE UNIQUE INDEX utilisateur__idx ON
    utilisateur (
        etudiant_id_etudiant
    ASC );

CREATE UNIQUE INDEX utilisateur__idxv1 ON
    utilisateur (
        professeur_id_professeur
    ASC );

ALTER TABLE utilisateur ADD CONSTRAINT utilisateur_pk PRIMARY KEY ( id_utilisateur );

ALTER TABLE assignation
    ADD CONSTRAINT assignation_equipe_fk FOREIGN KEY ( equipe_id_equipe )
        REFERENCES equipe ( id_equipe );

ALTER TABLE assignation
    ADD CONSTRAINT assignation_travail_fk FOREIGN KEY ( travail_id_travail )
        REFERENCES travail ( id_travail );

ALTER TABLE classe
    ADD CONSTRAINT classe_cours_fk
        FOREIGN KEY ( cours_id_cours,
                      cours_session_id_session )
            REFERENCES cours ( id_cours,
                               session_id_session );

ALTER TABLE classe
    ADD CONSTRAINT classe_professeur_fk FOREIGN KEY ( professeur_id_professeur )
        REFERENCES professeur ( id_professeur );

ALTER TABLE cours
    ADD CONSTRAINT cours_session_fk FOREIGN KEY ( session_id_session )
        REFERENCES "Session" ( id_session );

ALTER TABLE critere
    ADD CONSTRAINT critere_instrument_fk FOREIGN KEY ( instrument_id_instrument )
        REFERENCES instrument ( id_instrument );

ALTER TABLE equipe
    ADD CONSTRAINT equipe_classe_fk FOREIGN KEY ( classe_id_classe )
        REFERENCES classe ( id_classe );

ALTER TABLE etudiant_classe
    ADD CONSTRAINT etudiant_classe_classe_fk FOREIGN KEY ( classe_id_classe )
        REFERENCES classe ( id_classe );

ALTER TABLE etudiant_classe
    ADD CONSTRAINT etudiant_classe_etudiant_fk FOREIGN KEY ( etudiant_id_etudiant )
        REFERENCES etudiant ( id_etudiant );

ALTER TABLE etudiant
    ADD CONSTRAINT etudiant_equipe_fk FOREIGN KEY ( equipe_id_equipe )
        REFERENCES equipe ( id_equipe );

ALTER TABLE etudiant
    ADD CONSTRAINT etudiant_professeur_fk FOREIGN KEY ( professeur_id_professeur )
        REFERENCES professeur ( id_professeur );

ALTER TABLE etudiant
    ADD CONSTRAINT etudiant_utilisateur_fk FOREIGN KEY ( utilisateur_id_utilisateur )
        REFERENCES utilisateur ( id_utilisateur );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_classe_fk FOREIGN KEY ( classe_id_classe )
        REFERENCES classe ( id_classe );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_equipe_fk FOREIGN KEY ( equipe_id_equipe )
        REFERENCES equipe ( id_equipe );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_etudiant_fk FOREIGN KEY ( etudiant_id_etudiant )
        REFERENCES etudiant ( id_etudiant );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_etudiant_fkv2 FOREIGN KEY ( etudiant_id_etudiant2 )
        REFERENCES etudiant ( id_etudiant );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_instrument_fk FOREIGN KEY ( instrument_id_instrument )
        REFERENCES instrument ( id_instrument );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_travail_fk FOREIGN KEY ( travail_id_travail )
        REFERENCES travail ( id_travail );

ALTER TABLE instrument
    ADD CONSTRAINT instrument_professeur_fk FOREIGN KEY ( professeur_id_professeur )
        REFERENCES professeur ( id_professeur );

ALTER TABLE niveau_performance
    ADD CONSTRAINT niveau_performance_critere_fk FOREIGN KEY ( critere_id_critere )
        REFERENCES critere ( id_critere );

ALTER TABLE niveau_performance
    ADD CONSTRAINT niveau_performance_reponse_fk FOREIGN KEY ( reponse_id_reponse )
        REFERENCES reponse ( id_reponse );

ALTER TABLE professeur
    ADD CONSTRAINT professeur_utilisateur_fk FOREIGN KEY ( utilisateur_id_utilisateur )
        REFERENCES utilisateur ( id_utilisateur );

ALTER TABLE reponse
    ADD CONSTRAINT reponse_evaluation_fk FOREIGN KEY ( evaluation_id_evaluation )
        REFERENCES evaluation ( id_evaluation );

ALTER TABLE session_utilisateur
    ADD CONSTRAINT session_utilisateur_fk FOREIGN KEY ( utilisateur_id_utilisateur )
        REFERENCES utilisateur ( id_utilisateur );

ALTER TABLE travail
    ADD CONSTRAINT travail_classe_fk FOREIGN KEY ( classe_id_classe )
        REFERENCES classe ( id_classe );

ALTER TABLE travail
    ADD CONSTRAINT travail_instrument_fk FOREIGN KEY ( instrument_id_instrument )
        REFERENCES instrument ( id_instrument );

ALTER TABLE utilisateur
    ADD CONSTRAINT utilisateur_etudiant_fk FOREIGN KEY ( etudiant_id_etudiant )
        REFERENCES etudiant ( id_etudiant );

ALTER TABLE utilisateur
    ADD CONSTRAINT utilisateur_professeur_fk FOREIGN KEY ( professeur_id_professeur )
        REFERENCES professeur ( id_professeur );

CREATE SEQUENCE utilisateur_id_utilisateur_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER utilisateur_id_utilisateur_trg BEFORE
    INSERT ON utilisateur
    FOR EACH ROW
    WHEN ( new.id_utilisateur IS NULL )
BEGIN
    :new.id_utilisateur := utilisateur_id_utilisateur_seq.nextval;
END;
/



-- Rapport récapitulatif d'Oracle SQL Developer Data Modeler : 
-- 
-- CREATE TABLE                            17
-- CREATE INDEX                             4
-- ALTER TABLE                             46
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           1
-- ALTER TRIGGER                            0
-- CREATE COLLECTION TYPE                   0
-- CREATE STRUCTURED TYPE                   0
-- CREATE STRUCTURED TYPE BODY              0
-- CREATE CLUSTER                           0
-- CREATE CONTEXT                           0
-- CREATE DATABASE                          0
-- CREATE DIMENSION                         0
-- CREATE DIRECTORY                         0
-- CREATE DISK GROUP                        0
-- CREATE ROLE                              0
-- CREATE ROLLBACK SEGMENT                  0
-- CREATE SEQUENCE                          1
-- CREATE MATERIALIZED VIEW                 0
-- CREATE MATERIALIZED VIEW LOG             0
-- CREATE SYNONYM                           0
-- CREATE TABLESPACE                        0
-- CREATE USER                              0
-- 
-- DROP TABLESPACE                          0
-- DROP DATABASE                            0
-- 
-- REDACTION POLICY                         0
-- 
-- ORDS DROP SCHEMA                         0
-- ORDS ENABLE SCHEMA                       0
-- ORDS ENABLE OBJECT                       0
-- 
-- ERRORS                                   0
-- WARNINGS                                 0
