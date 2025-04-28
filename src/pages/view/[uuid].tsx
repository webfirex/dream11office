import { Stack } from "@mantine/core";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { z } from "zod";
import { BackHeader } from "~/components/header/back";
import { CommonLayout } from "~/components/layout/common";
import { GurrenteLetterComp } from "~/components/letter";
import { ViewMatchBodyComp } from "~/components/match-view-page/body";
import { ViewMatchHeroComp } from "~/components/match-view-page/hero";
import { ViewMatchPrizeComp } from "~/components/match-view-page/prize";
import { ViewCount } from "~/lib/view-count";
import { Image, Paper } from "@mantine/core";
import { db } from "~/server/database";
import RankTimer from "~/components/match-view-page/timer";
import { useRouter } from "next/router";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { uuid, client_txn_id } = context.query;

  if (typeof uuid !== "string") {
    return {
      notFound: true,
    };
  }

  const MatchId = z.string().regex(/^\d+$/).transform(Number).safeParse(uuid);

  if (!MatchId.success) {
    return {
      notFound: true,
    };
  }

  const match = await db.query.Matches.findFirst({
    where: (match, { eq }) => {
      return eq(match.id, MatchId.data);
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

  if (!match) {
    return {
      notFound: true,
    };
  }

  console.log(match);

  await ViewCount({
    context: context,
    path: `/view/${MatchId.data}`,
    name: match.title,
  });

  if (client_txn_id !== undefined) {
    return {
      redirect: {
        destination: `/view/${MatchId.data}`,
        permanent: false,
      },
    };
  }

  return {
    props: {
      match,
    },
  };
}

export default function ViewMatch({
  match,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  
  const router = useRouter();

  // Define an array of allowed paths
  const allowedPaths = ['/view/[uuid]', '', '/view/49']; // Add more paths as needed

  // Check if the current URL matches any of the allowed paths
  const isMatchingURL = allowedPaths.includes(router.pathname);
  
  return (
    <>
      <GurrenteLetterComp />
      <CommonLayout header={<BackHeader />}>
        <ViewMatchHeroComp banner={match.banner} />


        <Stack p="md">
          <ViewMatchBodyComp
            title={match.title}
            subTitle={match.subTitle}
            date={match.date}
            description={match.description}
          />
          {/* {isMatchingURL && (
            <RankTimer />
          )} */}

      <Paper>
        {/* <Image radius="md" src={'/banner-offer.png'} alt="banner" /> */}
      </Paper>

          <ViewMatchPrizeComp match={match} />
        </Stack>
      </CommonLayout>
    </>
  );
}
