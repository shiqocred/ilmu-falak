import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ilmu Falak - BLC UIN SUKA",
  description:
    "Ilmu Falak is the science used to calculate the Qibla direction accurately",
  distribution: "global",
  openGraph: {
    title: "Ilmu Falak - BLC UIN SUKA",
    url: "https://ilmu-falak.vercel.app",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@ilmu_falak",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
