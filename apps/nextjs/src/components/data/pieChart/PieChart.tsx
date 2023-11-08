import React from 'react'
import Chart from 'react-google-charts'

interface PieChartProps {
    likedCategoryData: (string | number)[][]
    fontColor: string
}

function PieChart({ likedCategoryData, fontColor }: PieChartProps) {

    const options = {
        title: "My Liked Categories",
        backgroundColor: "transparent",
        titleTextStyle: {
            color: fontColor,
            fontSize: 24
        },
        legend: {
            textStyle: {
                color: fontColor
            }
        },
        width: 900,
        height: 600,
    };

    return (
        <div className=' themed-centered-box w-2/5 h-full   '>
            <Chart
                chartType="PieChart"
                data={likedCategoryData}
                options={options}
                width={"100%"}
                height={"700px"}
            />
        </div>
    )
}

export default PieChart