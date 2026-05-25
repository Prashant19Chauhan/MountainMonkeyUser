import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/provider/ReactQueryProvider";
import { StoreProvider } from "@/store/StoreProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mountain Monkey",
  description: "Mountain Monkey | AI-Powered Travel Assistant",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <StoreProvider>
          <ReactQueryProvider>
            <ThemeProvider>
              {children}
              <Toaster richColors position="top-right"/>
            </ThemeProvider>
          </ReactQueryProvider>
        </StoreProvider>
        </body>
    </html>
  );
}



