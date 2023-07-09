import { UserProfile } from "@clerk/nextjs";

const page = () => {
  // return <UserProfile />;
  return (
    <div className="flex flex-col w-full h-full overflow-auto">
      <UserProfile />
    </div>
  );
};

export default page;
