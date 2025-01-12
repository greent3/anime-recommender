import React from "react";
import { Oval } from "react-loader-spinner";

function LoadingSpinner() {
  return (
    <div className=" align-center flex  h-full w-full flex-row items-center justify-center ">
      <Oval
        height="80"
        width="80"
        color={"#F47521"}
        secondaryColor={"#F47521"}
        ariaLabel="loading"
      />
      <p className=" dark:text-darkSecondary text-lightSecondary ml-4 text-4xl">
        Loading
      </p>
    </div>
  );
}

export default LoadingSpinner;
