import { Open_Sans } from "next/font/google";
import type { ReactNode } from "react";
import { Header } from "@/components";
import { Footer } from "@/components/footer";
import { ProgressBar } from "@/components/progress-bar";
import "../scss/main.scss";

const openSans = Open_Sans({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const viewport = {
  initialScale: 1,
  width: "device-width",
};

export const metadata = {
  openGraph: {
    siteName: "Shoppe – мы делаем шикарные украшения для вас!",
    type: "website",
    locale: "ru_RU",
  },
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/ico",
        url: "/favicon.ico",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: "/android-chrome-192x192.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: "/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>
        <ProgressBar>
          <Header />
          {children}
          <Footer />
        </ProgressBar>
      </body>
    </html>
  );
}
