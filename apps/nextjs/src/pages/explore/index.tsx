import React, { useEffect, useState, useCallback } from "react";
import { trpc } from "../../utils/trpc";
import GenericSeriesTable from "../../components/GenericSeriesTable";

function Explore() {
  const [searchText, setSearchText] = useState("");

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, refetch } =
    trpc.series.getInfinite.useInfiniteQuery(
      { text: searchText, limit: 10 },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor || null,
      },
    );

  const handleSearch = useCallback(
    (val: string) => {
      setSearchText(val);
      refetch();
    },
    [refetch],
  );

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          console.log("Fetching next page...");
          fetchNextPage();
        }
      },
      { threshold: 0.8 },
    );

    const target = document.getElementById("load-more-trigger");
    if (target) observer.observe(target);

    return () => {
      if (target) observer.unobserve(target);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage, data]);

  return (
    <div className="flex min-h-screen w-full flex-col items-center px-4">
      <div className="flex h-20 w-full max-w-lg justify-center py-4">
        <div className="flex w-full items-center gap-0">
          <input
            type="search"
            className="focus:border-primary dark:focus:border-darkSecondary w-full rounded-l border border-neutral-300 bg-transparent p-2 text-base text-neutral-700 outline-none transition dark:border-neutral-600 dark:text-neutral-200 dark:placeholder-neutral-400"
            placeholder="Search by title"
            aria-label="Search"
            value={searchText}
            onChange={(e) => handleSearch(e.currentTarget.value)}
          />
          <button
            className="bg-lightSecondary dark:bg-darkSecondary hover:bg-primary-700 dark:hover:bg-darkPrimary focus:ring-primary-500 rounded-r p-2 text-white transition focus:ring focus:ring-opacity-50"
            type="button"
            onClick={() => refetch()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              className="h-7 w-7"
            >
              <path
                fillRule="evenodd"
                d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex w-full justify-center">
        {data?.pages.flatMap((page) => page.items).length === 0 ? (
          <p className="text-center text-2xl font-bold text-red-500">
            No results found.
          </p>
        ) : (
          <GenericSeriesTable
            seriesList={data?.pages.flatMap((page) => page.items)}
            page="Explore"
          />
        )}
      </div>

      {hasNextPage && (
        <div id="load-more-trigger" className="mt-4 text-center">
          {isFetchingNextPage ? (
            <p>Loading more...</p>
          ) : (
            <p>Scroll down to load more</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Explore;
