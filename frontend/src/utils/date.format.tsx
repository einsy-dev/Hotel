import moment, { Moment } from "moment";

const format = (date: Moment) => {
  return moment(date).format("DD.MM.YYYY");
};

export { format };
