import { MatchCreateSchema } from "~/lib/zod";
import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";
import { Matches } from "~/server/database/schema";
import { LocalCache } from "~/server/cache";
import { HOME_CACHE_KEY } from "~/lib/const";

export const MatchCreateRoute = publicProcedure
  .input(MatchCreateSchema)
  .mutation(async ({ input }) => {

    LocalCache.del(HOME_CACHE_KEY)

    await db.insert(Matches).values({
      ...input,
    });
  });
