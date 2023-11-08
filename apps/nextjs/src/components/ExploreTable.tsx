import React from 'react'
import Image from 'next/image'
import { convertCategoryToString } from '../utilFunctions/convertCategoryToString'
import { convertRatingToString } from '../utilFunctions/convertRatingToString'
import { Category, Series } from '@acme/db'
import LoadingButton from './static/LoadingButton'

interface ExploreTableProps {
    seriesList: (Series & { categories: Category[]; reviews: { rating: number | null; }[]; })[] | null | undefined
}


function ExploreTable({ seriesList }: ExploreTableProps) {

    return (
        <div className=" themed-centered-stack w-full px-8   ">
            {seriesList ?
                <table className=' flex flex-col w-full  justify-center items-center'>
                    {/* head */}
                    <thead className=' flex- flex-row w-full h-full'>
                        <tr className='flex flex-row w-full pb-8 text-xl'>
                            <th className=' w-1/12 ' ></th>
                            <th className=' flex w-3/12 justify-start items-start text-lightTertiary dark:text-darkTertiary '>Name</th>
                            <th className=' flex w-2/12 justify-start items-start text-lightTertiary dark:text-darkTertiary  '>Rating</th>
                            <th className=' flex w-5/12 justify-start items-start text-lightTertiary dark:text-darkTertiary '>Genres</th>
                            <th className='flex  w-1/12 justify-start items-start text-lightTertiary dark:text-darkTertiary '>My Review</th>
                        </tr>
                    </thead>
                    <tbody className='flex flex-col w-full h-full  pb-10'>
                        <>
                            {seriesList?.map((series, ind) => (
                                <>
                                    <tr key={`row-${ind}`} className=' flex flex-row w-full h-full items-center pt-2'>
                                        <td className='w-1/12'>
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <Image src={series.imgPath || "/general.jpeg"} alt="Anime Picture" width={100} height={100} />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='w-3/12'>
                                            <div>
                                                <div className="font-bold">{series.title}</div>
                                            </div>
                                        </td>
                                        <td className=' flex flex-row w-2/12 pl-4'>
                                            {series.score}
                                        </td>
                                        <td className=' w-5/12'>{convertCategoryToString(series.categories)}</td>
                                        <td className=' flex flex-row w-1/12 justify-center'>
                                            {convertRatingToString(series.reviews[0]?.rating || 0)}
                                        </td>
                                    </tr>
                                    {ind != seriesList.length - 1 && <div className=' flex  flex-row w-full h-px  bg-black ' />}
                                </>
                            ))}
                        </>
                    </tbody>
                </table>
                :
                <LoadingButton />}

        </div>

    )
}

export default ExploreTable