import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
import Header from "./components/Header";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const roboto = Roboto({subsets:["latin"],weight:'400'});


export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Tracker App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${roboto.className} ${geistMono.variable} antialiased`}>
          <Header/>
          <div className="main p-4 m-4">
          {children}
          <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}
