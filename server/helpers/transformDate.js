const moment = require("moment");

export const transformDate = (date) => {
  return moment(date).format("YYYY-MM-DD");
};
