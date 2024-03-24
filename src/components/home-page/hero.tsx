import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/55'} className="w-full">
      <Image src={'https://imagetolink.com/ib/DjS5MCQekk.png'} className={'w-full'} />
    </Link>
  )
};
