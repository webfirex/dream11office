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

  return (
    <>
      <Head>
        <title>Cricket 11 Team</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />

        <Script
          id="fb-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1369709530340753');
            fbq('track', 'PageView');
            `,
          }}
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
