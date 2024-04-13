import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/70'} className="w-full">
      <Image src={'https://imagetolink.com/ib/pEufMi4Yi8.png'} className={'w-full'} />
    </Link>
  )
};
 