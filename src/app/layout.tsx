import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import BackButton from "@/app/components/BackButton";
const inter = Inter({ subsets: ["latin"] });
import MyUserButton from "./components/MyUserButton";
import { Suspense } from "react";
import Link from "next/link";
export const metadata = {
  title: "Bad Words Thing",
  description:
    "Bad Words Thing - A Next.js web app for detecting profanity in song lyrics. Your Song Lyrics Scanner for Radio-Friendly Tunes. Find those not-so-obvious words in songs that might not be radio-friendly. Not just the regular bad words.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="w-full mx-auto h-full">
            <header className="z-10 fixed top-0 left-0 right-0 bg-white border-b border-gray-100">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center py-4">
                  {/* Left Side - Navigation */}
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button className="text-gray-600 hover:text-gray-900 transition-colors" />
                      <div className="h-4 w-px bg-gray-200" /> {/* Divider */}
                      <Link
                        href="/"
                        className="flex items-center space-x-2 font-semibold text-gray-900 hover:text-blue-600 transition-colors"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        <span>Home</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Side - User Button */}
                  <div className="flex items-center">
                    <Suspense
                      fallback={
                        <div className="animate-pulse flex items-center justify-center w-8 h-8 bg-gray-200 rounded-full">
                          <span className="sr-only">Loading user menu...</span>
                        </div>
                      }
                    >
                      <MyUserButton />
                    </Suspense>
                  </div>
                </div>
              </div>
            </header>
            {/* Spacer to prevent content from hiding under fixed header */}
            <div className="h-16" />{" "}
            {/* Adjust height to match header height */}
            <div className="pt-12">{children}</div>
            <footer className="z-10 py-2 fixed bottom-0 left-0 right-0 text-sm flex justify-end items-center w-full bg-slate-100">
              <div className="mx-4">
                <Link href={"/admin"}>Admin</Link>
              </div>
            </footer>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
