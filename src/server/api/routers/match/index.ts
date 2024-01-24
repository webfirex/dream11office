import { createTRPCRouter } from "../../trpc";
import { MatchListRoute } from "./list";

export const matchRouter = createTRPCRouter({
  list: MatchListRoute,
});
