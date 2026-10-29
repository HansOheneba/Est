import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
});

const inter = Inter({
  variable: "--font-inter",
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
    <html lang="en" className={`${fraunces.variable} ${inter.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
