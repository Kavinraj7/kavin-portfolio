import type { Metadata } from "next";
import { Dancing_Script, Cinzel, Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
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

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700", "800"],
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${dancingScript.variable} ${cinzel.variable} ${plusJakartaSans.variable} ${playfair.variable}`}
      style={{ '--font-heading': 'var(--font-body)' } as React.CSSProperties}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-[#FAFAFC] dark:bg-[#09080F] text-black dark:text-white antialiased selection:bg-black selection:text-white">
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}


