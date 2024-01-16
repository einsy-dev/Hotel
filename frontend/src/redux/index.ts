import { Reducer, configureStore } from "@reduxjs/toolkit";

const mainReducer: Reducer<any, any, never[]> = (
  prevState = { store: {}, user: { role: "client" } },
  action: any
) => {
  const { type, payload }: { type: string; payload: any } = action;

  switch (type) {
    case "AUTH":
      return { ...prevState, user: payload };
    default:
      return prevState;
  }
};

export default configureStore({ reducer: mainReducer });
