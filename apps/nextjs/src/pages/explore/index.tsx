import React, { useEffect } from 'react'
import { trpc } from '../../utils/trpc';
import ExploreTable from '../../components/ExploreTable';

function Explore() {
    const allSeries = trpc.series.all.useMutation()

    const runDebouncedSeriesQuery = (val: string) => {
        allSeries.mutate(val)
    }

    useEffect(() => {
        allSeries.mutate("")
    }, [])

    return (
        <>
            <div className=' themed-centered-stack w-full'>
                <div className=" flex flex-row justify-center  w-1/4 h-1/6 py-10">
                    <div className=" pb-4 flex w-full flex-wrap items-stretch">
                        <input
                            type="search"
                            className=" m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_#F47521] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-darkSecondary"
                            placeholder="Search by title"
                            aria-label="Search"
                            aria-describedby="button-addon1"
                            onChange={(e) => runDebouncedSeriesQuery(e.currentTarget.value)}
                        />
                        <button
                            className=" z-[2] flex items-center rounded-r px-6 py-2.5 text-xs font-medium uppercase leading-tight text-white shadow-md transition duration-150 ease-in-out hover:bg-primary-700 hover:shadow-lg focus:bg-primary-700 focus:shadow-lg focus:outline-none focus:ring-0 dark:bg-darkSecondary bg-lightSecondary active:shadow-lg"
                            type="button"
                            id="button-addon1"
                            data-te-ripple-init
                            data-te-ripple-color="light">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                className="h-5 w-5">
                                <path
                                    fill-rule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clip-rule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
                {allSeries.data && allSeries.data?.length == 0 ?
                    <div className=' flex flex-row  justify-center items-center w-full   '>
                        <p className=' font-bold text-2xl'>No animes homie</p>
                    </div>
                    :
                    <ExploreTable seriesList={allSeries.data} />
                }
            </div>


        </>

    )

}

export default Explore