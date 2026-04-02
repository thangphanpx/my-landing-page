import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@700;800&family=Inter:wght@400;500&family=Space_Grotesk:wght@400;500;700&family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
