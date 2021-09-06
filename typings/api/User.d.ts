export interface User {
	avatar_url: string;
	bio: string;
	collaborators: number;
	company: string;
	created_at: string;
	disk_usage: number;
	email: null | string;
	followers: number;
	following: number;
	hireable: boolean;
	id: number;
	location: string;
	login: string;
	name: string;
	node_id: string;
	organizations_url: string;
	owned_private_repos: number;
	plan: {
		name: string;
		space: number;
		collaborators: number;
		private_repos: number;
	};
	private_gists: number;
	public_gists: number;
	public_repos: number;
	received_events_url: string;
	repos_url: string;
	site_admin: boolean;
	starred_url: string;
	subscriptions_url: string;
	total_private_repos: number;
	twitter_username: null | string;
	type: string;
	updated_at: string;
	url: string;
}
