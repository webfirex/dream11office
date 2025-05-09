import dynamic from "next/dynamic";
import React from 'react';
import Script from "next/script";


import "@mantine/core/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/dates/styles.css";

import "~/styles/globals.css";

import { type AppProps, type AppType } from "next/app";
import { createTheme } from "@mantine/core";
import { api } from "~/utils/api";
import { useRouter } from "next/router";


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
  const router = useRouter();
  const pathname = router.pathname;

  console.log(pathname)

  return (
    <>
      <Head>
        <title>Dream 11 Office</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        
        <link rel="icon" href="/logo.svg" />

        {
          pathname !== '/app' && (
            <style
              dangerouslySetInnerHTML={{
                __html: `
                  #voiceflow-chat {
                    display: none !important;
                  }
                `,
              }}
            />
          )
        }

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
