import ProtectedRoute from "@components/ProtectedRoute";
import useAPI from "@libs/useAPI";
import { Gist } from "@typings/api/Gist";
import styles from "@styles/pages/Gist.id.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nord } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useWrapper } from "@libs/WrapperContext";
import toast from "react-hot-toast";
import { useEffect } from "react";

const GistOverview = () => {
	const router = useRouter();
	const { wrapper } = useWrapper();
	const { data, error, loading } = useAPI<Gist>((wrapper, router) => {
		return wrapper.getSpecificGist(router.query.id as string);
	});

	useEffect(() => {
		if (error?.response?.status === 404) {
			toast.error("Gist not found.");
			router.push("/");
		}
	}, [error]);

	if (loading || !data) return null;

	return (
		<div className={styles.wrapper}>
			<Head>
				<title>
					{data.description.substring(0, 50) || Object.keys(data.files)[0]} - GistEditor
				</title>
			</Head>

			<div>
				<button className="button" onClick={() => router.push("/")}>
					Go Back
				</button>
				<button
					className="button"
					onClick={() => router.push(`/gist/${router.query.id}/edit`)}
				>
					Edit
				</button>
				<button
					className="button"
					onClick={() => {
						const result = confirm(
							"You are about to delete your Gist. Are you sure about this?"
						);
						if (!result) return;

						const toastId = toast.loading("Deleting Gist...");
						wrapper
							?.deleteGist(data.id)
							.then(() => {
								router.push("/");

								toast.success("Successfully deleted Gist.", {
									id: toastId,
								});
							})
							.catch(() =>
								toast.error("Couldn't delete selected Gist.", {
									id: toastId,
								})
							);
					}}
				>
					Delete
				</button>
				<div className={styles.desc}>
					<span>Description:</span> {data?.description || "No description provided"}
				</div>
				<div className={styles.date}>
					<span>Created at:</span>{" "}
					{new Date(data?.created_at || 0).toLocaleDateString("en-US", {
						weekday: "long",
						year: "numeric",
						month: "long",
						day: "numeric",
					})}
				</div>
			</div>

			{data &&
				Object.keys(data.files).map((key, i) => {
					const file = data.files[key];

					return (
						<div className={styles.file_entry} key={i}>
							<p className={styles.name}>
								Nazwa: <b>{file.filename}</b>
							</p>
							<p className={styles.lang}>
								Język: <b>{file.language || "Not Specified"}</b>
							</p>
							<SyntaxHighlighter
								style={nord}
								language={file?.language?.toLowerCase() || ""}
							>
								{file.content}
							</SyntaxHighlighter>
						</div>
					);
				})}
		</div>
	);
};

export default ProtectedRoute(GistOverview);
