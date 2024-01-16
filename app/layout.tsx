import type { Metadata } from "next";

import Layout from "@/components/Layout";
import "@/styles/global.scss";

export const metadata: Metadata = {
  title: "Chat Rooms | Devang Saklani",
  description:
    "At rooms.saklani.dev you can create a private chat room and share data across multiple devices, the chat room will automatically delete after 15min..",
  openGraph: {
    type: "website",
    title: "Chat Rooms | Devang Saklani",
    description:
      "At rooms.saklani.dev you can create a private chat room and share data across multiple devices, the chat room will automatically delete after 15min.",
    url: "https://saklani.dev",
    images: [
      {
        url: "https://res.cloudinary.com/dyn3sdtfm/image/upload/v1663470958/og1_l965qv.webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@devangsaklani",
    title: "Devang Saklani | Software Engineer",
    description:
      "At rooms.saklani.dev you can create a private chat room and share data across multiple devices, the chat room will automatically delete after 15min.",
    images: [
      {
        url: "https://res.cloudinary.com/dyn3sdtfm/image/upload/v1663470958/og1_l965qv.webp",
        alt: "Devang Saklani | Software Engineer",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children} </Layout>;
}
