import React from "react";
import Image from "next/image";
import { convertCategoryToString } from "../utilFunctions/convertCategoryToString";
import { convertRatingToEmote } from "../utilFunctions/convertRatingToEmote";
import { Category, Series } from "@acme/db";
import LoadingSpinner from "./static/LoadingSpinner";
import { trpc } from "../utils/trpc";
import { ColumnHeader } from "./table/ColumnHeader";
import { clsx } from "clsx";

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
  const { data } = trpc.user.getUsersWatchlist.useQuery();

  const inWatchlist = (currentAnimeId: number) => {
    const animeIds = data?.watchlist.map((anime) => {
      return anime.id;
    });

    if (animeIds?.includes(currentAnimeId)) {
      return true;
    }
    return false;
  };

  const removeFromWatchlistMutation = trpc.user.removeFromWatchlist.useMutation(
    {
      onSuccess: () => {
        utils.user.getUsersWatchlist.invalidate();
      },
    },
  );
  const addToWatchlistMutation = trpc.user.addToWatchlist.useMutation({
    onSuccess: () => {
      utils.user.getUsersWatchlist.invalidate();
    },
  });

  async function removefromWatchlist(seriesId: number) {
    await removeFromWatchlistMutation.mutateAsync(seriesId);
  }

  async function addToWatchlist(seriesId: number) {
    await addToWatchlistMutation.mutateAsync(seriesId);
  }
  return (
    <div className=" w-full flex-1 items-center justify-center px-8 ">
      {seriesList ? (
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="text-left text-xl">
              <th className=" w-1/12"></th>
              <ColumnHeader title="Name" styles={" w-3/12"} />
              <ColumnHeader title="Rating" styles={" w-2/12"} />
              <ColumnHeader title="Genres" styles={" w-5/12"} />
              <ColumnHeader
                title={page !== "Watchlist" ? "My Review" : ""}
                styles={" w-1/12"}
              />
            </tr>
          </thead>
          <tbody>
            {seriesList?.map((series, ind) => (
              <tr
                key={`row-${ind}-${series.title}`}
                className={clsx(
                  " items-center justify-center  align-middle ",
                  ind != seriesList.length - 1 && "border-b border-gray-300",
                )}
              >
                <td>
                  <Image
                    src={series.imgPath || "/general.jpeg"}
                    alt="Anime Photo"
                    height={50}
                    width={70}
                    className=" min-h-20 min-w-16   rounded-xl"
                  />
                </td>
                <td>{series.title}</td>
                <td>{series.score}</td>
                <td>{convertCategoryToString(series.categories)}</td>
                {page == "Watchlist" ? (
                  <td className=" h-full w-full flex-row items-center justify-center align-middle">
                    <button
                      className=" dark:bg-darkSecondary bg-lightSecondary dark:text-darkPrimary text-lightPrimary dark:hover:text-darkTertiary hover:bg-lightTertiary items-center justify-center rounded-lg p-2  "
                      onClick={() => removefromWatchlist(series.id)}
                    >
                      Remove
                    </button>
                  </td>
                ) : series.reviews?.[0]?.rating ? (
                  <td className=" text-3xl">
                    {convertRatingToEmote(series.reviews?.[0]?.rating || 0)}
                  </td>
                ) : inWatchlist(series.id) ? (
                  <td className=" text-center">
                    <text>{"Not yet reviewed"}</text>
                  </td>
                ) : (
                  <td className=" h-full w-full flex-row items-center justify-center align-middle">
                    <button
                      className=" dark:bg-darkSecondary bg-lightSecondary dark:text-darkPrimary text-lightPrimary dark:hover:text-darkTertiary hover:bg-lightTertiary items-center justify-center rounded-lg  p-2 "
                      onClick={() => addToWatchlist(series.id)}
                    >
                      Add to Watchlist
                    </button>
                  </td>
                )}
              </tr>
            ))}
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
