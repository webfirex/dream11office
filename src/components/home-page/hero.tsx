import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/73'} className="w-full">
      <Image src={'https://imagetolink.com/ib/I8rUNSCgRF.png'} className={'w-full'} />
    </Link>
  )
};
