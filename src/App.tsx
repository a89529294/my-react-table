import clsx from "clsx";
import ScrollContainer from "react-indiana-drag-scroll";
import * as dayjs from "dayjs";
import { useEffect, useState } from "react";
import MonthControl from "./components/MonthControl";
import { Button } from "antd";

const wdays = ["日", "一", "二", "三", "四", "五", "六"];
const rcrns = [
  ["星空行", "水瓶座"],
  ["星空行", "雙魚座"],
  ["星空行", "摩羯座"],
  ["森林遊獵", "兔"],
  ["森林遊獵", "雞"],
  ["森林遊獵", "龍"],
  ["森林遊獵", "虎"],
  ["森林遊獵", "馬"],
  ["森林遊獵", "鼠"],
  ["森林遊獵", "蛇"],
  ["森林遊獵", "牛"],
  ["森林遊獵", "羊"],
  ["森林遊獵", "猴"],
  ["溪遊獵", "獅子座"],
  ["溪遊獵", "處女座"],
];

function getDayOfWeek(date: dayjs.Dayjs, dateOfMonth: number) {
  const dateStr = `${date.year()}-${date.month() + 1}-${dateOfMonth}`;
  return wdays[dayjs(dateStr).day()];
}

function getRandNumOfRooms() {
  const length = Math.ceil(Math.random() * rcrns.length);
  return rcrns.slice(0, length);
}

function App() {
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(
    dayjs(`${dayjs().year()}-${dayjs().month() + 1}-1`)
  );
  const [rooms, setRooms] = useState(getRandNumOfRooms());
  const daysInMonth = firstDayOfMonth.daysInMonth();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--days-in-month", daysInMonth.toString());
    const newNumberOfRooms = getRandNumOfRooms();
    root.style.setProperty(
      "--number-of-rooms",
      (newNumberOfRooms.length + 2).toString()
    );
    setRooms(newNumberOfRooms);
  }, [firstDayOfMonth]);

  return (
    <div className="py-2 px-3">
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
      <div className="grid grid-cols-[100px_1fr] grid-rows-[60px] auto-rows-[80px] border border-solid border-slate-300 bg-slate-300 gap-[1px]">
        <div className="bg-red-600"></div>
        <ScrollContainer className="scroll-container col-start-2 row-start-1 row-end-[var(--number-of-rooms)] overflow-x-scroll overflow-y-hidden">
          <div className="w-[150%] grid grid-rows-[30px_30px] auto-rows-[80px] grid-cols-[repeat(var(--days-in-month),1fr)] bg-slate-300 gap-[1px]">
            <div className="flex justify-center items-center col-span-full bg-red-600 text-white">
              九月 2022
            </div>
            {new Array(daysInMonth).fill("").map((_: string, i) => (
              <div
                className="bg-white flex justify-center items-center"
                key={i}>
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
        {rooms.map((names, i) => (
          <RowHeader rc={names[0]} rn={names[1]} key={i} />
        ))}
      </div>
    </div>
  );
}

function RowHeader({ rc, rn }: { rc: string; rn: string }) {
  return (
    <div className="bg-white col-start-1 grid place-content-center text-center">
      <span>{rc}</span>
      <span>{rn}</span>
    </div>
  );
}

export default App;
