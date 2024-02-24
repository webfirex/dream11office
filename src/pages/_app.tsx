import dynamic from "next/dynamic";
import React, { useEffect } from 'react';

import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";

import "~/styles/globals.css";

import { type AppProps, type AppType } from "next/app";
import { createTheme } from "@mantine/core";
import { api } from "~/utils/api";
import FacebookPixel from 'react-facebook-pixel';


const MantineProvider = dynamic(
  () => import("@mantine/core").then((mod) => mod.MantineProvider),
  {
    ssr: false,
  }
);

const ModalsProvider = dynamic(
  () => import("@mantine/modals").then((mod) => mod.ModalsProvider),
  {
    ssr: false,
  }
);

const Head = dynamic(() => import("next/head"), {
  ssr: false,
});

const theme = createTheme({ 
  primaryColor: "red",
  primaryShade: 9,
});

const MyApp: AppType = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    import('react-facebook-pixel').then((x) => x.init('1369709530340753'));
  }, []);

  return (
    <>
      <Head>
        <title>Cricket 11 Team</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <link rel="icon" href="/logo.svg" />

      </Head>

      <MantineProvider theme={theme} defaultColorScheme="light">
        <ModalsProvider>
          <Component {...pageProps} />
        </ModalsProvider>
      </MantineProvider>
    </>
  );
};

export default api.withTRPC(MyApp);
