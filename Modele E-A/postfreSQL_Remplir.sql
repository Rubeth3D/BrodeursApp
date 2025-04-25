
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

--Rajoute le id_professeur dans la table utilisateur
UPDATE utilisateur u
SET professeur_id_professeur = p.id_professeur
FROM professeur p
WHERE u.type_utilisateur = 'P' AND u.id_utilisateur = p.utilisateur_id_utilisateur;

--Rajoute le id_etudiant dans la table utilisateur
UPDATE utilisateur u
SET etudiant_id_etudiant = e.id_etudiant
FROM etudiant e
WHERE u.type_utilisateur = 'E' AND u.id_utilisateur = e.utilisateur_id_utilisateur;


-- Insertion Session
INSERT INTO session (code_session, date_session, etat_session)
VALUES
    ('SESSION_HIVER_2024', '2024-01-15', 'Actif'),
    ('SESSION_PRINTEMPS_2024', '2024-04-10', 'Actif'),
    ('SESSION_ETE_2024', '2024-07-05', 'Actif'),
    ('SESSION_AUTOMNE_2024', '2024-10-20', 'Actif'),
    ('SESSION_HIVER_2025', '2025-01-12', 'Actif'),
    ('SESSION_PRINTEMPS_2025', '2025-04-15', 'Actif'),
    ('SESSION_ETE_2025', '2025-07-08', 'Actif'),
    ('SESSION_AUTOMNE_2025', '2025-10-22', 'Actif'),
    ('SESSION_HIVER_2026', '2026-01-18', 'Actif');

-- Insertion Cours
INSERT INTO Cours (code_cours, description_cours, etat_cours, session_id_session)
VALUES
    ('CS101', 'Introduction aux concepts fondamentaux de l informatique, y compris la programmation de base et les algorithmes.', 'Actif', 1),
    ('MATH200', 'Cours de mathematiques avancees abordant les equations differentielles, les series et l analyse complexe.', 'Actif', 1),
    ('BIO150', 'Exploration des concepts de base de la biologie, y compris la cellule, la genetique, et les bases de l evolution.', 'Actif', 1),
    ('PHYS250', 'Introduction a la physique, avec un accent particulier sur la mecanique et l electromagnetisme.', 'Actif', 2),
    ('CHEM200', 'Chimie generale, avec une etude des elements, des reactions chimiques, et des concepts de la thermodynamique.', 'Actif', 2),
    ('ECON210', 'Introduction a l economie, avec des sujets tels que l offre et la demande, la microeconomie et la macroeconomie.', 'Actif', 3),
    ('ENGR300', 'Principes de la mecanique appliquee, couvrant la statique, la dynamique et l analyse des structures.', 'Actif', 3),
    ('HIST101', 'Cours d histoire generale, abordant les grandes periodes historiques de l Antiquite a la Renaissance.', 'Actif', 4),
    ('MATH300', 'Calcul differentiel avance, axe sur l integration multivariable et les theoremes associes.', 'Actif', 4),
    ('PSY101', 'Introduction a la psychologie, incluant les bases des comportements humains, des emotions et des processus cognitifs.', 'Actif', 5),
    ('CS202', 'Structures de donnees avancees, telles que les listes, les piles, les files, et les arbres binaires.', 'Actif', 5),
    ('MATH400', 'Introduction aux equations differentielles et leur application dans les sciences naturelles et l ingenierie.', 'Actif', 6),
    ('CHEM300', 'Chimie organique, incluant les reactions chimiques des molecules organiques et les mecanismes reactionnels.', 'Actif', 6),
    ('LING101', 'Introduction a la linguistique, etudiant les sons, la syntaxe, et l evolution des langues humaines.', 'Actif', 8);

--Insertition Classe // Pas fonctionnel

INSERT INTO classe (code_cours, description, groupe, professeur_id_professeur, etat_classe, cours_id_cours, cours_session_id_session)
VALUES
-- Professeur 1 : Jean Dupuis (ID Professeur = 1)
('CS101', 'Introduction aux concepts fondamentaux de l informatique, y compris la programmation de base et les algorithmes.', 1, 1, 'Actif', 1, 1),
('MATH200', 'Cours de mathematiques avancees abordant les equations differentielles, les series et l analyse complexe.', 2, 1, 'Actif', 2, 1),
('BIO150', 'Exploration des concepts de base de la biologie, y compris la cellule, la genetique, et les bases de l evolution.', 3, 1, 'Actif', 3, 1),

-- Professeur 2 : Monique Guillaume (ID Professeur = 2)
('PHYS250', 'Introduction a la physique, avec un accent particulier sur la mecanique et l electromagnetisme.', 1, 2, 'Actif', 4, 2),
('CHEM200', 'Chimie generale, avec une etude des elements, des reactions chimiques, et des concepts de la thermodynamique.', 2, 2, 'Actif', 5, 2),
('CS101', 'Introduction aux concepts fondamentaux de l informatique, y compris la programmation de base et les algorithmes.', 3, 2, 'Actif', 1, 1),

-- Professeur 3 : Christian Muller (ID Professeur = 3)
('ENGR300', 'Principes de la mecanique appliquee, couvrant la statique, la dynamique et l analyse des structures.', 1, 3, 'Actif', 7, 3),
('HIST101', 'Cours d histoire generale, abordant les grandes periodes historiques de l Antiquite a la Renaissance.', 2, 3, 'Actif', 8, 4),
('MATH300', 'Calcul differentiel avance, axe sur l integration multivariable et les theoremes associes.', 3, 3, 'Actif', 9, 4),

-- Professeur 4 : Michele Fournier (ID Professeur = 4)
('PSY101', 'Introduction a la psychologie, incluant les bases des comportements humains, des emotions et des processus cognitifs.', 1, 4, 'Actif', 10, 5),
('CS202', 'Structures de donnees avancees, telles que les listes, les piles, les files, et les arbres binaires.', 2, 4, 'Actif', 11, 5),
('MATH400', 'Introduction aux equations differentielles et leur application dans les sciences naturelles et l ingenierie.', 3, 4, 'Actif', 12, 6),

-- Professeur 5 : Denis Dupuis (ID Professeur = 5)
('CHEM300', 'Chimie organique, incluant les reactions chimiques des molecules organiques et les mecanismes reactionnels.', 1, 5, 'Actif', 13, 6), -- SESSION_PRINTEMPS_2025
('BIO150', 'Genetique et biologie moleculaire, avec une etude approfondie de l ADN, de la replication et de la mutation genetique.', 2, 5, 'Actif', 3, 1), -- SESSION_ETE_2025
('PHYS101', 'Physique moderne, centree sur la relativite restreinte, la mecanique quantique et les applications pratiques.', 3, 5, 'Actif', 10, 5), -- SESSION_ETE_2025

-- Professeur 6 : Marion Boucher (ID Professeur = 6)
('ECON310', 'Theorie economique appliquee, couvrant les modeles de croissance economique et les politiques monetaire et fiscales.', 1, 6, 'Actif', 16, 8), -- SESSION_AUTOMNE_2025
('ENGR350', 'Mecanique des fluides, incluant les principes de base des fluides en mouvement et au repos, et leur application dans les systemes industriels.', 2, 6, 'Actif', 17, 8), -- SESSION_AUTOMNE_2025
('MATH500', 'Algebre abstraite, abordant les groupes, les anneaux, les corps, et leur application dans les systemes mathematiques complexes.', 3, 6, 'Actif', 18, 9), -- SESSION_HIVER_2026

-- Professeur 7 : Gérard Tanguy (ID Professeur = 7)
('CS303', 'Conception d algorithmes et analyse de la complexite, incluant les algorithmes de tri, de recherche, et les structures de donnees complexes.', 1, 7, 'Actif', 19, 9), -- SESSION_HIVER_2026
('ART100', 'Introduction a l art, incluant l histoire des mouvements artistiques et l etude des techniques artistiques a travers le temps.', 2, 7, 'Actif', 20, 1), -- SESSION_AUTOMNE_2025
('ENGR400', 'Cours de thermodynamique, centree sur les lois de la thermodynamique et leur application aux systemes physiques et chimiques.', 3, 7, 'Actif', 21, 1), -- SESSION_AUTOMNE_2025

-- Professeur 8 : Bernadette Dupont (ID Professeur = 8)
('PHIL101', 'Introduction a la philosophie, incluant les principales ecoles de pensee, l ethique, et la logique fondamentale.', 1, 8, 'Actif', 22, 2), -- SESSION_AUTOMNE_2025
('SOC101', 'Introduction a la sociologie, abordant les structures sociales, la culture, et le role des institutions dans la societe.', 2, 8, 'Actif', 23, 2), -- SESSION_AUTOMNE_2025
('MATH600', 'Analyse complexe, incluant les fonctions analytiques, les integrales complexes et les series de Laurent.', 3, 8, 'Actif', 24, 2), -- SESSION_HIVER_2026

-- Professeur 9 : Thierry Lemoine (ID Professeur = 9)
('CS404', 'Introduction aux systemes d exploitation, incluant la gestion de la memoire, des processus et des systemes de fichiers.', 1, 9, 'Actif', 25, 2), -- SESSION_HIVER_2026
('LING101', 'Introduction a la linguistique, etudiant les sons, la syntaxe, et l evolution des langues humaines.', 2, 9, 'Actif', 26, 3), -- SESSION_HIVER_2026
('CS101', 'Introduction aux concepts fondamentaux de l informatique, y compris la programmation de base et les algorithmes.', 2, 9, 'Actif', 1, 1), -- SESSION_HIVER_2024

-- Professeur 10 : Hélène Joubert (ID Professeur = 10)
('MATH200', 'Cours de mathematiques avancees abordant les equations differentielles, les series et l analyse complexe.', 1, 10, 'Actif', 2, 1), -- SESSION_HIVER_2024
('BIO150', 'Exploration des concepts de base de la biologie, y compris la cellule, la genetique, et les bases de l evolution.', 2, 10, 'Actif', 3, 1), -- SESSION_HIVER_2024
('PHYS250', 'Introduction a la physique, avec un accent particulier sur la mecanique et l electromagnetisme.', 3, 10, 'Actif', 4, 2), -- SESSION_PRINTEMPS_2024

-- Professeur 11 : Michel Prieur (ID Professeur = 11)
('CHEM200', 'Chimie generale, avec une etude des elements, des reactions chimiques, et des concepts de la thermodynamique.', 1, 11, 'Actif', 5, 2), -- SESSION_PRINTEMPS_2024
('ECON210', 'Introduction a l economie, avec des sujets tels que l offre et la demande, la microeconomie et la macroeconomie.', 2, 11, 'Actif', 6, 3), -- SESSION_ETE_2024
('ENGR300', 'Principes de la mecanique appliquee, couvrant la statique, la dynamique et l analyse des structures.', 3, 11, 'Actif', 7, 3); -- SESSION_ETE_2024

-- Professeur 12 : Sylvie Gagnon (ID Professeur = 12)
('HIST101', 'Cours d histoire generale, abordant les grandes periodes historiques de l Antiquite a la Renaissance.', 1, 12, 'Actif', 8, 4), -- SESSION_AUTOMNE_2024
('MATH300', 'Calcul differentiel avance, axe sur l integration multivariable et les theoremes associes.', 2, 12, 'Actif', 9, 4), -- SESSION_AUTOMNE_2024
('PSY101', 'Introduction a la psychologie, incluant les bases des comportements humains, des emotions et des processus cognitifs.', 3, 12, 'Actif', 10, 5), -- SESSION_HIVER_2025

-- Professeur 13 : Nathalie Renard (ID Professeur = 13)
('CS202', 'Structures de donnees avancees, telles que les listes, les piles, les files, et les arbres binaires.', 1, 13, 'Actif', 11, 5), -- SESSION_HIVER_2025
('MATH400', 'Introduction aux equations differentielles et leur application dans les sciences naturelles et l ingenierie.', 2, 13, 'Actif', 12, 6), -- SESSION_PRINTEMPS_2025
('CHEM300', 'Chimie organique, incluant les reactions chimiques des molecules organiques et les mecanismes reactionnels.', 3, 13, 'Actif', 13, 6), -- SESSION_PRINTEMPS_2025

-- Professeur 14 : Brigitte Vachon (ID Professeur = 14)
('BIO200', 'Genetique et biologie moleculaire, avec une etude approfondie de l ADN, de la replication et de la mutation genetique.', 1, 14, 'Actif', 14, 7), -- SESSION_ETE_2025
('PHYS300', 'Physique moderne, centree sur la relativite restreinte, la mecanique quantique et les applications pratiques.', 2, 14, 'Actif', 15, 7), -- SESSION_ETE_2025
('ECON310', 'Theorie economique appliquee, couvrant les modeles de croissance economique et les politiques monetaire et fiscales.', 3, 14, 'Actif', 16, 8), -- SESSION_AUTOMNE_2025

-- Professeur 15 : François Valois (ID Professeur = 15)
('ENGR350', 'Mecanique des fluides, incluant les principes de base des fluides en mouvement et au repos, et leur application dans les systemes industriels.', 1, 15, 'Actif', 17, 8), -- SESSION_AUTOMNE_2025
('MATH500', 'Algebre abstraite, abordant les groupes, les anneaux, les corps, et leur application dans les systemes mathematiques complexes.', 2, 15, 'Actif', 18, 9), -- SESSION_HIVER_2026
('CS303', 'Conception d algorithmes et analyse de la complexite, incluant les algorithmes de tri, de recherche, et les structures de donnees complexes.', 3, 15, 'Actif', 19, 9); -- SESSION_HIVER_2026


-- Etudiant 1 : Pierre Dupuis (ID 16)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(16, 1), (16, 2), (16, 3), (16, 4), (16, 5),
(16, 6), (16, 7), (16, 8), (16, 9), (16, 10);

-- Etudiant 2 : Monique Guillaume (ID 17)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(17, 11), (17, 12), (17, 13), (17, 14), (17, 15),
(17, 16), (17, 17), (17, 18), (17, 19), (17, 20);

-- Etudiant 3 : Christian Muller (ID 18)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(18, 21), (18, 22), (18, 23), (18, 24), (18, 25),
(18, 26), (18, 27), (18, 28), (18, 29), (18, 30);

-- Etudiant 4 : Michele Fournier (ID 19)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(19, 31), (19, 32), (19, 33), (19, 34), (19, 35),
(19, 36), (19, 37), (19, 38), (19, 39), (19, 40);

-- Etudiant 5 : Denis Dupuis (ID 20)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(20, 41), (20, 42), (20, 43), (20, 44), (20, 45),
(20, 46), (20, 47), (20, 48), (20, 49), (20, 50);

-- Etudiant 6 : Marion Boucher (ID 21)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(21, 51), (21, 52), (21, 53), (21, 54), (21, 55),
(21, 56), (21, 57), (21, 58), (21, 59), (21, 60);

-- Etudiant 7 : Gérard Tanguy (ID 22)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(22, 61), (22, 62), (22, 63), (22, 64), (22, 65),
(22, 66), (22, 67), (22, 68), (22, 69), (22, 70);

-- Etudiant 8 : Bernadette Dupont (ID 23)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(23, 71), (23, 72), (23, 73), (23, 74), (23, 75),
(23, 76), (23, 77), (23, 78), (23, 79), (23, 80);

-- Etudiant 9 : Thierry Lemoine (ID 24)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(24, 81), (24, 82), (24, 83), (24, 84), (24, 85),
(24, 86), (24, 87), (24, 88), (24, 89), (24, 90);

-- Etudiant 10 : Hélène Joubert (ID 25)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(25, 91), (25, 92), (25, 93), (25, 94), (25, 95),
(25, 96), (25, 97), (25, 98), (25, 99), (25, 100);

-- Etudiant 11 : Michel Prieur (ID 26)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(26, 101), (26, 102), (26, 103), (26, 104), (26, 105),
(26, 106), (26, 107), (26, 108), (26, 109), (26, 110);

-- Etudiant 12 : Sylvie Gagnon (ID 27)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(27, 111), (27, 112), (27, 113), (27, 114), (27, 115),
(27, 116), (27, 117), (27, 118), (27, 119), (27, 120);

-- Etudiant 13 : Nathalie Renard (ID 28)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(28, 121), (28, 122), (28, 123), (28, 124), (28, 125),
(28, 126), (28, 127), (28, 128), (28, 129), (28, 130);

-- Etudiant 14 : Brigitte Vachon (ID 29)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(29, 131), (29, 132), (29, 133), (29, 134), (29, 135),
(29, 136), (29, 137), (29, 138), (29, 139), (29, 140);

-- Etudiant 15 : François Valois (ID 30)
INSERT INTO etudiant_classe (etudiant_id_etudiant, classe_id_classe) VALUES
(30, 141), (30, 142), (30, 143), (30, 144), (30, 145),
(30, 146), (30, 147), (30, 148), (30, 149), (30, 150);
-- Fin Insertion pour le Prototype --

