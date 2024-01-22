import dynamic from "next/dynamic";
import { MatchListComp } from "~/components/match-list-page/list";

const BackHeader = dynamic(
  () => import("~/components/header/back").then((mod) => mod.BackHeader),
  {
    ssr: false,
  }
);

const CommonLayout = dynamic(
  () => import("~/components/layout/common").then((mod) => mod.CommonLayout),
  {
    ssr: false,
  }
);

const MatchBannerComp = dynamic(
  () =>
    import("~/components/match-list-page/banner").then((mod) => mod.MatchBannerComp),
  {
    ssr: false,
  }
);
export default function Home() {
  return (
    <>
      <CommonLayout header={<BackHeader />} p="md">
        <MatchBannerComp />

        <MatchListComp />
      </CommonLayout>
    </>
  );
}
