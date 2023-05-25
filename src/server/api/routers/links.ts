import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const linkInput = z.object({
  name: z.string(),
  url: z.string(),
});

export const linkRouter = createTRPCRouter({
  create: protectedProcedure
    .input(linkInput)
    .mutation(async ({ input, ctx }) => {
      const link = await ctx.prisma.links.create({
        data: {
          ...input,
          userId: ctx.session?.user.id,
        },
      });
      return link;
    }),
  getAll: protectedProcedure.query(async ({ ctx }) => {
    const links = await ctx.prisma.links.findMany({
      where: {
        userId: ctx.session?.user.id,
      },
    });
    return links;
  }),
});
