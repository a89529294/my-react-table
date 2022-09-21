import clsx from "clsx";
import ScrollContainer from "react-indiana-drag-scroll";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import MonthControl from "./components/MonthControl";
import { Button } from "antd";
import ScrollBody from "./components/ScrollBody";
import { getRandNumOfRooms } from "./utils";
import RowHeader from "./components/RowHeader";

function App() {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    dayjs(`${dayjs().year()}-${dayjs().month() + 1}-1`)
  );
  const [rooms, setRooms] = useState(getRandNumOfRooms());

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
      <div className="grid grid-cols-[100px_1fr] grid-rows-[60px] auto-rows-[80px] border border-solid border-slate-300 bg-slate-300 gap-[1px]">
        {/* top left empty red cell */}
        <div className="bg-red-600"></div>
        {/* scrollable component */}
        <ScrollBody firstDayOfMonth={firstDayOfMonth} rooms={rooms} />
        {/* left column displaying room names */}
        {rooms.map((names, i) => (
          <RowHeader rc={names[0]} rn={names[1]} key={i} />
        ))}
      </div>
    </div>
  );
}

export default App;
