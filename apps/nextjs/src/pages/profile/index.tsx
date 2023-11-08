import { NextPage } from 'next'
import React from 'react'

import { trpc } from '../../utils/trpc';
import SeriesTable from '../../components/SeriesTable';
import PageTitle from '../../components/static/PageTitle';
import Image from 'next/image';
import PieChart from '../../components/data/pieChart/PieChart';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from "../../../tailwind.config.cjs"
import LoadingButton from '../../components/static/LoadingButton';



const Profile: NextPage = () => {

    const fullConfig = resolveConfig(tailwindConfig)
    const chartFontColor = fullConfig.theme?.colors['darkSecondary'] || '#F47521'
    const profileStats = trpc.review.getStats.useQuery('1')

    if (profileStats.isFetching) {
        return (
            <div className=' themed-centered-stack-fullwidth-fullheight '>
                <LoadingButton />
            </div>
        )
    } else {
        return (
            <div className=' themed-centered-stack-fullwidth-fullheight pt-12'>
                <PageTitle title={"My Profile"} />
                <>
                    {profileStats.data ? <div className=' w-full h-full flex flex-row  gap-16'>
                        <PieChart likedCategoryData={profileStats.data} fontColor={chartFontColor} />

                        <div className=' themed-centered-stack  w-3/5 h-full  pb-16  '>
                            <p className=' font-bold text-2xl' >My Liked Animes</p>
                            <SeriesTable />
                        </div>
                    </div> :
                        <div className=' flex flex-col  h-full   items-center pt-28 text-3xl dark:text-darkSecondary text-lightSecondary'>
                            <p className=' themed-centered-stack  w-3/5 h-1/5   ' > {'No Liked Animes?!?! '}</p>
                            <Image src={"/sad2.png"} alt="" width={300} height={100} />

                            <p className=' themed-centered-stack w-3/5 h-1/5   ' > Go Review some animes and come back!</p>
                        </div>}
                </>
            </div>

        )
    }


}

export default Profile