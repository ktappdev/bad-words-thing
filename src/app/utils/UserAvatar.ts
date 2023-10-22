import { currentUser } from "@clerk/nextjs";

export default async function UserAvatar() {
  const user = await currentUser();
  // console.log(user);

  if (!user) return null;

  return user?.imageUrl;
}
