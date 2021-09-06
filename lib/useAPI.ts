import { AxiosError, AxiosResponse } from "axios";
import { NextRouter, useRouter } from "next/router";
import { useEffect, useState } from "react";
import GistAPI from "./GistAPI";
import { useWrapper } from "./WrapperContext";

const useAPI = <T = any>(
	query: (wrapper: GistAPI, router: NextRouter) => Promise<AxiosResponse<T> | { data: T }>
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<AxiosError | null>(null);

	const { wrapper, loading: isWrapperLoading } = useWrapper();
	const router = useRouter();

	useEffect(() => {
		if (isWrapperLoading || !wrapper?.token || !router.isReady) return;

		setData(null);
		setLoading(true);
		setError(null);

		query(wrapper, router)
			.then((r) => {
				setData(r.data);
			})
			.catch((e) => {
				setError(e);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [isWrapperLoading, wrapper?.token, router.isReady]);

	return {
		data,
		loading,
		error,
	};
};

export default useAPI;
