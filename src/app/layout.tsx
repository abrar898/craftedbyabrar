import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Footer from "@/components/Footer";
// Import only components that exist
import RateCalculator from '@/components/RateCalculator';
// import BlogSection from '@/components/BlogSection';
// import AnimatedGreeting from '@/components/AnimatedGreeting';
// import AIDashboard from '@/components/AIDashboard';
// import CertificationWall from '@/components/CertificationWall';
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Portfolio | Creative Developer",
  description: "A modern portfolio with interactive animations",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white dark:bg-black dark:text-white min-h-screen`}
      >
        <Navbar />

        <Providers>{children}</Providers>
                 {/* <RateCalculator/> */}
        {/* <BlogSection/> */}
        {/* <AnimatedGreeting/> */}
        {/* <CertificationWall/> */}
        {/* <AIDashboard/> */}
        <Footer/>
      </body>
    </html>
  );
}
