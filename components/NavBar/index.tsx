import useAPI from "@libs/useAPI";
import { User } from "@typings/api/User";
import { memo } from "react";
import Image from "next/image";
import { useWrapper } from "@libs/WrapperContext";
import toast from "react-hot-toast";

const NavBar = () => {
	const { clearSession } = useWrapper();
	const { data, loading } = useAPI<User>((wrapper) => {
		return wrapper.getUser();
	});

	if (loading || !data) return <div>Loading...</div>;

	return (
		<div>
			<Image width={256} height={256} src={data.avatar_url} />

			<span>{data.name}</span>
			<span>@{data.login}</span>

			<button
				onClick={() => {
					clearSession();
					toast.success("Successfully logged out!");
				}}
			>
				Logout
			</button>
		</div>
	);
};

export default memo(NavBar);
