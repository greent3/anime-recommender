import React from 'react'
import GeneralButton from './GeneralButton'
import { trpc } from '../../utils/trpc'


interface AddToWatchlistButtonRowProps {
    goToInquiry: () => void
    seriesId: number
}

function AddToWatchlistButtonRow({ goToInquiry, seriesId }: AddToWatchlistButtonRowProps) {
    const utils = trpc.useContext()
    const addToWatchlistMutation = trpc.user.addToWatchlist.useMutation()
    const rateSeriesMutation = trpc.review.create.useMutation()


    async function handleAddToWatchlistClick() {
        await addToWatchlistMutation.mutateAsync(
            seriesId
        )
        await rateSeriesMutation.mutateAsync({
            reviewedSeriesId: seriesId,
            rating: 0
        })
        setTimeout(function () {
            console.log(`Added series with series id:${seriesId} to watchlist!`)
        }, 200)
        utils.series.getRecommendation.invalidate()
        goToInquiry()

    }

    async function handleRefusalClick() {
        await rateSeriesMutation.mutateAsync({
            reviewedSeriesId: seriesId,
            rating: 0,
        })
        utils.series.getRecommendation.invalidate()
        goToInquiry()
    }

    return (
        <div className=' themed-centered-box h-1/5 gap-72 '>
            <GeneralButton text={`Don't add to watchlist`} emoji='🙅' handleClick={handleRefusalClick} />
            <GeneralButton text={`Add to watchlist`} emoji='📝' handleClick={handleAddToWatchlistClick} />
        </div>
    )
}

export default AddToWatchlistButtonRow