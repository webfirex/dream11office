import { Image, Paper } from "@mantine/core";
import Link from "next/link";
import { Data } from "~/lib/data";

export const MatchBannerComp = () => {
  return (
    <>
      <Paper component={Link} href={Data.matchBanner.link}>
        <Image radius="md" src={Data.matchBanner.image} alt="banner" />
      </Paper>
    </>
  );
};
