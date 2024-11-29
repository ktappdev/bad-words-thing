import React from "react";
import Admin from "@/app/components/Admin";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const page = async () => {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex pt-12 w-full flex-col items-center justify-center md:max-w-4xl mx-auto">
      <Admin />
    </div>
  );
};

export default page;