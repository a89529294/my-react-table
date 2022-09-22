import clsx from "clsx";
import { Dayjs } from "dayjs";
import { useRef } from "react";
import useDraggable from "../hooks/useDraggable";

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
  useDraggable(ref);

  return (
    <div
      className="overflow-auto flex cursor-grab sync-me no-scrollbar"
      ref={ref}>
      {/* left column displaying room names */}
      <div className="w-[100px] shrink-0 sticky left-0 select-none">
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
  );
}

export default ScrollBody;
