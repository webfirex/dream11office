import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/49'} className="w-full">
      <Image src={'https://imagetolink.com/ib/LlE7v7NYTV.png'} className={'w-full'} />
    </Link>
  )
};
