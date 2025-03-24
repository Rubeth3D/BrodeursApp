
-- Debut Insertion pour le Prototype --

-- Insertion des Utilisateur

-- Insertion des Utilisateur/professeur
INSERT INTO utilisateur (nom, prenom, nom_utilisateur, courriel, mot_passe, etat_utilisateur, type_utilisateur, professeur_id_professeur, etudiant_id_etudiant)
VALUES
    ('Jean', 'Dupont', 'blueTiger_01', 'jean.dupont@example.com', 'JdP@ss123', 'Actif', 'E', NULL, 1),
    ('Alice', 'Durand', 'sunnyAlice_24', 'alice.durand@example.com', 'A@l1ceD123', 'Actif', 'E', NULL, 2),
    ('Marc', 'Lemoine', 'marcoL@85', 'marc.lemoine@example.com', 'M@rcL1m01ne', 'Actif', 'E', NULL, 3),
    ('Sophie', 'Bernard', 'purpleMoon_44', 'sophie.bernard@example.com', 'S0ph!eB3rn4rd', 'Actif', 'E', NULL, 4),
    ('Luc', 'Martin', 'nightRider_08', 'luc.martin@example.com', 'L!cM@rt1n123', 'Actif', 'E', NULL, 5),
    ('Julie', 'Robert', 'mystic_Jules12', 'julie.robert@example.com', 'Juli3_R0b!rt', 'Actif', 'E', NULL, 6),
    ('David', 'Petit', 'bigD@ve_99', 'david.petit@example.com', 'D@v!dP3t1t', 'Actif', 'E', NULL, 7),
    ('Clara', 'Roux', 'starryClara_56', 'clara.roux@example.com', 'Cl@ra_R0ux', 'Actif', 'E', NULL, 8),
    ('Maxime', 'Leblanc', 'maxPower_93', 'maxime.leblanc@example.com', 'M@x1m3_L3bl@nc', 'Actif', 'E', NULL, 9),
    ('Elise', 'Meunier', 'sweetElise_13', 'elise.meunier@example.com', 'E!l1s3M3un13r', 'Actif', 'E', NULL, 10),
    ('Paul', 'Garnier', 'paul_theGreat_57', 'paul.garnier@example.com', 'P@ulG@rn13r', 'Actif', 'E', NULL, 11),
    ('Emma', 'Lemoine', 'greenDream_02', 'emma.lemoine@example.com', '3mm@L3m01ne', 'Actif', 'E', NULL, 12),
    ('Antoine', 'Chauvet', 'courageAntoine_21', 'antoine.chauvet@example.com', '4nt01n3_Ch@uv3t', 'Actif', 'E', NULL, 13),
    ('Isabelle', 'Petit', 'luckyIsabelle_33', 'isabelle.petit@example.com', 'I$@b3ll3P3t1t', 'Actif', 'E', NULL, 14),
    ('Nicolas', 'Gauthier', 'nicoFlash_09', 'nicolas.gauthier@example.com', 'N!c0l@sg@uth13r', 'Actif', 'E', NULL, 15),
    ('Julie', 'Meunier', 'julesTheExplorer_16', 'julie.meunier2@example.com', 'J!ul13_Meun13r', 'Actif', 'E', NULL, 16),
    ('Vincent', 'Granger', 'vinnyG_45', 'vincent.granger@example.com', 'V!nc3nt_Gr@ng3r', 'Actif', 'E', NULL, 17),
    ('Charlotte', 'Vidal', 'violetSoul_11', 'charlotte.vidal@example.com', 'Ch@rl0tt3V!d@l', 'Actif', 'E', NULL, 18),
    ('Julien', 'Robert', 'juliusR_29', 'julien.robert@example.com', 'Jul13n_R0b3rt', 'Actif', 'E', NULL, 19),
    ('Celine', 'Sanchez', 'celinePower_88', 'celine.sanchez@example.com', 'C3l1n3S@nch3z', 'Actif', 'E', NULL, 20),
    ('Florence', 'Dufresne', 'florenceFury_01', 'florence.dufresne@example.com', 'F10r3nc3D@fr3sn3', 'Actif', 'E', NULL, 21),
    ('Thierry', 'Lemoine', 'sirThierry_47', 'thierry.lemoine@example.com', 'Th!3rry_L3m01n3', 'Actif', 'E', NULL, 22),
    ('Valerie', 'Bernard', 'valerieTheWind_34', 'valerie.bernard@example.com', 'V@l3r13_B3rn4rd', 'Actif', 'E', NULL, 23),
    ('Pauline', 'Lemoine', 'moonlightPauline_77', 'pauline.lemoine@example.com', 'P@ul!n3L3m01n3', 'Actif', 'E', NULL, 24),
    ('Laurent', 'Dufresne', 'laurentStorm_99', 'laurent.dufresne@example.com', 'L@ur3ntD@fr3sn3', 'Actif', 'E', NULL, 25);

 -- Insertion des Utilisateur/étudiants
INSERT INTO utilisateur (nom, prenom, nom_utilisateur, courriel, mot_passe, etat_utilisateur, type_utilisateur, professeur_id_professeur, etudiant_id_etudiant)
VALUES
    ('Pierre', 'Dupuis', 'mightyPierre_34', 'pierre.dupuis@example.com', 'P!3rr3D@pu1s', 'Actif', 'P', 1, NULL),
    ('Monique', 'Guillaume', 'sunshineMonique_59', 'monique.guillaume@example.com', 'M0n!qu3G!u1ll@um3', 'Actif', 'P', 2, NULL),
    ('Christian', 'Muller', 'techChris_72', 'christian.muller@example.com', 'Chr!st!anMull3r', 'Actif', 'P', 3, NULL),
    ('Michele', 'Fournier', 'michelle_fairy_99', 'michele.fournier@example.com', 'M!ch3l3F0urn!3r', 'Actif', 'P', 4, NULL),
    ('Denis', 'Dupuis', 'denis_theWise_08', 'denis.dupuis@example.com', 'D3n!sD@pu!s', 'Actif', 'P', 5, NULL),
    ('Marion', 'Boucher', 'bloomMarion_23', 'marion.boucher@example.com', 'M@r!0nB0uch3r', 'Actif', 'P', 6, NULL),
    ('Gérard', 'Tanguy', 'gerard_mage_64', 'gerard.tanguy@example.com', 'G!r@rdT@ng!y', 'Actif', 'P', 7, NULL),
    ('Bernadette', 'Dupont', 'burningBernadette_22', 'bernadette.dupont@example.com', 'B3rn@d3tt3Dup0nt', 'Actif', 'P', 8, NULL),
    ('Thierry', 'Lemoine', 'thunderThierry_81', 'thierry.lemoine@example.com', 'Th!3rry_L3m01n3', 'Actif', 'P', 9, NULL),
    ('Hélène', 'Joubert', 'hurricaneHelene_14', 'helene.joubert@example.com', 'H3l3n3J0ub3rt', 'Actif', 'P', 10, NULL),
    ('Michel', 'Prieur', 'priestMichel_78', 'michel.prieur@example.com', 'M!ch3lPr13ur', 'Actif', 'P', 11, NULL),
    ('Sylvie', 'Gagnon', 'gagaSylvie_44', 'sylvie.gagnon@example.com', 'S!lv13G@g4n0n', 'Actif', 'P', 12, NULL),
    ('Nathalie', 'Renard', 'riskyNathalie_35', 'nathalie.renard@example.com', 'N@th@l13R3n@rd', 'Actif', 'P', 13, NULL),
    ('Brigitte', 'Vachon', 'brigitteLion_29', 'brigitte.vachon@example.com', 'Br!gg!t3V@ch0n', 'Actif', 'P', 14, NULL),
    ('François', 'Valois', 'valiantFrancois_56', 'francois.valois@example.com', 'Fr@nc01sV@l0!s', 'Actif', 'P', 15, NULL),
    ('Claude', 'Lemoine', 'coolClaude_09', 'claude.lemoine@example.com', 'Cl@ud3_L3m01n3', 'Actif', 'P', 16, NULL),
    ('Jacqueline', 'Morin', 'jacq_queen_13', 'jacqueline.morin@example.com', 'J@cqu3l!n3M0r1n', 'Actif', 'P', 17, NULL),
    ('Patrick', 'Lemoine', 'patrickPower_21', 'patrick.lemoine@example.com', 'P@tr1ck_L3m01n3', 'Actif', 'P', 18, NULL),
    ('Jacques', 'Robert', 'robertJ_64', 'jacques.robert@example.com', 'J@cq!s_R0b3rt', 'Actif', 'P', 19, NULL),
    ('Éric', 'Boucher', 'epicEric_37', 'eric.boucher@example.com', '3r!cB0uch3r', 'Actif', 'P', 20, NULL),
    ('Franck', 'Dufresne', 'dufresneForce_23', 'franck.dufresne@example.com', 'Fr@ncK_DuFr3sn3', 'Actif', 'P', 21, NULL),
    ('Michel', 'Petit', 'petitPanda_05', 'michel.petit@example.com', 'M!ch3lP3t1t', 'Actif', 'P', 22, NULL),
    ('Jean-Luc', 'Vidal', 'lucidJean_92', 'jeanluc.vidal@example.com', 'J3@nlucV!d@l', 'Actif', 'P', 23, NULL),
    ('Lucie', 'Beaulieu', 'luckyLucie_66', 'lucie.beaulieu@example.com', 'L!c13B3@ul13u', 'Actif', 'P', 24, NULL),
    ('Gilbert', 'Mallet', 'gilbertStar_47', 'gilbert.mallet@example.com', 'G!lb3rt_M@ll3t', 'Actif', 'P', 25, NULL);


--Insertion professeur
INSERT INTO professeur (id_professeur, nom_complet, etat_professeur, utilisateur_id_user) 
VALUES
    ( 'Jean Dupont', 'A', 1),
    ( 'Marie Curie', 'A', 2),
    ( 'Albert Einstein', 'A', 3),
    ( 'Isaac Newton', 'A', 4),
    ( 'Leonard Da Vinci', 'A', 5),
    ( 'Nikola Tesla', 'A', 6),
    ( 'Galileo Galilei', 'A', 7),
    ( 'Ada Lovelace', 'A', 8),
    ( 'Alan Turing', 'A', 9),
    ( 'Richard Feynman', 'A', 10),
    ( 'Carl Sagan', 'A', 11),
    ( 'Stephen Hawking', 'A', 12),
    ( 'Rosalind Franklin', 'A', 13),
    ( 'Katherine Johnson', 'A', 14),
    ( 'Dmitri Mendeleev', 'A', 15),
    ( 'Niels Bohr', 'A', 16),
    ( 'Max Planck', 'A', 17),
    ( 'Emmy Noether', 'A', 18),
    ( 'Barbara McClintock', 'A', 19),
    ( 'Dorothy Hodgkin', 'A', 20),
    ( 'Subrahmanyan Chandrasekhar', 'A', 21),
    ( 'Michael Faraday', 'A', 22),
    ( 'James Maxwell', 'A', 23),
    ( 'Erwin Schrodinger', 'A', 24),
    ( 'Richard Dawkins', 'A', 25);

--Insertion Session
INSERT INTO Session (code_session, date_session, etat_session)
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




