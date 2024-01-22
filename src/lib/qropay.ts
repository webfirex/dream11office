import fetch from "node-fetch";
import { z } from "zod";

export class QROPay {
  private static AddOrderParams = z.object({
    key: z.string(),
    order_id: z.string(),
    amount: z.string(),
    purpose: z.string(),
    customer_email: z.string(),
    redirect_url: z.string(),
  });

  private static AddOrderResponse = z.object({
    status: z.boolean(),
    msg: z.string(),
    order_id: z.string().optional(),
    purpose: z.string().optional(),
    payment_url: z.string().optional(),
  });

  public static async AddOrder(
    params: z.infer<typeof QROPay.AddOrderParams>
  ): Promise<z.infer<typeof QROPay.AddOrderResponse>> {
    const res = await fetch("https://qropay.com/api/add_order.php", {
      method: "POST",
      body: JSON.stringify(params),
    });

    const data = (await res.json()) as unknown;

    return QROPay.AddOrderResponse.parse(data);
  }
}
