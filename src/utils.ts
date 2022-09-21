import dayjs, { Dayjs } from "dayjs";

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

export function getRandNumOfRooms() {
  const length = Math.ceil(Math.random() * rcrns.length);
  //   return rcrns.slice(0, length);
  return rcrns;
}

const wdays = ["日", "一", "二", "三", "四", "五", "六"];

export function generateYearAndMonthStr(date: Dayjs) {
  const map = [
    "一月",
    "二月",
    "三月",
    "四月",
    "五月",
    "六月",
    "七月",
    "八月",
    "九月",
    "十月",
    "十一月",
    "十二月",
  ];
  return map[date.month()] + " " + date.year();
}

export function getDayOfWeek(date: Dayjs, dateOfMonth: number) {
  const dateStr = `${date.year()}-${date.month() + 1}-${dateOfMonth}`;
  return wdays[dayjs(dateStr).day()];
}
