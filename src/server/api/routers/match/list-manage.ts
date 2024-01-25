import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";

export const MatchManageListRoute = publicProcedure.query(async () => {
  const AllResults = await db.query.Matches.findMany();

  return {
    matches: AllResults,
    total: AllResults.length,
  };
});
