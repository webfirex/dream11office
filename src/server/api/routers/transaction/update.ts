import { z } from "zod";
import { publicProcedure } from "../../trpc";
import { db } from "~/server/database";
import { Transactions } from "~/server/database/schema";
import { TRPCError } from "@trpc/server";
import { eq } from "drizzle-orm";

export const TransactionUpdateRoute = publicProcedure
  .input(
    z.object({
      transaction_id: z.number(),
      status: z.enum(["completed", "failed"]),
    })
  )
  .mutation(async ({ input }) => {
    const txn = await db.query.Transactions.findFirst({
      where: (txn, { eq }) => {
        return eq(txn.id, input.transaction_id);
      },
    });

    if (!txn) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Invalid transaction id",
      });
    }

    if (txn.status !== "pending") {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Transaction already processed",
      });
    }

    await db
      .update(Transactions)
      .set({
        status: input.status,
      })
      .where(eq(Transactions.id, input.transaction_id));
  });
