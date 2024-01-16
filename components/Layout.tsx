"use client";

import React from "react";
import { useLoadingStore } from "@/utils/store";
import { LoadingScreen } from "@/components";
import { Toaster } from "react-hot-toast";
import Head from "next/head";

function Layout({ children }: { children: React.ReactNode }) {
  const loading = useLoadingStore((store) => store.loading);

  return (
    <html lang="en">
      <body>
        <Head>
          <link rel="icon" href="/favicon.png" />
          <meta
            name="image"
            content="https://res.cloudinary.com/dyn3sdtfm/image/upload/v1663470958/og1_l965qv.webp"
          />

          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/favicon/apple-touch-icon.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/favicon/favicon-16x16.png"
          />
        </Head>
        {loading && <LoadingScreen />}

        {children}

        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

export default Layout;
