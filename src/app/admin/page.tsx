import React from "react";
import Admin from "@/app/components/Admin";

// import { currentUser } from "@clerk/nextjs/app-beta";
const page = () => {
  console.log("here");
  return (
    <div className="flex pt-12 w-full flex-col items-center justify-center md:max-w-4xl mx-auto">
      <Admin />
    </div>
  );
};

export default page;
