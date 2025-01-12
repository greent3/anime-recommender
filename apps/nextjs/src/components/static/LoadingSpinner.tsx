import React from "react";
import { Oval } from "react-loader-spinner";
import useDarkMode from "../../hooks/useDarkMode";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.cjs";

function LoadingSpinner() {
  const [darkTheme] = useDarkMode();
  const fullConfig = resolveConfig(tailwindConfig);

  return (
    <div className=" align-center flex  h-full w-full flex-row items-center justify-center ">
      <Oval
        height="80"
        width="80"
        color={
          darkTheme
            ? fullConfig.theme?.colors["darkSecondary"] || "#F47521"
            : fullConfig.theme?.colors["lightSecondary"] || "#F47521"
        }
        secondaryColor={
          darkTheme
            ? fullConfig.theme?.colors["darkPrimary"] || "#F47521"
            : fullConfig.theme?.colors["lightPrimary"] || "#F47521"
        }
        ariaLabel="loading"
      />
      <p className=" dark:text-darkSecondary text-lightSecondary ml-4 text-4xl">
        Loading
      </p>
    </div>
  );
}

export default LoadingSpinner;
