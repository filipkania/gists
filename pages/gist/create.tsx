import ProtectedRoute from "@components/ProtectedRoute";
import { FormEvent } from "react";

const CreateGist = () => {
	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(e.currentTarget.file_name);
	};

	return (
		<form onSubmit={onSubmit}>
			<div>
				<span>Nazwa gista</span>
				<input name="name" />
			</div>
			<div>
				<span>Publiczny</span>
				<input name="public" type="checkbox" />
			</div>

			<div>
				<span>nazwa pliku</span>
				<input name="file_name" />
			</div>
			<div>
				<span>content pliku</span>
				<input name="file_content" />
			</div>

			<div>
				<span>nazwa pliku</span>
				<input name="file_name" />
			</div>
			<div>
				<span>content pliku</span>
				<input name="file_content" />
			</div>

			<input type="submit" />
		</form>
	);
};

export default ProtectedRoute(CreateGist);
