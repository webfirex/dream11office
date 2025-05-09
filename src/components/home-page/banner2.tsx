'use client'
import { useEffect, useState } from "react";
import { Image, Paper } from "@mantine/core";
import Link from "next/link";
import { Data } from "~/lib/data";

export const HomeBannerComp2 = () => {
  const [link, setLink] = useState('')
  const [image, setImage] = useState('')

  const getContent = async () => {

    const response = await fetch(`https://admin.book1strank.com/11/cms.php?action=get&type=banner`);
  
    const data = await response.json();

    setLink(data.link);
    setImage(data.img);
  }
  
  useEffect(() => {
    getContent()
  }, [])

  return (
    <>
      <Paper component={Link} href={link}>
        <Image radius="md" src={image} alt="" />
      </Paper>
    </>
  );
};
