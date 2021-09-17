import ProtectedRoute from "@components/ProtectedRoute";
import useAPI from "@libs/useAPI";
import { Gist } from "@typings/api/Gist";
import Link from "next/link";
import Head from "next/head";
import styles from "@styles/pages/Index.module.scss";
import NavBar from "@components/NavBar";
import { useEffect, useMemo, useState } from "react";
import { filterGistsByFileName, filterGistsByName } from "@libs/filteringFunctions";

const GISTS_PER_PAGE = 6;

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

	if (loading || !filteredData) return null;

	return (
		<div className={styles.wrapper}>
			<Head>
				<title>Home - GistEditor</title>
			</Head>

			<div className={styles.main}>
				<NavBar />

				<div className={styles.gists}>
					<label htmlFor="search-input">Search Gists</label>
					<input
						id="search-input"
						className={styles.input}
						value={filterString}
						placeholder={"Filter gists by string"}
						onChange={(e) => setFilterString(e.target.value)}
					/>

					<div className={styles.gists_container}>
						{filteredData.length > 0 ? (
							filteredData
								.slice(
									GISTS_PER_PAGE * currentPage,
									GISTS_PER_PAGE * (currentPage + 1)
								)
								.map((gist, i) => (
									<Link key={i} href={`/gist/${gist.id}`}>
										<div className={styles.gist_wrapper}>
											<p className={styles.gist_name}>
												{gist.description || Object.keys(gist.files)[0]}
											</p>
											<p className={styles.gist_date}>
												{new Date(gist.created_at).toLocaleDateString(
													"en-US",
													{
														weekday: "long",
														year: "numeric",
														month: "long",
														day: "numeric",
													}
												)}
											</p>
										</div>
									</Link>
								))
						) : (
							<span>Gists not found.</span>
						)}
					</div>

					<div>
						{[...Array(Math.ceil(filteredData.length / GISTS_PER_PAGE))].map((_, i) => (
							<button
								className={`${styles.pagination} ${
									currentPage == i ? styles.active : ""
								}`}
								key={i}
								onClick={() => setCurrentPage(i)}
							>
								{i + 1}
							</button>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProtectedRoute(Home);
