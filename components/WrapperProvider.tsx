import { useWrapperCtx } from "@libs/useWrapperCtx";
import { WrapperContext } from "@libs/WrapperContext";
import { PropsWithChildren } from "react";

const WrapperProvider = ({ children }: PropsWithChildren<any>) => {
	const ctx = useWrapperCtx();

	return <WrapperContext.Provider value={ctx}>{children}</WrapperContext.Provider>;
};

export default WrapperProvider;
