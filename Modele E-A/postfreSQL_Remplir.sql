
-- Debut Insertion pour le Prototype --

-- Insertion des Utilisateur

INSERT INTO utilisateur (courriel, etat_utilisateur, type_utilisateur) VALUES
-- Professeurs
('jean.dupuis@gmail.com', 'Inactif', 'P'),
('monique.guillaume@hotmail.com', 'Inactif', 'P'),
('christian.muller@gmail.com', 'Inactif', 'P'),
('michele.fournier@hotmail.com', 'Inactif', 'P'),
('denis.dupuis@gmail.com', 'Inactif', 'P'),
('marion.boucher@hotmail.com', 'Inactif', 'P'),
('gerard.tanguy@gmail.com', 'Inactif', 'P'),
('bernadette.dupont@hotmail.com', 'Inactif', 'P'),
('thierry.lemoine@gmail.com', 'Inactif', 'P'),
('helene.joubert@hotmail.com', 'Inactif', 'P'),
('michel.prieur@gmail.com', 'Inactif', 'P'),
('sylvie.gagnon@hotmail.com', 'Inactif', 'P'),
('nathalie.renard@gmail.com', 'Inactif', 'P'),
('brigitte.vachon@hotmail.com', 'Inactif', 'P'),
('francois.valois@gmail.com', 'Inactif', 'P'),

-- Étudiants
('alice.durand@hotmail.com', 'Inactif', 'E'),
('marc.lemoine@gmail.com', 'Inactif', 'E'),
('sophie.bernard@hotmail.com', 'Inactif', 'E'),
('luc.martin@gmail.com', 'Inactif', 'E'),
('julie.robert@hotmail.com', 'Inactif', 'E'),
('david.petit@gmail.com', 'Inactif', 'E'),
('clara.roux@hotmail.com', 'Inactif', 'E'),
('maxime.leblanc@gmail.com', 'Inactif', 'E'),
('elise.meunier@hotmail.com', 'Inactif', 'E'),
('paul.garnier@gmail.com', 'Inactif', 'E'),
('emma.lemoine@hotmail.com', 'Inactif', 'E'),
('antoine.chauvet@gmail.com', 'Inactif', 'E'),
('isabelle.petit@hotmail.com', 'Inactif', 'E'),
('nicolas.gauthier@gmail.com', 'Inactif', 'E'),
('julie.meunier2@hotmail.com', 'Inactif', 'E');

--Insertion professeur
INSERT INTO professeur (nom_complet, utilisateur_id_utilisateur, etat_professeur) VALUES
('Jean Dupuis', 1, 'Inactif'),
('Monique Guillaume', 2, 'Inactif'),
('Christian Muller', 3, 'Inactif'),
('Michele Fournier', 4, 'Inactif'),
('Denis Dupuis', 5, 'Inactif'),
('Marion Boucher', 6, 'Inactif'),
('Gérard Tanguy', 7, 'Inactif'),
('Bernadette Dupont', 8, 'Inactif'),
('Thierry Lemoine', 9, 'Inactif'),
('Hélène Joubert', 10, 'Inactif'),
('Michel Prieur', 11, 'Inactif'),
('Sylvie Gagnon', 12, 'Inactif'),
('Nathalie Renard', 13, 'Inactif'),
('Brigitte Vachon', 14, 'Inactif'),
('François Valois', 15, 'Inactif');

--Insertion etudiant
INSERT INTO etudiant (nom_complet, numero_da, utilisateur_id_utilisateur, professeur_id_professeur, etat_etudiant) VALUES
('Pierre Dupuis', 1001, 16, 1, 'Inactif'),
('Monique Guillaume', 1002, 17, 2, 'Inactif'),
('Christian Muller', 1003, 18, 3, 'Inactif'),
('Michele Fournier', 1004, 19, 4, 'Inactif'),
('Denis Dupuis', 1005, 20, 5, 'Inactif'),
('Marion Boucher', 1006, 21, 6, 'Inactif'),
('Gérard Tanguy', 1007, 22, 7, 'Inactif'),
('Bernadette Dupont', 1008, 23, 8, 'Inactif'),
('Thierry Lemoine', 1009, 24, 9, 'Inactif'),
('Hélène Joubert', 1010, 25, 10, 'Inactif'),
('Michel Prieur', 1011, 26, 11, 'Inactif'),
('Sylvie Gagnon', 1012, 27, 12, 'Inactif'),
('Nathalie Renard', 1013, 28, 13, 'Inactif'),
('Brigitte Vachon', 1014, 29, 14, 'Inactif'),
('François Valois', 1015, 30, 15, 'Inactif');

UPDATE utilisateur u
SET professeur_id_professeur = p.id_professeur
FROM professeur p
WHERE u.type_utilisateur = 'P' AND u.id_utilisateur = p.utilisateur_id_utilisateur;

UPDATE utilisateur u
SET etudiant_id_etudiant = e.id_etudiant
FROM etudiant e
WHERE u.type_utilisateur = 'E' AND u.id_utilisateur = e.utilisateur_id_utilisateur;


--Insertion Session
INSERT INTO session (code_session, date_session, etat_session)
VALUES
    ( 'SESSION_HIVER_2024', '2024-01-15', 'Actif'),
    ( 'SESSION_PRINTEMPS_2024', '2024-04-10', 'Actif'),
    ( 'SESSION_ETE_2024', '2024-07-05', 'Actif'),
    ( 'SESSION_AUTOMNE_2024', '2024-10-20', 'Actif'),
    ( 'SESSION_HIVER_2025', '2025-01-12', 'Actif'),
    ( 'SESSION_PRINTEMPS_2025', '2025-04-15', 'Actif'),
    ( 'SESSION_ETE_2025', '2025-07-08', 'Actif'),
    ( 'SESSION_AUTOMNE_2025', '2025-10-22', 'Actif'),
    ( 'SESSION_HIVER_2026', '2026-01-18', 'Actif'),
    ( 'SESSION_PRINTEMPS_2026', '2026-04-12', 'Actif'),
    ( 'SESSION_ETE_2026', '2026-07-10', 'Actif'),
    ( 'SESSION_AUTOMNE_2026', '2026-10-25', 'Actif'),
    ( 'SESSION_HIVER_2027', '2027-01-14', 'Actif'),
    ( 'SESSION_PRINTEMPS_2027', '2027-04-18', 'Actif'),
    ( 'SESSION_ETE_2027', '2027-07-12', 'Actif'),
    ( 'SESSION_AUTOMNE_2027', '2027-10-28', 'Actif'),
    ( 'SESSION_HIVER_2028', '2028-01-20', 'Actif'),
    ( 'SESSION_PRINTEMPS_2028', '2028-04-22', 'Actif'),
    ( 'SESSION_ETE_2028', '2028-07-15', 'Actif'),
    ( 'SESSION_AUTOMNE_2028', '2028-10-30', 'Actif');

--Insertion Cours
INSERT INTO Cours (code_cours, description_cours, etat_cours, session_id_session)
VALUES
    ( 'CS101', 'Introduction aux concepts fondamentaux de l informatique, y compris la programmation de base et les algorithmes.', 'Actif', 1),
    ( 'MATH200', 'Cours de mathematiques avancees abordant les equations differentielles, les series et l analyse complexe.', 'Actif', 1),
    ( 'BIO150', 'Exploration des concepts de base de la biologie, y compris la cellule, la genetique, et les bases de l evolution.', 'Actif', 1),
    ( 'PHYS250', 'Introduction a la physique, avec un accent particulier sur la mecanique et l electromagnetisme.', 'Actif', 2),
    ( 'CHEM200', 'Chimie generale, avec une etude des elements, des reactions chimiques, et des concepts de la thermodynamique.', 'Actif', 2),
    ( 'ECON210', 'Introduction a l economie, avec des sujets tels que l offre et la demande, la microeconomie et la macroeconomie.', 'Actif', 3),
    ( 'ENGR300', 'Principes de la mecanique appliquee, couvrant la statique, la dynamique et l analyse des structures.', 'Actif', 3),
    ( 'HIST101', 'Cours d histoire generale, abordant les grandes periodes historiques de l Antiquite a la Renaissance.', 'Actif', 4),
    ( 'MATH300', 'Calcul differentiel avance, axe sur l integration multivariable et les theoremes associes.', 'Actif', 4),
    ( 'PSY101', 'Introduction a la psychologie, incluant les bases des comportements humains, des emotions et des processus cognitifs.', 'Actif', 5),
    ( 'CS202', 'Structures de donnees avancees, telles que les listes, les piles, les files, et les arbres binaires.', 'Actif', 5),
    ( 'MATH400', 'Introduction aux equations differentielles et leur application dans les sciences naturelles et l ingenierie.', 'Actif', 6),
    ( 'CHEM300', 'Chimie organique, incluant les reactions chimiques des molecules organiques et les mecanismes reactionnels.', 'Actif', 6),
    ( 'BIO200', 'Genetique et biologie moleculaire, avec une etude approfondie de l ADN, de la replication et de la mutation genetique.', 'Actif', 7),
    ( 'PHYS300', 'Physique moderne, centree sur la relativite restreinte, la mecanique quantique et les applications pratiques.', 'Actif', 7),
    ( 'ECON310', 'Theorie economique appliquee, couvrant les modeles de croissance economique et les politiques monetaire et fiscales.', 'Actif', 8),
    ( 'ENGR350', 'Mecanique des fluides, incluant les principes de base des fluides en mouvement et au repos, et leur application dans les systemes industriels.', 'Actif', 8),
    ( 'MATH500', 'Algebre abstraite, abordant les groupes, les anneaux, les corps, et leur application dans les systemes mathematiques complexes.', 'Actif', 9),
    ( 'CS303', 'Conception d algorithmes et analyse de la complexite, incluant les algorithmes de tri, de recherche, et les structures de donnees complexes.', 'Actif', 9),
    ( 'ART100', 'Introduction a l art, incluant l histoire des mouvements artistiques et l etude des techniques artistiques a travers le temps.', 'Actif', 10),
    ( 'ENGR400', 'Cours de thermodynamique, centree sur les lois de la thermodynamique et leur application aux systemes physiques et chimiques.', 'Actif', 10),
    ( 'PHIL101', 'Introduction a la philosophie, incluant les principales ecoles de pensee, l ethique, et la logique fondamentale.', 'Actif', 11),
    ( 'SOC101', 'Introduction a la sociologie, abordant les structures sociales, la culture, et le role des institutions dans la societe.', 'Actif', 11),
    ( 'MATH600', 'Analyse complexe, incluant les fonctions analytiques, les integrales complexes et les series de Laurent.', 'Actif', 12),
    ( 'CS404', 'Introduction aux systemes d exploitation, incluant la gestion de la memoire, des processus et des systemes de fichiers.', 'Actif', 12),
    ( 'LING101', 'Introduction a la linguistique, etudiant les sons, la syntaxe, et l evolution des langues humaines.', 'Actif', 13);

-- Fin Insertion pour le Prototype --


-- Insertion de table qui ne sont pas dans le Prototype --
INSERT INTO equipe (code_equipe, nom, classe_id_classe, etat_equipe)
VALUES
    ('EQUIPE001', 'Les Pionniers', 1, 'A'),
    ('EQUIPE002', 'Les Innovateurs', 2, 'A'),
    ('EQUIPE003', 'Les Visionnaires', 3, 'A'),
    ('EQUIPE004', 'Les Explorateurs', 4, 'A'),
    ('EQUIPE005', 'Les Leaders', 5, 'A'),
    ('EQUIPE006', 'Les Stratèges', 6, 'A'),
    ('EQUIPE007', 'Les Titans', 7, 'A'),
    ('EQUIPE008', 'Les Génies', 8, 'A'),
    ('EQUIPE009', 'Les Érudits', 9, 'A'),
    ('EQUIPE010', 'Les Légendes', 10, 'A');



INSERT INTO etudiant (equipe_id_equipe, nom_complet, etat_etudiant, utilisateur_id_user)
VALUES
    (3, 'Alice Martin', 'A', 26),
    (7, 'Bob Lemoine', 'A', 27),
    (2, 'Charlie Dupuis', 'A', 28),
    (8, 'David Bernard', 'A', 29),
    (5, 'Emma Leclerc', 'A', 30),
    (1, 'Felix Roux', 'A', 31),
    (9, 'Gabrielle Andre', 'A', 32),
    (6, 'Hugo Morel', 'A', 33),
    (4, 'Isabelle Fournier', 'A', 34),
    (10, 'Julien Guillot', 'A', 35),
    (3, 'Karine Durand', 'A', 36),
    (7, 'Luc Mercier', 'A', 37),
    (2, 'Manon Germain', 'A', 38),
    (8, 'Nicolas Delahaye', 'A', 39),
    (5, 'Olivier Lemoine', 'A', 40),
    (1, 'Pauline Denis', 'A', 41),
    (9, 'Quentin Gosselin', 'A', 42),
    (6, 'Raphael Caron', 'A', 43),
    (4, 'Sophie Morel', 'A', 44),
    (10, 'Thomas Benoit', 'A', 45),
    (3, 'Ursula Perrot', 'A', 46),
    (7, 'Victor Aubert', 'A', 47),
    (2, 'William Lucas', 'A', 48),
    (8, 'Xavier Guichard', 'A', 49);

INSERT INTO critere (instrument_id_instrument, code_critere, description, valeur, etat_critere) VALUES  
(1, 'CS_PERF', 'Performance des algorithmes utilisés en simulation', 95, 1),
(2, 'MATH_PREC', 'Précision des calculs mathématiques appliqués', 98, 1),
(3, 'BIO_STAB', 'Stabilité des échantillons biologiques en laboratoire', 92, 1),
(4, 'PHYS_SENS', 'Sensibilité des instruments de mesure en physique', 96, 1),
(5, 'CHEM_REACT', 'Fiabilité des réactions chimiques en laboratoire', 94, 1),
(6, 'ENGR_RES', 'Résistance des matériaux testés en ingénierie', 97, 1),
(7, 'CS_SEC', 'Sécurité des systèmes informatiques en environnement de test', 99, 1),
(8, 'ECON_MOD', 'Fiabilité des modèles économiques en simulation', 90, 1),
(9, 'PSY_EXP', 'Validité des expériences en sciences cognitives', 88, 1),
(10, 'SOC_DATA', 'Qualité et intégrité des données en sciences sociales', 91, 1);

-------------------------------------------------------------------------------------------------------------
-- INSERTION DE DONNÉES DE NOUVEAU POUR LES TABLES QUI ONT ÉTÉ MODIFIÉES DANS LE PROTOTYPE --
-------------------------------------------------------------------------------------------------------------

-- Insérer des sessions
INSERT INTO "Session" (code_session, date_session, etat_session)
VALUES 
    ('H2025', '2025-01-10', 'Active'),
    ('E2025', '2025-05-10', 'Active');

-- Insérer des cours
INSERT INTO cours (id_cours, code_cours, description_cours, etat_cours, session_id_session)
VALUES 
    (1, 101, 'Introduction à la programmation', 'Actif', 1),
    (2, 102, 'Base de données avancées', 'Actif', 2);

-- Insérer des professeurs
INSERT INTO professeur (nom_complet, etat_professeur)
VALUES 
    ('Dr. Dupont', 'Actif'),
    ('Mme. Tremblay', 'Actif');

-- Insérer des classes
INSERT INTO classe (code_cours, description, "session", groupe, professeur_id_professeur, etat_classe, cours_id_cours, cours_session_id_session)
VALUES 
    ('PROG101', 'Programmation de base', 'H2025', 1, 1, 'Ouvert', 1, 1),
    ('DB102', 'Conception et gestion des bases de données', 'E2025', 2, 2, 'Ouvert', 2, 2);

-- Insérer des étudiants
INSERT INTO etudiant (nom_complet, etat_etudiant)
VALUES 
    ('Alice Martin', 'Actif'),
    ('Bob Dubois', 'Actif'),
    ('Charlie Lemieux', 'Actif');

-- Assigner des étudiants à des classes
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe)
VALUES 
    (1, 1),
    (2, 1),
    (3, 2);

-- Insérer des équipes
INSERT INTO equipe (code_equipe, nom, classe_id_classe, etat_equipe, id_cours, id_session)
VALUES 
    ('EQUIPE1', 'Équipe Alpha', 1, 'Active', 1, 1),
    ('EQUIPE2', 'Équipe Beta', 2, 'Active', 2, 2);

-- Assigner des étudiants aux équipes
INSERT INTO etudiant_equipe (equipe_id_equipe, etudiant_id_etudiant)
VALUES 
    (1, 1),
    (1, 2),
    (2, 3);

-- Insérer un instrument d'évaluation
INSERT INTO instrument (professeur_id_professeur, code_instrument, nom, sur_denominateur)
VALUES 
    (1, 'TEST1', 'Test de mi-session', 100);

-- Insérer un travail
INSERT INTO travail (code_travail, nom_travail, instrument_id_instrument, date_cloture, date_travail, classe_id_classe, id_cours, id_session, etat_travail)
VALUES 
    ('TP1', 'Travail pratique 1', 1, '2025-03-20', '2025-03-01', 1, 1, 1, 'Ouvert');

-- Insérer une évaluation
INSERT INTO evaluation (travail_id_travail, etudiant_id_etudiant, etudiant_id_etudiant1, date_evaluation, instrument_id_instrument, equipe_id_equipe, code_evaluation, description, classe_id_classe, id_cours, id_session, etat_evaluation)
VALUES 
    (1, 1, 2, '2025-03-10', 1, 1, 'EVAL1', 'Évaluation du TP1', 1, 1, 1, 'Validé');

-- Insérer une réponse d'évaluation
INSERT INTO reponse (evaluation_id_evaluation, note, commentaire)
VALUES 
    (1, 85, 'Bon travail !');

-- Insérer un utilisateur (étudiant)
INSERT INTO utilisateur (nom, prenom, nom_utilisateur, courriel, mot_passe, etat_utilisateur, type_utilisateur, etudiant_id_etudiant, date_creation)
VALUES 
    ('Alice', 'Martin', 'alice.m', 'alice@example.com', 'password123', 'Actif', 'E', 1, '2025-03-01');

-- Insérer un utilisateur (professeur)
INSERT INTO utilisateur (nom, prenom, nom_utilisateur, courriel, mot_passe, etat_utilisateur, type_utilisateur, professeur_id_professeur, date_creation)
VALUES 
    ('Paul', 'Dupont', 'paul.d', 'paul@example.com', 'securepass', 'Actif', 'P', 1, '2025-02-20');




