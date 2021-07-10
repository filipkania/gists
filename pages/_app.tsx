import "@styles/globals.scss";
import type { AppProps } from "next/app";

const Gists = ({ Component, pageProps }: AppProps) => {
	return <Component {...pageProps} />;
};

export default Gists;
