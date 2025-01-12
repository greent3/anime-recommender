import { NextPage } from "next";
import React from "react";

import { trpc } from "../../utils/trpc";
import PageTitle from "../../components/static/PageTitle";
import Image from "next/image";
import PieChart from "../../components/data/pieChart/PieChart";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.cjs";
import LoadingSpinner from "../../components/static/LoadingSpinner";
import GenericSeriesTable from "../../components/GenericSeriesTable";

const Profile: NextPage = () => {
  const fullConfig = resolveConfig(tailwindConfig);
  const chartFontColor = fullConfig.theme?.colors["darkSecondary"] || "#F47521";
  const profileStats = trpc.review.getStats.useQuery("1");
  const allSeries = trpc.series.getAllPositiveReviewedSeries.useQuery();

  if (profileStats.isFetching) {
    return (
      <div className=" themed-centered-stack-fullwidth-fullheight ">
        <LoadingSpinner />
      </div>
    );
  } else {
    return (
      <div className=" themed-centered-stack-fullwidth-fullheight pt-12">
        <PageTitle title={"My Profile"} />
        <>
          {profileStats.data ? (
            <div className=" flex h-full w-full flex-row  gap-16">
              <PieChart
                likedCategoryData={profileStats.data}
                fontColor={chartFontColor}
              />

              <div className=" themed-centered-stack  h-full w-3/5  pb-16  ">
                <p className=" text-2xl font-bold">My Liked Animes</p>
                <GenericSeriesTable
                  seriesList={allSeries.data}
                  page={"Profile"}
                />
              </div>
            </div>
          ) : (
            <div className=" dark:text-darkSecondary text-lightSecondary  flex   h-full flex-col items-center pt-28 text-3xl">
              <p className=" themed-centered-stack  h-1/5 w-3/5   ">
                {" "}
                {"No Liked Animes?!?! "}
              </p>
              <Image src={"/sad2.png"} alt="" width={300} height={100} />

              <p className=" themed-centered-stack h-1/5 w-3/5   ">
                {" "}
                Go review some animes and come back!
              </p>
            </div>
          )}
        </>
      </div>
    );
  }
};

export default Profile;
