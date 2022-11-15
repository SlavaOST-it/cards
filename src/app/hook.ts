import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import type {RootState, AppDispatchType} from "./store";

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector