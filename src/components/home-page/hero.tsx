import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/37'} className="w-full">
      <Image src={'https://imagetolink.com/ib/v66xBfFDBZ.png'} className={'w-full'} />
    </Link>
  )
};
