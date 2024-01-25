import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";
import { Matches } from "~/server/database/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";

export const MatchDeleteRoute = publicProcedure
  .input(z.number().int())
  .mutation(async ({ input }) => {
    await db.delete(Matches).where(eq(Matches.id, input));
  });
