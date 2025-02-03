import { Prisma } from "@acme/db";

const getAllPositiveReviewedSeries = async (
  userId: string,
  tx: Prisma.TransactionClient,
) => {
  try {
    const usersPositiveReviews = await tx.review.findMany({
      where: {
        reviewerId: userId,
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
            reviewerId: userId,
          },
          select: {
            rating: true,
          },
        },
      },
    });
  } catch (err) {
    console.log("Error getting list of positively reviewed series", err);
  }
};

export default getAllPositiveReviewedSeries;
