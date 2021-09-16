import ProtectedRoute from "@components/ProtectedRoute";
import useAPI from "@libs/useAPI";
import { Gist } from "@typings/api/Gist";
import Link from "next/link";
import Head from "next/head";
import NavBar from "@components/NavBar";
import { useEffect, useMemo, useState } from "react";
import { filterGistsByFileName, filterGistsByName } from "@libs/filteringFunctions";

const GISTS_PER_PAGE = 1;

const Home = () => {
	const { data, loading } = useAPI<Array<Gist>>(async (wrapper) => {
		return wrapper.getGists();
	});
	const [filterString, setFilterString] = useState("");
	const [currentPage, setCurrentPage] = useState(0);

	const filteredData = useMemo(() => {
		return data?.filter((gist) => {
			if (filterString === "") return true;

			return (
				filterGistsByName(gist, filterString) || filterGistsByFileName(gist, filterString)
			);
		});
	}, [filterString, data]);

	useEffect(() => {
		setCurrentPage(0);
	}, [filterString]);

	if (loading || !filteredData) return <div>Loading</div>;

	return (
		<>
			<Head>
				<title>Home - GistEditor</title>
			</Head>

			<div>
				<NavBar />

				<div>
					<input
						value={filterString}
						placeholder={"Filter gists by string"}
						onChange={(e) => setFilterString(e.target.value)}
					/>

					{filteredData
						.slice(GISTS_PER_PAGE * currentPage, GISTS_PER_PAGE * (currentPage + 1))
						.map((gist, i) => (
							<div key={i}>
								<Link href={`/gist/${gist.id}`}>
									{gist.description ||
										gist.files[Object.keys(gist.files)[0]].filename}
								</Link>
							</div>
						))}

					<div>
						{[...Array(Math.ceil(filteredData.length / GISTS_PER_PAGE))].map((_, i) => (
							<button key={i} onClick={() => setCurrentPage(i)}>
								{i + 1}
							</button>
						))}
					</div>
				</div>
			</div>
		</>
	);
};

export default ProtectedRoute(Home);
