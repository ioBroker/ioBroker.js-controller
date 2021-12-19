/**
 * Allows to find out if a given states dbType offers a server or not
 * @param dbType database type
 * @returns true if a server class is available
 */
export declare function statesDbHasServer(dbType: string): boolean;
/**
 * Allows to find out if a given objects dbType offers a server which runs on this host and listens (locally or globally/by IP)
 * @param dbType database type
 * @param host configured db host
 * @param checkIfLocalOnly if true the method checks if the server listens to local connections only; else also external connection options are checked
 * @returns true if a server listens on this host (locally or globally/by IP)
 */
export declare function isLocalObjectsDbServer(dbType: string, host: string, checkIfLocalOnly?: boolean): boolean;
/**
 * Allows to find out if a given states dbType offers a server which runs on this host and listens (locally or globally/by IP)
 * @param dbType database type
 * @param host configured db host
 * @param checkIfLocalOnly if true the method checks if the server listens to local connections only; else also external connection options are checked
 * @returns true if a server listens on this host (locally or globally/by IP)
 */
export declare function isLocalStatesDbServer(dbType: string, host: string, checkIfLocalOnly?: boolean): boolean;
/**
 * Allows to find out if a given objects dbType offers a server or not
 * @param dbType database type
 * @returns true if a server class is available
 */
export declare function objectsDbHasServer(dbType: string): boolean;
//# sourceMappingURL=tools.d.ts.map