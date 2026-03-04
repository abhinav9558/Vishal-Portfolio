import type { Metadata } from "next";
import { Space_Mono, VT323 } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const spaceMono = Space_Mono({
  variable: "--font-mono",
  weight: ["400", "700"],
  subsets: ["latin"],
});

const vt323 = VT323({
  variable: "--font-heading",
  weight: ["400"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chimdi Chimereze | Portfolio",
  description: "Multidisciplinary designer and developer portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceMono.variable} ${vt323.variable} antialiased selection:bg-white/20`}
      >
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
