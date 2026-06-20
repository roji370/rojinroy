import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rojin Roy | Software Engineer & AI Developer",
  description: "Portfolio of Rojin Roy - Software Engineer & AI Developer. Crafting premium, high-performance mobile applications and modern web experiences using Apple's Liquid Glass design aesthetic.",
  keywords: ["Rojin Roy", "Software Engineer", "AI Developer", "Mobile Developer", "Web Developer", "React Native", "Flutter", "Next.js", "Liquid Glass", "Glassmorphism"],
  authors: [{ name: "Rojin Roy" }],
  creator: "Rojin Roy",
  openGraph: {
    title: "Rojin Roy | Software Engineer & AI Developer",
    description: "Portfolio of Rojin Roy. Specialize in mobile application and website development with premium Liquid Glass designs.",
    url: "https://rojinroy.com",
    siteName: "Rojin Roy Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-full bg-bg-primary text-text-main antialiased selection:bg-primary/30 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
