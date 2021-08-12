import { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import GistAPI from "./GistAPI";
import { useWrapper } from "./WrapperContext";

const useAPI = <T = any>(query: (wrapper: GistAPI) => Promise<AxiosResponse | { data: any }>) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<AxiosError | null>(null);

	const { wrapper, loading: isWrapperLoading } = useWrapper();

	useEffect(() => {
		if (isWrapperLoading || !wrapper?.token) return;

		setData(null);
		setLoading(true);
		setError(null);

		query(wrapper)
			.then((r) => {
				setData(r.data);
			})
			.catch((e) => {
				setError(e);
			})
			.finally(() => {
				setLoading(false);
			});
	}, [isWrapperLoading, wrapper?.token]);

	return {
		data,
		loading,
		error,
	};
};

export default useAPI;
