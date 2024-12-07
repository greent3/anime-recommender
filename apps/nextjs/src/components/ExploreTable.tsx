import React from "react";
import Image from "next/image";
import { convertCategoryToString } from "../utilFunctions/convertCategoryToString";
import { convertRatingToString } from "../utilFunctions/convertRatingToString";
import { Category, Series } from "@acme/db";
import LoadingButton from "./static/LoadingButton";

interface ExploreTableProps {
  seriesList:
    | (Series & {
        categories: Category[];
        reviews: { rating: number | null }[];
      })[]
    | null
    | undefined;
}

function ExploreTable({ seriesList }: ExploreTableProps) {
  return (
    <div className=" themed-centered-stack w-full px-8   ">
      {seriesList ? (
        <table className=" flex w-full flex-col  items-center justify-center">
          {/* head */}
          <thead className=" flex- h-full w-full flex-row">
            <tr className="flex w-full flex-row pb-8 text-xl">
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
                My Review
              </th>
            </tr>
          </thead>
          <tbody className="flex h-full w-full flex-col  pb-10">
            <>
              {seriesList?.map((series, ind) => (
                <>
                  <tr
                    key={`row-${ind}`}
                    className=" flex h-full w-full flex-row items-center pt-2"
                  >
                    <td className="w-1/12">
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
                    <td className="w-3/12">
                      <div>
                        <div className="font-bold">{series.title}</div>
                      </div>
                    </td>
                    <td className=" flex w-2/12 flex-row pl-4">
                      {series.score}
                    </td>
                    <td className=" w-5/12">
                      {convertCategoryToString(series.categories)}
                    </td>
                    <td className=" flex w-1/12 flex-row justify-center">
                      {convertRatingToString(series.reviews[0]?.rating || 0)}
                    </td>
                  </tr>
                  {ind != seriesList.length - 1 && (
                    <div className=" flex  h-px w-full flex-row  bg-black " />
                  )}
                </>
              ))}
            </>
          </tbody>
        </table>
      ) : (
        <LoadingButton />
      )}
    </div>
  );
}

export default ExploreTable;
