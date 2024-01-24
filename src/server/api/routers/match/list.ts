import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";

export const MatchListRoute = publicProcedure.query(async () => {
  const AllMatches = await db.query.Matches.findMany({
    where: (match, { and, lte, gte }) => {
      // ISO Date String
      return and(
        lte(match.startDate, new Date(new Date().toUTCString())),
        gte(match.endDate, new Date(new Date().toUTCString()))
      );
    },

    columns: {
      banner: true,
      date: true,
      description: true,
      id: true,
      subTitle: true,
      title: true,
      ranks: true,
    },
  });

  return {
    matches: AllMatches,
    total: AllMatches.length,
  };
});
