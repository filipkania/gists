import ProtectedRoute from "@components/ProtectedRoute";
import { useWrapper } from "@libs/WrapperContext";
import { File } from "@typings/api/File";
import { CreatePayload, Gist } from "@typings/api/Gist";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import Editor from "react-simple-code-editor";

import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const FILE_TEMPLATE: File = {
	filename: "x",
	content: "x",
};

const PROPERTIES_TEMPLATE: CreatePayload = {
	description: "",
	public: true,
	files: {},
};

const CreateGist = () => {
	const { wrapper } = useWrapper();
	const router = useRouter();

	const [properties, setProperties] = useState(PROPERTIES_TEMPLATE);
	const [files, setFiles] = useState<Array<File>>([FILE_TEMPLATE]);
	const [processing, setProcessing] = useState(false);

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		const toastId = toast.loading("Creating Gist...");
		const payload = { ...properties };

		let goodToGo = files.length > 0;
		if (goodToGo) {
			const names: Array<string> = [];
			files.forEach((file) => {
				if (
					names.includes(file.filename) ||
					file.content.length === 0 ||
					file.filename.length === 0
				) {
					goodToGo = false;
					return;
				}

				names.push(file.filename);
				payload.files[file.filename] = file;
			});
		}

		if (!goodToGo)
			return toast.error("Check inputs once again.", {
				id: toastId,
			});

		setProcessing(true);

		wrapper
			?.createGist(payload)
			.then((r: AxiosResponse<Gist>) => {
				toast.success("Succesfully created new Gist!", {
					id: toastId,
				});

				router.push(`/gist/${r.data.id}`);
			})
			.catch(() => {
				toast.error("Couldn't create new Gist.", {
					id: toastId,
				});

				setProcessing(false);
			});
	};

	const changeFileValue = (index: number, value: any) =>
		setFiles((oldState) => {
			const copy = [...oldState];
			copy[index] = value;
			return copy;
		});

	const removeFile = (i: number) => setFiles((files) => files.filter((_, index) => index !== i));

	return (
		<form onSubmit={onSubmit}>
			<button type="button" onClick={() => router.push("/")}>
				go back
			</button>
			<div>
				<span>Nazwa gista</span>
				<input
					value={properties.description}
					onChange={(e) =>
						setProperties({
							...properties,
							description: e.currentTarget.value,
						})
					}
				/>
			</div>
			<div>
				<span>Publiczny</span>
				<input
					type="checkbox"
					checked={properties.public}
					onChange={(e) =>
						setProperties({
							...properties,
							public: e.currentTarget.checked,
						})
					}
				/>
			</div>

			<button
				type="button"
				onClick={() => {
					setFiles([...files, FILE_TEMPLATE]);
				}}
			>
				dodaj plik
			</button>

			{files.map((file, i) => (
				<div key={i}>
					<input
						placeholder={"Filename"}
						value={file.filename}
						onChange={(e) =>
							changeFileValue(i, {
								...file,
								filename: e.currentTarget.value,
							})
						}
					/>

					<Editor
						value={file.content}
						onValueChange={(v) => {
							changeFileValue(i, {
								...file,
								content: v,
							});
						}}
						highlight={(x) => hljs.highlightAuto(x).value}
					/>

					{files.length > 1 && (
						<button type="button" onClick={() => removeFile(i)}>
							x
						</button>
					)}
				</div>
			))}

			<input disabled={processing} type="submit" />
		</form>
	);
};

export default ProtectedRoute(CreateGist);
