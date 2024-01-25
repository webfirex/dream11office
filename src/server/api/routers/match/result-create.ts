import { ResultCreateSchema } from "~/lib/zod";
import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";
import { Results } from "~/server/database/schema";

export const MatchResultCreateRoute = publicProcedure
  .input(ResultCreateSchema)
  .mutation(async ({ input }) => {
    await db.insert(Results).values({
      src: input.src,
      type: input.type,
      thumbnail: input.thumbnail,
    });
  });
