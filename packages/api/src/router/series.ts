import { filmType } from "@acme/db";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import getAllUnreviewedSeries from "../utilFunctions/getAllNewSeries";
import pickRandomSeriesFromSeriesList from "../utilFunctions/pickRandomSeriesFromSeriesList";
import getCategoryCount from "../utilFunctions/getCategoryCount";
import { generateIdArray } from "../utilFunctions/generateIdArray";

// pull the "mapping array to IDs" thing into its own util function?

export const seriesRouter = router({
  all: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
    if (ctx.auth.userId) {
      if (input === "") {
        return await ctx.prisma.series.findMany({
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
          orderBy: {
            title: "asc",
          },
        });
      } else {
        return await ctx.prisma.series.findMany({
          where: {
            title: {
              contains: input,
            },
          },
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
          orderBy: {
            title: "asc",
          },
        });
      }
    } else {
      return null;
    }
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

  getRecommendation: protectedProcedure.query(async ({ ctx }) => {
    return ctx.prisma.$transaction(async (tx) => {
      try {
        // get all unreviewed series to choose from
        const allUnreviewedSeries = await getAllUnreviewedSeries(
          ctx.auth.userId,
          tx,
        );

        if (!allUnreviewedSeries) {
          console.error("No more series left to review! :(");
          return null;
        } // maybe fix this so that it gets something

        //flip a coin to determine algorithm
        // 50% chance of randomly picking from any genre
        // 50% change of randomly picking from a previously liked genre
        const pickSeriesRandomly = Math.random() < 0.5;

        if (pickSeriesRandomly) {
          console.log("-------- Picking series randomly!");
          return pickRandomSeriesFromSeriesList(allUnreviewedSeries);
        } else {
          // pick an unreviewed series from a previously liked genre
          const categoryCount = await getCategoryCount(ctx.auth.userId, tx);

          if (categoryCount) {
            //get sum of each category for all of this users reviewed series'
            let sumOfCategoryLikes = 0;
            for (const key of categoryCount.keys()) {
              sumOfCategoryLikes = sumOfCategoryLikes + categoryCount.get(key)!;
            }

            //pick randomly if the user hasn't rated any animes yet (because we have no categories for our recommender to choose from)
            if (sumOfCategoryLikes == 0) {
              return pickRandomSeriesFromSeriesList(allUnreviewedSeries);
            }
            // form a 0-100 category distribution based on previously liked category percentages
            // (ex: if the user liked 2 Action animes and 1 Sci-fi anime, the distribution would be
            //  Action: 0%-66.7%, Sci-fi: 66.7%-100%)
            const arrOfCategoryPercentages: (string | number)[][] = []; // a double array?????
            for (const genreTitle of categoryCount.keys()) {
              arrOfCategoryPercentages.push([
                genreTitle,
                categoryCount.get(genreTitle)! / sumOfCategoryLikes,
              ]);
            }

            //  pick a random number from within the distribution to determine which category of series we will randomly pull from
            const randomNumber = Math.random();
            let chosenCategory = "";
            let runningTotal = 0;
            for (const categoryAndPercentage of arrOfCategoryPercentages) {
              runningTotal += Number(categoryAndPercentage[1]); //
              if (runningTotal >= randomNumber) {
                chosenCategory = String(categoryAndPercentage[0]);
                break;
              }
            }
            // randomly choose an unreviewed series with our chosen category
            const allUnreviewedSeriesIds = generateIdArray(allUnreviewedSeries);
            const unreviewedSeriesOfChosenCategory = await tx.series.findMany({
              where: {
                categories: {
                  some: {
                    title: { in: [chosenCategory] },
                  },
                },
                id: { in: allUnreviewedSeriesIds },
              },
              include: {
                categories: true,
              },
            });

            if (unreviewedSeriesOfChosenCategory.length !== 0) {
              // no more series of chosen category left, pick randomly instead
              const chosenSeries = pickRandomSeriesFromSeriesList(
                unreviewedSeriesOfChosenCategory,
              );

              // console.log(
              //   "-------- chosenSeries is",
              //   chosenSeries?.title,
              //   ". Which shares the genere of ",
              //   chosenCategory,
              //   "!",
              // );
              return chosenSeries;
            }
          }
        }
      } catch (err) {
        console.log("Error getting recommended series.", err);
      }
    });
  }),

  getAllPositiveReviewedSeries: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.$transaction(async (tx) => {
      if (ctx.auth.userId) {
        const usersPositiveReviews = await tx.review.findMany({
          where: {
            reviewerId: ctx.auth.userId,
            rating: { in: [3, 4] },
          },
          select: {
            reviewedSeriesId: true,
            rating: true,
          },
        });

        const reviewedSeriesIds = usersPositiveReviews.map((review) => {
          return review.reviewedSeriesId;
        });

        return await tx.series.findMany({
          where: {
            id: { in: reviewedSeriesIds },
          },
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
        });
      } else {
        return null;
      }
    });
  }),
});
