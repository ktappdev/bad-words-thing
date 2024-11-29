import { authMiddleware } from "@clerk/nextjs";
 
export default authMiddleware({
  // Only protect the admin routes
  publicRoutes: (req) => !req.url.includes('/admin')
});
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
