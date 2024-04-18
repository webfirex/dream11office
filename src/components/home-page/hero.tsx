import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/71'} className="w-full">
      <Image src={'https://imagetolink.com/ib/hK7txaUKJq.png'} className={'w-full'} />
    </Link>
  )
};
