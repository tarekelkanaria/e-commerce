import { Archivo } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const archivo = Archivo({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce platform for all kinds of products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={archivo.className}>{children}</body>
    </html>
  );
}
