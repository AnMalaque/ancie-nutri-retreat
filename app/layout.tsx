import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nutri Retreat – Filipino Food Exchange Tracker",
  description: "Track your nutrition using the Filipino Food Exchange Lists. Cozy, simple, and accurate calorie counting.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
