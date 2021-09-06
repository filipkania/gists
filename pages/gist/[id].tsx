import ProtectedRoute from "@components/ProtectedRoute";
import useAPI from "@libs/useAPI";
import { Gist } from "@typings/api/Gist";
import Head from "next/head";
import { useRouter } from "next/router";

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
				<div>{data?.description}</div>
				<div>{data?.created_at}</div>
			</div>
		</>
	);
};

export default ProtectedRoute(GistOverview);
