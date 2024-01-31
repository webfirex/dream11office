import { Title } from "@mantine/core";
import { type GetServerSidePropsContext } from "next";
import { BackHeader } from "~/components/header/back";
import { CommonLayout } from "~/components/layout/common";
import { TelegramDialog } from "~/components/tele-dialog";
import { ViewCount } from "~/lib/view-count";

export async function getServerSideProps(context: GetServerSidePropsContext) {
  await ViewCount({
    context: context,
    path: `/refer`,
    name: "Refer",
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
        <Title order={4} c="red" fw={"800"}>
            Coming Soon
        </Title>
      </CommonLayout>
    </>
  );
}
