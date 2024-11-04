import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/results",
    "/admin",
    "/search",
    "/api/getlyrics",
    "/api/processtext",
    "/api/getbwcount",
    "/api/addsearchedsong",
    "/sign-in",
    "/sign-up",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
