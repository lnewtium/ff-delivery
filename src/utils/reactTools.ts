import { useDispatch, useSelector } from "react-redux";
import { appStore } from "@/src/utils/store";

export type RootStateType = ReturnType<typeof appStore.getState>;
export type AppDispatchType = typeof appStore.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatchType>();
export const useAppSelector = useSelector.withTypes<RootStateType>();
