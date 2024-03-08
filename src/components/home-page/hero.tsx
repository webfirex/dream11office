import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/47'} className="w-full">
      <Image src={'https://imagetolink.com/ib/eGiLfIy2s5.png'} className={'w-full'} />
    </Link>
  )
};
