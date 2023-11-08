import { Category } from '@acme/db'
import Image from 'next/image'
import PageTitle from './PageTitle'

interface SeriesDetailsProps {
    title: string
    bio?: string | undefined | null
    type?: string | undefined | null
    episodes?: number | undefined | null
    aired?: string | undefined | null
    imgPath?: string | undefined | null
    score?: string | undefined | null
    categories?: Category[] | undefined
}

export function SeriesDetails({ title, bio, type, episodes, aired, imgPath, score, categories }: SeriesDetailsProps) {

    let catString = ""
    categories?.map((cat, index) => {
        if (index >= 1 && index < categories?.length) {
            catString = catString.concat(", ", cat.title)
        } else {
            catString = catString.concat(cat.title)
        }

    })

    return (
        <div className=' themed-centered-stack-fullwidth-fullheight  gap-10  px-32 ' >

            <PageTitle title={title} />
            <div className="themed-centered-box-fullwidth-fullheight gap-10">
                <div className=" themed-centered-box-fullwidth-fullheight   ">
                    <div className='themed-centered-box  w-3/4 h-3/4  relative '>
                        <Image
                            src={imgPath || "/general.jpeg"}
                            alt="There was supposed to be a really cool image here :/"
                            fill={true}
                        />
                    </div>
                </div>
                <div className=" flex flex-col h-full  w-full justify-between px-12">
                    <SeriesText label='Type' text={type} />
                    <SeriesText label='Score' text={score + " / 10"} />
                    <SeriesText label='Bio' text={bio} />
                    <SeriesText label='Episodes' text={episodes ? String(episodes) : "Unknown"} />
                    <SeriesText label='Aired' text={aired} />
                    <SeriesText label='Categories' text={catString} />
                </div>
            </div>
        </div>

    )
}

interface SeriesTextProps {
    label: string | null
    text?: string | null
}


export function SeriesText({ label, text }: SeriesTextProps) {
    return (
        <div className={`flex flex-row w-3/4 dark:text-darkSecondary text-lightSecondary items-baseline  ${label == 'Bio' ? ' h-2/6' : 'h-1/6'}`}>
            <div className=' text-2xl font-semibold pr-2'>{label + ":"}</div>
            {text ? <div className='  text-lightTertiary dark:text-darkTertiary'>{text}</div> : <div>{"Unknown"}</div>}
        </div>
    )
}

