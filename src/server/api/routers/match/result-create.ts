import { ResultCreateSchema } from "~/lib/zod";
import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";
import { Results } from "~/server/database/schema";
import { HOME_CACHE_KEY } from "~/lib/const";
import { LocalCache } from "~/server/cache";

export const MatchResultCreateRoute = publicProcedure
  .input(ResultCreateSchema)
  .mutation(async ({ input }) => {

    LocalCache.del(HOME_CACHE_KEY)

    await db.insert(Results).values({
      src: input.src,
      type: input.type,
      thumbnail: input.thumbnail,
    });
  });
