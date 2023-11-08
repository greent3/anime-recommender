import React from 'react'
import PageTitle from '../../components/static/PageTitle'
import WatchlistTable from '../../components/WatchlistTable'
import { trpc } from '../../utils/trpc'

function Watchlist() {

    const allSeries = trpc.user.getUsersWatchlist.useQuery()



    return (
        <div className=' themed-centered-stack-fullwidth-fullheight gap-14 pt-12' >
            <PageTitle title={"My Watchlist"} />
            <div className='w-full h-full'>
                <WatchlistTable seriesList={allSeries.data} />
            </div>
        </div>
    )
}

export default Watchlist