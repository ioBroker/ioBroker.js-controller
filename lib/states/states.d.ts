export { };

declare global {
	namespace ioBroker {
		/** Defines the API of the ioBroker states DB */
		interface StatesDB {
			/**
			 * Returns a list of states with the given ids
			 * @param keys IDs of the states to be retrieved
			 * @param callback Is called when the operation has finished (successfully or not)
			 * @param dontModify unused
			 */
			getStates(
				keys: string[],
				callback: (err: string | null, states: State[]) => void,
				dontModify?: any
			): void;

			/**
			 * Returns the state with the given id
			 * @param id ID of the state to be retrieved
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			getState(id: string, callback: GetStateCallback): void;

			/**
			 * Stores a state in the db
			 * @param id ID of the state to be stored
			 * @param state The state to be stored in the db
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			setState(
				id: string,
				state?:
					| string
					| number
					| boolean
					| State
					| Partial<State>,
				callback?: SetStateCallback
			): void;

			/**
			 * Updates a state in memory without triggering a save
			 * @param id ID of the state to be stored
			 * @param state The state to be updated
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			setRawState(
				id: string,
				state: State,
				callback?: SetStateCallback
			): void;

			/**
			 * Deletes a state
			 * @param id ID of the state to be stored
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			delState(id: string, callback: DeleteStateCallback): void;

			/**
			 * Retrieves all ids of states matching @link{pattern}
			 * @param pattern The pattern to match against
			 * @param callback Is called when the operation has finished (successfully or not)
			 * @param dontModify unused
			 */
			getKeys(
				pattern: string,
				callback: (err: string | null, list?: string[]) => void,
				dontModify?: any
			): void;

			/**
			 * Subscribe to changes of all states matching @link{pattern}
			 * @param pattern The pattern to match against
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			subscribe(pattern: string, cb?: EmptyCallback): void;
			/**
			 * Unsubscribe from changes of all states matching @link{pattern}
			 * @param pattern The pattern to match against
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			unsubscribe(pattern: string, cb?: EmptyCallback): void;

			/**
			 * Register an adapter instance as subscribable.
			 * This means that the instance can read information about all subscriptions to its states
			 * and will be notified of changes.
			 * @param instance Adapter instance to register, e.g. "admin.0"
			 * @param cb Is called when the operation has finished (successfully or not)
			 */
			registerAdapterSubs(
				instance: string,
				cb?: (error: null, success: boolean) => void
			): void;

			/**
			 * Unregister an adapter instance as subscribable.
			 * @param instance Adapter instance to unregister, e.g. "admin.0"
			 * @param cb Is called when the operation has finished (successfully or not)
			 */
			unregisterAdapterSubs(
				instance: string,
				cb?: (error: null, success: boolean) => void
			): void;

			/**
			 * EDUCATED GUESS: Notify all clients about changes to an object
			 * @param type object type
			 * @param id State/object id
			 * @param obj The changed object
			 */
			publishAll(type: string, id: string, obj: Message): void;

			// TODO: Documentation for these functions is missing
			pushMessage(
				id: string,
				state: Message,
				callback?: SetStateCallback
			): void;
			lenMessage(id: string, callback: GenericCallback<number>): void;
			getMessage(
				id: string,
				callback: GenericCallback<Message>
			): void;
			delMessage(
				id: string,
				messageId: number,
				callback?: ErrorCallback
			): void;
			clearAllMessages(callback?: EmptyCallback): void;
			subscribeMessage(id: string, cb?: EmptyCallback): void;
			unsubscribeMessage(id: string, cb?: EmptyCallback): void;

			pushLog(
				id: string,
				log: Log,
				callback?: SetStateCallback
			): void;
			lenLog(id: string, callback: GenericCallback<number>): void;
			getLog(id: string, callback: GenericCallback<Log>): void;
			delLog(
				id: string,
				logId: string,
				callback?: ErrorCallback
			): void;
			clearAllLogs(callback?: EmptyCallback): void;
			subscribeLog(id: string, cb?: EmptyCallback): void;
			unsubscribeLog(id: string, cb?: EmptyCallback): void;

			getSession(id: string, callback: GetSessionCallback): void;
			setSession(
				id: string,
				expire: number,
				callback?: EmptyCallback
			): void;
			setSession(
				id: string,
				expire: number,
				obj: Session,
				callback?: EmptyCallback
			): void;
			destroySession(id: string, callback?: EmptyCallback): void;

			/**
			 * Retrieves a copy of the object with the given ID
			 * @param id Id of the object to find
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			getConfig(id: string, callback: GetObjectCallback): void;

			/**
			 * Returns a list of config keys matching <pattern>
			 * @param pattern Pattern to match against
			 * @param callback Is called when the operation has finished (successfully or not)
			 * @param dontModify unused
			 */
			getConfigKeys(
				pattern: string,
				callback: GetConfigKeysCallback,
				dontModify?: any
			): void;

			/**
			 * Returns a list of objects with the given ids
			 * @param keys IDs of the objects to be retrieved
			 * @param callback Is called when the operation has finished (successfully or not)
			 * @param dontModify unused
			 */
			getConfigs(
				keys: string[],
				callback: (
					err: string | null,
					objects?: Array<Object | { err: string }>
				) => void,
				dontModify?: any
			): void;

			/**
			 * Creates or overwrites a config object in the object db
			 * @param id ID of the object
			 * @param obj Object to store
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			setConfig(
				id: string,
				obj: Object,
				callback: SetObjectCallback
			): void;

			/**
			 * Deletes a config object in the object db
			 * @param id ID of the object
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			delConfig(id: string, callback: ErrorCallback): void;

			/**
			 * Subscribe to config object changes
			 * @param pattern The pattern to match against
			 */
			subscribeConfig(pattern: string, callback: EmptyCallback): void;

			/**
			 * Unsubscribe from config object changes
			 * @param pattern The pattern to match against
			 */
			unsubscribeConfig(
				pattern: string,
				callback: EmptyCallback
			): void;

			/**
			 * Writes a binary state into Redis
			 * @param id The id of the state
			 * @param data The data to be written
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			setBinaryState(
				id: string,
				data: Buffer,
				callback: SetStateCallback
			): void;

			/**
			 * Reads a binary state from Redis
			 * @param id The id of the state
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			getBinaryState(
				id: string,
				callback: GetBinaryStateCallback
			): void;

			/**
			 * Deletes a binary state from Redis
			 * @param id The id of the state to be deleted
			 * @param callback Is called when the operation has finished (successfully or not)
			 */
			delBinaryState(id: string, callback: DeleteStateCallback): void;

			/** Destructor of the class. Call this before shutting down */
			destroy(): void;
		} // end interface States
	}
}
