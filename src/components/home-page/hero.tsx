import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/73'} className="w-full">
      <Image src={'https://imagetolink.com/ib/7bcsG4txBI.png'} className={'w-full'} />
    </Link>
  )
};
