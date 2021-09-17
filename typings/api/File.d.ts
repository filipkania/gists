export interface File {
	content: string;
	filename: string;
	language?: string;
	raw_url?: string;
	size?: number;
	truncated?: boolean;
	type?: string;
}
