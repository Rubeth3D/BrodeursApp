-- Generated by Oracle SQL Developer Data Modeler 23.1.0.087.0806
--   at:        2025-02-26 09:33:13 EST
--   site:      Oracle Database 21c
--   type:      Oracle Database 21c



-- predefined type, no DDL - MDSYS.SDO_GEOMETRY

-- predefined type, no DDL - XMLTYPE

CREATE TABLE assignation (
    travail_id_travail NUMBER NOT NULL,
    id_assignation     NUMBER NOT NULL,
    equipe_id_equipe   NUMBER NOT NULL
);

ALTER TABLE assignation ADD CONSTRAINT assignation_pk PRIMARY KEY ( travail_id_travail,
                                                                    id_assignation );

CREATE TABLE cours (
    id_classe                NUMBER NOT NULL,
    code_cours               VARCHAR2(200),
    description              VARCHAR2(2000),
    "session"                VARCHAR2(20),
    groupe                   NUMBER,
    professeur_id_professeur NUMBER NOT NULL
);

ALTER TABLE cours ADD CONSTRAINT cours_pk PRIMARY KEY ( id_classe );

CREATE TABLE equipe (
    id_equipe       NUMBER NOT NULL,
    code_equipe     VARCHAR2(200),
    nom_equipe      VARCHAR2(200),
    cours_id_classe NUMBER NOT NULL
);

CREATE UNIQUE INDEX equipe__idx ON
    equipe (
        cours_id_classe
    ASC );

ALTER TABLE equipe ADD CONSTRAINT equipe_pk PRIMARY KEY ( id_equipe );

CREATE TABLE etudiant (
    equipe_id_equipe           NUMBER NOT NULL,
    id_etudiant                NUMBER NOT NULL,
    nom_complet                VARCHAR2(200) NOT NULL,
    mot_de_passe               NUMBER NOT NULL,
    da                         NUMBER NOT NULL,
    utilisateur_id_utilisateur NUMBER NOT NULL
);

CREATE UNIQUE INDEX etudiant__idx ON
    etudiant (
        utilisateur_id_utilisateur
    ASC );

ALTER TABLE etudiant ADD CONSTRAINT etudiant_pk PRIMARY KEY ( id_etudiant );

CREATE TABLE etudiant_classe (
    etudiant_id_etudiant NUMBER NOT NULL,
    cours_id_classe      NUMBER NOT NULL
);

ALTER TABLE etudiant_classe ADD CONSTRAINT etudiant_classe_pk PRIMARY KEY ( etudiant_id_etudiant,
                                                                            cours_id_classe );

CREATE TABLE evaluation (
    travail_id_travail       NUMBER NOT NULL,
    id_evaluation            NUMBER NOT NULL,
    etudiant_id_etudiant     NUMBER NOT NULL,
    etudiant_id_etudiant1    NUMBER NOT NULL,
    date_evaluation          DATE,
    equipe_id_equipe         NUMBER NOT NULL,
    description              VARCHAR2(2000),
    cours_id_classe          NUMBER NOT NULL,
    note_evaluation          NUMBER NOT NULL,
    justification_evaluation VARCHAR2(5000) NOT NULL,
    professeur_id_professeur NUMBER,
    questions                VARCHAR2(5000) NOT NULL,
    instrument_id_instrument NUMBER NOT NULL
);

CREATE UNIQUE INDEX evaluation__idx ON
    evaluation (
        etudiant_id_etudiant1
    ASC );

ALTER TABLE evaluation ADD CONSTRAINT evaluation_pk PRIMARY KEY ( id_evaluation );

CREATE TABLE instrument (
    professeur_id_professeur NUMBER NOT NULL,
    id_instrument            NUMBER NOT NULL,
    code_instrument          VARCHAR2(200),
    nom                      VARCHAR2(2000) NOT NULL
);

ALTER TABLE instrument ADD CONSTRAINT instrument_pk PRIMARY KEY ( id_instrument );

CREATE TABLE professeur (
    id_professeur              NUMBER NOT NULL,
    nom_complet                VARCHAR2(200) NOT NULL,
    da                         NUMBER NOT NULL,
    mot_de_passe               NUMBER NOT NULL,
    utilisateur_id_utilisateur NUMBER NOT NULL
);

CREATE UNIQUE INDEX professeur__idx ON
    professeur (
        utilisateur_id_utilisateur
    ASC );

ALTER TABLE professeur ADD CONSTRAINT professeur_pk PRIMARY KEY ( id_professeur );

CREATE TABLE resultat (
    id_resultat              NUMBER NOT NULL,
    note_evaluation          NUMBER NOT NULL,
    justification_evaluation VARCHAR2(5000) NOT NULL,
    evaluation_id_evaluation NUMBER,
    professeur_id_professeur NUMBER
);

ALTER TABLE resultat ADD CONSTRAINT resultat_pk PRIMARY KEY ( id_resultat );

CREATE TABLE travail (
    id_travail               NUMBER NOT NULL,
    code_travail             VARCHAR2(200),
    nom_travail              VARCHAR2(200),
    instrument_id_instrument NUMBER NOT NULL,
    date_cloture             DATE,
    date_travail             DATE,
    cours_id_classe          NUMBER NOT NULL
);

ALTER TABLE travail ADD CONSTRAINT travail_pk PRIMARY KEY ( id_travail );

CREATE TABLE utilisateur (
    id_utilisateur   NUMBER NOT NULL,
    nom_utilisateur  NUMBER NOT NULL,
    courriel         VARCHAR2(200),
    mot_de_passe     VARCHAR2(100) NOT NULL,
    type_utilisateur VARCHAR2(100) NOT NULL
);

ALTER TABLE utilisateur ADD CONSTRAINT utilisateur_pk PRIMARY KEY ( id_utilisateur );

ALTER TABLE assignation
    ADD CONSTRAINT assignation_equipe_fk FOREIGN KEY ( equipe_id_equipe )
        REFERENCES equipe ( id_equipe );

ALTER TABLE assignation
    ADD CONSTRAINT assignation_travail_fk FOREIGN KEY ( travail_id_travail )
        REFERENCES travail ( id_travail );

ALTER TABLE cours
    ADD CONSTRAINT cours_professeur_fk FOREIGN KEY ( professeur_id_professeur )
        REFERENCES professeur ( id_professeur );

ALTER TABLE equipe
    ADD CONSTRAINT equipe_cours_fk FOREIGN KEY ( cours_id_classe )
        REFERENCES cours ( id_classe );

ALTER TABLE etudiant_classe
    ADD CONSTRAINT etudiant_classe_cours_fk FOREIGN KEY ( cours_id_classe )
        REFERENCES cours ( id_classe );

ALTER TABLE etudiant_classe
    ADD CONSTRAINT etudiant_classe_etudiant_fk FOREIGN KEY ( etudiant_id_etudiant )
        REFERENCES etudiant ( id_etudiant );

ALTER TABLE etudiant
    ADD CONSTRAINT etudiant_equipe_fk FOREIGN KEY ( equipe_id_equipe )
        REFERENCES equipe ( id_equipe );

ALTER TABLE etudiant
    ADD CONSTRAINT etudiant_utilisateur_fk FOREIGN KEY ( utilisateur_id_utilisateur )
        REFERENCES utilisateur ( id_utilisateur );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_cours_fk FOREIGN KEY ( cours_id_classe )
        REFERENCES cours ( id_classe );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_equipe_fk FOREIGN KEY ( equipe_id_equipe )
        REFERENCES equipe ( id_equipe );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_etudiant_fk FOREIGN KEY ( etudiant_id_etudiant )
        REFERENCES etudiant ( id_etudiant );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_etudiant_fkv1 FOREIGN KEY ( etudiant_id_etudiant1 )
        REFERENCES etudiant ( id_etudiant );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_instrument_fk FOREIGN KEY ( instrument_id_instrument )
        REFERENCES instrument ( id_instrument );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_professeur_fk FOREIGN KEY ( professeur_id_professeur )
        REFERENCES professeur ( id_professeur );

ALTER TABLE evaluation
    ADD CONSTRAINT evaluation_travail_fk FOREIGN KEY ( travail_id_travail )
        REFERENCES travail ( id_travail );

ALTER TABLE instrument
    ADD CONSTRAINT instrument_professeur_fk FOREIGN KEY ( professeur_id_professeur )
        REFERENCES professeur ( id_professeur );

ALTER TABLE professeur
    ADD CONSTRAINT professeur_utilisateur_fk FOREIGN KEY ( utilisateur_id_utilisateur )
        REFERENCES utilisateur ( id_utilisateur );

ALTER TABLE resultat
    ADD CONSTRAINT resultat_evaluation_fk FOREIGN KEY ( evaluation_id_evaluation )
        REFERENCES evaluation ( id_evaluation );

ALTER TABLE resultat
    ADD CONSTRAINT resultat_professeur_fk FOREIGN KEY ( professeur_id_professeur )
        REFERENCES professeur ( id_professeur );

ALTER TABLE travail
    ADD CONSTRAINT travail_cours_fk FOREIGN KEY ( cours_id_classe )
        REFERENCES cours ( id_classe );

ALTER TABLE travail
    ADD CONSTRAINT travail_instrument_fk FOREIGN KEY ( instrument_id_instrument )
        REFERENCES instrument ( id_instrument );

CREATE SEQUENCE etudiant_equipe_id_equipe_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER etudiant_equipe_id_equipe_trg BEFORE
    INSERT ON etudiant
    FOR EACH ROW
    WHEN ( new.equipe_id_equipe IS NULL )
BEGIN
    :new.equipe_id_equipe := etudiant_equipe_id_equipe_seq.nextval;
END;
/

CREATE SEQUENCE utilisateur_id_utilisateur_seq START WITH 1 NOCACHE ORDER;

CREATE OR REPLACE TRIGGER utilisateur_id_utilisateur_trg BEFORE
    INSERT ON utilisateur
    FOR EACH ROW
    WHEN ( new.id_utilisateur IS NULL )
BEGIN
    :new.id_utilisateur := utilisateur_id_utilisateur_seq.nextval;
END;
/



-- Oracle SQL Developer Data Modeler Summary Report: 
-- 
-- CREATE TABLE                            11
-- CREATE INDEX                             4
-- ALTER TABLE                             32
-- CREATE VIEW                              0
-- ALTER VIEW                               0
-- CREATE PACKAGE                           0
-- CREATE PACKAGE BODY                      0
-- CREATE PROCEDURE                         0
-- CREATE FUNCTION                          0
-- CREATE TRIGGER                           2
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
-- CREATE SEQUENCE                          2
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
