import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/79'} className="w-full">
      <Image src={'https://imagetolink.com/ib/LIv5cSjxLJ.png'} className={'w-full'} />
    </Link> 
  )
};
