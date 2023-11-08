import React from 'react'
import GeneralButton from './GeneralButton'


interface InquiryButtonRowProps {
    goToRating: () => void
    goToWatchlist: () => void
}

function InquiryButtonRow({ goToRating, goToWatchlist }: InquiryButtonRowProps) {



    return (
        <div className=' w-full flex flex-row  h-1/5 justify-center items-center  gap-72 '>
            <GeneralButton text={`Haven't seen it`} emoji='❌' handleClick={goToWatchlist} />
            <GeneralButton text='Seen it' emoji='✅' handleClick={goToRating} />
        </div>
    )
}

export default InquiryButtonRow