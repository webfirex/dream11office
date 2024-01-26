/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Container, Image } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Loading() {
  const router = useRouter();

  const [BgColor, setBgColor] = useState("#fdfcfc");

  const [View, setView] = useState(<Image src="/intro-vid.gif" alt="Goat" />);

  useEffect(() => {
    setTimeout(() => {
      setBgColor("#a50c0c");

      setView(
        <>
          <Image
            src="/logo-m.png"
            h={300}
            w={300}
            alt="Goat"
            fit="contain"
            className="loading-logo"
          />
        </>
      );
    }, 2000);

    setTimeout(() => {
      void router.push("/app");
    }, 3500);
  }, []);

  return (
    <>
      <Link href="/app" prefetch />
      <Container
        size="xs"
        p={0}
        style={{
          backgroundColor: BgColor,
        }}
      >
        <Center h="100vh" bg="transparent">
          {View}
        </Center>
      </Container>
    </>
  );
}
