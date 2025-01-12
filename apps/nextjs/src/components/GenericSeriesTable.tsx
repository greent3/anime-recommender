import React from "react";
import Image from "next/image";
import { convertCategoryToString } from "../utilFunctions/convertCategoryToString";
import { convertRatingToString } from "../utilFunctions/convertRatingToString";
import { Category, Series } from "@acme/db";
import LoadingSpinner from "./static/LoadingSpinner";
import { trpc } from "../utils/trpc";

interface GenericSeriesTableProps {
  seriesList:
    | (Series & {
        categories: Category[];
        reviews?: { rating: number | null }[];
      })[]
    | null
    | undefined;

  page: "Profile" | "Explore" | "Watchlist";
}

function GenericSeriesTable({ seriesList, page }: GenericSeriesTableProps) {
  const utils = trpc.useUtils();

  const removeFromWatchlistMutation = trpc.user.removeFromWatchlist.useMutation(
    {
      onSuccess: () => {
        utils.user.getUsersWatchlist.invalidate();
      },
    },
  );

  async function removefromWatchlist(seriesId: number) {
    await removeFromWatchlistMutation.mutateAsync(seriesId);
  }
  return (
    <div className=" w-full flex-1 items-center justify-center px-8 ">
      {seriesList ? (
        <table className=" w-full flex-1 flex-col  items-center justify-center">
          {/* head */}
          <thead className=" flex h-1/2 w-full flex-row items-center align-middle">
            <tr className="flex h-1/2 w-full flex-row items-center justify-center align-middle text-xl">
              <th className=" w-1/12 "></th>
              <th className=" text-lightTertiary dark:text-darkTertiary flex w-3/12 items-start justify-start ">
                Name
              </th>
              <th className=" text-lightTertiary dark:text-darkTertiary flex w-2/12 items-start justify-start  ">
                Rating
              </th>
              <th className=" text-lightTertiary dark:text-darkTertiary flex w-5/12 items-start justify-start ">
                Genres
              </th>
              <th className="text-lightTertiary  dark:text-darkTertiary flex w-1/12 items-start justify-start ">
                {page != "Watchlist" && "My Review"}
              </th>
            </tr>
          </thead>
          <tbody className="flex w-full flex-col  pb-10">
            <>
              {seriesList?.map((series, ind) => (
                <tr
                  key={`row-${ind}-${series.title}`}
                  className={`text  flex w-full flex-row items-center py-2 ${
                    ind != seriesList.length - 1 &&
                    ` dark:border-b-darkTertiary border-b-lightTertiary border-b-[1px]  `
                  }`}
                >
                  <td className="w-1/12">
                    <div className="avatar">
                      <div className="mask mask-squircle h-full w-auto">
                        <Image
                          src={series.imgPath || "/general.jpeg"}
                          alt="Anime Picture"
                          width={60}
                          height={50}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="w-3/12">
                    <div>
                      <div className="font-bold">{series.title}</div>
                    </div>
                  </td>
                  <td className="flex w-2/12 flex-row pl-4">{series.score}</td>
                  <td className="w-5/12">
                    {convertCategoryToString(series.categories)}
                  </td>
                  {page != "Watchlist" && series.reviews ? (
                    <td className="flex w-1/12 flex-row justify-center">
                      {convertRatingToString(series.reviews[0]?.rating || 0)}
                    </td>
                  ) : (
                    <td className="flex w-1/12 flex-row justify-center">
                      <button
                        className="btn btn-ghost btn-xs dark:bg-darkSecondary bg-lightSecondary dark:text-darkPrimary text-lightPrimary dark:hover:text-darkTertiary hover:bg-lightTertiary rounded-lg p-2  "
                        onClick={() => removefromWatchlist(series.id)}
                      >
                        Remove
                      </button>{" "}
                    </td>
                  )}
                </tr>
              ))}
            </>
          </tbody>
        </table>
      ) : (
        <div className="   w-full items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}

export default GenericSeriesTable;
