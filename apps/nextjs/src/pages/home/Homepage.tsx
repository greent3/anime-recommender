import React, { useState } from "react";
import InquiryButtonRow from "../../components/buttons/InquiryButtonRow";
import RatingButtonRow from "../../components/buttons/RatingButtonRow";
import { SeriesDetails } from "../../components/static/SeriesDetails";
import { trpc } from "../../utils/trpc";
import LoadingButton from "../../components/static/LoadingButton";
import AddToWatchlistButtonRow from "../../components/buttons/AddToWatchlistButtonRow";

type PageString = "inquiry" | "rating" | "addAction";

function Homepage() {
  const exampleSeries = trpc.series.getRecommendation.useQuery();

  const [pageToShow, setPageToShow] = useState<PageString>("inquiry");

  function goToInquiry() {
    setPageToShow("inquiry");
  }
  function goToRating() {
    setPageToShow("rating");
  }
  function goToWatchlist() {
    setPageToShow("addAction");
  }

  return (
    <div className=" themed-centered-stack-fullwidth-fullheight pt-12">
      {exampleSeries.isFetching && <LoadingButton />}

      {!exampleSeries.isFetching && exampleSeries.data && (
        <SeriesDetails
          title={exampleSeries?.data?.title || "Unknown Title"}
          type={exampleSeries?.data?.type}
          bio={exampleSeries?.data?.bio}
          episodes={exampleSeries?.data?.episodes}
          aired={exampleSeries?.data?.airDate}
          score={String(exampleSeries?.data?.score)}
          imgPath={exampleSeries?.data?.imgPath}
          categories={exampleSeries?.data?.categories}
        />
      )}
      {pageToShow == "inquiry" &&
        !exampleSeries.isFetching &&
        exampleSeries.data && (
          <InquiryButtonRow
            goToRating={goToRating}
            goToWatchlist={goToWatchlist}
          />
        )}
      {pageToShow == "addAction" &&
        !exampleSeries.isFetching &&
        exampleSeries.data && (
          <AddToWatchlistButtonRow
            goToInquiry={goToInquiry}
            seriesId={exampleSeries.data?.id}
          />
        )}
      {pageToShow == "rating" &&
        !exampleSeries.isFetching &&
        exampleSeries.data && (
          <RatingButtonRow
            goToInquiry={goToInquiry}
            seriesId={exampleSeries.data?.id}
          />
        )}
    </div>
  );
}

export default Homepage;
