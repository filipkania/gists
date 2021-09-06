import { User } from "./User";

export interface Gist {
	comments: number;
	created_at: string;
	description: string;
	files: {
		[key: string]: {
			content: string;
			filename: string;
			language: string;
			raw_url: string;
			size: number;
			truncated: boolean;
			type: string;
		};
	};
	forks: {
		created_at: string;
		id: string;
		updated_at: string;
		url: string;
		user: User;
	};
	forks_url: string;
	history: [
		{
			change_status: {
				total: number;
				additions: number;
				deletions: number;
			};
			committed_at: string;
			url: string;
			user: User;
			version: string;
		}
	];
	id: string;
	node_id: string;
	owner: User;
	public: boolean;
	truncated: boolean;
	updated_at: string;
	url: string;
}
