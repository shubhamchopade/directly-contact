import { linkRouter } from "~/server/api/routers/links";
import { createTRPCRouter } from "~/server/api/trpc";
import { metaRouter } from "./routers/meta";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  links: linkRouter,
  meta: metaRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
