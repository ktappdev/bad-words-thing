import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="flex justify-center overflow-auto">
      <SignUp />
    </div>
  );
}
