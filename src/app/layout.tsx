import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

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
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  );
}
