import { Stack } from "@mantine/core";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import { BackHeader } from "~/components/header/back";
import { CommonLayout } from "~/components/layout/common";
import { GurrenteLetterComp } from "~/components/letter";
import { ViewMatchBodyComp } from "~/components/match-view-page/body";
import { ViewMatchHeroComp } from "~/components/match-view-page/hero";
import { ViewMatchPrizeComp } from "~/components/match-view-page/prize";
import { Data } from "~/lib/data";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { uuid } = context.query;

  if (typeof uuid !== "string") {
    return {
      notFound: true,
    };
  }

  const MatchQuery = Data.matches.find((match) => match.uuid === uuid);

  if (!MatchQuery) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      match: MatchQuery,
    },
  };
}

export default function ViewMAtch({
  match,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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

          <ViewMatchPrizeComp match={match} />
        </Stack>
      </CommonLayout>
    </>
  );
}
