import { Alert, Group, Stack, Text } from "@mantine/core";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import {
  type InferGetServerSidePropsType,
  type GetServerSidePropsContext,
} from "next";
import Link from "next/link";
import { z } from "zod";
import { BackHeader } from "~/components/header/back";
import { CommonLayout } from "~/components/layout/common";
import { GurrenteLetterComp } from "~/components/letter";
import { ViewMatchBodyComp } from "~/components/match-view-page/body";
import { ViewMatchHeroComp } from "~/components/match-view-page/hero";
import { ViewMatchPrizeComp } from "~/components/match-view-page/prize";
import { ViewCount } from "~/lib/view-count";
import { db } from "~/server/database";

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

  const userId = context.req.cookies.userId;

  if (userId === undefined) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const Txn = await db.query.Transactions.findFirst({
    where: (txn, { and, eq }) => {
      return and(eq(txn.match_id, MatchId.data), eq(txn.user_id, userId));
    },

    orderBy: (txn, { desc }) => {
      return desc(txn.created_at);
    },

    columns: {
      status: true,
    },
  });

  return {
    props: {
      match,
      txn: Txn ? Txn.status : null,
    },
  };
}

export default function ViewMatch({
  match,
  txn,
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

          {txn === "pending" && (
            <Alert variant="filled" color="yellow.6" ta="center">
              Your previous payment is pending. Please wait for the payment to
              complete.
            </Alert>
          )}

          {txn === "completed" && (
            <Link
              style={{
                textDecoration: "none",
              }}
              href="https://wa.me/+917041508202"
            >
              <Alert variant="filled" color="green.6" ta="center">
                <Group justify="center" gap="xs">
                  <IconBrandWhatsapp size={24} />
                  <Text size="sm">Your payment is completed</Text>
                </Group>
              </Alert>
            </Link>
          )}

          {txn !== "completed" && <ViewMatchPrizeComp match={match} />}
        </Stack>
      </CommonLayout>
    </>
  );
}
