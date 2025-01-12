import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = () => {
  const [enabled, setEnabled] = useLocalStorage("dark-theme", false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const className = "dark";
    const bodyClass = window.document.body.classList;

    if (enabled) {
      bodyClass.add(className);
    } else {
      bodyClass.remove(className);
    }
  }, [enabled]);

  return [enabled, setEnabled] as const;
};

export default useDarkMode;
