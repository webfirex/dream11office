import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/76'} className="w-full">
      <Image src={'https://imagetolink.com/ib/MdN9GJzLZ1.png'} className={'w-full'} />
    </Link>
  )
};
