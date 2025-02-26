INSERT INTO session (code_session, date_session, etat_session) VALUES
('H2025', '2025-01-22', 'T'),
('H2025', '2025-01-22', 'T');

select * from session;

CREATE TABLE cours (
    id_cours SERIAL PRIMARY KEY,
    code_cours VARCHAR(200),
    description_cours TEXT,
    etat_cours CHAR(1),
    session_id_session INTEGER NOT NULL
);

INSERT INTO cours (code_cours, description_cours, etat_cours, session_id_session) VALUES
('201-4CM-BB', 'Géométrique et statistique', 'T', 1),
('420-4GW-BB', 'Application web transactionnelles', 'T', 2);

select * from cours;

drop table cours cascade;

INSERT INTO professeur (nom_complet, etat_professeur) VALUES
('Mustapha Ait Akkache', 'T'),
('Mathieu Brodeur-Béliveau', 'T');

select * from professeur;

INSERT INTO classe (code_cours, description, session, groupe, professeur_id_professeur, cours_id_cours, etat_classe) VALUES
('201-4CM-BB', 'Géométrique et statistique', 'H2025', 00003, 1, 1, 'T'),
('420-4GW-BB', 'Application web transactionnelles', 'H2025', 00002, 2, 2, 'T');

select * from classe;

INSERT INTO etudiant (nom_complet, etat_etudiant) VALUES
('Cédryk Leblanc','T');

select * from etudiant;

select * from etudiant_classe;

INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(2, 4);

INSERT INTO evaluation (travail_id_travail, etudiant_id_etudiant, etudiant_id_etudiant2, date_evaluation, instrument_id_instrument, equipe_id_equipe, code_evaluation, description, classe_id_classe, evaluation_terminee, etat_evaluation)
VALUES (1,1, '2025-02-24', 1, 1, 'EV001', 'Evaluation1', 1, 'T', 'T');



select * from evaluation;

INSERT INTO travail (code_travail, nom_travail, date_travail, classe_id_classe, etat_travail)
VALUES ('T001', 'lab1', '2025-02-24', 5, 'T');

select * from travail;

INSERT INTO instrument (professeur_id_professeur, code_instrument, nom, sur_denominateur, etat_instrument)
VALUES (2, 'INS001', 'Eval-01', 10,'T');

select * from instrument;

select * from equipe;

INSERT INTO equipe(id_equipe, code_equipe, nom, classe_id_classe, etat_equipe) 
VALUES (1, 'equipe001', 'equipe1', 5, 'T');

INSERT INTO evaluation (travail_id_travail, etudiant_id_etudiant, etudiant_id_etudiant2, date_evaluation, instrument_id_instrument, equipe_id_equipe, code_evaluation, description, classe_id_classe, evaluation_terminee, etat_evaluation) 
VALUES (1, 1, 2, '2025-02-24', 1, 1, 'Eval001', 'Evaluation1', 5, 'T', 'T');

select * from evaluation;

select * from niveau_performance;

select * from critere;

insert into critere(instrument_id_instrument,code_critere,description,valeur,etat_critere)
values (1,'code1','Les critères eval',10,'T');