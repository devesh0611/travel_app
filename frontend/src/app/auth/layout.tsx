// frontend/src/app/auth/layout.tsx
import "../../styles/globals.css";


import React from 'react';

export const metadata = {
  title: 'Travel App',
  description: 'A modern travel booking app',
};
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}

