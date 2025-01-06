import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const userRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.user.create({
        data: {
          id: ctx.auth.userId,
          username: input.username,
          email: input.email,
        },
      });
    }),

  getUsersWatchlist: protectedProcedure.query(async ({ ctx }) => {
    if (ctx.auth.userId) {
      return await ctx.prisma.user.findUnique({
        where: {
          id: ctx.auth.userId,
        },
        include: {
          watchlist: {
            include: {
              categories: true,
            },
          },
        },
      });
    } else {
      return null;
    }
  }),

  addToWatchlist: protectedProcedure
    .input(z.number())
    .mutation(async (opts) => {
      if (opts.ctx.auth.userId) {
        return opts.ctx.prisma.user.update({
          where: {
            id: opts.ctx.auth.userId,
          },
          data: {
            watchlist: {
              connect: { id: opts.input },
            },
          },
          include: {
            watchlist: true,
          },
        });
      } else {
        return null;
      }
    }),

  removeFromWatchlist: protectedProcedure
    .input(z.number())
    .mutation(async (opts) => {
      if (opts.ctx.auth.userId) {
        return await opts.ctx.prisma.user.update({
          where: {
            id: opts.ctx.auth.userId,
          },
          data: {
            watchlist: {
              disconnect: { id: Number(opts.input) },
            },
          },
          include: {
            watchlist: true,
          },
        });
      } else {
        return null;
      }
    }),
});
