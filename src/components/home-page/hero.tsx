import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/64'} className="w-full">
      <Image src={'https://imagetolink.com/ib/DCvSTda5oM.png'} className={'w-full'} />
    </Link>
  )
};
 