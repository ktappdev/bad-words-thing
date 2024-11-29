import React from "react";
import Admin from "@/app/components/Admin";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { clerkClient } from "@clerk/nextjs";

const page = async () => {
  const { userId } = auth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  // Get the user's data to check their role
  const user = await clerkClient.users.getUser(userId);
  
  // Check if user has admin role (you can customize this based on your Clerk user metadata)
  const isAdmin = user.privateMetadata.role === "admin";
  
  if (!isAdmin) {
    redirect("/"); // Redirect non-admin users to home page
  }

  return (
    <div className="flex pt-12 w-full flex-col items-center justify-center md:max-w-4xl mx-auto">
      <Admin />
    </div>
  );
};

export default page;