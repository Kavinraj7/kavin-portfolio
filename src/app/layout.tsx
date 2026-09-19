import type { Metadata } from "next";
import { Dancing_Script, Cinzel, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/smooth-scroll-provider";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-cursive",
  weight: ["400", "700"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-title",
  weight: ["400", "700", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "KAVINRAJ | Personal Portfolio & Multidisciplinary Identity",
  description: "One Person · Four Professional Dimensions: Administration & Management, HR Management, Software Engineering, and Data Analytics.",
  authors: [{ name: "Kavinraj" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dancingScript.variable} ${cinzel.variable} ${plusJakartaSans.variable}`}>
      <body className="bg-[#FDFBF7] text-[#1A1715] antialiased selection:bg-[#E8DCC4] selection:text-[#1A1715]">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}


