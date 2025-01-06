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
    <div className=" flex h-1/5 min-h-20  w-full flex-row items-center justify-center  gap-72 ">
      <GeneralButton
        text={`Haven't seen it`}
        emoji="❌"
        handleClick={goToWatchlist}
      />
      <GeneralButton text="Seen it" emoji="✅" handleClick={goToRating} />
    </div>
  );
}

export default InquiryButtonRow;
