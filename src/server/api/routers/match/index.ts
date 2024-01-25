import { createTRPCRouter } from "../../trpc";
import { MatchCreateRoute } from "./create";
import { MatchDeleteRoute } from "./delete";
import { MatchEditRoute } from "./edit";
import { MatchListRoute } from "./list";
import { MatchManageListRoute } from "./list-manage";
import { MatchResultCreateRoute } from "./result-create";
import { MatchResultDeleteRoute } from "./result-delete";
import { MatchResultEditRoute } from "./result-edit";
import { MatchResultListRoute } from "./result-list";

export const matchRouter = createTRPCRouter({
  manageList: MatchManageListRoute,
  list: MatchListRoute,
  delete: MatchDeleteRoute,
  create: MatchCreateRoute,
  edit: MatchEditRoute,
  resultList: MatchResultListRoute,
  resultCreate: MatchResultCreateRoute,
  resultDelete: MatchResultDeleteRoute,
  resultEdit: MatchResultEditRoute,
});
