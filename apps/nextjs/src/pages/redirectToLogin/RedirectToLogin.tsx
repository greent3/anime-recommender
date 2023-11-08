import Link from 'next/link'
import React from 'react'

function RedirectToLogin() {
    return (
        <div className=' h-full w-full flex flex-col items-center align-middle  justify-center bg-gradient-to-b from-darkPrimary to-darkSecondary text-white '>
            <div className=' h-2/5 w-2/5 flex flex-col items-center align-middle  justify-center  gap-12 rounded-lg shadow-2xl bg-darkPrimary bg-gradient-to-b from-black to-darkPrimary  '>
                <p className=' text-2xl'>{"To use Travis' Anime Recommender, you must first"}</p>
                <div className=' flex flex-row bg-darkSecondary text-darkTertiary hover:bg-white hover:text-darkSecondary w-1/5 h-1/5 justify-center align-middle items-center rounded-lg'>
                    <Link href="/sign-in" className=' flex flex-row text-lg w-full h-full  justify-center align-middle items-center'>Sign In</Link>
                </div>
            </div>
        </div>
    )
}

export default RedirectToLogin