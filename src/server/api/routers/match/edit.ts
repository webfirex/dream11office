import { MatchBaseSchema } from "~/lib/zod";
import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";
import { Matches } from "~/server/database/schema";
import { eq } from "drizzle-orm";
import { HOME_CACHE_KEY } from "~/lib/const";
import { LocalCache } from "~/server/cache";

export const MatchEditRoute = publicProcedure
  .input(MatchBaseSchema)
  .mutation(async ({ input }) => {

    LocalCache.del(HOME_CACHE_KEY)

    await db
      .update(Matches)
      .set({
        banner: input.banner,
        title: input.title,
        subTitle: input.subTitle,
        date: input.date,
        description: input.description,
        startDate: input.startDate,
        endDate: input.endDate,
        ranks: input.ranks,
      })
      .where(eq(Matches.id, input.id));
  });
