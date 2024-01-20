import dynamic from "next/dynamic";

const HomeResultComp = dynamic(
  () =>
    import("~/components/home-page/result").then((mod) => mod.HomeResultComp),
  {
    ssr: false,
  }
);

const HomeMatchesComp = dynamic(
  () =>
    import("~/components/home-page/matches").then((mod) => mod.HomeMatchesComp),
  {
    ssr: false,
  }
);

const HomeBannerComp = dynamic(
  () =>
    import("~/components/home-page/banner").then((mod) => mod.HomeBannerComp),
  {
    ssr: false,
  }
);

const HomeWinnerComp = dynamic(
  () =>
    import("~/components/home-page/winner").then((mod) => mod.HomeWinnerComp),
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

const HomeHeroComp = dynamic(
  () => import("~/components/home-page/hero").then((mod) => mod.HomeHeroComp),
  {
    ssr: false,
  }
);

const HomeTickerComp = dynamic(
  () =>
    import("~/components/home-page/ticker").then((mod) => mod.HomeTickerComp),
  {
    ssr: false,
  }
);

export default function Home() {
  return (
    <>
      <CommonLayout>
        <HomeHeroComp />

        <HomeTickerComp />

        <HomeWinnerComp />

        <HomeBannerComp />

        <HomeMatchesComp />

        <HomeResultComp />
      </CommonLayout>
    </>
  );
}
