import { Image, Paper } from "@mantine/core";
import Link from "next/link";
import { Data } from "~/lib/data";

export const HomeBannerComp2 = () => {
  return (
    <>
      <Paper component={Link} href={'https://t.me/+3FMI1LP_nPZhMmJl'}>
        <Image radius="md" src={'/mini-banner-3.png'} alt="banner" />
      </Paper>
    </>
  );
};
