"use client";

import React from "react";
import { useLoadingStore } from "@/utils/store";
import { LoadingScreen } from "@/components";
import { Toaster } from "react-hot-toast";

function Layout({ children }: { children: React.ReactNode }) {
  const loading = useLoadingStore((store) => store.loading);

  return (
    <html lang="en">
      <body>
        {loading && <LoadingScreen />}

        {children}

        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}

export default Layout;
