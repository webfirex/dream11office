'use client'
import { Image } from "@mantine/core";
import Link from "next/link";
import Autoplay from 'embla-carousel-autoplay';
import { Carousel } from '@mantine/carousel';
import { useRef } from "react";
// import { Data } from "~/lib/data";

function Slide({link, src}: {link: string; src: string}) {
  return (
  <Link href={link} className="w-full" style={{ height: "fit-content" }}>
    <Image src={src} className={'w-full'} />
  </Link>
  )
}

export const HomeHeroComp = () => {
  const autoplay = useRef(Autoplay({ delay: 4000 }));
  return (
    <Carousel
      withControls={false}
      loop
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      style={{borderRadius: '10px', overflow: 'hidden'}}
      onMouseLeave={autoplay.current.reset}
    >
      <Carousel.Slide style={{ height: "fit-content" }}>
        <Slide link="/view/81" src="https://i.ibb.co/5X6w1t7T/img-1.png" />
      </Carousel.Slide>
      <Carousel.Slide style={{ height: "fit-content" }}>
        <Slide link="/view/81" src="https://i.ibb.co/5X6w1t7T/img-1.png" />
      </Carousel.Slide>
      <Carousel.Slide style={{ height: "fit-content" }}>
        <Slide link="/view/81" src="https://i.ibb.co/5X6w1t7T/img-1.png" />
      </Carousel.Slide>
    </Carousel>
  )
};
