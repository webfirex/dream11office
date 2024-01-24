
import { db } from "~/server/database";
import { Matches } from "~/server/database/schema";

const main = async () => {
  console.log("Started ...");

  const res = await db.insert(Matches).values({
    banner: "https://i.imgur.com/1O9m8gF.png",
    title: "Brisbane vs Adelaide",
    subTitle: "HEA vs STR",
    date: "2:10pm 22/1/2024",
    description:
      "इस मैच की 1 से लेकर 3 Rank तक आप Booking कर सकते हो। अलग अलग Rank का Booking charges अलग अलग है। आपकी Winnings 100% होगी। ये Booking सीधे Dream 11 office से की जा रही है। आप जो भी Rank Book करोगे उसका Winning amount मैच खत्म होने के बाद सीधे आपके Dream 11 wallet में भेज दिया जायेगा। आप अपने wallet से पैसा सीधे अपने बैंक में Transfer कर सकते है।",

    // INDIAN TIME ZONE
    // JAN 24  2024, VALID FROM
    // 9:32 PM to 9:34 PM
    startDate: new Date("2024-01-24T16:05:00.000Z"),
    endDate: new Date("2024-01-24T16:08:00.000Z"),
    ranks: [
      {
        prize: "₹1 Crore",
        cost: 1499,
      },
      {
        prize: "₹22 Lakh",
        cost: 1299,
      },
      {
        prize: "₹7.5 Lakh",
        cost: 999,
      },
    ],
  });

  console.log(res);
};

void main().then(() => {
  console.log("Done...");

  process.exit();
});
