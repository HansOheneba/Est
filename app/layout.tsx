import type { Metadata } from "next";
import { Bodoni_Moda, Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// High-contrast Bodoni for the cinematic headlines, a crisp grotesk for everything else
const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Haven & Co. | Homes in Accra",
    template: "%s | Haven & Co.",
  },
  description:
    "Haven & Co. finds, sells and lets exceptional homes across Accra, from Cantonments townhouses to Trasacco villas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bodoni.variable} ${hanken.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
