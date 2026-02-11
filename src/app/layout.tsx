import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RunPick | 나에게 맞는 러닝화 찾기",
  description: "Nike, Adidas, Asics 러닝화를 카테고리별로 비교하고 나에게 맞는 러닝화를 찾아보세요.",
  keywords: ["러닝화", "마라톤", "Nike", "Adidas", "Asics", "러닝화 추천", "러닝화 비교"],
  openGraph: {
    title: "RunPick | 나에게 맞는 러닝화 찾기",
    description: "Nike, Adidas, Asics 러닝화를 카테고리별로 비교하고 나에게 맞는 러닝화를 찾아보세요.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        <main className="relative z-0 min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
