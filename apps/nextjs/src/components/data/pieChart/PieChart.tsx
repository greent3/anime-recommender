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
    <div className="h-full w-full ">
      <Chart
        chartType="PieChart"
        data={likedCategoryData}
        options={options}
        width={"100%"}
        height={"100%"}
      />
    </div>
  );
}

export default PieChart;
