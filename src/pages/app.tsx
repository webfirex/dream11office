import { Skeleton, Stack } from "@mantine/core";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import dynamic from "next/dynamic";
import { HomeBannerComp } from "~/components/home-page/banner";
import { HomeBannerComp2 } from "~/components/home-page/banner2";
import { HomeHeroComp } from "~/components/home-page/hero";
import { HomeMatchesComp } from "~/components/home-page/matches";
import { HomeResultComp } from "~/components/home-page/result";
import { HomeTickerComp } from "~/components/home-page/ticker";
import { HomeWinnerComp } from "~/components/home-page/winner";
import { TelegramDialog } from "~/components/tele-dialog";
import { HOME_CACHE_KEY } from "~/lib/const";
import { ViewCount } from "~/lib/view-count";
import { LocalCache } from "~/server/cache";
import { db } from "~/server/database";
  
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

  type StoredObject = {
    AllMatches: typeof AllMatches;
    AllResults: typeof AllResults;
  };

  const cacheData = LocalCache.get<StoredObject>(HOME_CACHE_KEY);

  if (cacheData) {
    console.log("cache hit");

    return {
      props: {
        AllMatches: cacheData.AllMatches,
        AllResults: cacheData.AllResults,
      },
    };
  }

  const IndiaDate = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" })
  );

  const AllMatchesPromise = db.query.Matches.findMany({
    where: (match, { and, lte, gte }) => {
      return and(
        lte(match.startDate, IndiaDate),
        gte(match.endDate, IndiaDate)
      );
    },

    columns: {
      banner: true,
      date: true,
      description: true,
      id: true,
      subTitle: true,
      title: true,
      ranks: true,
      endDate: true,
      startDate: true,
    },
  });

  const AllResultsPromise = db.query.Results.findMany();

  const [AllMatches, AllResults] = await Promise.all([
    AllMatchesPromise,
    AllResultsPromise,
  ]);

  LocalCache.set<StoredObject>(
    HOME_CACHE_KEY,
    {
      AllMatches,
      AllResults,
    },
    60 * 60
  );

  console.log("cache miss");

  return {
    props: {
      AllMatches,
      AllResults,
    },
  };
}

export default function App({
  AllMatches,
  AllResults,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <>
      <TelegramDialog />
      <CommonLayout>
        <Stack p="md">
          <HomeHeroComp />

          <HomeTickerComp />

          <HomeMatchesComp matches={AllMatches} />

          <HomeBannerComp />
          {/* <HomeBannerComp2 /> */}

          <HomeWinnerComp />

          <HomeResultComp results={AllResults} />
        </Stack>
      </CommonLayout>
    </>
  );
}
