import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export const getFormattedDate = (date: string) => {
  console.log(date);
  if (dayjs(new Date()).diff(dayjs(date), "days") >= 1) {
    return dayjs(date).format("MMM DD, YYYY");
  }
  return dayjs(date).fromNow();
};
