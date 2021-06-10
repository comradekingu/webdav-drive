import type { FileProperty, InodeProperty, InodeProperties } from "../model/Files";

export interface Module {
	init(core: Core): void;
}

export class Core {
	protected static directoryProps: InodeProperties = new Map();
	protected static fileProps: InodeProperties = new Map();

	public static getDirectoryProps(): InodeProperties {
		return this.directoryProps;
	}

	public static getFileProps(): InodeProperties {
		return this.fileProps;
	}

	registerInodeProperty(key: string, prop: InodeProperty<unknown>): void {
		Core.directoryProps.set(key, prop);
		Core.fileProps.set(key, prop);

	}

	registerFileProperty(key: string, prop: FileProperty<unknown>): void {
		Core.fileProps.set(key, prop as InodeProperty<unknown>);
	}

}
