import React from "react";

export const LoadingError = () => {
  return (
    <div className="dark:bg-darkPrimary dark:text-darkSecondary bg-lightPrimary text-lightSecondary flex min-h-screen  flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="text-4xl font-bold">Oops! Something went wrong</div>
        <p className="text-center text-gray-300">
          We encountered an error while loading the page. Please try refreshing
          the page or check back later.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="dark:bg-darkSecondary bg-lightSecondary  dark:text-darkPrimary text-lightPrimary rounded-md px-6 py-2 transition-all "
        >
          Refresh Page
        </button>
      </div>
    </div>
  );
};
