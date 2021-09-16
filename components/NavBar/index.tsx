import useAPI from "@libs/useAPI";
import { User } from "@typings/api/User";
import { memo } from "react";
import Image from "next/image";
import styles from "@styles/NavBar.module.scss";
import { useWrapper } from "@libs/WrapperContext";
import toast from "react-hot-toast";

const NavBar = () => {
	const { clearSession } = useWrapper();
	const { data, loading } = useAPI<User>((wrapper) => {
		return wrapper.getUser();
	});

	if (loading || !data) return <div>Loading...</div>;

	return (
		<div className={styles.wrapper}>
			<Image
				className={styles.avatar}
				layout="responsive"
				width={300}
				height={300}
				src={data.avatar_url}
			/>

			<div className={styles.data}>
				<div>
					<span className={styles.name}>{data.name}</span>
					<button
						className="button"
						onClick={() => {
							clearSession();
							toast.success("Successfully logged out!");
						}}
					>
						Logout
					</button>
				</div>
				<span className={styles.username}>@{data.login}</span>
			</div>
		</div>
	);
};

export default memo(NavBar);
