export type Folder = {
	path: string;
	displayPath?: string;
	name?: string;
};

export enum PubsubTopic {
	AUTHORIZATION_SUCCESS = "authorization_failure",
	AUTHORIZATION_FAILURE = "authorization_success",
	AUTHORIZATION_DISCONNECT = "authorization_disconnect",
	SET_VAULT_PATH = "set_vault_path",
	SYNC_ERROR = "sync_error",
}
