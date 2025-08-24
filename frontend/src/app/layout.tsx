// src/app/layout.tsx
import "./globals.css";

import { ReactNode } from "react";

export const metadata = {
  title: "Travel App",
  description: "Plan your trips easily",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
