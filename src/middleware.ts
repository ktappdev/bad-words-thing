import {
  authMiddleware
} from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/results",
    "/search",
    "/api/getlyrics",
    "/api/processtext",
    "/api/getbwcount",
    "/sign-in",
    "/sign-up",
  ],

});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
