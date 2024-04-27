import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/75'} className="w-full">
      <Image src={'https://imagetolink.com/ib/TStXpZNioP.png'} className={'w-full'} />
    </Link>
  )
};
