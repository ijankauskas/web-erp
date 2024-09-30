import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ecomsolver",
  description: "Te acompaños en todos tus procesos.",
};

export default function RootLayout({
  children,
  // session,
}: Readonly<{
  children: React.ReactNode;
  // session: any;
}>) {
  return (
    <html lang="en" className="text-black">
      <body className={inter.className}>
        {/* <SessionProvider session={session}> */}
            {children}
        {/* </SessionProvider> */}
      </body>
    </html>
  );
}
