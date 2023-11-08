import React from 'react'


interface PageTitleProps {
    title: string
}

function PageTitle({ title }: PageTitleProps) {
    return (
        <div className=' themed-centered-box  h-28 w-auto  p-3 ' >
            <p className=" font-semibold text-5xl">{title}</p>
        </div>
    )
}

export default PageTitle