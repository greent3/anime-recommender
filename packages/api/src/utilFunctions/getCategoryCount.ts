import { Prisma } from "@acme/db";

const getCategoryCount = async (
  userId: string,
  tx: Prisma.TransactionClient,
) => {
  try {
    const seriesWithPositiveReviews = await tx.review.findMany({
      where: {
        reviewerId: userId,
        rating: { in: [3, 4] },
      },
      select: {
        reviewedSeriesId: true,
        reviewedSeries: {
          select: {
            title: true,
            categories: true,
          },
        },
      },
    });

    if (seriesWithPositiveReviews.length < 1) {
      return null;
    }

    const categoryCount = new Map<string, number>([]);
    const positiveReviewedSeriesMapping = seriesWithPositiveReviews.map(
      (ser) => {
        ser.reviewedSeries.categories.map((category) => {
          const currentCategoryTotal = categoryCount.get(category.title);
          if (!currentCategoryTotal) {
            categoryCount.set(category.title, 1);
          } else {
            categoryCount.set(category.title, currentCategoryTotal + 1);
          }
        });
      },
    );

    return categoryCount;
  } catch (err) {
    console.error(
      "Error counting liked categories in getCategoryCount.ts",
      err,
    );
  }
};

export default getCategoryCount;
