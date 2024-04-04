import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/58'} className="w-full">
      <Image src={'https://imagetolink.com/ib/aB4G1oHx0I.png'} className={'w-full'} />
    </Link>
  )
};
 