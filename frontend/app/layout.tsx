import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from '@react-oauth/google';
import "./globals.css";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BloomWell",
  description: "An online therapy platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>
        <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID as string}>
          {children}
          </GoogleOAuthProvider>
        </body>
      </html>
  );
}