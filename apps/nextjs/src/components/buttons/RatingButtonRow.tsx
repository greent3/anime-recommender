import React from "react";
import GeneralButton from "./GeneralButton";
import { trpc } from "../../utils/trpc";

interface RatingButtonRowProps {
  goToInquiry: () => void;
  seriesId: number;
}

function RatingButtonRow({ goToInquiry, seriesId }: RatingButtonRowProps) {
  const utils = trpc.useUtils();
  const rateSeriesMutation = trpc.review.create.useMutation();

  async function handleRatingClick(rating: number) {
    await rateSeriesMutation.mutateAsync({
      reviewedSeriesId: seriesId,
      rating,
    });
    utils.series.getRecommendation.invalidate();
    goToInquiry();
  }

  return (
    <div className="flex w-full items-center justify-center gap-4 md:gap-10">
      <GeneralButton
        text="Loved"
        emoji="🥰"
        handleClick={() => handleRatingClick(4)}
      />
      <GeneralButton
        text="Liked"
        emoji="😊"
        handleClick={() => handleRatingClick(3)}
      />
      <GeneralButton
        text="Ehh"
        emoji="😐"
        handleClick={() => handleRatingClick(2)}
      />
      <GeneralButton
        text="Disliked"
        emoji="🤢"
        handleClick={() => handleRatingClick(1)}
      />
      <GeneralButton
        text="Skip ➝"
        bgColor="bg-transparent"
        textColor="text-lightSecondary dark:text-darkSecondary"
        handleClick={() => handleRatingClick(0)}
      />
    </div>
  );
}

export default RatingButtonRow;
