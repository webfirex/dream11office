import { MatchCreateSchema } from "~/lib/zod";
import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";
import { Matches } from "~/server/database/schema";

export const MatchCreateRoute = publicProcedure
  .input(MatchCreateSchema)
  .mutation(async ({ input }) => {
    await db.insert(Matches).values({
      ...input,
    });
  });
