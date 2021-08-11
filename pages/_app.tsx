import WrapperProvider from "@components/WrapperProvider";
import "@styles/globals.scss";
import type { AppProps } from "next/app";

const Gists = ({ Component, pageProps }: AppProps) => {
	return (
		<WrapperProvider>
			<Component {...pageProps} />
		</WrapperProvider>
	);
};

export default Gists;
