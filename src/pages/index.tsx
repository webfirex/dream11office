/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Container, Image } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Loading() {
  const router = useRouter();

  const [View, setView] = useState(
    <Image src="/intro-vid.gif" h="100vh" fit="cover" alt="Intro Gif" />
  );

  useEffect(() => {
    setTimeout(() => {
      setView(
        <>
          <Image
            src="/logo-m.png"
            h={300}
            w={300}
            alt="Goat"
            fit="contain"
            className="loading-logo"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 100,
              height: "100vh",
              width: "100vw",
            }}
          />

          <Box className="loading-popup" />
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
          backgroundColor: "#fdfcfc",
        }}
      >
        {View}
      </Container>
    </>
  );
}
