import { Skeleton, Stack } from "@mantine/core";
import { type GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { HomeHeroComp } from "~/components/home-page/hero";
import { TelegramDialog } from "~/components/tele-dialog";
import { sleep } from "~/lib/functions";
import { ViewCount } from "~/lib/view-count";

const LoadDelay = 1000;

const HomeResultComp = dynamic(
  async () => {
    await sleep(LoadDelay);

    return import("~/components/home-page/result").then(
      (mod) => mod.HomeResultComp
    );
  },
  {
    ssr: false,
    loading: function Loading() {
      return <Skeleton h={100} w="100%" />;
    },
  }
);

const HomeMatchesComp = dynamic(
  async () => {
    await sleep(LoadDelay);

    return import("~/components/home-page/matches").then(
      (mod) => mod.HomeMatchesComp
    );
  },
  {
    ssr: false,
    loading: function Loading() {
      return <Skeleton h={100} w="100%" />;
    },
  }
);

const HomeBannerComp = dynamic(
  async () => {
    await sleep(LoadDelay);

    return import("~/components/home-page/banner").then(
      (mod) => mod.HomeBannerComp
    );
  },
  {
    ssr: false,
    loading: function Loading() {
      return <Skeleton h={100} w="100%" />;
    },
  }
);

const HomeWinnerComp = dynamic(
  async () => {
    await sleep(LoadDelay);

    return import("~/components/home-page/winner").then(
      (mod) => mod.HomeWinnerComp
    );
  },
  {
    ssr: false,
    loading: function Loading() {
      return <Skeleton h={100} w="100%" />;
    },
  }
);

const CommonLayout = dynamic(
  () => import("~/components/layout/common").then((mod) => mod.CommonLayout),
  {
    ssr: false,
    loading: function Loading() {
      return <Skeleton h="100vh" w="100vw" />;
    },
  }
);

const HomeTickerComp = dynamic(
  async () => {
    await sleep(LoadDelay);

    return import("~/components/home-page/ticker").then(
      (mod) => mod.HomeTickerComp
    );
  },
  {
    ssr: false,
    loading: function Loading() {
      return <Skeleton h={100} w="100%" />;
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
