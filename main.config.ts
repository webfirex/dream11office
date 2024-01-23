import { type Config } from "drizzle-kit";
import { env } from "~/env";

export default {
  schema: "./src/server/database/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DB_URL,
  },
  out: "./drizzle/main",
} satisfies Config;
