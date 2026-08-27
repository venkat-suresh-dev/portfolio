import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { Footer } from "@/components/layout/Footer";
import { GridBackground } from "@/components/layout/GridBackground";
import { Header } from "@/components/layout/Header";
import { MobileProgress } from "@/components/layout/MobileProgress";
import { WayfindingRail } from "@/components/layout/WayfindingRail";
import { profile } from "@/data/profile";

import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  weight: "variable",
  axes: ["SOFT", "WONK"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: profile.name,
  description: profile.discipline,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrainsMono.variable} dark h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <GridBackground />
        <MobileProgress />
        <Header />
        <WayfindingRail />
        <div className="relative flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
