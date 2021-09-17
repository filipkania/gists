import ProtectedRoute from "@components/ProtectedRoute";
import { useWrapper } from "@libs/WrapperContext";
import { File } from "@typings/api/File";
import { CreatePayload, Gist } from "@typings/api/Gist";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";
import styles from "@styles/pages/Gist.create.module.scss";
import toast from "react-hot-toast";
import Editor from "react-simple-code-editor";

import hljs from "highlight.js";
import "highlight.js/styles/github.css";

const FILE_TEMPLATE: File = {
	filename: "newfile",
	content: "You can edit file contents here :)",
};

const PROPERTIES_TEMPLATE: CreatePayload = {
	description: "This is gist's description",
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

	const changeFileValue = (index: number, value: File) =>
		setFiles((oldState) => {
			const copy = [...oldState];
			copy[index] = value;
			return copy;
		});

	const removeFile = (i: number) => setFiles((files) => files.filter((_, index) => index !== i));

	return (
		<div className={styles.wrapper}>
			<div className={styles.top}>
				<h1 className={styles.title}>Create new Gist</h1>
				<button className="button" type="button" onClick={() => router.push("/")}>
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
					<label className={styles.public} htmlFor="isPublic">
						Make Public?
					</label>
					<input
						id="isPublic"
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

				<div style={{ marginTop: "3rem" }} />
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
									onClick={() => removeFile(i)}
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

export default ProtectedRoute(CreateGist);
