import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { QROPay } from "~/lib/qropay";
import { db } from "~/server/database";
import { Transactions } from "~/server/database/schema";
import { TRPCError } from "@trpc/server";
import { Data } from "~/lib/data";
import { env } from "~/env";

export const TransactionCreateRoute = publicProcedure
  .input(
    z.object({
      number: z.number(),
      match_id: z.string(),
      rank: z.number(),
    })
  )
  .mutation(async ({ input }) => {
    const match = Data.matches.find((match) => match.uuid === input.match_id);

    if (!match) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid match id",
      });
    }

    const rank = match.ranks.find((i, rank) => rank === input.rank - 1);

    if (!rank) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid rank",
      });
    }

    const DBTrans = await db
      .insert(Transactions)
      .values({
        amount: rank.cost,
        match_id: input.match_id,
      })
      .returning({
        insertedId: Transactions.id,
      });

    const DbTran = DBTrans[0];

    if (!DbTran) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }

    const res = await QROPay.AddOrder({
      amount: rank.cost.toString(),
      customer_email: "rankdom@gmail.com",
      order_id: DbTran.insertedId.toString(),
      purpose: `Rank ${input.rank} Booking`,
      redirect_url: `${env.WEB_URL}/views/${input.match_id}`,
    });

    if (!res.status || !res.payment_url) {

      console.log(res);

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Something went wrong",
      });
    }

    return res.payment_url;
  });
