import { QROPay } from "~/lib/qropay";

const main = async () => {
  console.log("Started ...");

  const res = await QROPay.AddOrder({
    amount: "100",
    customer_email: "something@gmail.com",
    key: "7655328638327",
    order_id: "83792374iagshdghg",
    purpose: "teting",
    redirect_url: "https://dream11office.vercel.app/api/qropay/callback",
  });

  console.log(res);
};

void main().then(() => {
  console.log("Done...");

  process.exit();
});
