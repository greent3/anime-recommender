import { prisma } from "@acme/db";

const getAllNewSeries = async (
    userId: string
) => {
    try {
        const reviewedSeriesIds = await prisma.review.findMany({
            where: {
                reviewerId: userId
            },
            select: {
                reviewedSeriesId: true
            }
        })

        const reviewedSeriesIdArray = reviewedSeriesIds.map((series) => {
            return series.reviewedSeriesId
        })

        const allUnreviewedSeries = await prisma.series.findMany({
            where: {
                id: { notIn: reviewedSeriesIdArray }
            },
            include: {
                categories: true
            }
        })



        return allUnreviewedSeries


    } catch (err) {
        console.log("Error getting list of new series in getAllNewSeries.ts", err)
    }
}

export default getAllNewSeries