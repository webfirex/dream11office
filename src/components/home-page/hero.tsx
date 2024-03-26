import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/52'} className="w-full">
      <Image src={'https://imagetolink.com/ib/5sBJVb6i20.png'} className={'w-full'} />
    </Link>
  )
};
 