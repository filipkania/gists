import ProtectedRoute from "@components/ProtectedRoute";
import useAPI from "@libs/useAPI";
import { Gist } from "@typings/api/Gist";
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
		<>
			<Head>
				<title>{data?.description} - GistEditor</title>
			</Head>

			<div>
				<button onClick={() => router.push("/")}>Go Back</button>
				<button onClick={() => router.push(`/gist/${router.query.id}/edit`)}>Edit</button>
				<div>{data?.description}</div>
				<div>{data?.created_at}</div>
			</div>

			{data &&
				Object.keys(data.files).map((key, i) => {
					const file = data.files[key];

					return (
						<div key={i}>
							<span>Nazwa: {file.filename}</span>
							<span>Język: {file.language}</span>
						</div>
					);
				})}

			{Object.keys(colors).map((x: string, i) => (
				<div key={i}>
					{x}: {(colors as any)[x]}
				</div>
			))}
		</>
	);
};

export default ProtectedRoute(GistOverview);
