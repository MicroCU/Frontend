import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { LangContextProvider } from "@/context/Language";
import { DictionaryContextProvider } from "@/context/Dictionary";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "µCU",
  description: "µCU is a platform for learning MicroLearning."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LangContextProvider>
          <DictionaryContextProvider>{children}</DictionaryContextProvider>
        </LangContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
