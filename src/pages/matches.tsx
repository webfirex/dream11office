import { Skeleton } from "@mantine/core";
import { type GetServerSidePropsContext } from "next";
import dynamic from "next/dynamic";
import { BackHeader } from "~/components/header/back";
import { TelegramDialog } from "~/components/tele-dialog";
import { sleep } from "~/lib/functions";
import { ViewCount } from "~/lib/view-count";

const LoadDelay = 1000;

const MatchListComp = dynamic(
  async () => {
    await sleep(LoadDelay);

    return import("~/components/match-list-page/list").then(
      (mod) => mod.MatchListComp
    );
  },
  {
    ssr: false,
    loading: function Loading() {
      return <Skeleton h={300} w="100%" />;
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

const MatchBannerComp = dynamic(
  async () => {
    await sleep(LoadDelay);

    return import("~/components/match-list-page/banner").then(
      (mod) => mod.MatchBannerComp
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
    path: `/matches`,
    name: "Matches",
  });

  return {
    props: {},
  };
}

export default function Home() {
  return (
    <>
      <TelegramDialog />
      <CommonLayout header={<BackHeader />} p="md">
        <MatchBannerComp />

        <MatchListComp />
      </CommonLayout>
    </>
  );
}
