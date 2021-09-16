import ProtectedRoute from "@components/ProtectedRoute";
import useAPI from "@libs/useAPI";
import { Gist } from "@typings/api/Gist";
import styles from "@styles/pages/Gist.id.module.scss";
import Head from "next/head";
import { useRouter } from "next/router";
import colors from "github-language-colors";

const GistOverview = () => {
	const router = useRouter();
	const { data, error, loading } = useAPI<Gist>((wrapper, router) => {
		return wrapper.getSpecificGist(router.query.id as string);
	});

	if (loading) return <div>Loading...</div>;

	if (error?.response?.status === 404) return <div>Gist not found.</div>;

	return (
		<div className={styles.wrapper}>
			<Head>
				<title>{data?.description} - GistEditor</title>
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
				<button className="button" onClick={() => alert("Deleted, maybe not")}>
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
						<div key={i}>
							<p>Nazwa: {file.filename}</p>
							<p>Język: {file.language}</p>
						</div>
					);
				})}

			<code>
				{Object.keys(colors).map((x: string, i) => (
					<div key={i}>
						{x}: {(colors as any)[x]}
					</div>
				))}
			</code>
		</div>
	);
};

export default ProtectedRoute(GistOverview);
