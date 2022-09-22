import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef } from "react";

import ScrollContainer from "react-indiana-drag-scroll";
import { generateYearAndMonthStr, getDayOfWeek } from "../utils";

function ScrollBody({
  firstDayOfMonth,
  rooms,
}: {
  firstDayOfMonth: Dayjs;
  rooms: string[][];
}) {
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollBodyRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  // TODO when user scroll horizontally make sticky header scroll with it
  useEffect(() => {
    let ticking = false;
    function onDocumentScroll() {
      if (!ticking) {
        const stickyHeader = stickyRef.current;
        const scrollContainer = scrollContainerRef.current;
        if (!stickyHeader || !scrollContainer) return;

        window.requestAnimationFrame(() => {
          const stickyHeaderInitWidth = stickyHeader.clientWidth;
          if (scrollContainer.getBoundingClientRect().top <= 0) {
            stickyHeader.style.position = "absolute";
            //  stickyHeader.style.position = "fixed";
            // stickyHeader.style.top = "0";

            stickyHeader.style.top =
              -scrollContainer.getBoundingClientRect().top + "px";
          } else {
            stickyHeader.style.position = "static";
            stickyHeader.style.width = stickyHeaderInitWidth + "px";
          }
          ticking = false;
        });
        ticking = true;
      }
    }
    document.addEventListener("scroll", onDocumentScroll);
    return () => document.removeEventListener("scroll", onDocumentScroll);
  }, []);
  return (
    <ScrollContainer
      className="relative scroll-container col-start-2 row-start-1 row-end-[var(--number-of-rooms)] overflow-x-scroll"
      innerRef={scrollContainerRef}>
      <div
        className="w-[150%] grid grid-rows-[60px] auto-rows-[80px] grid-cols-[repeat(var(--days-in-month),1fr)] bg-slate-300 gap-[1px]"
        ref={scrollBodyRef}>
        {/* sticky header */}
        <div
          className="col-span-full grid grid-cols-[repeat(var(--days-in-month),1fr)] grid-rows-[30px_30px]"
          ref={stickyRef}>
          <div className="flex justify-center items-center bg-red-600 text-white col-span-full">
            {generateYearAndMonthStr(firstDayOfMonth)}
          </div>
          {new Array(daysInMonth).fill("").map((_: string, i) => (
            <div
              className="bg-white flex justify-center items-center border-r border-solid border-slate-300"
              key={i}>
              {getDayOfWeek(firstDayOfMonth, i + 1)}
              {i + 1}
            </div>
          ))}
        </div>
        {rooms.map((_, i) => (
          <div
            className="even:bg-slate-50 odd:bg-slate-100 col-span-full flex"
            key={i}>
            {new Array(daysInMonth).fill("").map((_, j) => (
              <div
                key={j}
                className={clsx(
                  "flex-1 border-r border-solid border-slate-300 last:border-none",
                  (j % 7 === 2 || j % 7 === 3) && i % 2 && "bg-yellow-100",
                  (j % 7 === 2 || j % 7 === 3) && !(i % 2) && "bg-yellow-50"
                )}></div>
            ))}
          </div>
        ))}
      </div>
    </ScrollContainer>
  );
}

export default ScrollBody;
