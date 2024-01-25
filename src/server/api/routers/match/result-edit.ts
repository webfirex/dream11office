import { ResultBaseSchema } from "~/lib/zod";
import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";
import { Results } from "~/server/database/schema";
import { eq } from "drizzle-orm";

export const MatchResultEditRoute = publicProcedure
  .input(ResultBaseSchema)
  .mutation(async ({ input }) => {
    await db
      .update(Results)
      .set({
        src: input.src,
        type: input.type,
        thumbnail: input.thumbnail,
      })
      .where(eq(Results.id, input.id));
  });
