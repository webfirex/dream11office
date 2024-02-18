import { Image, Paper } from "@mantine/core";
import Link from "next/link";
import { Data } from "~/lib/data";

export const HomeBannerComp = () => {
  return (
    <>
      <Paper component={Link} href={'/prime'}>
        <Image radius="md" src={Data.banner.image} alt="banner" />
      </Paper>
    </>
  );
};
