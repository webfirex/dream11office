import { eq } from "drizzle-orm";
import { type NextApiRequest, type NextApiResponse } from "next";
import { z } from "zod";
import { env } from "~/env";
import { db } from "~/server/database";
import { Transactions } from "~/server/database/schema";

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== "GET") {
    res.status(405).json({
      success: false,
      message: "Method Not Allowed",
    });
    return;
  }

  const BodySchema = z.object({
    amount: z.string(),
    order_id: z.string().transform((val) => parseInt(val)),
    paymentAmount: z.string(),
    status: z.string(),
    secretKey: z.string(),
  });

  const body = BodySchema.safeParse(req.body);

  if (!body.success) {
    res.status(400).json({
      success: false,
      message: "Bad Request",
    });
    return;
  }

  if (body.data.secretKey !== env.QROPAY_SEC) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
    return;
  }

  const transacton = await db.query.Transactions.findFirst({
    where: (txn, { eq }) => {
      return eq(txn.id, body.data.order_id);
    },
  });

  if (!transacton) {
    res.status(404).json({
      success: false,
      message: "Transaction not found",
    });
    return;
  }

  if (transacton.status !== "pending") {
    res.status(400).json({
      success: false,
      message: "Transaction already processed",
    });
    return;
  }

  await db
    .update(Transactions)
    .set({
      status: body.data.status === "success" ? "completed" : "failed",
    })
    .where(eq(Transactions.id, body.data.order_id));

  res.status(200).json({
    success: true,
    message: "ok",
  });
}
