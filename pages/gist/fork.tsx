import { useWrapper } from "@libs/WrapperContext";
import styles from "@styles/pages/Login.module.scss";
import { Gist } from "@typings/api/Gist";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import toast from "react-hot-toast";

const ForkGist = () => {
	const router = useRouter();
	const { wrapper } = useWrapper();

	const [idValue, setIdValue] = useState("");
	const [processing, setProcessing] = useState(false);

	return (
		<div className={styles.wrapper}>
			<button className="button" onClick={() => router.push(`/`)}>
				Go Back
			</button>

			<br />
			<br />

			<input
				type="text"
				value={idValue}
				disabled={processing}
				placeholder={"ID"}
				className={styles.input}
				autoComplete="off"
				onChange={(e) => {
					const { value } = e.target;

					setIdValue(value);
				}}
			/>
			<br />
			<button
				className="button"
				disabled={processing}
				onClick={() => {
					const toastId = toast.loading("Forking Gist...");

					setProcessing(true);

					wrapper
						?.forkGist(idValue)
						.then((r: AxiosResponse<Gist>) => {
							toast.success("Successfully forked this Gist!", {
								id: toastId,
							});

							router.push(`/gist/${r.data.id}`);
						})
						.catch(() =>
							toast.error("Couldn't fork this Gist...", {
								id: toastId,
							})
						)
						.finally(() => setProcessing(false));
				}}
			>
				Fork
			</button>
		</div>
	);
};

export default ForkGist;
