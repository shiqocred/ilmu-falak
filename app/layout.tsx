import "./globals.css";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ilmu Falak - SHIQOCRED",
  description:
    "Ilmu Falak is the science used to calculate the Qibla direction accurately",
  generator: "Shiqocred Generator",
  applicationName: "Calculator Ilmu Falak",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Calculator Ilmu Falak",
    "Calculator",
    "Ilmu Falak",
    "Ilmu Falak - Shiqocred",
    "Shiqocred",
    "Calculator Falak",
    "Calculator Arah Kiblat",
    "Arah Kiblat",
    "Kiblat",
    "Calculator Falak",
    "Kalkulator Ilmu Falak",
    "Kalklator Falak",
    "Kalkulator Arah Kiblat",
    "Calculator Shiqocred",
    "Qibla Direction",
    "Calculator Qibla Direction",
    "Qibla",
    "Hisab Kiblat",
    "Hisab Arah Kiblat",
    "حساب اتجاه القبلة",
    "اتجاه القبلة",
    "حساب القبلة",
    "القبلة",
  ],
  colorScheme: "dark",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
