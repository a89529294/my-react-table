import { useEffect } from "react";

function useScrollSync(selector: string) {
  useEffect(() => {
    let active: HTMLDivElement | null = null;
    document.querySelectorAll(selector).forEach(function (element) {
      element.addEventListener("mouseover", (e) => {
        active = e.currentTarget as HTMLDivElement;
      });

      element.addEventListener("touchstart", (e) => {
        active = e.currentTarget as HTMLDivElement;
      });

      element.addEventListener("scroll", function (e) {
        if (e.target !== active) return;

        document.querySelectorAll(selector).forEach(function (target) {
          if (active === target || !active) return;
          target.scrollTop = active.scrollTop;
          target.scrollLeft = active.scrollLeft;
        });
      });
    });
  }, []);
}

export default useScrollSync;
