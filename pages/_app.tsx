import WrapperProvider from "@components/WrapperProvider";
import "@styles/globals.scss";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import { useEffect } from "react";
import Head from "next/head";

import Nprogress from "nprogress";
import "nprogress/nprogress.css";

const Gists = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		Nprogress.configure({
			showSpinner: false,
		});

		Router.events.on("routeChangeStart", Nprogress.start);
		Router.events.on("routeChangeComplete", Nprogress.done);
		Router.events.on("routeChangeError", Nprogress.done);
	}, []);

	return (
		<WrapperProvider>
			<Head>
				<title>GistEditor</title>
			</Head>

			<Component {...pageProps} />
		</WrapperProvider>
	);
};

export default Gists;
