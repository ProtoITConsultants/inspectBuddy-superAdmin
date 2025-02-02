import { useEffect } from "react";
import debounce from "lodash.debounce";

export const useScrollbarWidth = () => {
  useEffect(() => {
    function setScrollbarWidth() {
      const scrollbarWidth =
        window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.setProperty(
        "--scrollbar-width",
        `${scrollbarWidth}px`
      );
    }

    const debouncedSetScrollbarWidth = debounce(setScrollbarWidth, 100);
    window.addEventListener("resize", debouncedSetScrollbarWidth);

    setScrollbarWidth();

    return () =>
      window.removeEventListener("resize", debouncedSetScrollbarWidth);
  }, []);
};
