import { Reducer, configureStore } from "@reduxjs/toolkit";

const mainReducer: Reducer<any, any, never[]> = (
  prevState = {
    store: { order: null },
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
    default:
      return prevState;
  }
};

export default configureStore({ reducer: mainReducer });
