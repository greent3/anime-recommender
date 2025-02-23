import { Category } from "@acme/db";
import Image from "next/image";
import PageTitle from "./PageTitle";
import { useState } from "react";
import { DescriptionModal } from "../DescriptionModal";
import { SeriesText } from "../SeriesText";

interface SeriesDetailsProps {
  title: string;
  bio?: string | null;
  type?: string | null;
  episodes?: number | null;
  aired?: string | null;
  imgPath?: string | null;
  score?: string | null;
  categories?: Category[];
  trailerUrl?: string | null;
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
  const [showTrailerModal, setShowTrailerModal] = useState(false);
  const catString = categories?.map((cat) => cat.title).join(", ") || "Unknown";

  return (
    <div className="flex h-full w-3/4 flex-col items-center gap-10  px-32">
      {showTrailerModal && (
        <DescriptionModal
          isOpen={showTrailerModal}
          onClose={() => setShowTrailerModal(false)}
          textContent={bio || null}
          videoUrl={trailerUrl || null}
        />
      )}

      <PageTitle title={title} />

      <div className="flex w-full   items-center gap-10 ">
        <div className="relative h-96 w-64">
          <Image
            src={imgPath || "/general.jpeg"}
            alt="There was supposed to be a really cool image here :/"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-lg"
          />
        </div>

        <div className="flex w-full flex-col justify-between space-y-3">
          <SeriesText label="Type" text={type} />
          <SeriesText label="Score" text={`${score} / 10`} />

          <button
            className="hover:bg-lightSecondary hover:text-lightPrimary dark:hover:bg-darkSecondary dark:hover:text-darkPrimary rounded-lg p-2 transition-all"
            onClick={() => setShowTrailerModal(true)}
          >
            <SeriesText label="Bio" text={bio} />
          </button>

          {type === "TV" && (
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
