
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db, queryClient } from '~/server/database';


// This will run migrations on the database, skipping the ones already applied
await migrate(db, { migrationsFolder: './drizzle/main' });

// Don't forget to close the connection, otherwise the script will hang
await queryClient.end();