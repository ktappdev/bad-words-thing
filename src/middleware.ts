import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/results",
    "/search",
    "/api/getlyrics",
    "/api/processtext",
    "/api/getbwcount",
    "/api/removefromdb",
    "/api/updatedb",
    "/api/addsearchedsong",
    "/sign-in",
    "/sign-up",
    "/history",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
