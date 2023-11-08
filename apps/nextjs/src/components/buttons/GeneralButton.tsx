import React from 'react'

interface GeneralButtonProps {
    text?: string
    emoji?: any
    bgColor?: string
    textColor?: string
    handleClick: (e: React.MouseEvent<HTMLButtonElement>, value?: number) => void
}

function GeneralButton({ text, emoji, bgColor, textColor, handleClick }: GeneralButtonProps) {
    return (
        <button className={`w-48  h-1/2 flex flex-row justify-center items-center rounded-3xl p-2 gap-2 font-semibold text-lg ${bgColor ? bgColor : ' bg-lightSecondary dark:bg-darkSecondary'} ${textColor ? textColor : ' dark:text-darkPrimary text-lightPrimary'}`} onClick={handleClick} >
            <span className=' h-full flex flex-row items-center justify-center '>
                <p>{emoji}</p></span>
            <div className={` h-full flex flex-row justify-center items-center `}>
                <p >{text}</p>
            </div>
        </button>
    )
}

export default GeneralButton