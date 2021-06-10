import { AuthType, createClient } from "webdav/web";
import type { FileSystem } from "../FileSystem";
import type { FileSystemProvider } from "../FileSystemProvider";
import { WebdavFileSystem } from "./WebdavFileSystem";

export class WebdavFileSystemProvider implements FileSystemProvider {
	constructor(
		protected serverUrl: string,
		protected authType: AuthType,
		protected root: string = "",
	) { }

	async getFileSystem(username: string, password: string): Promise<FileSystem> {
		const client = createClient(this.serverUrl, {
			authType: this.authType,
			username: username,
			password: password,
		});
		const root = this.root.replace("{username}", username);
		if (!await client.exists(root)) {
			throw new Error("Could not access to filesystem.");
		}
		return new WebdavFileSystem(client, root);
	}
}
