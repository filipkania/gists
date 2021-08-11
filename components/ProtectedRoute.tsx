import { useRouter } from "next/router";
import { FunctionComponent, useEffect } from "react";
import { useWrapper } from "@libs/WrapperContext";
import { AppProps } from "next/dist/next-server/lib/router/router";

const ProtectedRoute = (Page: FunctionComponent) => {
	const ProtectedRouteComponent = ({ props }: AppProps) => {
		const { wrapper, loading } = useWrapper();
		const router = useRouter();

		useEffect(() => {
			if (!loading && !wrapper?.token) {
				router.push("/login");
			}
		}, [loading]);

		return <Page {...props} />;
	};

	return ProtectedRouteComponent;
};

export default ProtectedRoute;
