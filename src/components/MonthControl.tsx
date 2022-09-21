import { Button } from "antd";
import DatePicker from "./DatePicker";
import dayjs from "dayjs";

function MonthControl({
  firstDayOfMonth,
  setFirstDayOfMonth,
}: {
  firstDayOfMonth: dayjs.Dayjs;
  setFirstDayOfMonth: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
}) {
  return (
    <div className="flex">
      <Button
        type="primary"
        onClick={() => {
          setFirstDayOfMonth(firstDayOfMonth.add(-1, "M"));
        }}>
        上一月
      </Button>
      <DatePicker
        value={firstDayOfMonth}
        onChange={(v) => v && setFirstDayOfMonth(v)}
        picker="month"
      />
      <Button
        type="primary"
        onClick={() => {
          setFirstDayOfMonth(firstDayOfMonth.add(1, "M"));
        }}>
        下一月
      </Button>
    </div>
  );
}

export default MonthControl;
