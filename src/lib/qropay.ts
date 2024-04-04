import fetch from "node-fetch";
import { z } from "zod";
import { env } from "~/env";

export class QROPay {
  private static AddOrderParams = z.object({
    client_txn_id: z.string(),
    amount: z.string(),
    p_info: z.string(),
    customer_name: z.string(),
    customer_email: z.string(),
    customer_mobile: z.string(),
    redirect_url: z.string(),
  });

  private static AddOrderResponse = z.object({
    status: z.boolean(),
    msg: z.string(),
    order_id: z.number().optional(),
    purpose: z.string().optional(),
    data: z.object({
      payment_url: z.string()
    })
  });

  public static async AddOrder(
    params: z.infer<typeof QROPay.AddOrderParams>
  ): Promise<z.infer<typeof QROPay.AddOrderResponse>> {
    const res = await fetch("https://api.ekqr.in/api/create_order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...params, key: env.QROPAY_KEY }),
    });

    const data = (await res.json()) as unknown;

    return QROPay.AddOrderResponse.parse(data);
  }
}
