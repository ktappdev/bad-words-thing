import Image from "next/image";

import TextInputComponent from "./components/TextInputComponent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <TextInputComponent />
    </main>
  );
}
