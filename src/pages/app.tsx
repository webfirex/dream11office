import { Skeleton, Stack } from "@mantine/core";
import { type GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { HomeBannerComp } from "~/components/home-page/banner";
import { HomeHeroComp } from "~/components/home-page/hero";
import { HomeMatchesComp } from "~/components/home-page/matches";
import { HomeResultComp } from "~/components/home-page/result";
import { HomeTickerComp } from "~/components/home-page/ticker";
import { HomeWinnerComp } from "~/components/home-page/winner";
import { TelegramDialog } from "~/components/tele-dialog";
import { ViewCount } from "~/lib/view-count";

const CommonLayout = dynamic(
  () => import("~/components/layout/common").then((mod) => mod.CommonLayout),
  {
    ssr: false,
    loading: function Loading() {
      return <Skeleton h="100vh" w="100vw" />;
    },
  }
);

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await ViewCount({
    context: context,
    path: `/app`,
    name: "Home",
  });

  return {
    props: {},
  };
}

export default function App() {
  return (
    <>
      <TelegramDialog />
      <CommonLayout>
        <Stack p="md">
          <HomeHeroComp />

          <HomeTickerComp />

          <HomeWinnerComp />

          <HomeBannerComp />

          <HomeMatchesComp />

          <HomeResultComp />
        </Stack>
      </CommonLayout>
    </>
  );
}
