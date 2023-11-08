import { Category, Series } from "@acme/db";

const pickRandomSeriesFromSeriesList = async (
    seriesList: (Series & {
        categories: Category[];
    })[]
) => {
    try {
        const seriesLength = seriesList.length
        if (seriesLength > 0) {
            const randomNumber = Math.random();
            const scaledNumber = randomNumber * seriesLength;
            const roundedNumber = Math.floor(scaledNumber);
            seriesList[roundedNumber]
            return seriesList[roundedNumber]
        }
        else {
            return null
        }

    } catch (err) {
        console.error("Error picking series from list in pickRandomSeriesFromSeriesList.ts", err)
    }
}

export default pickRandomSeriesFromSeriesList