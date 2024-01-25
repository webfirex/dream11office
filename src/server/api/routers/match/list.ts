import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";

export const MatchListRoute = publicProcedure.query(async () => {
  const IndiaDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const AllMatches = await db.query.Matches.findMany({
    where: (match, { and, lte, gte }) => {
      return and(
        lte(match.startDate, IndiaDate),
        gte(match.endDate, IndiaDate)
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
      endDate: true,
      startDate: true,
    },
  });

  return {
    matches: AllMatches,
    total: AllMatches.length,
  };
});
