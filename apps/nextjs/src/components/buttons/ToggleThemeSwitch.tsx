import { FaMoon, FaSun } from "react-icons/fa";
import useDarkMode from "../../hooks/useDarkMode";

export const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);

  return (
    <span
      onClick={handleMode}
      className="flex cursor-pointer items-center gap-2"
    >
      <FaMoon
        size={20}
        className="dark:text-darkSecondary text-lightSecondary"
      />

      <div className="bg-lightSecondary dark:bg-darkSecondary flex h-4 w-10 items-center rounded-full p-1 md:h-5 md:w-10">
        <div
          className={`bg-lightPrimary dark:bg-darkPrimary h-3 w-3 transform rounded-full shadow-md duration-300 ease-in-out md:h-4 md:w-4 ${
            darkTheme ? "translate-x-4" : ""
          }`}
        />
      </div>

      <FaSun
        size={20}
        className="dark:text-darkSecondary text-lightSecondary"
      />
    </span>
  );
};
