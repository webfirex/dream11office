/* eslint-disable react-hooks/exhaustive-deps */
import { Center, Image } from "@mantine/core";
import Cookies from "js-cookie";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Loading() {
  const router = useRouter();

  useEffect(() => {
    const phone = Cookies.get('uPhone')

    setTimeout(() => {
      if (phone) {
        void router.push("/app", undefined, {
          unstable_skipClientCache: true,
        });
      } else {
        void router.push("/auth", undefined, {
          unstable_skipClientCache: true,
        });
      }
    }, 2000);
  }, []);
 
  return (
    <>
      <Link href="/app" prefetch />
 
      <Center h="100vh" bg="#fff">
        <Image
          src="/intro-vid.gif"
          h={'100vh'}
          w={'auto'}
          alt="Goat"
          fit="contain"
          className="loading-logo"
          loading="eager"
        /> 
      </Center>
    </>
  );
}
