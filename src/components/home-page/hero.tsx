import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/78'} className="w-full">
      <Image src={'https://imagetolink.com/ib/HQXtj1OcA6.png'} className={'w-full'} />
    </Link> 
  )
};
