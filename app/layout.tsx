import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TranslationContextProvider } from "@/context/Translation";
import AuthContextProvider from "@/context/Auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "µCU",
  description:
    "µCU is a online learning platform with MicroLearning Style, powered by MyCourseVille"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TranslationContextProvider>
          <AuthContextProvider>
            {children}
            <Toaster />
          </AuthContextProvider>
        </TranslationContextProvider>
        <Toaster />
      </body>
    </html>
  );
}
