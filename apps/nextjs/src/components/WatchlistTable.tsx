import React from 'react'
import { trpc } from '../utils/trpc'
import { Category, Series, User } from '@acme/db'
import Image from 'next/image'
import { convertCategoryToString } from '../utilFunctions/convertCategoryToString'

interface WatchlistTableProps {
    seriesList: (User & {
        watchlist: (Series & {
            categories: Category[];
        })[];
    }) | null | undefined
}


function WatchlistTable({ seriesList }: WatchlistTableProps) {

    const clickRemove = trpc.user.removeFromWatchlist.useMutation()
    const utils = trpc.useContext();


    async function remove(seriesId: number) {
        clickRemove.mutate(seriesId)
        utils.user.getUsersWatchlist.invalidate()
    }





    return (
        <div className="overflow-x-auto  w-full px-8 text-lightSecondary dark:text-darkSecondary  ">
            <table className="table text-base ">
                <thead>
                    <tr className=' text-base dark:text-darkTertiary text-lightTertiary'>
                        <th className=' w-1/12' ></th>
                        <th className=' w-2/12'>Name</th>
                        <th className=' w-1/12'>Rating</th>
                        <th className=' w-5/12'>Genres</th>
                        <th className=' w-2/12'></th>
                    </tr>
                </thead>
                <tbody>
                    {seriesList?.watchlist.map((series, ind) => (
                        <tr key={`row-${ind}`}>
                            <td>
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <Image src={series.imgPath || "/general.jpeg"} alt="Avatar Tailwind CSS Component" width={100} height={100} />
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div>
                                    <div className="font-bold">{series.title}</div>
                                </div>
                            </td>
                            <td>
                                {series.score}
                            </td>
                            <td>{convertCategoryToString(series.categories)}</td>
                            <th>
                                <button className="btn btn-ghost btn-xs dark:bg-darkSecondary bg-lightSecondary  dark:text-darkPrimary text-lightPrimary dark:hover:text-darkTertiary hover:bg-lightTertiary  " onClick={() => remove(series.id)} >remove</button>
                            </th>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>



    )
}

export default WatchlistTable