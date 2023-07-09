import React from "react";
import { currentUser } from "@clerk/nextjs/app-beta";
const page = async () => {
  const user = await currentUser();
  console.log("this is user", user);
  return (
    <div className="container mt-8 px-8 flex flex-col justify-center items-center">
      <h1 className="text-xl font-bold">Sorry you are not authorized</h1>
      <p className="text-sm">Please contact your administrator</p>
      <p className="text-sm">
        with your email - {user?.emailAddresses[0].emailAddress}
      </p>
      {/* not sure if this will always be the primary email, test what  happens if the person got two email on file */}
    </div>
  );
};

export default page;
