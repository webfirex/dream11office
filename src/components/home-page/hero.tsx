import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/79'} className="w-full">
      <Image src={'https://i.ibb.co/Hq6CJW8/KKR-vs-SRH-800pm-22nd-March-2024-4.png'} className={'w-full'} />
    </Link> 
  )
};
