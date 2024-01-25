import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";
import { Results } from "~/server/database/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const MatchResultDeleteRoute = publicProcedure
  .input(z.number().int())
  .mutation(async ({ input }) => {
    await db.delete(Results).where(eq(Results.id, input));
  });
