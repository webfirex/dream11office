import { createTRPCRouter } from "../../trpc";
import { TransactionCreateRoute } from "./create";

export const transactionRouter = createTRPCRouter({
  create: TransactionCreateRoute,
});
