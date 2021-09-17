import GistAPI from "@libs/GistAPI";

export interface WrapperCtxType {
	loading: boolean;
	wrapper: null | GistAPI;
	changeToken: (token: string) => Promise<boolean>;
	clearSession: () => void;
}
