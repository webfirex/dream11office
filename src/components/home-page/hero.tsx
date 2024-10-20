import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/79'} className="w-full">
      <Image src={'https://i.ibb.co/2PgtVT8/cricket11team-2.png'} className={'w-full'} />
    </Link> 
  )
};
