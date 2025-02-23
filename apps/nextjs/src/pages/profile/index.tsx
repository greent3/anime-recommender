import { NextPage } from "next";
import React from "react";

import { trpc } from "../../utils/trpc";
import PageTitle from "../../components/static/PageTitle";
import Image from "next/image";
import PieChart from "../../components/data/pieChart/PieChart";
import LoadingSpinner from "../../components/static/LoadingSpinner";
import GenericSeriesTable from "../../components/GenericSeriesTable";

const Profile: NextPage = () => {
  const chartFontColor = "#F47521";
  const profileStats = trpc.review.getStats.useQuery();
  const allSeries = trpc.series.getAllPositiveReviewedSeries.useQuery();

  if (profileStats.isFetching) {
    return (
      <div className="flex h-full items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col items-center pt-12">
      <PageTitle title="My Profile" />

      {profileStats.data ? (
        <div className="flex w-full  gap-6">
          <div className=" flex w-2/5">
            <PieChart
              likedCategoryData={profileStats.data}
              fontColor={chartFontColor}
            />
          </div>

          <div className="flex w-3/5 flex-col items-center pt-10">
            <p className="text-center text-2xl font-bold">My Liked Animes</p>
            <GenericSeriesTable seriesList={allSeries.data} page="Profile" />
          </div>
        </div>
      ) : (
        <div className="dark:text-darkSecondary text-lightSecondary flex flex-col items-center pt-28 text-3xl">
          <p className="text-center text-2xl font-semibold">
            No Liked Animes?!?!
          </p>
          <Image src="/sad2.png" alt="Sad face" width={300} height={100} />
          <p className="text-center text-lg">
            Go review some animes and come back!
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
