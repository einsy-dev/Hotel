import { Reducer, configureStore } from "@reduxjs/toolkit";
import moment from "moment";

const mainReducer: Reducer<any, any, never[]> = (
  prevState = {
    store: {
      order: {
        from: moment().startOf("day"),
        to: moment().add(1, "day").startOf("day"),
      },
      name: "",
      limit: 10,
    },
    user: { role: "client", isAuth: false },
  },
  action: any
) => {
  const { type, payload }: { type: string; payload: any } = action;

  switch (type) {
    case "AUTH":
      return { ...prevState, user: payload };
    case "ORDER":
      return {
        ...prevState,
        store: { ...prevState.store, order: payload },
      };
    case "SET_NAME":
      return {
        ...prevState,
        store: { ...prevState.store, name: payload },
      };
    default:
      return prevState;
  }
};

export default configureStore({ reducer: mainReducer });
