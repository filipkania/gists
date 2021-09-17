import ProtectedRoute from "@components/ProtectedRoute";
import { useWrapper } from "@libs/WrapperContext";
import { File } from "@typings/api/File";
import { CreatePayload, Gist } from "@typings/api/Gist";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import styles from "@styles/pages/Gist.create.module.scss";
import toast from "react-hot-toast";
import Editor from "react-simple-code-editor";

import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import useAPI from "@libs/useAPI";

const FILE_TEMPLATE: File = {
	filename: "",
	content: "You can edit file contents here :)",
};

const EditGist = () => {
	const { wrapper } = useWrapper();
	const router = useRouter();

	const [properties, setProperties] = useState<CreatePayload | null>(null);
	const [files, setFiles] = useState<Array<File>>([]);
	const [filesToDelete, setFilesToDelete] = useState<Array<string>>([]);
	const [processing, setProcessing] = useState(false);

	const { error, loading } = useAPI<Gist>(async (wrapper) => {
		const gist: Gist = (await wrapper.getGist(router.query.id as string)).data;
		setProperties({
			description: gist.description,
			public: gist.public,
			files: {},
		});

		setFiles(Object.keys(gist.files).map((key) => gist.files[key]));
		return gist as any;
	});

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (!properties || !files) return;

		const toastId = toast.loading("Updating Gist...");
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

			filesToDelete.forEach((key) => {
				payload.files[key] = {
					content: "",
				};
			});
		}

		if (!goodToGo)
			return toast.error("Check inputs once again.", {
				id: toastId,
			});

		setProcessing(true);

		wrapper
			?.updateGist(router.query.id as string, payload)
			.then((r: AxiosResponse<Gist>) => {
				toast.success("Succesfully updated Gist!", {
					id: toastId,
				});

				router.push(`/gist/${r.data.id}`);
			})
			.catch(() => {
				toast.error("Couldn't update this Gist.", {
					id: toastId,
				});

				setProcessing(false);
			});
	};

	const changeFileValue = (index: number, value: File) =>
		setFiles((oldState) => {
			const copy = [...oldState];
			copy[index] = value;
			return copy;
		});

	const removeFile = (i: number) => setFiles((files) => files.filter((_, index) => index !== i));

	useEffect(() => {
		if (error?.response?.status === 404) {
			toast.error("Gist not found.");
			router.push("/");
		}
	}, [error]);

	if (loading || !properties) return null;

	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<h1 className={styles.title}>Edit existing Gist</h1>
				<button
					className="button"
					type="button"
					onClick={() => router.push(`/gist/${router.query.id}`)}
				>
					Go Back
				</button>
			</div>
			<form onSubmit={onSubmit}>
				<div style={{ display: "flex", flexDirection: "column" }}>
					<h2 className={styles.subtitle}>General Info</h2>
					<label htmlFor="gistName">Description</label>
					<input
						className={styles.underlined_input}
						id="gistName"
						placeholder={"Description"}
						value={properties.description}
						onChange={(e) =>
							setProperties({
								...properties,
								description: e.currentTarget.value,
							})
						}
					/>
				</div>

				<div style={{ marginTop: "1rem" }} />
				<h2 className={styles.subtitle}>Files</h2>

				{files.map((file, i) => (
					<div className={styles.file_entry} key={i}>
						<div className={styles.file_navbar}>
							<h2 style={{ marginTop: 0 }}>File #{i + 1}</h2>

							{files.length > 1 && (
								<button
									style={{ marginTop: "1rem" }}
									className="button button--red button--small"
									type="button"
									onClick={() => {
										setFilesToDelete([...filesToDelete, files[i].filename]);
										removeFile(i);
									}}
								>
									Remove
								</button>
							)}
						</div>
						<label htmlFor={`filename_${i}`}>File Name</label>
						<input
							id={`filename_${i}`}
							placeholder={"Filename"}
							className={styles.underlined_input}
							value={file.filename}
							onChange={(e) =>
								changeFileValue(i, {
									...file,
									filename: e.currentTarget.value,
								})
							}
						/>

						<p className={styles.label}>Content</p>
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
					</div>
				))}

				<button
					type="button"
					className="button"
					onClick={() => {
						setFiles([...files, FILE_TEMPLATE]);
					}}
				>
					Add File
				</button>

				<button className="button button--primary" disabled={processing} type="submit">
					Submit Query
				</button>
			</form>
		</div>
	);
};

export default ProtectedRoute(EditGist);
