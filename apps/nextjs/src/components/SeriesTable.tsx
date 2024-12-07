import React from "react";
import { trpc } from "../utils/trpc";
import Image from "next/image";
import { convertCategoryToString } from "../utilFunctions/convertCategoryToString";
import { convertRatingToString } from "../utilFunctions/convertRatingToString";

function SeriesTable() {
  const allSeries = trpc.series.getAllPositiveReviewedSeries.useQuery();

  return (
    <div className="text-lightSecondary  dark:text-darkSecondary w-full overflow-x-auto px-8">
      <table className="table">
        <thead>
          <tr>
            <th className=" w-1/12"></th>
            <th className=" w-2/12">Name</th>
            <th className=" w-1/12">Rating</th>
            <th className=" w-5/12">Genres</th>
            <th className=" w-3/12">My Review</th>
          </tr>
        </thead>
        <tbody>
          <>
            {!allSeries.data && (
              <tr>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <img
                        src="/tailwind-css-component-profile-2@56w.png"
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div className="font-bold">Example Title</div>
                </td>
                <td>Example Rating</td>
                <td>Example Genres</td>
                <td>Example Review</td>
              </tr>
            )}
            {allSeries.data?.map((series, ind) => (
              <tr key={`row-${ind}`}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle h-12 w-12">
                      <Image
                        src={series.imgPath || "/general.jpeg"}
                        alt="Anime Picture"
                        width={100}
                        height={100}
                      />
                    </div>
                  </div>
                </td>
                <td>
                  <div>
                    <div className="font-bold">{series.title}</div>
                  </div>
                </td>
                <td>{series.score}</td>
                <td>{convertCategoryToString(series.categories)}</td>
                <td className=" text-2xl">
                  {convertRatingToString(series.reviews[0]?.rating || 0)}
                </td>
              </tr>
            ))}
          </>
        </tbody>
      </table>
    </div>
  );
}

export default SeriesTable;
