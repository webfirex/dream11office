import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/41'} className="w-full">
      <Image src={'https://imagetolink.com/ib/eX2eE4Z0xe.png'} className={'w-full'} />
    </Link>
  )
};
