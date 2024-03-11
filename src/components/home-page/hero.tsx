import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/41'} className="w-full">
      <Image src={'https://imagetolink.com/ib/6B6GqtIcB2.png'} className={'w-full'} />
    </Link>
  )
};
