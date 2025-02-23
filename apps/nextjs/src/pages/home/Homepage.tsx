import React, { useState } from "react";
import InquiryButtonRow from "../../components/buttons/InquiryButtonRow";
import RatingButtonRow from "../../components/buttons/RatingButtonRow";
import { SeriesDetails } from "../../components/static/SeriesDetails";
import { trpc } from "../../utils/trpc";
import LoadingSpinner from "../../components/static/LoadingSpinner";
import AddToWatchlistButtonRow from "../../components/buttons/AddToWatchlistButtonRow";
import { LoadingError } from "../../components/static/LoadingError";

type PageString = "inquiry" | "rating" | "addAction";

function Homepage() {
  const exampleSeries = trpc.series.getRecommendation.useQuery(undefined, {
    staleTime: Infinity,
  });

  const [buttonsToShow, setButtonsToShow] = useState<PageString>("inquiry");

  return (
    <div className="flex h-full w-full flex-col items-center  pt-12">
      {exampleSeries.isFetching ? (
        <LoadingSpinner />
      ) : exampleSeries.data ? (
        <div className="flex w-full flex-col items-center gap-6">
          <SeriesDetails
            title={exampleSeries.data.title || "Unknown Title"}
            type={exampleSeries.data.type}
            bio={exampleSeries.data.bio}
            episodes={exampleSeries.data.episodes}
            aired={exampleSeries.data.startDate}
            score={String(exampleSeries.data.score)}
            imgPath={exampleSeries.data.imgPath}
            categories={exampleSeries.data.categories}
            trailerUrl={exampleSeries.data.trailerUrl}
          />

          {buttonsToShow === "inquiry" && (
            <InquiryButtonRow
              goToRating={() => setButtonsToShow("rating")}
              goToWatchlist={() => setButtonsToShow("addAction")}
            />
          )}
          {buttonsToShow === "addAction" && (
            <AddToWatchlistButtonRow
              goToInquiry={() => setButtonsToShow("inquiry")}
              seriesId={exampleSeries.data.id}
            />
          )}
          {buttonsToShow === "rating" && (
            <RatingButtonRow
              goToInquiry={() => setButtonsToShow("inquiry")}
              seriesId={exampleSeries.data.id}
            />
          )}
        </div>
      ) : (
        <LoadingError />
      )}
    </div>
  );
}

export default Homepage;
