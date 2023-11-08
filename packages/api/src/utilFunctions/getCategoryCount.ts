import { prisma } from "@acme/db";

const getCategoryCount = async (
    userId: string
) => {
    try {
        const categoryCount = new Map<string, number>([
            ["Action", 0],
            ["Adventure", 0],
            ["Sci-fi", 0],
            ["Comedy", 0],
            ["Romance", 0],
            ["Ecchi", 0],
            ["Mecha", 0],
            ["Slice of Life", 0],
            ["Isekai", 0],
            ["Supernatural", 0]
        ]);

        const seriesIdsWithPositiveReviews = await prisma.review.findMany({
            where: {
                reviewerId: userId,
                rating: { in: [3, 4] }
            },
            select: {
                reviewedSeriesId: true
            }
        })

        const seriesIdArr = seriesIdsWithPositiveReviews.map((ser) => {
            return ser.reviewedSeriesId
        })

        if (seriesIdArr.length < 1) {
            return null
        }
        // get the categories of each series that the user likes
        const categoriesForEachSeries = await prisma.series.findMany({
            where: {
                id: { in: seriesIdArr }
            },
            select: {
                categories: {
                    select: {
                        title: true
                    }
                }
            }
        })
        // tally up scores for each category and return result as a Map
        categoriesForEachSeries.map((cat) => {
            cat.categories.map((cat2) => {
                if (categoryCount.has(cat2.title)) {
                    const currentCount = categoryCount.get(cat2.title)
                    categoryCount.set(cat2.title, (currentCount! + 1))
                }
            })
        })
        return categoryCount
    } catch (err) {
        console.error("Error counting liked categories in getCategoryCount.ts", err)
    }
}

export default getCategoryCount