import axios, { AxiosInstance } from "axios";
class GistAPI {
	private token: string;
	public readonly client: AxiosInstance;

	constructor(token: string) {
		this.token = token;
		this.client = axios.create({
			url: "https://api.github.com",
			responseType: "json",
			headers: {
				Accept: "application/json",
				Authorization: `token ${this.token}`,
			},
		});
	}

	public validateToken = (token: string) => {
		return !!token;
	};
}

export default GistAPI;
