import { configureStore } from "@reduxjs/toolkit";
import employeesReducer from "./employeesSlice";
import policiesReducer from "./policiesSlice";

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    policies: policiesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
