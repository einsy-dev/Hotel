import { Moment } from "moment";
import splitArr from "./split.array";

export default function calendarIterator(date: Moment) {
  const start = date.clone().startOf("month").day();
  const days = date.clone().daysInMonth();
  const dayOfWeek = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const emptyArr = new Array(start).fill("");
  const daysArr = Array.from({ length: days }, (_, i) => i + 1);
  return splitArr(emptyArr.concat(daysArr), 7, dayOfWeek);
}
