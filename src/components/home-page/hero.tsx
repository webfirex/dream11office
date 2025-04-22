import { Image } from "@mantine/core";
import Link from "next/link";
// import { Data } from "~/lib/data";

export const HomeHeroComp = () => {
  return (
    <Link href={'/view/81'} className="w-full">
      <Image src={'https://i.ibb.co/Hq6CJW8/KKR-vs-SRH-800pm-22nd-March-2024-4.png'} className={'w-full'} />
      {/* <iframe width="560" height="315" className="w-full h-auto aspect-video max-w-[700px]" src="https://www.youtube.com/embed/EnMr5NscBhg?si=TqLRvoSo-fWBEf2y" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe> */}
    </Link> 
  )
};
