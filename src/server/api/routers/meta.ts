import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

const metaInput = z.object({
  pronoun: z.string(),
  title: z.string(),
  bio: z.string(),
});

export const metaRouter = createTRPCRouter({
  create: protectedProcedure
    .input(metaInput)
    .mutation(async ({ input, ctx }) => {
      const meta = await ctx.prisma.userMeta.create({
        data: {
          ...input,
          userId: ctx.session?.user.id,
        },
      });
      return meta;
    }),
  get: protectedProcedure.query(async ({ ctx }) => {
    const meta = await ctx.prisma.userMeta.findFirst({
      where: {
        userId: ctx.session?.user.id,
      },
    });
    return meta;
  }),
});
