import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/79'} className="w-full">
      <Image src={'https://imagetolink.com/ib/tZJu8S5B4r.png'} className={'w-full'} />
    </Link> 
  )
};
