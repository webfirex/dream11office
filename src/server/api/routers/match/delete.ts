import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";
import { Matches } from "~/server/database/schema";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { HOME_CACHE_KEY } from "~/lib/const";
import { LocalCache } from "~/server/cache";

export const MatchDeleteRoute = publicProcedure
  .input(z.number().int())
  .mutation(async ({ input }) => {

    LocalCache.del(HOME_CACHE_KEY)

    await db.delete(Matches).where(eq(Matches.id, input));
  });
