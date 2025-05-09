'use client'
import { useEffect, useState } from "react";
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
  const [carousel, setCarousel] = useState<{img: string, link: string}[]>([])

  const getContent = async () => {

    const response = await fetch(`https://admin.book1strank.com/11/cms.php?action=get&type=carousel`);
  
    const data = await response.json();

    setCarousel(data)
  }
  
  useEffect(() => {
    getContent()
  }, [])

  return (
    <Carousel
      withControls={false}
      loop
      plugins={[autoplay.current]}
      onMouseEnter={autoplay.current.stop}
      style={{borderRadius: '10px', overflow: 'hidden'}}
      onMouseLeave={autoplay.current.reset}
    >
      {carousel.map((item, index) => (
      <Carousel.Slide style={{ height: "fit-content" }} key={index}>
        <Slide link={item?.link} src={item?.img} />
      </Carousel.Slide>
      ))}
    </Carousel>
  )
};
