import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { WrapperCtxType } from "@typings/lib/WrapperContext";
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
			return true;
		}

		return false;
	};

	useEffect(() => {
		const newToken = localStorage.getItem(LOCALSTORAGE_KEY);
		if (newToken) {
			changeToken(newToken).then((r) => {
				setLoading(false);
				if (!r) {
					router.push("/login");
				}
			});
		} else {
			setLoading(false);
		}

		window.addEventListener("storage", async (e) => {
			if (e.key === LOCALSTORAGE_KEY) {
				if (!e.newValue || !(await changeToken(e.newValue))) {
					router.push("/login");
				}
			}
		});
	}, []);

	return {
		wrapper,
		changeToken,
		loading,
	};
};
