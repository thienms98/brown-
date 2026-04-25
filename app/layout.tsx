import type { Metadata } from "next";
import { Geist, Space_Grotesk } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Brown-",
  description: "Brown- the dev"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${grotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full font-primary">{children}</body>
    </html>
  );
}
