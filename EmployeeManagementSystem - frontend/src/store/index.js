import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import employeeReducer from "./employeeSlice";
import leaveReducer from "./leaveSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeeReducer,
    leaves: leaveReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
