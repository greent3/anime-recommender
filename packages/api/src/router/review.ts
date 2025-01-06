import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import getCategoryCount from "../utilFunctions/getCategoryCount";

export const reviewRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        reviewedSeriesId: z.number(),
        rating: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (ctx.auth.userId) {
        try {
          return await ctx.prisma.review.upsert({
            where: {
              reviewerId_reviewedSeriesId: {
                reviewerId: ctx.auth.userId,
                reviewedSeriesId: input.reviewedSeriesId,
              },
            },
            update: {
              reviewerId: ctx.auth.userId,
              reviewedSeriesId: input.reviewedSeriesId,
              rating: input.rating,
            },
            create: {
              reviewerId: ctx.auth.userId,
              reviewedSeriesId: input.reviewedSeriesId,
              rating: input.rating,
            },
          });
        } catch (err) {
          console.error("Error creating/updating review", err);
        }
      }
      return null;
    }),

  getStats: protectedProcedure.input(z.string()).query(async ({ ctx }) => {
    if (ctx.auth.userId) {
      const categoryCount = await getCategoryCount(ctx.auth.userId, ctx.prisma);
      if (categoryCount) {
        // format users liked category data into the shape accepted by ReactPieChart
        const likedCategoryArrayForPieChart: (string | number)[][] = [
          ["Category", "Liked Animes"],
        ];
        for (const key of categoryCount.keys()) {
          likedCategoryArrayForPieChart.push([key, categoryCount.get(key)!]);
        }
        return likedCategoryArrayForPieChart;
      }
    }
    return null;
  }),
});
