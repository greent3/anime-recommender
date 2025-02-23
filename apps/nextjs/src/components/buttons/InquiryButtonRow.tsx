import React from "react";
import GeneralButton from "./GeneralButton";

interface InquiryButtonRowProps {
  goToRating: () => void;
  goToWatchlist: () => void;
}

function InquiryButtonRow({
  goToRating,
  goToWatchlist,
}: InquiryButtonRowProps) {
  return (
    <div className="flex h-20 w-full items-center justify-center gap-16 md:gap-72">
      <GeneralButton
        text="Haven't seen it"
        emoji="❌"
        handleClick={goToWatchlist}
      />
      <GeneralButton text="Seen it" emoji="✅" handleClick={goToRating} />
    </div>
  );
}

export default InquiryButtonRow;
