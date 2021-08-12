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
		return !!this.token;
	};

	public getGists = () => {
		return this.client.get("/gists");
	};
}

export default GistAPI;
