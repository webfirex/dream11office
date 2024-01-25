import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";

export const MatchResultListRoute = publicProcedure.query(async () => {
  const AllResults = await db.query.Results.findMany();

  return {
    matches: AllResults,
    total: AllResults.length,
  };
});
