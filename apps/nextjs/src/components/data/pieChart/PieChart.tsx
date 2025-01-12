import React from "react";
import Chart from "react-google-charts";

interface PieChartProps {
  likedCategoryData: (string | number)[][];
  fontColor: string;
}

function PieChart({ likedCategoryData, fontColor }: PieChartProps) {
  const options = {
    title: "My Liked Categories",
    backgroundColor: "transparent",
    titleTextStyle: {
      color: fontColor,
      fontSize: 24,
    },
    legend: {
      textStyle: {
        color: fontColor,
      },
    },
  };

  return (
    <div className=" themed-centered-box h-full w-2/5   ">
      <Chart
        chartType="PieChart"
        data={likedCategoryData}
        options={options}
        width={"100%"}
        height={"700px"}
      />
    </div>
  );
}

export default PieChart;
