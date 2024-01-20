import dynamic from "next/dynamic";

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
    import("~/components/match-page/banner").then((mod) => mod.MatchBannerComp),
  {
    ssr: false,
  }
);

const MatchListComp = dynamic(
  () => import("~/components/match-page/list").then((mod) => mod.MatchListComp),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <CommonLayout header={<BackHeader />}>
        <MatchBannerComp />

        <MatchListComp />
      </CommonLayout>
    </>
  );
}
