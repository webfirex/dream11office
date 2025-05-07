import { Image, Paper } from "@mantine/core";
import Link from "next/link";
import { Data } from "~/lib/data";

export const HomeBannerComp2 = () => {
  return (
    <>
      <Paper component={Link} href={''}>
        <Image radius="md" src={'/slide1.png'} alt="banner" />
      </Paper>
    </>
  );
};
