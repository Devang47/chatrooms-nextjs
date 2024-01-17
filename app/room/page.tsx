"use client";

import { useSearchParams } from "next/navigation";
import React from "react";
import ChatUi from "./ChatUi";
import JoinPage from "./JoinPage";

function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  if (id) {
    return <ChatUi id={id} />;
  } else {
    return <JoinPage />;
  }
}

export default Page;
