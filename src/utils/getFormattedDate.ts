import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(relativeTime);

export const getFormattedDate = (date: string) => {
  const now = dayjs();
  const parsedDate = dayjs.utc(date);
  if (now.diff(parsedDate, "days") >= 1) {
    return dayjs(date).format("MMM DD, YYYY");
  }
  return parsedDate.fromNow();
};
