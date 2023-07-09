import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs/app-beta";
import BackButton from "@/app/components/BackButton";
const inter = Inter({ subsets: ["latin"] });
import MyUserButton from "./components/MyUserButton";
import { Suspense } from "react";
export const metadata = {
  title: "Bad Words Thing",
  description:
    "My deep hip hop immersion desensitized me to curse words and inappropriate language. By creating a lyrics scanning app, I can save time editing for our radio station by knowing what to expect before even playing the song.",
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
          <div className="max-w-3xl mx-auto h-full">
            <header className=" z-10 py-2 fixed top-0 left-0 right-0 flex justify-between items-center w-full bg-slate-100 dark:bg-gray-900">
              <div className="flex mx-4 font-extrabold gap-2">
                <BackButton />
                {/* <Logo /> */}
              </div>
              <div className="flex mx-4 ">
                <Suspense fallback={<div>Loading...</div>}>
                  <MyUserButton />
                </Suspense>
              </div>
            </header>
            <div className="flex flex-col justify-center items-center w-full h-[calc(100vh-100px)]">
              {children}
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
