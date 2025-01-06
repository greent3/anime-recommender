import { Prisma } from "@acme/db";

const getAllUnreviewedSeries = async (
  userId: string,
  tx: Prisma.TransactionClient,
) => {
  try {
    const reviewedSeriesIds = await tx.review.findMany({
      where: {
        reviewerId: userId,
      },
      select: {
        reviewedSeriesId: true,
      },
    });

    const reviewedSeriesIdArray = reviewedSeriesIds.map(
      (series: { reviewedSeriesId: number }) => {
        return series.reviewedSeriesId;
      },
    );

    const allUnreviewedSeries = await tx.series.findMany({
      where: {
        id: { notIn: reviewedSeriesIdArray },
      },
      include: {
        categories: true,
      },
    });

    return allUnreviewedSeries;
  } catch (err) {
    console.log("Error getting list of new series in getAllNewSeries.ts", err);
  }
};

export default getAllUnreviewedSeries;
