import { filmType } from "@acme/db";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import getAllUnreviewedSeries from "../utilFunctions/getAllNewSeries";
import pickRandomSeriesFromSeriesList from "../utilFunctions/pickRandomSeriesFromSeriesList";
import getAllPositiveReviewedSeries from "../utilFunctions/getAllPositiveReviewedSeries";
import hasNoCommonGenres from "../utilFunctions/hasNoCommonGenres";
import { subtractArray } from "../utilFunctions/subtractArray";

export const seriesRouter = router({
  getInfinite: protectedProcedure
    .input(
      z.object({
        text: z.string().optional(),
        cursor: z.number().optional(),
        limit: z.number().default(10),
      }),
    )
    .query(async ({ ctx, input }) => {
      if (!ctx.auth.userId) {
        return { items: [], nextCursor: null };
      }

      const { text, cursor, limit } = input;

      const series = await ctx.prisma.series.findMany({
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        where: text
          ? {
              title: {
                contains: text,
              },
            }
          : {},
        include: {
          categories: true,
          reviews: {
            where: {
              reviewerId: ctx.auth.userId,
            },
            select: {
              rating: true,
            },
          },
        },
        orderBy: { title: "asc" },
      });

      const nextCursor = series.length > limit ? series.pop()?.id : null;

      return {
        items: series,
        nextCursor,
      };
    }),

  byId: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
    return await ctx.prisma.series.findFirst({
      where: {
        id: input,
      },
    });
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        bio: z.string(),
        airDate: z.string(),
        episodes: z.number(),
        score: z.number(),
        type: z.nativeEnum(filmType),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.series.create({
        data: input,
      });
    }),

  getAllPositiveReviewedSeries: protectedProcedure.query(async ({ ctx }) => {
    return await getAllPositiveReviewedSeries(ctx.auth.userId, ctx.prisma);
  }),

  getRecommendation: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.$transaction(async (tx) => {
      try {
        // get all unreviewed series to choose from
        const allUnreviewedSeries =
          (await getAllUnreviewedSeries(ctx.auth.userId, tx)) || [];

        const numberOfReviewedSeries = allUnreviewedSeries.length;

        if (numberOfReviewedSeries == 0) {
          console.error("No more series left to review! :(");
          return null;
        }

        const allLikedSeries =
          (await getAllPositiveReviewedSeries(ctx.auth.userId, tx)) || [];

        const numberOfLikedSeries = allLikedSeries.length;

        //flip a coin to determine algorithm
        // 50% chance of randomly picking from any genre
        // 50% change of randomly picking based on a previously liked genre
        const pickSeriesRandomly = Math.random() < 0.5;

        if (pickSeriesRandomly || numberOfLikedSeries < 5) {
          // must like at least 5 animes to get recommendations
          console.log("-------- Picking series randomly!");
          return pickRandomSeriesFromSeriesList(allUnreviewedSeries);
        } else {
          let seriesToRemove: any[] = [];
          // loop through liked series and get genres
          let allLikedCategories: Set<string> = new Set();
          allLikedSeries.map((likedSeries, ind) => {
            likedSeries.categories.map((category) => {
              allLikedCategories.add(category.title);
            });
          });
          // loop through unreviewed series and remove ones
          // that don't match the user's previously liked genres
          allUnreviewedSeries.map((ser) => {
            let listOfCategories: string[] = [];
            ser.categories.map((cat) => {
              listOfCategories.push(cat.title);
            });
            if (hasNoCommonGenres(listOfCategories, allLikedCategories)) {
              seriesToRemove.push(ser);
            }
          });

          const listOfSeriesWithLikedGenre = subtractArray(
            allUnreviewedSeries,
            seriesToRemove,
          );

          const randomSeriesPickedByCategory = pickRandomSeriesFromSeriesList(
            listOfSeriesWithLikedGenre,
          );

          return randomSeriesPickedByCategory;
        }
      } catch (err) {
        console.log("Error getting recommended series.", err);
      }
    });
  }),
});
