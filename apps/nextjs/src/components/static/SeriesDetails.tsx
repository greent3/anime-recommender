import { Category } from "@acme/db";
import Image from "next/image";
import PageTitle from "./PageTitle";
import { useState } from "react";
import { DescriptionModal } from "../DescriptionModal";
import { SeriesText } from "../SeriesText";

interface SeriesDetailsProps {
  title: string;
  bio?: string | undefined | null;
  type?: string | undefined | null;
  episodes?: number | undefined | null;
  aired?: string | undefined | null;
  imgPath?: string | undefined | null;
  score?: string | undefined | null;
  categories?: Category[] | undefined;
  trailerUrl?: string | undefined | null;
}

export function SeriesDetails({
  title,
  bio,
  type,
  episodes,
  aired,
  imgPath,
  score,
  categories,
  trailerUrl,
}: SeriesDetailsProps) {
  let catString = "";
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  categories?.map((cat, index) => {
    if (index >= 1 && index < categories?.length) {
      catString = catString.concat(", ", cat.title);
    } else {
      catString = catString.concat(cat.title);
    }
  });

  // const openTrailerModal = () => {};
  return (
    <div className=" themed-centered-stack-fullwidth-fullheight  gap-10  px-32 ">
      {showTrailerModal && (
        <DescriptionModal
          isOpen={showTrailerModal}
          onClose={() => setShowTrailerModal(false)}
          textContent={bio || null}
          videoUrl={trailerUrl || null}
        />
      )}
      <PageTitle title={title} />
      <div className="themed-centered-box-fullwidth-fullheight gap-10">
        <div className=" themed-centered-box-fullwidth-fullheight   ">
          <div className="themed-centered-box  relative h-3/4  w-3/4 ">
            <Image
              src={imgPath || "/general.jpeg"}
              alt="There was supposed to be a really cool image here :/"
              fill={true}
            />
          </div>
        </div>
        <div className=" flex h-full w-full  flex-col justify-between ">
          <SeriesText label="Type" text={type} />
          <SeriesText label="Score" text={score + " / 10"} />
          <div
            className=" dark:hover:bg-darkSecondary dark:hover:text-darkPrimary hover:bg-lightSecondary hover:text-lightPrimary rounded-lg"
            onClick={() => setShowTrailerModal(true)}
          >
            <SeriesText label="Bio" text={bio} />
          </div>
          {type == "TV" && (
            <SeriesText
              label="Episodes"
              text={episodes ? String(episodes) : "Unknown"}
            />
          )}
          <SeriesText label="Aired" text={aired} />
          <SeriesText label="Categories" text={catString} />
        </div>
      </div>
    </div>
  );
}
