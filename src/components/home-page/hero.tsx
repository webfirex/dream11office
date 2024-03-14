import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/37'} className="w-full">
      <Image src={'https://imagetolink.com/ib/pJAlyRY4ju.png'} className={'w-full'} />
    </Link>
  )
};
