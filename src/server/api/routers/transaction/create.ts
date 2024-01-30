import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { QROPay } from "~/lib/qropay";
import { db } from "~/server/database";
import { Transactions } from "~/server/database/schema";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";

export const TransactionCreateRoute = publicProcedure
  .input(
    z.object({
      mobile_number: z.number(),
      match_id: z.number(),
      rank: z.number(),
    })
  )
  .mutation(async ({ input }) => {
    const match = await db.query.Matches.findFirst({
      where: (match, { eq }) => {
        return eq(match.id, input.match_id);
      },

      columns: {
        id: true,
        ranks: true,
      },
    });

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
        phone_number: input.mobile_number.toString(),
        rank: input.rank,
        
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
      customer_email: `${input.mobile_number}@dream.com`,
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
