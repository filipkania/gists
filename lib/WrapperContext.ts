import { createContext, useContext } from "react";
import { WrapperCtxType } from "@typings/WrapperContext";

export const LOCALSTORAGE_KEY = "gists::token";

export const WrapperContext = createContext<WrapperCtxType>({
	wrapper: null,
	changeToken: async () => false,
	clearSession: () => null,
	loading: true,
});

export const useWrapper = () => {
	return useContext(WrapperContext);
};
