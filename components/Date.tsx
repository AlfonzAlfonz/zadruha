import { parseISO, format } from "date-fns";
import { FC } from "react";

export const Date: FC<{ dateString: string }> = ({ dateString }) => {
  const date = parseISO(dateString);
  // eslint-disable-next-line no-tabs
  return <time dateTime={dateString}>{format(date, "LLLL	d, yyyy")}</time>;
};
