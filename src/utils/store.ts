import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/src/reducers/authReducer";
import { useDispatch } from "react-redux";
import { profileApi } from "@/src/services/profile";
import { setupListeners } from "@reduxjs/toolkit/query";

export const appStore = configureStore({
  reducer: {
    auth: authReducer,
    [profileApi.reducerPath]: profileApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(profileApi.middleware),
});

setupListeners(appStore.dispatch);

export type RootStateType = ReturnType<typeof appStore.getState>;
export type AppDispatchType = typeof appStore.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatchType>();
