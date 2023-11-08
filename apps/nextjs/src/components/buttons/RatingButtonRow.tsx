import React from 'react'
import GeneralButton from './GeneralButton'
import { trpc } from '../../utils/trpc';

interface InquiryButtonRowProps {
    goToInquiry: () => void
    seriesId: number
}

function RatingButtonRow({ goToInquiry, seriesId }: InquiryButtonRowProps) {
    const utils = trpc.useContext()
    const rateSeriesMutation = trpc.review.create.useMutation()

    async function handleRatingClick(rating: number) {
        await rateSeriesMutation.mutateAsync({
            reviewedSeriesId: seriesId,
            rating: rating,
        })
        goToInquiry()
        utils.series.getRecommendation.invalidate()
    }

    return (
        <div className=' themed-centered-box w-full h-1/5  gap-20' >
            <GeneralButton text={`Loved`} emoji='🥰' handleClick={() => handleRatingClick(4)} />
            <GeneralButton text={`Liked`} emoji='😊' handleClick={() => handleRatingClick(3)} />
            <GeneralButton text={`Ehh`} emoji='😐' handleClick={() => handleRatingClick(2)} />
            <GeneralButton text={`Disliked`} emoji='🤢' handleClick={() => handleRatingClick(1)} />
            <GeneralButton text={`Skip ${">"}`} bgColor='bg-inherit' textColor='text-lightSecondary dark:text-darkSecondary ' handleClick={() => handleRatingClick(0)} />
        </div >
    )
}

export default RatingButtonRow