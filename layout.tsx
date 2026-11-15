import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mi Español | Your Spanish learning companion",
  description: "A personal Spanish learning app and DELE A2 preparation companion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
