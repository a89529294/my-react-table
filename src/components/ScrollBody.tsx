import clsx from "clsx";
import dayjs, { Dayjs } from "dayjs";

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
  return (
    <ScrollContainer className="scroll-container col-start-2 row-start-1 row-end-[var(--number-of-rooms)] overflow-x-scroll overflow-y-hidden">
      <div className="w-[150%] grid grid-rows-[30px_30px] auto-rows-[80px] grid-cols-[repeat(var(--days-in-month),1fr)] bg-slate-300 gap-[1px]">
        <div className="flex justify-center items-center col-span-full bg-red-600 text-white">
          {generateYearAndMonthStr(firstDayOfMonth)}
        </div>
        {new Array(daysInMonth).fill("").map((_: string, i) => (
          <div className="bg-white flex justify-center items-center" key={i}>
            {getDayOfWeek(firstDayOfMonth, i + 1)}
            {i + 1}
          </div>
        ))}
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
