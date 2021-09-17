import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WrapperCtxType } from "@typings/WrapperContext";
import GistAPI from "./GistAPI";
import { LOCALSTORAGE_KEY } from "./WrapperContext";

export const useWrapperCtx = (): WrapperCtxType => {
	const [loading, setLoading] = useState(true);
	const [wrapper, setWrapper] = useState<null | GistAPI>(null);

	const router = useRouter();

	const changeToken = async (token: string) => {
		const newWrapper = new GistAPI(token);
		if (await newWrapper.validateToken()) {
			setWrapper(newWrapper);
			localStorage.setItem(LOCALSTORAGE_KEY, token);
			return true;
		}

		return false;
	};

	const clearSession = () => {
		setWrapper(null);
		localStorage.removeItem(LOCALSTORAGE_KEY);
		router.push("/login");
	};

	useEffect(() => {
		const newToken = localStorage.getItem(LOCALSTORAGE_KEY);
		if (newToken) {
			changeToken(newToken).then((r) => {
				setLoading(false);
				if (!r) {
					clearSession();
				}
			});
		} else {
			setLoading(false);
		}

		window.addEventListener("storage", async (e) => {
			if (e.key === LOCALSTORAGE_KEY && e.newValue !== wrapper?.token) {
				if (!e.newValue || !(await changeToken(e.newValue))) {
					clearSession();
				}
			}
		});
	}, []);

	return {
		wrapper,
		changeToken,
		loading,
		clearSession,
	};
};
