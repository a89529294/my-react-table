import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";

import MonthControl from "./components/MonthControl";
import ScrollBody from "./components/ScrollBody";
import {
  getRandNumOfRooms,
  generateYearAndMonthStr,
  getDayOfWeek,
} from "./utils";
import useDraggable from "./hooks/useDraggable";
import useScrollSync from "./hooks/useScrollSync";

function App() {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    dayjs(`${dayjs().year()}-${dayjs().month() + 1}-1`)
  );
  const [rooms, setRooms] = useState(getRandNumOfRooms());
  const headerRef = useRef<HTMLDivElement>(null);
  useDraggable(headerRef);
  useScrollSync(".sync-me");
  const daysInMonth = firstDayOfMonth.daysInMonth();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty(
      "--days-in-month",
      firstDayOfMonth.daysInMonth().toString()
    );
    const newNumberOfRooms = getRandNumOfRooms();
    root.style.setProperty(
      "--number-of-rooms",
      (newNumberOfRooms.length + 2).toString()
    );
    setRooms(newNumberOfRooms);
  }, [firstDayOfMonth]);

  return (
    <div className="py-2 px-3">
      {/* controls */}
      <div className="flex justify-between mb-2">
        <div>
          <Button type="primary">訂房</Button>
          <Button type="primary">清空選擇</Button>
        </div>
        <MonthControl
          firstDayOfMonth={firstDayOfMonth}
          setFirstDayOfMonth={setFirstDayOfMonth}
        />
      </div>
      {/* table */}

      <div className="isolate border border-solid border-slate-300">
        {/* header */}
        <div
          className="select-none sticky top-0 z-10 flex overflow-auto no-scrollbar sync-me"
          ref={headerRef}>
          <div className="w-[100px] h-[60px] bg-red-600 shrink-0 sticky left-0 border-r border-solid border-slate-300"></div>
          <div className="w-full grid grid-rows-2">
            <div className="flex justify-center items-center bg-red-600 text-white ">
              {generateYearAndMonthStr(firstDayOfMonth)}
            </div>
            <div className="flex">
              {new Array(daysInMonth).fill("").map((_: string, i) => (
                <div
                  className="bg-white flex justify-center items-center border-r border-solid border-slate-300 flex-1 w-16"
                  key={i}>
                  {getDayOfWeek(firstDayOfMonth, i + 1)}
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* scrollable component */}

        <ScrollBody firstDayOfMonth={firstDayOfMonth} rooms={rooms} />
      </div>
    </div>
  );
}

export default App;
