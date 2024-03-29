import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/63'} className="w-full">
      <Image src={'https://imagetolink.com/ib/1Jki3QPs1A.png'} className={'w-full'} />
    </Link>
  )
};
 