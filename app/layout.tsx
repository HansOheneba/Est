import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

// DM Serif Display carries the editorial storytelling; Manrope handles every
// functional surface (navigation, prices, search, forms).
const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
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
    <html lang="en" className={`${dmSerif.variable} ${manrope.variable} antialiased`}>
      <body className="min-h-dvh font-sans">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
