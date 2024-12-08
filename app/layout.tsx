"use client";
import { Inter } from "next/font/google";
import 'react-toastify/dist/ReactToastify.css';
import "../public/scss/globals.scss";
import ReduxProvider from "@/store/redux-provider";
import Header from "@/components/header";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <main className="justify-center items-center p-4">
            {children}
          </main>
        </ReduxProvider>
      </body>
    </html>
  );
}
