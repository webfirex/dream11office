import { createTRPCRouter } from "../../trpc";
import { TransactionCreateRoute } from "./create";
import { TransactionUpdateRoute } from "./update";

export const transactionRouter = createTRPCRouter({
  create: TransactionCreateRoute,
  update: TransactionUpdateRoute,
});
