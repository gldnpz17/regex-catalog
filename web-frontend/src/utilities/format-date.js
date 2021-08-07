import { DateTime } from "luxon";

const formatDate = (dateStringISO) => {
  let date = DateTime.fromISO(dateStringISO);

  return date.toLocaleString(DateTime.DATETIME_MED);
};

export default formatDate;