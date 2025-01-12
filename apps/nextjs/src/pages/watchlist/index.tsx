import React from "react";
import PageTitle from "../../components/static/PageTitle";
import { trpc } from "../../utils/trpc";
import GenericSeriesTable from "../../components/GenericSeriesTable";

function Watchlist() {
  const allSeries = trpc.user.getUsersWatchlist.useQuery();

  return (
    <div className=" themed-centered-stack-fullwidth-fullheight gap-14 pt-12">
      <PageTitle title={"My Watchlist"} />
      <div className="h-full w-full">
        <GenericSeriesTable
          seriesList={allSeries.data?.watchlist}
          page={"Watchlist"}
        />
      </div>
    </div>
  );
}

export default Watchlist;
