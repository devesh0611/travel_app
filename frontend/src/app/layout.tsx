// src/app/layout.tsx
import "./globals.css";

import { ReactNode } from "react";
// import { Inter } from "next/font/google";

import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // normal, medium, semibold, bold
});


export const metadata = {
  title: "Travel App",
  description: "Plan your trips easily",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body className={poppins.className}></body>
      {children}
    </html>
  );
}
