import type { Metadata } from "next";
import { Inter, Manrope, Space_Grotesk, Crimson_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-body",
});

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  variable: "--font-headline",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin", "vietnamese"],
  variable: "--font-label",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin", "vietnamese"],
  variable: "--font-serif",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "NEON_NOCTURNE | Digital Curator",
  description: "I am the Digital Curator, blending futuristic neon aesthetics with high-performance engineering to build the next generation of the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable} ${spaceGrotesk.variable} ${crimsonPro.variable} dark scroll-smooth`}
    >
      <body
        suppressHydrationWarning
        className="bg-background text-on-surface-variant selection:bg-primary-container selection:text-on-primary-container antialiased"
      >
        {children}
      </body>
    </html>
  );
}
