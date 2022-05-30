import { createSlice } from "@reduxjs/toolkit";

export interface ErrorStateAlert {
  message: string;
}

export interface ErrorState {
  alerts: Array<ErrorStateAlert>;
  show: boolean;
}

export type ErrorReducers = {
  setError: (state: ErrorState, action: { payload: string }) => void;
  cleanError: (state: ErrorState) => void;
};

export const errorSlice = createSlice<ErrorState, ErrorReducers, string>({
  name: "alert",
  initialState: {
    alerts: [],
    show: false,
  },
  reducers: {
    setError: (state, action) => {
      console.log(state, action);
      state.alerts.push({
        message: action.payload ?? "Unknown error occurred",
      });
      state.show = true;
    },
    cleanError: (state) => {
      state.show = false;
      state.alerts = [];
    },
  },
});

export const { setError, cleanError } = errorSlice.actions;
export default errorSlice.reducer;
