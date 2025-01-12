import React from "react";
import PageTitle from "../../components/static/PageTitle";
import { trpc } from "../../utils/trpc";
import GenericSeriesTable from "../../components/GenericSeriesTable";
import { LoadingError } from "../../components/static/LoadingError";
import Image from "next/image";

function Watchlist() {
  const allSeries = trpc.user.getUsersWatchlist.useQuery();

  return allSeries.data ? (
    allSeries.data.watchlist.length > 0 ? (
      <div className=" themed-centered-stack-fullwidth-fullheight gap-14 pt-12">
        <PageTitle title={"My Watchlist"} />
        <div className="h-full w-full">
          <GenericSeriesTable
            seriesList={allSeries.data?.watchlist}
            page={"Watchlist"}
          />
        </div>
      </div>
    ) : (
      <div className=" dark:text-darkSecondary text-lightSecondary  flex   h-full flex-col items-center pt-28 text-3xl">
        <p className=" themed-centered-stack  h-1/5 w-3/5   ">
          {" "}
          {"An empty watchlist?!?! "}
        </p>
        <Image src={"/sad2.png"} alt="" width={300} height={100} />

        <p className=" themed-centered-stack h-1/5 w-3/5   ">
          {" "}
          Go review some animes and come back!
        </p>
      </div>
    )
  ) : (
    <LoadingError />
  );
}

export default Watchlist;
