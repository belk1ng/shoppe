import { Open_Sans } from "next/font/google";
import type { PropsWithChildren } from "react";
import { Footer } from "@/widgets/footer";
import { Header } from "@/widgets/header";
import { CartProvider, getCartCookie } from "@/entities/cart";
import { ProgressBar } from "@/shared/ui/progress-bar";
import { Snackbar } from "@/shared/ui/snackbar";
import "@/shared/styles/main.scss";

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

export default async function RootLayout({ children }: PropsWithChildren) {
  const cart = await getCartCookie();

  return (
    <html lang="ru">
      <body className={openSans.className}>
        <Snackbar autoHideDuration={5_000}>
          <ProgressBar>
            <CartProvider cartInitialState={cart}>
              <Header />
              {children}
              <Footer />
            </CartProvider>
          </ProgressBar>
        </Snackbar>
      </body>
    </html>
  );
}
