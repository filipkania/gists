import { CreatePayload } from "@typings/api/Gist";
import axios, { AxiosInstance } from "axios";

class GistAPI {
	public readonly token: string;
	public readonly client: AxiosInstance;

	constructor(token: string) {
		this.token = token;
		this.client = axios.create({
			baseURL: "https://api.github.com",
			responseType: "json",
			headers: {
				Accept: "application/vnd.github.v3+json",
				Authorization: `token ${this.token}`,
			},
		});
	}

	public validateToken = async () => {
		if (!this.token.match(/ghp_[A-Za-z0-9_]{20,255}/g)) return false;

		return this.client
			.get("/user")
			.then(() => true)
			.catch(() => false);
	};

	public getGists = () => {
		return this.client.get(`/gists`, {
			params: {
				t: new Date().toString(),
			}, // prevents caching, ok?
		});
	};

	public getUser = () => {
		return this.client.get("/user");
	};

	public getGist = (id: string) => {
		return this.client.get(`/gists/${id}`);
	};

	public deleteGist = (id: string) => {
		return this.client.delete(`/gists/${id}`);
	};

	public createGist = (payload: CreatePayload) => {
		return this.client.post("/gists", payload);
	};

	public updateGist = (id: string, payload: CreatePayload) => {
		return this.client.patch(`/gists/${id}`, payload);
	};
}

export default GistAPI;
