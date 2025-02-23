import React from "react";
import PageTitle from "../../components/static/PageTitle";
import { trpc } from "../../utils/trpc";
import GenericSeriesTable from "../../components/GenericSeriesTable";
import { LoadingError } from "../../components/static/LoadingError";
import Image from "next/image";

function Watchlist() {
  const allSeries = trpc.user.getUsersWatchlist.useQuery();

  if (!allSeries.data) return <LoadingError />;

  return allSeries.data.watchlist.length > 0 ? (
    <div className="bg-lightPrimary dark:bg-darkPrimary dark:text-darkSecondary text-lightSecondary flex flex-col items-center gap-10 pb-2 pt-12">
      <PageTitle title="My Watchlist" />
      <GenericSeriesTable
        seriesList={allSeries.data.watchlist}
        page="Watchlist"
      />
    </div>
  ) : (
    <div className="dark:text-darkSecondary text-lightSecondary flex flex-col items-center pt-28 text-3xl">
      <p className="text-center text-2xl font-semibold">
        An empty watchlist?!?!
      </p>
      <Image src="/sad2.png" alt="Sad face" width={300} height={100} />
      <p className="text-center text-lg">
        Go review some animes and come back!
      </p>
    </div>
  );
}

export default Watchlist;
