import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useRef } from "react";

import ScrollContainer from "react-indiana-drag-scroll";
import { ScrollSyncPane } from "react-scroll-sync";

import RowHeader from "./RowHeader";

function ScrollBody({
  firstDayOfMonth,
  rooms,
}: {
  firstDayOfMonth: Dayjs;
  rooms: string[][];
}) {
  const daysInMonth = firstDayOfMonth.daysInMonth();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };
    const draggableEle = ref.current;
    console.log(ref.current);
    if (!draggableEle) return;
    const mouseDownHandler = function (e: MouseEvent) {
      console.log(e);
      draggableEle.style.cursor = "grabbing";
      draggableEle.style.userSelect = "none";
      pos = {
        // The current scroll
        left: draggableEle.scrollLeft,
        top: draggableEle.scrollTop,
        // Get the current mouse position
        x: e.clientX,
        y: e.clientY,
      };

      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = function (e: MouseEvent) {
      // How far the mouse has been moved
      const dx = e.clientX - pos.x;
      const dy = e.clientY - pos.y;

      // Scroll the element
      draggableEle.scrollTop = pos.top - dy;
      draggableEle.scrollLeft = pos.left - dx;
    };

    const mouseUpHandler = function () {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);

      draggableEle.style.cursor = "grab";
      draggableEle.style.removeProperty("user-select");
    };

    draggableEle.addEventListener("mousedown", mouseDownHandler);
  }, [ref]);

  return (
    // <ScrollContainer className="scroll-container flex">
    // <ScrollSyncPane>
    <div
      className="overflow-auto flex cursor-grab sync-me no-scrollbar"
      ref={ref}>
      {/* left column displaying room names */}
      <div className="w-[100px] shrink-0 sticky left-0">
        {rooms.map((names, i) => (
          <RowHeader rc={names[0]} rn={names[1]} key={i} />
        ))}
      </div>

      <div className="w-fit">
        {rooms.map((_, i) => (
          <div
            className="even:bg-slate-50 odd:bg-slate-100 col-span-full flex"
            key={i}>
            {new Array(daysInMonth).fill("").map((_, j) => (
              <div
                key={j}
                className={clsx(
                  "shrink-0 w-16 h-20 border-r border-solid border-slate-300 last:border-none",
                  (j % 7 === 2 || j % 7 === 3) && i % 2 && "bg-yellow-100",
                  (j % 7 === 2 || j % 7 === 3) && !(i % 2) && "bg-yellow-50"
                )}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
    // </ScrollSyncPane>
    // </ScrollContainer>
  );
}

export default ScrollBody;
