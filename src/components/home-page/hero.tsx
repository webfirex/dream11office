import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/58'} className="w-full">
      <Image src={'https://imagetolink.com/ib/b49M5e8BbY.png'} className={'w-full'} />
    </Link>
  )
};
 