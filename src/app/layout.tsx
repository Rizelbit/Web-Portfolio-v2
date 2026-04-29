import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

const archivo = Archivo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-archivo",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Reinhard Alfonzo | Portfolio",
  description:
    "Reinhard Alfonzo — Informatics Engineering Student at ITB. Full-stack developer, data science enthusiast, and project leader. Explore my work, skills, and experience.",
  keywords: [
    "Reinhard Alfonzo",
    "portfolio",
    "software engineer",
    "ITB",
    "web development",
    "data science",
    "React",
    "Next.js",
  ],
  authors: [{ name: "Reinhard Alfonzo" }],
  openGraph: {
    title: "Reinhard Alfonzo | Portfolio",
    description:
      "Got an idea? Let's turn it into something worth scrolling for.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${spaceGrotesk.variable} antialiased`}
    >
      <body className="min-h-screen bg-bg-primary text-text-primary">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
