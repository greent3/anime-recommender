import React from 'react'
import { Audio } from 'react-loader-spinner'
import useDarkMode from '../../hooks/useDarkMode'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from "../../../tailwind.config.cjs"



function LoadingButton() {


    const [darkTheme] = useDarkMode();
    const fullConfig = resolveConfig(tailwindConfig)



    return (
        <div className=' flex flex-row  items-baseline justify-center align-center w-full h-full'>
            <Audio
                height="80"
                width="80"
                color={darkTheme ? fullConfig.theme?.colors['darkSecondary'] || '#F47521' : fullConfig.theme?.colors['lightSecondary'] || '#F47521'}
                ariaLabel="loading"

            />
            <p className=' dark:text-darkSecondary text-lightSecondary text-4xl' >Loading</p>
        </div>
    )
}

export default LoadingButton