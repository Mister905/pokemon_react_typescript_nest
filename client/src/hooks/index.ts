import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

// Custom hooks can be added here
export const usePokemon = () => {
  return useAppSelector((state) => state.pokemon);
};

// Export custom hooks
export { useRedirectIfAuthenticated } from "./useRedirectIfAuthenticated";
export { useApiWithLoading } from "./useApiWithLoading";
export { useMaterializeInit } from "./useMaterializeInit";
export { useAuth } from "./useAuth";
