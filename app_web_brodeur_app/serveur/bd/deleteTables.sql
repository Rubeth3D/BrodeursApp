DO $$ 
DECLARE
    r RECORD;
BEGIN
    -- Parcours de toutes les tables dans le schéma public
    FOR r IN (SELECT tablename FROM pg_tables WHERE schemaname = 'public') LOOP
        -- Suppression de la table
        EXECUTE 'DROP TABLE IF EXISTS public.' || r.tablename || ' CASCADE';
    END LOOP;
END $$;
=======
END $$;
