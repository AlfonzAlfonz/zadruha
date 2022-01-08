import { parseISO, format } from "date-fns";
import { FC } from "react";

export const DisplayDate: FC<{ dateString: string }> = ({ dateString }) => {
  const date = parseISO(dateString);
  // eslint-disable-next-line no-tabs
  return <time dateTime={dateString}>{new Date(dateString).toLocaleDateString("cs")}</time>;
};
