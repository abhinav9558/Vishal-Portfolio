import type { Metadata } from "next";
import { Space_Mono, Playfair_Display } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Vishal Anivilla | Director's Cut",
  description: "Cinematic portfolio of a multidisciplinary film and digital content production professional.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceMono.variable} ${playfair.variable} antialiased bg-black text-[#e0e0e0] selection:bg-[#FF2A00] selection:text-white`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
