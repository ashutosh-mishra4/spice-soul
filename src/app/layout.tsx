import type { Metadata } from "next";
import { Nunito, Lora, Figtree, Cal_Sans, Source_Sans_3 } from "next/font/google";
import { Geist_Mono } from "next/font/google";
import "./globals.css";

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const calSans = Cal_Sans({
  variable: "--font-cal-sans",
  subsets: ["latin"],
  weight: "400",
});

const sourceSans3 = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Spice Co. - Premium Artisan Spice Blends",
  description: "Hand-crafted artisan spice blends for the discerning home chef. Discover Mediterranean, BBQ, Asian Fusion, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} ${lora.variable} ${figtree.variable} ${calSans.variable} ${sourceSans3.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
