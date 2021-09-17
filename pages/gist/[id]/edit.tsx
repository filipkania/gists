import ProtectedRoute from "@components/ProtectedRoute";
import useAPI from "@libs/useAPI";
import { Gist } from "@typings/api/Gist";

const EditGist = () => {
	const { data, error, loading } = useAPI<Gist>((wrapper, router) => {
		return wrapper.getGist(router.query.id as string);
	});

	if (loading) return null;

	if (error?.response?.status === 404) return <div>Gist not found.</div>;

	return <div>editting {data?.description}</div>;
};

export default ProtectedRoute(EditGist);
