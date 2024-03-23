/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Image } from "@mantine/core";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      void router.push("/app", undefined, {
        unstable_skipClientCache: true,
      });
    }, 10);
  }, []);
 
  return (
    <>
      <Link href="/app" prefetch />
 
      <Center h="100vh" bg="#a50c0c">
        <Image
          src="/logo-m.webp"
          h={300}
          w={300}
          alt="Goat"
          fit="contain"
          className="loading-logo"
          loading="eager"
        /> 
      </Center>
    </>
  );
}
