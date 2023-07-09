import React from "react";
import Admin from "@/app/components/Admin";

// import { currentUser } from "@clerk/nextjs/app-beta";
const page = () => {

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center md:max-w-4xl mx-auto">
      <Admin />
    </div>
  );
};

export default page;
