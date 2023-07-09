import Image from "next/image";

import Main from "./components/Main";

export default function Home() {
  return (
    <main className="flex  w-full flex-col items-center justify-center md:max-w-4xl mx-auto px-8 pt-24">
      <Main />
    </main>
  );
}
