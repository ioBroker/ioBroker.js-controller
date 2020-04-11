import { Writable } from "stream";

declare global {
	namespace ioBroker {

		interface ObjectsDB {
			/** Returns which kind of DB this is */
			getStatus(): DBType;

			/**
			 * For a given user, returns the groups they belong to, and their access rights
			 * @param user Name of the user. Has to start with "system.user."
			 * @param callback The callback function to be invoked with the return values
			 */
			getUserGroup(user: string, callback: GetUserGroupCallback): void;

			/** 
			 * Returns a memory stream that will be written to the file DB after closing it
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param attName File name
			 * @param ignore unused parameter
			 * @param options (optional) MIME type of the file (string). Or some internal options.
			 * @param obj unused parameter
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			insert(id: string, attName: string, ignore: any, options: string | unknown, obj: any, callback: ErrorCallback): Writable;

			/** Adds the given settings to the list of preserved settings */
			addPreserveSettings(settings: string | string[]): void;

			/**
			 * Enables or disables the file cache
			 * @param enabled Whether the file cache should be enabled
			 * @param options (optional) Some internal options
			 * @param callback Is called when the operation has finished
			 */
			enableFileCache(enabled: boolean, callback: GenericCallback<boolean>): void;
			enableFileCache(enabled: boolean, options: unknown, callback: GenericCallback<boolean>): void;
			enableFileCache(enabled: boolean, options?: unknown): Promise<boolean>;

			/**
			 * Enables or disables the file cache
			 * @param enabled Whether the file cache should be enabled
			 * @param options (optional) Some internal options
			 */
			enableFileCache(enabled: boolean, options?: unknown): Promise<boolean>;

			/**
			 * Writes a file.
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File name
			 * @param data Contents of the file
			 * @param options (optional) MIME type of the file (string). Or some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			writeFile(id: string, name: string, data: Buffer | string, callback: ErrorCallback): void;
			writeFile(id: string, name: string, data: Buffer | string, options: string | unknown, callback: ErrorCallback): void;
			writeFile(id: string, name: string, data: Buffer | string, options?: string | unknown): Promise<void>;

			/**
			 * Writes a file.
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File name
			 * @param data Contents of the file
			 */
			writeFileAsync(id: string, name: string, data: Buffer | string, options?: string | unknown): Promise<void>;

			/**
			 * Reads a file.
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File name
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			readFile(id: string, name: string, callback: ReadFileCallback): void;
			readFile(id: string, name: string, options: unknown, callback: ReadFileCallback): void;
			readFile(id: string, name: string, options?: unknown): Promise<ReadFileReturnValue>;

			/**
			 * Reads a file.
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File name
			 * @param options (optional) Some internal options.
			 */
			readFileAsync(id: string, name: string, options?: unknown): Promise<ReadFileReturnValue>;

			/**
			 * Deletes a file.
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File name
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			unlink(id: string, name: string, callback: ErrorCallback): void;
			unlink(id: string, name: string, options: unknown, callback: ErrorCallback): void;
			unlink(id: string, name: string, options?: unknown): Promise<void>;

			/**
			 * Deletes a file.
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File name
			 * @param options (optional) Some internal options.
			 */
			unlinkAsync(id: string, name: string, options?: unknown): Promise<void>;

			/**
			 * Deletes a file.
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File name
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			delFile(id: string, name: string, callback: ErrorCallback): void;
			delFile(id: string, name: string, options: unknown, callback: ErrorCallback): void;
			delFile(id: string, name: string, options?: unknown): Promise<void>;

			/**
			 * Deletes a file.
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File name
			 * @param options (optional) Some internal options.
			 */
			delFileAsync(id: string, name: string, options?: unknown): Promise<void>;

			/**
			 * Finds all files and directories starting with <name>
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File or directory name
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			readDir(id: string, name: string, callback: ReadDirCallback): void;
			readDir(id: string, name: string, options: unknown, callback: ReadDirCallback): void;
			readDir(id: string, name: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<ReadDirCallback>>;

			/**
			 * Finds all files and directories starting with <name>
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File or directory name
			 * @param options (optional) Some internal options.
			 */
			readDirAsync(id: string, name: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<ReadDirCallback>>;

			/**
			 * Renames a file or directory
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param oldName Old file or directory name
			 * @param newName Name to rename to
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			rename(id: string, oldName: string, newName: string, callback: ErrorCallback): void;
			rename(id: string, oldName: string, newName: string, options: unknown, callback: ErrorCallback): void;
			rename(id: string, oldName: string, newName: string, options?: unknown): Promise<void>;

			/**
			 * Renames a file or directory
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param oldName Old file or directory name
			 * @param newName Name to rename to
			 * @param options (optional) Some internal options.
			 */
			renameAsync(id: string, oldName: string, newName: string, options?: unknown): Promise<void>;

			/**
			 * Creates an empty file with the given name
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File name
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			touch(id: string, name: string, callback: ErrorCallback): void;
			touch(id: string, name: string, options: unknown, callback: ErrorCallback): void;
			touch(id: string, name: string, options?: unknown): Promise<void>;

			/**
			 * Creates an empty file with the given name
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name File name
			 * @param options (optional) Some internal options.
			 */
			touchAsync(id: string, name: string, options?: unknown): Promise<void>;

			/**
			 * Deletes all files in the root directory matching <name>
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name Pattern to match against
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			rm(id: string, name: string, callback: RmCallback): void;
			rm(id: string, name: string, options: unknown, callback: RmCallback): void;
			rm(id: string, name: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<RmCallback>>;

			/**
			 * Deletes all files in the root directory matching <name>
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name Pattern to match against
			 * @param options (optional) Some internal options.
			 */
			rmAsync(id: string, name: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<RmCallback>>;

			/**
			 * Creates an empty directory with the given name
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name Directory name
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			mkdir(id: string, name: string, callback: ErrorCallback): void;
			mkdir(id: string, name: string, options: unknown, callback: ErrorCallback): void;
			mkdir(id: string, name: string, options?: unknown): Promise<void>;

			/**
			 * Creates an empty directory with the given name
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name Directory name
			 * @param options (optional) Some internal options.
			 */
			mkdirAsync(id: string, name: string, options?: unknown): Promise<void>;

			/**
			 * Takes possession all files in the root directory matching <name>
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name Pattern to match against
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			chownFile(id: string, name: string, callback: ChownFileCallback): void;
			chownFile(id: string, name: string, options: unknown, callback: ChownFileCallback): void;
			chownFile(id: string, name: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<ChownFileCallback>>;

			/**
			 * Takes possession all files in the root directory matching <name>
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name Pattern to match against
			 * @param options (optional) Some internal options.
			 */
			chownFileAsync(id: string, name: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<ChownFileCallback>>;

			/**
			 * Changes access rights of all files in the root directory matching <name>
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name Pattern to match against
			 * @param options Mode of the access change as a number or hexadecimal string
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			chmodFile(id: string, name: string, callback: ChownFileCallback): void;
			chmodFile(id: string, name: string, options: { mode: number | string } | Record<string, any>, callback: ChownFileCallback): void;
			chmodFile(id: string, name: string, options?: { mode: number | string } | Record<string, any>): Promise<NonNullCallbackReturnTypeOf<ChownFileCallback>>;

			/**
			 * Changes access rights of all files in the root directory matching <name>
			 * @param id Name of the root directory. This should be the adapter instance, e.g. "admin.0"
			 * @param name Pattern to match against
			 * @param options Mode of the access change as a number or hexadecimal string
			 */
			chmodFileAsync(id: string, name: string, options?: { mode: number | string } | Record<string, any>): Promise<NonNullCallbackReturnTypeOf<ChownFileCallback>>;

			// not documented. enabled = true seems to disable the cache
			// enableFileCache(enabled, options, callback)

			/**
			 * Subscribe to object changes (from inside the controller)
			 * @param pattern The pattern to match against
			 */
			subscribe(pattern: string, callback: ErrorCallback): void;
			subscribe(pattern: string, options: unknown, callback: ErrorCallback): void;
			subscribe(pattern: string, options?: unknown): Promise<void>;

			/**
			 * Subscribe to object changes (from inside the controller)
			 * @param pattern The pattern to match against
			 */
			subscribeAsync(pattern: string, options?: unknown): Promise<void>;

			/**
			 * Unsubscribe from object changes (from inside the controller)
			 * @param pattern The pattern to match against
			 */
			unsubscribe(pattern: string, callback: ErrorCallback): void;
			unsubscribe(pattern: string, options: unknown, callback: ErrorCallback): void;
			unsubscribe(pattern: string, options?: unknown): Promise<void>;

			/**
			 * Unsubscribe from object changes (from inside the controller)
			 * @param pattern The pattern to match against
			 */
			unsubscribeAsync(pattern: string, options?: unknown): Promise<void>;

			/**
			 * Subscribe to object changes (from adapter code)
			 * @param pattern The pattern to match against
			 */
			subscribeUser(pattern: string, callback: ErrorCallback): void;
			subscribeUser(pattern: string, options: unknown, callback: ErrorCallback): void;
			subscribeUser(pattern: string, options?: unknown): Promise<void>;

			/**
			 * Subscribe to object changes (from adapter code)
			 * @param pattern The pattern to match against
			 */
			subscribeUserAsync(pattern: string, options?: unknown): Promise<void>;

			/**
			 * Unsubscribe from object changes (from adapter code)
			 * @param pattern The pattern to match against
			 */
			unsubscribeUser(pattern: string, callback: ErrorCallback): void;
			unsubscribeUser(pattern: string, options: unknown, callback: ErrorCallback): void;
			unsubscribeUser(pattern: string, options?: unknown): Promise<void>;

			/**
			 * Unsubscribe from object changes (from adapter code)
			 * @param pattern The pattern to match against
			 */
			unsubscribeUserAsync(pattern: string, options?: unknown): Promise<void>;

			/**
			 * Takes possession of all objects matching <pattern>
			 * @param pattern Pattern to match against
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			chownObject(pattern: string, callback: ChownObjectCallback): void;
			chownObject(pattern: string, options: unknown, callback: ChownObjectCallback): void;
			chownObject(pattern: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<ChownObjectCallback>>;

			/**
			 * Takes possession of all objects matching <pattern>
			 * @param pattern Pattern to match against
			 * @param options (optional) Some internal options.
			 */
			chownObjectAsync(pattern: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<ChownObjectCallback>>;

			/**
			 * Changes access rights of all objects matching <pattern>
			 * @param pattern Pattern to match against
			 * @param options Mode of the access change as a number or hexadecimal string
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			chmodObject(pattern: string, callback: ChownObjectCallback): void;
			chmodObject(pattern: string, options: unknown, callback: ChownObjectCallback): void;
			chmodObject(pattern: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<ChownObjectCallback>>;

			/**
			 * Changes access rights of all objects matching <pattern>
			 * @param pattern Pattern to match against
			 * @param options Mode of the access change as a number or hexadecimal string
			 */
			chmodObjectAsync(pattern: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<ChownObjectCallback>>;

			/**
			 * Returns all keys matching the given pattern
			 * @param pattern The pattern the keys must match
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 * @param dontModify unused
			 */
			getKeys(pattern: string, options: unknown, callback: GetConfigKeysCallback, dontModify?: any): void;
			getKeys(pattern: string, callback: GetConfigKeysCallback): void;
			getKeys(pattern: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetConfigKeysCallback>>;

			/**
			 * Returns all keys matching the given pattern
			 * @param pattern The pattern the keys must match
			 * @param options (optional) Some internal options.
			 */
			getKeysAsync(pattern: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetConfigKeysCallback>>;

			/**
			 * Returns all keys matching the given pattern
			 * @param pattern The pattern the keys must match
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 * @param dontModify unused
			 */
			getConfigKeys(pattern: string, options: unknown, callback: GetConfigKeysCallback, dontModify?: any): void;
			getConfigKeys(pattern: string, callback: GetConfigKeysCallback): void;
			getConfigKeys(pattern: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetConfigKeysCallback>>;

			/**
			 * Retrieves a copy of the object with the given ID
			 * @param id Id of the object to find
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			getObject(id: string, callback: GetObjectCallback): void;
			getObject(id: string, options: unknown, callback: GetObjectCallback): void;
			getObject(id: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetObjectCallback>>;

			/**
			 * Retrieves a copy of the object with the given ID
			 * @param id Id of the object to find
			 * @param options (optional) Some internal options.
			 */
			getObjectAsync(id: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetObjectCallback>>;

			/**
			 * Returns a list of objects with the given ids
			 * @param keys IDs of the objects to be retrieved
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 * @param dontModify unused
			 */
			getObjects(keys: string[], callback: GetObjectsCallback2, dontModify?: any): void;
			getObjects(keys: string[], options: unknown, callback: GetObjectsCallback2, dontModify?: any): void;
			getObjects(keys: string[], options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetObjectsCallback2>>;

			/**
			 * Returns a list of objects with the given ids
			 * @param keys IDs of the objects to be retrieved
			 * @param options (optional) Some internal options.
			 */
			getObjectsAsync(keys: string[], options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetObjectsCallback2>>;

			/**
			 * Returns a list of objects matching the given pattern
			 * @param pattern The pattern the object IDs must match
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 * @param dontModify unused
			 */
			getObjectsByPattern(pattern: string, callback: GetObjectsCallback2, dontModify?: any): void;
			getObjectsByPattern(pattern: string, options: unknown, callback: GetObjectsCallback2, dontModify?: any): void;
			getObjectsByPattern(pattern: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetObjectsCallback2>>;

			/**
			 * Returns a list of objects matching the given pattern
			 * @param pattern The pattern the object IDs must match
			 * @param options (optional) Some internal options.
			 */
			getObjectsByPatternAsync(pattern: string, options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetObjectsCallback2>>;

			/**
			 * Creates or overwrites an object in the object db
			 * @param id ID of the object
			 * @param obj Object to store
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			setObject(id: string, obj: SettableObject, callback: SetObjectCallback): void;
			setObject(id: string, obj: SettableObject, options: unknown, callback: SetObjectCallback): void;
			setObject(id: string, obj: SettableObject, options?: unknown): Promise<NonNullCallbackReturnTypeOf<SetObjectCallback>>;

			/**
			 * Creates or overwrites an object in the object db
			 * @param id ID of the object
			 * @param obj Object to store
			 * @param options (optional) Some internal options.
			 */
			setObjectAsync(id: string, obj: SettableObject, options?: unknown): Promise<NonNullCallbackReturnTypeOf<SetObjectCallback>>;

			/**
			 * Deletes an object in the object db
			 * @param id ID of the object
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			delObject(id: string, callback: ErrorCallback): void;
			delObject(id: string, options: unknown, callback: ErrorCallback): void;
			delObject(id: string, options?: unknown): Promise<void>;

			/**
			 * Deletes an object in the object db
			 * @param id ID of the object
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			delObjectAsync(id: string, options?: unknown): Promise<void>;

			/**
			 * Returns a list of objects with id between params.startkey and params.endkey
			 * @param params Parameters determining the objects included in the return list. Null to include all objects
			 * @param options (optional) If the returned list should be sorted. And some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			getObjectList(params: GetObjectListParams | null, callback: GetObjectListCallback): void;
			getObjectList(params: GetObjectListParams | null, options: { sorted?: boolean } | Record<string, any>, callback: GetObjectListCallback): void;
			getObjectList(params: GetObjectListParams | null, options?: { sorted?: boolean } | Record<string, any>): Promise<NonNullCallbackReturnTypeOf<GetObjectListCallback>>;

			/**
			 * Returns a list of objects with id between params.startkey and params.endkey
			 * @param params Parameters determining the objects included in the return list. Null to include all objects
			 * @param options (optional) If the returned list should be sorted. And some internal options.
			 */
			getObjectListAsync(params: GetObjectListParams | null, options?: { sorted?: boolean } | Record<string, any>): Promise<NonNullCallbackReturnTypeOf<GetObjectListCallback>>;

			/**
			 * Query a predefined object view (similar to SQL stored procedures) and return the results
			 * For a detailed description refer to https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#object-fields
			 * or http://guide.couchdb.org/editions/1/en/views.html
			 * @param design The namespace of the object view, as defined in io-package.json. Usually the adapter name, e.g. "hm-rpc"
			 * @param search The name of the object view.
			 * @param params Parameters to additionally filter out objects from the return list. Null to include all objects
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			getObjectView(design: string, search: string, params: GetObjectViewParams | null | undefined, callback: GetObjectViewCallback): void;
			getObjectView(design: string, search: string, params: GetObjectViewParams | null | undefined, options: unknown, callback: GetObjectViewCallback): void;
			getObjectView(design: string, search: string, params: GetObjectViewParams | null | undefined, options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetObjectViewCallback>>;

			/**
			 * Query a predefined object view (similar to SQL stored procedures) and return the results
			 * For a detailed description refer to https://github.com/ioBroker/ioBroker/wiki/Adapter-Development-Documentation#object-fields
			 * or http://guide.couchdb.org/editions/1/en/views.html
			 * @param design The namespace of the object view, as defined in io-package.json. Usually the adapter name, e.g. "hm-rpc"
			 * @param search The name of the object view.
			 * @param params Parameters to additionally filter out objects from the return list. Null to include all objects
			 * @param options (optional) Some internal options.
			 */
			getObjectViewAsync(design: string, search: string, params: GetObjectViewParams | null | undefined, options?: unknown): Promise<NonNullCallbackReturnTypeOf<GetObjectViewCallback>>;

			/**
			 * Extends an object in the object db with new properties
			 * @param id ID of the object
			 * @param obj Object to extend the original one with. May be just parts of an object.
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			extendObject(id: string, obj: PartialObject, callback: ExtendObjectCallback): void;
			extendObject(id: string, obj: PartialObject, options: unknown, callback: ExtendObjectCallback): void;
			extendObject(id: string, obj: PartialObject, options?: unknown): Promise<NonNullCallbackReturnTypeOf<ExtendObjectCallback>>;

			/**
			 * Extends an object in the object db with new properties
			 * @param id ID of the object
			 * @param obj Object to extend the original one with. May be just parts of an object.
			 * @param options (optional) Some internal options.
			 */
			extendObjectAsync(id: string, obj: PartialObject, options?: unknown): Promise<NonNullCallbackReturnTypeOf<ExtendObjectCallback>>;

			/**
			 * Finds an object by ID or name. If multiple objects were found, return the first one
			 * @param idOrName ID or name of the object
			 * @param type If != null, only return an object with a common.type equal to this
			 * @param options (optional) Some internal options.
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			findObject(idOrName: string, type: CommonType | null | undefined, callback: FindObjectCallback): void;
			findObject(idOrName: string, type: CommonType | null | undefined, options: unknown, callback: FindObjectCallback): void;
			findObject(idOrName: string, type: CommonType | null | undefined, options?: unknown): Promise<NonNullCallbackReturnTypeOf<FindObjectCallback>>;

			/**
			 * Finds an object by ID or name. If multiple objects were found, return the first one
			 * @param idOrName ID or name of the object
			 * @param type If != null, only return an object with a common.type equal to this
			 * @param options (optional) Some internal options.
			 */
			findObjectAsync(idOrName: string, type: CommonType | null | undefined, options?: unknown): Promise<NonNullCallbackReturnTypeOf<FindObjectCallback>>;

			/**
			 * Deletes all contents of the database. WARNING: This process is irreversible
			 * @param options (optional) Some internal options
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			destroyDB(options: unknown, callback: ErrorCallback): void;
			destroyDB(callback: ErrorCallback): void;
			destroyDB(options?: unknown): Promise<void>;

			/**
			 * Deletes all contents of the database. WARNING: This process is irreversible
			 * @param options (optional) Some internal options
			 */
			destroyDBAsync(options?: unknown): Promise<void>;

			/** Destructor of the class. Call this before shutting down. */
			destroy(): void;
		} // end interface ObjectsDB

		interface DBType {
			type: string;
			server: boolean;
		}

		type GetUserGroupCallback = (objectsInstance: ObjectsDB, user: User, groups: UserGroup[], acl: ObjectPermissions) => void;

		interface ReadFileReturnValue {
			data: string | Buffer;
			mimeType: string;
		}

		// this is a version of the callback used by Objects.getObjects
		type GetObjectsCallback2 = (err: string | null, objects?: Array<(Object | { err: string })>) => void;
	}
}

