import type { RootState, DispatchAction } from "@/types";
import { TypedUseSelectorHook, useSelector, useDispatch } from "react-redux";

export const useAppDispatch = () => useDispatch<DispatchAction>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
