
-- Debut Insertion pour le Prototype --

-- Insertion des Utilisateur
INSERT INTO utilisateur (id_user, nom_user, mot_de_passe, email, type_utilisateur, etat_utilisateur, id_professeur, id_etudiant)
VALUES

-- Insertion des Utilisateur/professeur
    (1, 'Jean_Dupont', 'JdP@ss123', 'jean.dupont@example.com', 'p', 'A', 1, NULL),
    (2, 'Marie_Curie', 'McP@ss456', 'marie.curie@example.com', 'p', 'A', 2, NULL),
    (3, 'Albert_Einstein', 'AeP@ss789', 'albert.einstein@example.com', 'p', 'A', 3, NULL),
    (4, 'Isaac_Newton', 'InP@ss101', 'isaac.newton@example.com', 'p', 'A', 4, NULL),
    (5, 'Leonard_DaVinci', 'LdP@ss102', 'leonard.davinci@example.com', 'p', 'A', 5, NULL),
    (6, 'Nikola_Tesla', 'NtP@ss103', 'nikola.tesla@example.com', 'p', 'A', 6, NULL),
    (7, 'Galileo_Galilei', 'GgP@ss104', 'galileo.galilei@example.com', 'p', 'A', 7, NULL),
    (8, 'Ada_Lovelace', 'AlP@ss105', 'ada.lovelace@example.com', 'p', 'A', 8, NULL),
    (9, 'Alan_Turing', 'AtP@ss106', 'alan.turing@example.com', 'p', 'A', 9, NULL),
    (10, 'Richard_Feynman', 'RfP@ss107', 'richard.feynman@example.com', 'p', 'A', 10, NULL),
    (11, 'Carl_Sagan', 'CsP@ss108', 'carl.sagan@example.com', 'p', 'A', 11, NULL),
    (12, 'Stephen_Hawking', 'ShP@ss109', 'stephen.hawking@example.com', 'p', 'A', 12, NULL),
    (13, 'Rosalind_Franklin', 'RfP@ss110', 'rosalind.franklin@example.com', 'p', 'A', 13, NULL),
    (14, 'Katherine_Johnson', 'KjP@ss111', 'katherine.johnson@example.com', 'p', 'A', 14, NULL),
    (15, 'Dmitri_Mendeleev', 'DmP@ss112', 'dmitri.mendeleev@example.com', 'p', 'A', 15, NULL),
    (16, 'Niels_Bohr', 'NbP@ss113', 'niels.bohr@example.com', 'p', 'A', 16, NULL),
    (17, 'Max_Planck', 'MpP@ss114', 'max.planck@example.com', 'p', 'A', 17, NULL),
    (18, 'Emmy_Noether', 'EnP@ss115', 'emmy.noether@example.com', 'p', 'A', 18, NULL),
    (19, 'Barbara_McClintock', 'BmP@ss116', 'barbara.mcclintock@example.com', 'p', 'A', 19, NULL),
    (20, 'Dorothy_Hodgkin', 'DhP@ss117', 'dorothy.hodgkin@example.com', 'p', 'A', 20, NULL),
    (21, 'Subrahmanyan_Chandrasekhar', 'ScP@ss118', 'subrahmanyan.chandrasekhar@example.com', 'p', 'A', 21, NULL),
    (22, 'Michael_Faraday', 'MfP@ss119', 'michael.faraday@example.com', 'p', 'A', 22, NULL),
    (23, 'James_Maxwell', 'JmP@ss120', 'james.maxwell@example.com', 'p', 'A', 23, NULL),
    (24, 'Erwin_Schrodinger', 'EsP@ss121', 'erwin.schrodinger@example.com', 'p', 'A', 24, NULL),
    (25, 'Richard_Dawkins', 'RdP@ss122', 'richard.dawkins@example.com', 'p', 'A', 25, NULL),

    -- Insertion des Utilisateur/étudiants
    (26, 'Alice_Martin', 'AmE@ss201', 'alice.martin@example.com', 'e', 'A', NULL, 26),
    (27, 'Bob_Lemoine', 'BlE@ss202', 'bob.lemoine@example.com', 'e', 'A', NULL, 27),
    (28, 'Charlie_Dupuis', 'CdE@ss203', 'charlie.dupuis@example.com', 'e', 'A', NULL, 28),
    (29, 'David_Bernard', 'DbE@ss204', 'david.bernard@example.com', 'e', 'A', NULL, 29),
    (30, 'Emma_Leclerc', 'ElE@ss205', 'emma.leclerc@example.com', 'e', 'A', NULL, 30),
    (31, 'Felix_Roux', 'FrE@ss206', 'felix.roux@example.com', 'e', 'A', NULL, 31),
    (32, 'Gabrielle_Andre', 'GaE@ss207', 'gabrielle.andre@example.com', 'e', 'A', NULL, 32),
    (33, 'Hugo_Morel', 'HmE@ss208', 'hugo.morel@example.com', 'e', 'A', NULL, 33),
    (34, 'Isabelle_Fournier', 'IfE@ss209', 'isabelle.fournier@example.com', 'e', 'A', NULL, 34),
    (35, 'Julien_Guillot', 'JgE@ss210', 'julien.guillot@example.com', 'e', 'A', NULL, 35),
    (36, 'Karine_Durand', 'KdE@ss211', 'karine.durand@example.com', 'e', 'A', NULL, 36),
    (37, 'Luc_Mercier', 'LmE@ss212', 'luc.mercier@example.com', 'e', 'A', NULL, 37),
    (38, 'Manon_Germain', 'MgE@ss213', 'manon.germain@example.com', 'e', 'A', NULL, 38),
    (39, 'Nicolas_Delahaye', 'NdE@ss214', 'nicolas.delahaye@example.com', 'e', 'A', NULL, 39),
    (40, 'Olivier_Lemoine', 'OlE@ss215', 'olivier.lemoine@example.com', 'e', 'A', NULL, 40),
    (41, 'Pauline_Denis', 'PdE@ss216', 'pauline.denis@example.com', 'e', 'A', NULL, 41),
    (42, 'Quentin_Gosselin', 'QgE@ss217', 'quentin.gosselin@example.com', 'e', 'A', NULL, 42),
    (43, 'Raphael_Caron', 'RcE@ss218', 'raphael.caron@example.com', 'e', 'A', NULL, 43),
    (44, 'Sophie_Morel', 'SmE@ss219', 'sophie.morel@example.com', 'e', 'A', NULL, 44),
    (45, 'Thomas_Benoit', 'TbE@ss220', 'thomas.benoit@example.com', 'e', 'A', NULL, 45),
    (46, 'Ursula_Perrot', 'UpE@ss221', 'ursula.perrot@example.com', 'e', 'A', NULL, 46),
    (47, 'Victor_Aubert', 'VaE@ss222', 'victor.aubert@example.com', 'e', 'A', NULL, 47),
    (48, 'William_Lucas', 'WlE@ss223', 'william.lucas@example.com', 'e', 'A', NULL, 48),
    (49, 'Xavier_Guichard', 'XgE@ss224', 'xavier.guichard@example.com', 'e', 'A', NULL, 49);

--Insertion Session
INSERT INTO session (id_session, code_session, date_session, etat_session)
VALUES
    (1, 'SESSION_HIVER_2024', '2024-01-15', 'A'),
    (2, 'SESSION_PRINTEMPS_2024', '2024-04-10', 'A'),
    (3, 'SESSION_ETE_2024', '2024-07-05', 'A'),
    (4, 'SESSION_AUTOMNE_2024', '2024-10-20', 'A'),
    (5, 'SESSION_HIVER_2025', '2025-01-12', 'A'),
    (6, 'SESSION_PRINTEMPS_2025', '2025-04-15', 'A'),
    (7, 'SESSION_ETE_2025', '2025-07-08', 'A'),
    (8, 'SESSION_AUTOMNE_2025', '2025-10-22', 'A'),
    (9, 'SESSION_HIVER_2026', '2026-01-18', 'A'),
    (10, 'SESSION_PRINTEMPS_2026', '2026-04-12', 'A'),
    (11, 'SESSION_ETE_2026', '2026-07-10', 'A'),
    (12, 'SESSION_AUTOMNE_2026', '2026-10-25', 'A'),
    (13, 'SESSION_HIVER_2027', '2027-01-14', 'A'),
    (14, 'SESSION_PRINTEMPS_2027', '2027-04-18', 'A'),
    (15, 'SESSION_ETE_2027', '2027-07-12', 'A'),
    (16, 'SESSION_AUTOMNE_2027', '2027-10-28', 'A'),
    (17, 'SESSION_HIVER_2028', '2028-01-20', 'A'),
    (18, 'SESSION_PRINTEMPS_2028', '2028-04-22', 'A'),
    (19, 'SESSION_ETE_2028', '2028-07-15', 'A'),
    (20, 'SESSION_AUTOMNE_2028', '2028-10-30', 'A');

--Insertion Cours
INSERT INTO Cours (id_cours, code_cours, description_cours, etat_cours, session_id_session)
VALUES
    (1, 'CS101', 'Introduction aux concepts fondamentaux de l informatique, y compris la programmation de base et les algorithmes.', 1, 1),
    (2, 'MATH200', 'Cours de mathematiques avancees abordant les equations differentielles, les series et l analyse complexe.', 1, 1),
    (3, 'BIO150', 'Exploration des concepts de base de la biologie, y compris la cellule, la genetique, et les bases de l evolution.', 1, 1),
    (4, 'PHYS250', 'Introduction a la physique, avec un accent particulier sur la mecanique et l electromagnetisme.', 1, 2),
    (5, 'CHEM200', 'Chimie generale, avec une etude des elements, des reactions chimiques, et des concepts de la thermodynamique.', 1, 2),
    (6, 'ECON210', 'Introduction a l economie, avec des sujets tels que l offre et la demande, la microeconomie et la macroeconomie.', 1, 3),
    (7, 'ENGR300', 'Principes de la mecanique appliquee, couvrant la statique, la dynamique et l analyse des structures.', 1, 3),
    (8, 'HIST101', 'Cours d histoire generale, abordant les grandes periodes historiques de l Antiquite a la Renaissance.', 1, 4),
    (9, 'MATH300', 'Calcul differentiel avance, axe sur l integration multivariable et les theoremes associes.', 1, 4),
    (10, 'PSY101', 'Introduction a la psychologie, incluant les bases des comportements humains, des emotions et des processus cognitifs.', 1, 5),
    (11, 'CS202', 'Structures de donnees avancees, telles que les listes, les piles, les files, et les arbres binaires.', 1, 5),
    (12, 'MATH400', 'Introduction aux equations differentielles et leur application dans les sciences naturelles et l ingenierie.', 0, 6),
    (13, 'CHEM300', 'Chimie organique, incluant les reactions chimiques des molecules organiques et les mecanismes reactionnels.', 1, 6),
    (14, 'BIO200', 'Genetique et biologie moleculaire, avec une etude approfondie de l ADN, de la replication et de la mutation genetique.', 1, 7),
    (15, 'PHYS300', 'Physique moderne, centree sur la relativite restreinte, la mecanique quantique et les applications pratiques.', 0, 7),
    (16, 'ECON310', 'Theorie economique appliquee, couvrant les modeles de croissance economique et les politiques monetaire et fiscales.', 1, 8),
    (17, 'ENGR350', 'Mecanique des fluides, incluant les principes de base des fluides en mouvement et au repos, et leur application dans les systemes industriels.', 1, 8),
    (18, 'MATH500', 'Algebre abstraite, abordant les groupes, les anneaux, les corps, et leur application dans les systemes mathematiques complexes.', 0, 9),
    (19, 'CS303', 'Conception d algorithmes et analyse de la complexite, incluant les algorithmes de tri, de recherche, et les structures de donnees complexes.', 1, 9),
    (20, 'ART100', 'Introduction a l art, incluant l histoire des mouvements artistiques et l etude des techniques artistiques a travers le temps.', 1, 10),
    (21, 'ENGR400', 'Cours de thermodynamique, centree sur les lois de la thermodynamique et leur application aux systemes physiques et chimiques.', 1, 10),
    (22, 'PHIL101', 'Introduction a la philosophie, incluant les principales ecoles de pensee, l ethique, et la logique fondamentale.', 1, 11),
    (23, 'SOC101', 'Introduction a la sociologie, abordant les structures sociales, la culture, et le role des institutions dans la societe.', 1, 11),
    (24, 'MATH600', 'Analyse complexe, incluant les fonctions analytiques, les integrales complexes et les series de Laurent.', 0, 12),
    (25, 'CS404', 'Introduction aux systemes d exploitation, incluant la gestion de la memoire, des processus et des systemes de fichiers.', 1, 12),
    (26, 'LING101', 'Introduction a la linguistique, etudiant les sons, la syntaxe, et l evolution des langues humaines.', 1, 13);

-- Fin Insertion pour le Prototype --

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

INSERT INTO professeur (nom_complet, etat_professeur, utilisateur_id_user) VALUES
    ('Jean Dupont', 'A', 1),
    ('Marie Curie', 'A', 2),
    ('Albert Einstein', 'A', 3),
    ('Isaac Newton', 'A', 4),
    ('Leonard Da Vinci', 'A', 5),
    ('Nikola Tesla', 'A', 6),
    ('Galileo Galilei', 'A', 7),
    ('Ada Lovelace', 'A', 8),
    ('Alan Turing', 'A', 9),
    ('Richard Feynman', 'A', 10),
    ('Carl Sagan', 'A', 11),
    ('Stephen Hawking', 'A', 12),
    ('Rosalind Franklin', 'A', 13),
    ('Katherine Johnson', 'A', 14),
    ('Dmitri Mendeleev', 'A', 15),
    ('Niels Bohr', 'A', 16),
    ('Max Planck', 'A', 17),
    ('Emmy Noether', 'A', 18),
    ('Barbara McClintock', 'A', 19),
    ('Dorothy Hodgkin', 'A', 20),
    ('Subrahmanyan Chandrasekhar', 'A', 21),
    ('Michael Faraday', 'A', 22),
    ('James Maxwell', 'A', 23),
    ('Erwin Schrodinger', 'A', 24),
    ('Richard Dawkins', 'A', 25);

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

