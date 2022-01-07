export = Adapter;
/**
 * Adapter class
 *
 * How the initialization happens:
 *  initObjects => initStates => prepareInitAdapter => createInstancesObjects => initAdapter => initLogging => ready
 *
 * @class
 * @param {string|object} options object like {name: "adapterName", systemConfig: true} or just "adapterName"
 * @return {object} object instance
 */
declare function Adapter(options: string | object): object;
declare class Adapter {
    /**
     * Adapter class
     *
     * How the initialization happens:
     *  initObjects => initStates => prepareInitAdapter => createInstancesObjects => initAdapter => initLogging => ready
     *
     * @class
     * @param {string|object} options object like {name: "adapterName", systemConfig: true} or just "adapterName"
     * @return {object} object instance
     */
    constructor(options: string | object);
    startedInCompactMode: any;
    logList: any[] | undefined;
    aliases: {} | undefined;
    aliasPatterns: any[] | undefined;
    enums: {} | undefined;
    eventLoopLags: any[] | undefined;
    overwriteLogLevel: boolean | undefined;
    adapterReady: boolean | undefined;
    tools: any;
    performStrictObjectChecks: boolean | undefined;
    inited: boolean | undefined;
    oObjects: Record<string, ioBroker.Object>;
    _getObjectsByArray: ((keys: any, objects: any, options: any, cb: any, _index: any, _result: any, _errors: any) => any) | undefined;
    /**
     * stops the execution of adapter, but not disables it.
     *
     * Sometimes, the adapter must be stopped if some libraries are missing.
     *
     * @alias terminate
     * @memberof Adapter
     * @param {string | number} [reason] optional termination description
     * @param {number} [exitCode] optional exit code
     */
    terminate: ((reason?: string | number | undefined, exitCode?: number | undefined) => void) | undefined;
    terminated: boolean | undefined;
    adapterDir: any;
    pack: any;
    ioPack: any;
    systemConfig: Record<string, any> | undefined;
    name: any;
    namespace: string | undefined;
    namespaceLog: string | undefined;
    _namespaceRegExp: RegExp | undefined;
    /** The cache of users */
    users: {} | undefined;
    /** The cache of usernames */
    usernames: {} | undefined;
    /** The cache of user groups */
    groups: {} | undefined;
    defaultHistory: any;
    /** An array of instances, that support auto subscribe */
    autoSubscribe: any[] | null;
    inputCount: number | undefined;
    outputCount: number | undefined;
    /** A RegExp to test for forbidden chars in object IDs */
    FORBIDDEN_CHARS: any;
    getPortRunning: {
        port: number;
        host: string | undefined;
        callback: (port: number) => void;
    } | null;
    /**
     * Helper function to find next free port
     *
     * Looks for first free TCP port starting with given one:
     * <pre><code>
     *     adapter.getPort(8081, function (port) {
     *         adapter.log.debug('Following port is free: ' + port);
     *     });
     * </code></pre>
     *
     * @alias getPort
     * @memberof Adapter
     * @param {number} port port number to start the search for free port
     * @param {string} [host] optional hostname for the port search
     * @param {(port: number) => void} callback return result
     *        <pre><code>function (port) {}</code></pre>
     */
    getPort: ((port: number, host?: string | undefined, callback: (port: number) => void) => void) | undefined;
    /**
     * Promise-version of Adapter.getPort
     */
    getPortAsync: any;
    /**
     * Method to check for available Features for adapter development
     *
     * Use it like ...
     * <pre><code>
     *     if (adapter.supportsFeature && adapter.supportsFeature('ALIAS')) {
     *         ...
     *     }
     * </code></pre>

     * @alias supportsFeature
     * @memberof Adapter
     * @param {string} featureName the name of the feature to check
     * @returns {boolean} true/false if the feature is in the list of supported features
     */
    supportsFeature: ((featureName: string) => boolean) | undefined;
    /**
     * validates user and password
     *
     *
     * @alias checkPassword
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {string} pw password as text
     * @param {object} [options] optional user context
     * @param {(success: boolean, user: string) => void} callback return result
     *        <pre><code>
     *            function (result) {
     *              if (result) adapter.log.debug('User is valid');
     *            }
     *        </code></pre>
     */
    checkPassword: ((user: string, pw: string, options?: object | undefined, callback: (success: boolean, user: string) => void) => Promise<void>) | undefined;
    /**
     * Promise-version of Adapter.checkPassword
     */
    checkPasswordAsync: any;
    /**
     * Return ID of given username
     *
     * @param {string} username - name of the user
     * @return {Promise<undefined|string>}
     */
    getUserID: ((username: string) => Promise<undefined | string>) | undefined;
    /**
     * sets the user's password
     *
     * @alias setPassword
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {string} pw password as text
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot set password: ' + err);
     *            }
     *        </code></pre>
     */
    setPassword: ((user: string, pw: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => Promise<void>) | undefined;
    /**
     * Promise-version of Adapter.setPassword
     */
    setPasswordAsync: any;
    /**
     * returns if user exists and is in the group
     *
     * This function used mostly internally and the adapter developer do not require it.
     *
     * @alias checkGroup
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {string} group group name
     * @param {object} [options] optional user context
     * @param {(result: boolean) => void} callback return result
     *        <pre><code>
     *            function (result) {
     *              if (result) adapter.log.debug('User exists and in the group');
     *            }
     *        </code></pre>
     */
    checkGroup: ((user: string, group: string, options?: object | undefined, callback: (result: boolean) => void) => Promise<void>) | undefined;
    /**
     * Promise-version of Adapter.checkGroup
     */
    checkGroupAsync: any;
    /** @typedef {{[permission: string]: {type: 'object' | 'state' | '' | 'other' | 'file', operation: string}}} CommandsPermissions */
    /**
     * get the user permissions
     *
     * This function used mostly internally and the adapter developer do not require it.
     * The function reads permissions of user's groups (it can be more than one) and merge permissions together
     *
     * @alias calculatePermissions
     * @memberof Adapter
     * @param {string} user user name as text
     * @param {CommandsPermissions} commandsPermissions object that describes the access rights like
     *     <pre><code>
     *         // static information
     *         var commandsPermissions = {
     *            getObject:          {type: 'object',    operation: 'read'},
     *            getObjects:         {type: 'object',    operation: 'list'},
     *            getObjectView:      {type: 'object',    operation: 'list'},
     *            setObject:          {type: 'object',    operation: 'write'},
     *            subscribeObjects:   {type: 'object',    operation: 'read'},
     *            unsubscribeObjects: {type: 'object',    operation: 'read'},
     *
     *            getStates:          {type: 'state',     operation: 'list'},
     *            getState:           {type: 'state',     operation: 'read'},
     *            setState:           {type: 'state',     operation: 'write'},
     *            getStateHistory:    {type: 'state',     operation: 'read'},
     *            subscribe:          {type: 'state',     operation: 'read'},
     *            unsubscribe:        {type: 'state',     operation: 'read'},
     *            getVersion:         {type: '',          operation: ''},
     *
     *            httpGet:            {type: 'other',     operation: 'http'},
     *            sendTo:             {type: 'other',     operation: 'sendto'},
     *            sendToHost:         {type: 'other',     operation: 'sendto'},
     *
     *            readFile:           {type: 'file',      operation: 'read'},
     *            readFile64:         {type: 'file',      operation: 'read'},
     *            writeFile:          {type: 'file',      operation: 'write'},
     *            writeFile64:        {type: 'file',      operation: 'write'},
     *            unlink:             {type: 'file',      operation: 'delete'},
     *            rename:             {type: 'file',      operation: 'write'},
     *            mkdir:              {type: 'file',      operation: 'write'},
     *            readDir:            {type: 'file',      operation: 'list'},
     *            chmodFile:          {type: 'file',      operation: 'write'},
     *            chownFile:          {type: 'file',      operation: 'write'},
     *
     *            authEnabled:        {type: '',          operation: ''},
     *            disconnect:         {type: '',          operation: ''},
     *            listPermissions:    {type: '',          operation: ''},
     *            getUserPermissions: {type: 'object',    operation: 'read'}
     *         };
     *        </code></pre>
     * @param {object} [options] optional user context
     * @param {(result: ioBroker.PermissionSet) => void} [callback] return result
     *        <pre><code>
     *            function (acl) {
     *              // Access control object for admin looks like:
     *              // {
     *              //    file: {
     *              //         read:       true,
     *              //         write:      true,
     *              //         'delete':   true,
     *              //         create:     true,
     *              //         list:       true
     *              //     },
     *              //     object: {
     *              //         read:       true,
     *              //         write:      true,
     *              //         'delete':   true,
     *              //         list:       true
     *              //     },
     *              //     state: {
     *              //         read:       true,
     *              //         write:      true,
     *              //         'delete':   true,
     *              //         create:     true,
     *              //         list:       true
     *              //     },
     *              //     user: 'admin',
     *              //     users:  {
     *              //         read:       true,
     *              //         write:      true,
     *              //         create:     true,
     *              //         'delete':   true,
     *              //         list:       true
     *              //     },
     *              //     other: {
     *              //         execute:    true,
     *              //         http:       true,
     *              //         sendto:     true
     *              //     },
     *              //     groups: ['administrator'] // can be more than one
     *              // }
     *            }
     *        </code></pre>
     */
    calculatePermissions: ((user: string, commandsPermissions: {
        [permission: string]: {
            type: 'object' | 'state' | '' | 'other' | 'file';
            operation: string;
        };
    }, options?: object | undefined, callback?: ((result: ioBroker.PermissionSet) => void) | undefined) => Promise<any>) | undefined;
    /**
     * Promise-version of Adapter.calculatePermissions
     */
    calculatePermissionsAsync: any;
    /**
     * returns SSL certificates by name
     *
     * This function returns SSL certificates (private key, public cert and chained certificate).
     * Names are defined in the system's configuration in admin, e.g. "defaultPrivate", "defaultPublic".
     * The result can be directly used for creation of https server.
     *
     * @alias getCertificates
     * @memberof Adapter
     * @param {string} [publicName] public certificate name
     * @param {string} [privateName] private certificate name
     * @param {string} [chainedName] optional chained certificate name
     * @param {(err: string | null, certs?: ioBroker.Certificates, useLetsEncryptCert?: boolean) => void} callback return result
     *        <pre><code>
     *            function (err, certs, letsEncrypt) {
     *              adapter.log.debug('private key: ' + certs.key);
     *              adapter.log.debug('public cert: ' + certs.cert);
     *              adapter.log.debug('chained cert: ' + certs.ca);
     *            }
     *        </code></pre>
     */
    getCertificates: ((publicName?: string | undefined, privateName?: string | undefined, chainedName?: string | undefined, callback: (err: string | null, certs?: ioBroker.Certificates | undefined, useLetsEncryptCert?: boolean | undefined) => void) => void) | undefined;
    /**
     * Promise-version of Adapter.getCertificates
     */
    getCertificatesAsync: any;
    /**
     * Restarts an instance of the adapter.
     *
     * @memberof Adapter
     */
    restart: (() => void) | undefined;
    /**
     * Updates the adapter config with new values. Only a subset of the configuration has to be provided,
     * since merging with the existing config is done automatically, e.g. like this:
     *
     * `adapter.updateConfig({prop1: "newValue1"})`
     *
     * After updating the configuration, the adapter is automatically restarted.
     *
     * @param {Record<string, any>} newConfig The new config values to be stored
     * @return Promise<void>
     */
    updateConfig: ((newConfig: Record<string, any>) => Promise<any>) | undefined;
    /**
     * Disables and stops the adapter instance.
     *
     * @return Promise<void>
     */
    disable: (() => Promise<any>) | undefined;
    /**
     * Reads the encrypted parameter from config.
     *
     * It returns promise if no callback is provided.
     * @param {string} attribute - attribute name in native configuration part
     * @param {(error: Error | null | undefined, result?: string) => void} [callback] - optional callback
     * @returns {Promise<any>} promise if no callback provided
     *
     */
    getEncryptedConfig: ((attribute: string, callback?: ((error: Error | null | undefined, result?: string | undefined) => void) | undefined) => Promise<any>) | undefined;
    /**
     * Same as setTimeout
     * but it check the running timers on unload
     *
     * It returns promise if no callback is provided.
     * @param {function} cb - timer callback
     * @param {number} timeout - timeout in milliseconds
     * @param {any[]} args - as many arguments as needed, which will be passed to setTimeout
     * @returns {number|void} timer id
     */
    setTimeout: ((cb: Function, timeout: number, ...args: any[]) => number | void) | undefined;
    /**
     * Same as clearTimeout
     * but it check the running timers on unload
     *
     * It returns promise if no callback is provided.
     * @param {number} id - timer id
     */
    clearTimeout: ((id: number) => void) | undefined;
    /**
     * Same as setInterval
     * but it check the running intervals on unload
     *
     * It returns promise if no callback is provided.
     * @param {function} cb - interval callback
     * @param {number} timeout - interval in milliseconds
     * @param {any[]} args - as many arguments as needed, which will be passed to setTimeout
     * @returns {number|void} interval id
     */
    setInterval: ((cb: Function, timeout: number, ...args: any[]) => number | void) | undefined;
    /**
     * Same as clearInterval
     * but it check the running intervals on unload
     *
     * It returns promise if no callback is provided.
     * @param {number} id - interval id
     */
    clearInterval: ((id: number) => void) | undefined;
    connected: boolean;
    dateFormat: any;
    isFloatComma: any;
    language: any;
    longitude: any;
    latitude: any;
    /**
     * @param {string | {device?: string, channel?: string, state?: string}} id
     * @param {boolean} [isPattern=false]
     */
    _fixId: (id: string | {
        device?: string | undefined;
        channel?: string | undefined;
        state?: string | undefined;
    }, isPattern?: boolean | undefined) => string;
    /**
     * Creates or overwrites object in objectDB.
     *
     * This function can create or overwrite objects in objectDB for this adapter.
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * <b>common</b>, <b>native</b> and <b>type</b> attributes are mandatory and it will be checked.
     * Additionally type "state" requires <b>role</b>, <b>type</b> and <b>name</b>, e.g.:
     * <pre><code>{
     *     common: {
     *          name: 'object name',
     *          type: 'number', // string, boolean, object, mixed, array
     *          role: 'value'   // see https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole
     *     },
     *     native: {},
     *     type: 'state' // channel, device
     * }</code></pre>
     *
     * @alias setObject
     * @memberof Adapter
     * @param {string} id object ID, that must be overwritten or created.
     * @param {object} obj new object
     * @param {object} [options] optional user context
     * @param {ioBroker.SetObjectCallback} [callback] return result
     * @returns {ioBroker.SetObjectPromise}
     *        <pre><code>
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        </code></pre>
     */
    setObject: (id: string, obj: object, options?: object | undefined, callback?: ioBroker.SetObjectCallback | undefined) => ioBroker.SetObjectPromise;
    /**
     * Promise-version of Adapter.setObject
     */
    setObjectAsync: any;
    /**
     * Get all states, channels and devices of this adapter.
     *
     * @alias getAdapterObjects
     * @memberof Adapter
     * @param {(objects: Record<string, ioBroker.Object>) => void} callback return result
     *        <pre><code>
     *            function (objects) {
     *                for (var id in objects) {
     *                    adapter.log.debug(id);
     *                }
     *            }
     *        </code></pre>
     */
    getAdapterObjects: (callback: (objects: Record<string, ioBroker.Object>) => void) => Promise<any>;
    /**
     * Promise-version of Adapter.getAdapterObjects
     */
    getAdapterObjectsAsync: any;
    /**
     * Extend some object and create it if it does not exist
     *
     * You can change or extend some object. E.g existing object is:
     * <pre><code>
     *     {
     *          common: {
     *              name: 'Adapter name',
     *              desc: 'Description'
     *          },
     *          type: 'state',
     *          native: {
     *              unused: 'text'
     *          }
     *     }
     * </code></pre>
     *
     * If following object will be passed as argument
     *
     * <pre><code>
     *     {
     *          common: {
     *              desc: 'New description',
     *              min: 0,
     *              max: 100
     *          },
     *          native: {
     *              unused: null
     *          }
     *     }
     * </code></pre>
     *
     * We will get as output:
     * <pre><code>
     *     {
     *          common: {
     *              desc: 'New description',
     *              min: 0,
     *              max: 100
     *          },
     *          type: 'state',
     *          native: {
     *          }
     *     }
     * </code></pre>
     *
     *
     * @alias extendObject
     * @memberof Adapter
     * @param {string} id object ID, that must be extended
     * @param {object} obj part that must be extended
     * @param {object} [options] optional user context
     * @param {ioBroker.ExtendObjectCallback} [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *                if (err) adapter.log.error(err);
     *                // obj is {"id": id}
     *            }
     *        </code></pre>
     */
    extendObject: (id: string, obj: object, options?: object | undefined, callback?: ioBroker.ExtendObjectCallback | undefined) => Promise<any>;
    /**
     * Promise-version of Adapter.extendObject
     */
    extendObjectAsync: any;
    /**
     * Same as {@link Adapter.setObject}, but for any object.
     *
     * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"
     *
     * @alias setForeignObject
     * @memberof Adapter
     * @param {string} id object ID, that must be overwritten or created.
     * @param {object} obj new object
     * @param {object} [options] optional user context
     * @param {ioBroker.SetObjectCallback} [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        </code></pre>
     */
    setForeignObject: (id: string, obj: object, options?: object | undefined, callback?: ioBroker.SetObjectCallback | undefined) => any;
    /**
     * Promise-version of Adapter.setForeignObject
     */
    setForeignObjectAsync: any;
    /**
     * Same as {@link Adapter.extendObject}, but for any object.
     *
     * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE"
     *
     * @alias extendForeignObject
     * @memberof Adapter
     * @param {string} id object ID, that must be extended
     * @param {object} obj part that must be extended
     * @param {object} [options] optional user context, or use attribute preserve e.g. {preserve: {common: ['name']}} to preserve common.name
     * @param {ioBroker.SetObjectCallback} [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *                // obj is {"id": id}
     *                if (err) adapter.log.error(err);
     *            }
     *        </code></pre>
     */
    extendForeignObject: (id: string, obj: object, options?: object | undefined, callback?: ioBroker.SetObjectCallback | undefined) => Promise<any>;
    /**
     * Promise-version of Adapter.extendForeignObject
     */
    extendForeignObjectAsync: any;
    /**
     * Get object of this instance.
     *
     * It is not required, that ID consists namespace. E.g. to get object of "adapterName.X.myObject", only "myObject" is required as ID.
     *
     * @alias getObject
     * @memberof Adapter
     * @param {string} id exactly object ID (without namespace)
     * @param {object} [options] optional user context
     * @param {ioBroker.GetObjectCallback} callback return result
     *        <pre><code>
     *            function (err, obj) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *            }
     *        </code></pre>
     */
    getObject: (id: string, options?: object | undefined, callback: ioBroker.GetObjectCallback) => any;
    /**
     * Promise-version of Adapter.getObject
     */
    getObjectAsync: any;
    /**
     * Read object view from DB.
     *
     * It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
     * to get all objects of the instance.
     *
     * @alias getObjectView
     * @memberof Adapter
     * @param {string} design name of the design
     * @param {string} search name of the view
     * @param {object} params object containing startkey: first id to include in result; endkey: last id to include in result
     * @param {object} options
     * @param {ioBroker.GetObjectViewCallback} callback return result
     *      <pre><code>
     *          function (err, doc) {
     *              if (doc && doc.rows) {
     *                   for (var i = 0; i < doc.rows.length; i++) {
     *                       var id  = doc.rows[i].id;
     *                        var obj = doc.rows[i].value;
     *                        console.log('Found ' + id + ': ' + JSON.stringify(obj));
     *                   }
     *                           if (!doc.rows.length) console.log('No objects found.');
     *               } else {
     *                   console.log('No objects found: ' + err);
     *               }
     *           }
     *           </code></pre>
     */
    getObjectView: (design: string, search: string, params: object, options: object, callback: ioBroker.GetObjectViewCallback) => any;
    /**
     * Promise-version of Adapter.getObjectView
     */
    getObjectViewAsync: any;
    /**
     * Read object list from DB.
     *
     * It is required, that ID consists namespace in startkey and endkey. E.g. {startkey: 'hm-rpc.' + adapter.instance + '.', endkey: 'hm-rpc.' + adapter.instance + '.\u9999'}
     * to get all objects of the instance.
     *
     * @alias getObjectList
     * @memberof Adapter
     *
     * @param {object} params
     * @param {object} options
     * @param {ioBroker.GetObjectListCallback} callback
     *      <pre><code>
     *          function (err, res) {
     *              if (res && res.rows) {
     *                   for (var i = 0; i < res.rows.length; i++) {
     *                       var id  = res.rows[i].id;
     *                       var obj = res.rows[i].value;
     *                       console.log('Found ' + id + ': ' + JSON.stringify(obj));
     *                   }
     *                   if (!res.rows.length) console.log('No objects found.');
     *              } else {
     *                  console.log('No objects found: ' + err);
     *              }
     *          }
     *       </code></pre>
     */
    getObjectList: (params: object, options: object, callback: ioBroker.GetObjectListCallback) => any;
    /**
     * Promise-version of Adapter.getObjectList
     */
    getObjectListAsync: any;
    /**
     * Get the enum tree.
     *
     * Get enums of specified tree or all enums if nothing specified as object with values.
     * If getEnum called with no enum specified, all enums will be returned:
     * <pre><code>
     *      adapter.getEnums(function (err, enums, requestEnum) {
     *        // All enums
     *        if (err) adapter.log.error('Cannot get object: ' + err);
     *        for (var e in enums) {
     *           adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
     *        }
     *      });
     * </code></pre>
     *
     * @alias getEnum
     * @memberof Adapter
     * @param {string} _enum enum name, e.g. 'rooms', 'function' or '' (all enums)
     * @param {object} [options] optional user context
     * @param {ioBroker.GetEnumCallback} callback return result
     *        <pre><code>
     *            function (err, enums, requestEnum) {
     *              // requestEnum is _enum
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *              for (var e in enums) {
     *                 adapter.log.debug('Enum "' + e + '" has following members: ' + enums[e].common.members.join(', '));
     *              }
     *            }
     *        </code></pre>
     */
    getEnum: (_enum: string, options?: object | undefined, callback: ioBroker.GetEnumCallback) => any;
    /**
     * Promise-version of Adapter.getEnum
     */
    getEnumAsync: any;
    /**
     * Read the members of given enums.
     *
     * Get enums of specified tree or all enums if nothing specified as object with values.
     *
     * @alias getEnums
     * @memberof Adapter
     * @param {string|array} _enumList enum name or names, e.g. ['rooms', 'function']
     * @param {object} [options] optional user context
     * @param {ioBroker.GetEnumsCallback} callback return result
     *        <pre><code>
     *            function (err, enums) {
     *              // requestEnum is _enum
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *              // Result is like
     *              // {
     *              //    "enum.rooms": {
     *              //       "enum.rooms.livingroom": {
     *              //           common: {
     *              //              members: ['ID1', 'ID2']
     *              //           }
     *              //       },
     *              //       "enum.rooms.sleepingroom": {
     *              //           common: {
     *              //              members: ['ID3', 'ID4']
     *              //           }
     *              //       }
     *              //    },
     *              //    "enum.functions": {
     *              //       "enum.rooms.light": {
     *              //           common: {
     *              //              members: ['ID1', 'ID6']
     *              //           }
     *              //       },
     *              //       "enum.rooms.weather": {
     *              //           common: {
     *              //              members: ['ID4', 'ID7']
     *              //           }
     *              //       }
     *              //    }
     *              // }
     *            }
     *        </code></pre>
     */
    getEnums: (_enumList: string | array, options?: object | undefined, callback: ioBroker.GetEnumsCallback) => Promise<any>;
    /**
     * Promise-version of Adapter.getEnums
     */
    getEnumsAsync: any;
    /**
     * Get objects by pattern, by specific type and resolve their enums.
     *
     * Get all objects in the system of specified type. E.g.:
     *
     *        <pre><code>
     *            adapter.getForeignObjects('hm-rega.0.*', 'state', ['rooms', 'functions'], function (err, objs) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *              // objs look like:
     *              // {
     *              //    "hm-rega.0.ABC0000.1.STATE": {
     *              //        common: {...},
     *              //        native: {},
     *              //        type: 'state',
     *              //        enums: {
     *              //           'enums.rooms.livingroom': 'Living room',
     *              //           'enums.functions.light': 'Light'
     *              //       }
     *              //    },
     *              //    "hm-rega.0.ABC0000.2.STATE": {
     *              //        common: {...},
     *              //        native: {},
     *              //        type: 'state',
     *              //        enums: {
     *              //           'enums.rooms.sleepingroom': 'Sleeping room',
     *              //           'enums.functions.window': 'Windows'
     *              //       }
     *              //    }
     *            }
     *        </code></pre>
     *
     * @alias getForeignObjects
     * @memberof Adapter
     * @param {string} pattern object ID/wildchars
     * @param {string} type type of object: 'state', 'channel' or 'device'. Default - 'state'
     * @param {string|string[]} enums object ID, that must be overwritten or created.
     * @param {object} [options] optional user context
     * @param {ioBroker.GetObjectsCallback} callback return result
     *        <pre><code>
     *            function (err, obj) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *            }
     *        </code></pre>
     */
    getForeignObjects: (pattern: string, type: string, enums: string | string[], options?: object | undefined, callback: ioBroker.GetObjectsCallback) => any;
    /**
     * Promise-version of Adapter.getForeignObjects
     */
    getForeignObjectsAsync: any;
    /**
     * Find any object by name or ID.
     *
     * Find object by the exact name or ID.
     *
     * @alias findForeignObject
     * @memberof Adapter
     * @param {string} id exactly object ID (without namespace)
     * @param {string} type optional common.type of state: 'number', 'string', 'boolean', 'file', ...
     * @param {object} options optional user context
     * @param {ioBroker.FindObjectCallback} callback return result
     *        <pre><code>
     *            adapter.findForeignObject('Some name', function (err, id, name) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *              adapter.log.debug('ID of object with name "' + name + '" is "' + id + '"');
     *            }
     *        </code></pre>
     */
    findForeignObject: (id: string, type: string, options: object, callback: ioBroker.FindObjectCallback) => any;
    /**
     * Promise-version of Adapter.findForeignObject
     */
    findForeignObjectAsync: any;
    /**
     * Get any object.
     *
     * ID must be specified with namespace.
     *
     * @alias getForeignObject
     * @memberof Adapter
     * @param {string} id exactly object ID (with namespace)
     * @param {object} [options] optional user context
     * @param {ioBroker.GetObjectCallback} callback return result
     *        <pre><code>
     *            function (err, obj) {
     *              if (err) adapter.log.error('Cannot get object: ' + err);
     *            }
     *        </code></pre>
     */
    getForeignObject: (id: string, options?: object | undefined, callback: ioBroker.GetObjectCallback) => any;
    /**
     * Promise-version of Adapter.getForeignObject
     */
    getForeignObjectAsync: any;
    /**
     * Delete an object of this instance.
     *
     * It is not required to provice the adapter namespace, because it will automatically be added.
     * E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.
     *
     * The corresponding state will be deleted too if the object has type "state".
     *
     * @alias delObject
     * @memberof Adapter
     * @param {string} id exactly object ID (without namespace)
     * @param {object} [options] optional user context. E.g. recursive option could be true
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete object: ' + err);
     *            }
     *        </code></pre>
     */
    delObject: (id: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => void;
    /**
     * Promise-version of Adapter.delObject
     */
    delObjectAsync: any;
    /**
     * Delete any object.
     *
     * The full ID with namespace must be specified. The corresponding state will be deleted too if the object has type "state".
     *
     * @alias delForeignObject
     * @memberof Adapter
     * @param {string} id exactly object ID (with namespace)
     * @param {object} [options] optional user context or {recursive:true} to delete all underlying objects
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete object: ' + err);
     *            }
     *        </code></pre>
     */
    delForeignObject: (id: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.delForeignObject
     */
    delForeignObjectAsync: any;
    /**
     * Subscribe for the changes of objects in this instance.
     *
     * @alias subscribeObjects
     * @memberof Adapter
     * @param {string} pattern pattern like 'channel.*' or '*' (all objects of this adapter) - without namespaces
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] optional returns result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot subscribe object: ' + err);
     *            }
     *        </code></pre>
     */
    subscribeObjects: (pattern: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.subscribeObjects
     */
    subscribeObjectsAsync: any;
    /**
     * Unsubscribe on the changes of objects in this instance.
     *
     * @alias unsubscribeObjects
     * @memberof Adapter
     * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] optional returns result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
     *            }
     *        </code></pre>
     */
    unsubscribeObjects: (pattern: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.unsubscribeObjects
     */
    unsubscribeObjectsAsync: any;
    /**
     * Subscribe for the changes of objects in any instance.
     *
     * @alias subscribeForeignObjects
     * @memberof Adapter
     * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces. You can use array of patterns
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] optional returns result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot subscribe object: ' + err);
     *            }
     *        </code></pre>
     */
    subscribeForeignObjects: (pattern: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.subscribeForeignObjects
     */
    subscribeForeignObjectsAsync: any;
    /**
     * Unsubscribe for the patterns on all objects.
     *
     * @alias unsubscribeForeignObjects
     * @memberof Adapter
     * @param {string} pattern pattern like 'channel.*' or '*' (all objects) - without namespaces
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] optional returns result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot unsubscribe object: ' + err);
     *            }
     *        </code></pre>
     */
    unsubscribeForeignObjects: (pattern: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.unsubscribeForeignObjects
     */
    unsubscribeForeignObjectsAsync: any;
    /**
     * Same as {@link Adapter.setObject}, but with check if the object exists.
     *
     * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
     * New object will be created only if no object exists with such ID.
     *
     * @alias setObjectNotExists
     * @memberof Adapter
     * @param {string} id object ID, that must be overwritten or created.
     * @param {object} obj new object
     * @param {object} [options] optional user context
     * @param {ioBroker.SetObjectCallback} [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        </code></pre>
     * @returns {Promise<{id: string}>}
     */
    setObjectNotExists: (id: string, obj: object, options?: object | undefined, callback?: ioBroker.SetObjectCallback | undefined) => Promise<{
        id: string;
    }>;
    /**
     * Promise-version of Adapter.setObjectNotExists
     */
    setObjectNotExistsAsync: any;
    /**
     * Same as {@link Adapter.setForeignObject}, but with check if the object exists.
     *
     * ID must be specified as a full name with adapter namespace. E.g "hm-rpc.0.ABC98989.1.STATE".
     * New object will be created only if no object exists with such ID.
     *
     * @alias setForeignObjectNotExists
     * @memberof Adapter
     * @param {string} id object ID, that must be overwritten or created.
     * @param {object} obj new object
     * @param {object} [options] optional user context
     * @param {ioBroker.SetObjectCallback} [callback] return result
     *        <pre><code>
     *            function (err, obj) {
     *              // obj is {id: id}
     *              if (err) adapter.log.error('Cannot write object: ' + err);
     *            }
     *        </code></pre>
     * @returns {Promise<{id: string}>}
     */
    setForeignObjectNotExists: (id: string, obj: object, options?: object | undefined, callback?: ioBroker.SetObjectCallback | undefined) => Promise<{
        id: string;
    }>;
    /**
     * Promise-version of Adapter.setForeignObjectNotExists
     */
    setForeignObjectNotExistsAsync: any;
    _DCS2ID: (device: any, channel: any, stateOrPoint: any) => string;
    createDevice: (deviceName: any, common: any, _native: any, options: any, callback: any) => void;
    /**
     * Promise-version of Adapter.createDevice
     */
    createDeviceAsync: any;
    createChannel: (parentDevice: any, channelName: any, roleOrCommon: any, _native: any, options: any, callback: any) => void;
    /**
     * Promise-version of Adapter.createChannel
     */
    createChannelAsync: any;
    createState: (parentDevice: any, parentChannel: any, stateName: any, roleOrCommon: any, _native: any, options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.createState
     */
    createStateAsync: any;
    /**
     * Delete device with all its channels and states.
     *
     * @alias deleteDevice
     * @memberof Adapter
     * @param {string} deviceName is the part of ID like: adapter.instance.<deviceName>
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete device: ' + err);
     *            }
     *        </code></pre>
     */
    deleteDevice: (deviceName: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => Promise<any>;
    /**
     * Promise-version of Adapter.deleteDevice
     */
    deleteDeviceAsync: any;
    addChannelToEnum: (enumName: any, addTo: any, parentDevice: any, channelName: any, options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.addChannelToEnum
     */
    addChannelToEnumAsync: any;
    deleteChannelFromEnum: (enumName: any, parentDevice: any, channelName: any, options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.deleteChannelFromEnum
     */
    deleteChannelFromEnumAsync: any;
    /**
     * Deletes channel and udnerlying structure
     * @alais deleteChannel
     *
     * @param {string} parentDevice is the part of ID like: adapter.instance.<deviceName>
     * @param {string} channelName is the part of ID like: adapter.instance.<deviceName>.<channelName>
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete device: ' + err);
     *            }
     *        </code></pre>
     */
    deleteChannel: (parentDevice: string, channelName: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => Promise<any>;
    /**
     * Promise-version of Adapter.deleteChannel
     */
    deleteChannelAsync: any;
    deleteState: (parentDevice: any, parentChannel: any, stateName: any, options: any, callback: any) => void;
    /**
     * Promise-version of Adapter.deleteState
     */
    deleteStateAsync: any;
    getDevices: (options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.getDevices
     */
    getDevicesAsync: any;
    getChannelsOf: (parentDevice: any, options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.getChannelsOf
     */
    getChannelsOfAsync: any;
    getChannels: (parentDevice: any, options: any, callback: any) => any;
    getChannelsAsync: any;
    getStatesOf: (parentDevice: any, parentChannel: any, options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.getStatesOf
     */
    getStatesOfAsync: any;
    addStateToEnum: (enumName: any, addTo: any, parentDevice: any, parentChannel: any, stateName: any, options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.addStateToEnum
     */
    addStateToEnumAsync: any;
    deleteStateFromEnum: (enumName: any, parentDevice: any, parentChannel: any, stateName: any, options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.deleteStateFromEnum
     */
    deleteStateFromEnumAsync: any;
    /**
     * Change file access rights
     *
     * This function updates the file access rights
     * <pre><code>
     *      adapter.chmodFile('vis.0', '/main/vis-views.json', {mode: 0x644}, function (err, processed) {
     *        if (err) adapter.log.error('Cannot read file: ' + err);
     *        console.log('New files: ' + JSON.stringify(processed));
     *      });
     * </code></pre>
     *
     * @alias chownFile
     * @memberof Adapter
     * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
     * @param {string} path path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0".
     * @param {object} options data with mode
     * @param {function} callback return result
     *        <pre><code>
     *            function (err, processedFiles) {
     *                list of processed files with new groups
     *            }
     *        </code></pre>
     */
    chmodFile: (_adapter: string, path: string, options: object, callback: Function) => any;
    /**
     * Promise-version of Adapter.chmodFile
     */
    chmodFileAsync: any;
    /**
     * Change file owner
     *
     * This function updates the file owner and ownerGroup
     * <pre><code>
     *      adapter.chownFile('vis.0', '/main/vis-views.json', {owner: 'newOwner', ownerGroup: 'newgroup'}, function (err, processed) {
     *        if (err) adapter.log.error('Cannot read file: ' + err);
     *        console.log('New files: ' + JSON.stringify(processed));
     *      });
     * </code></pre>
     *
     * @alias chownFile
     * @memberof Adapter
     * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
     * @param {string} path path to file without adapter name. E.g. If you want to update "/vis.0/main/*", here must be "/main/*" and _adapter must be equal to "vis.0".
     * @param {object} options data with owner and ownerGroup
     * @param {function} callback return result
     *        <pre><code>
     *            function (err, processedFiles) {
     *                list of processed files with new groups
     *            }
     *        </code></pre>
     */
    chownFile: (_adapter: string, path: string, options: object, callback: Function) => any;
    /**
     * Promise-version of Adapter.chownFile
     */
    chownFileAsync: any;
    /**
     * Read directory from DB.
     *
     * This function reads the content of directory from DB for given adapter and path.
     * If getEnum called with no enum specified, all enums will be returned:
     * <pre><code>
     *      adapter.readDir('vis.0', '/main/', function (err, filesOrDirs) {
     *        // All enums
     *        if (err) adapter.log.error('Cannot read directory: ' + err);
     *        if (filesOrDirs) {
     *           for (var f = 0; f < filesOrDirs.length; f++) {
     *              adapter.log.debug('Directory main has following files and dirs: ' + filesOrDirs[f].file + '[dir - ' + filesOrDirs[f].isDir + ']');
     *           }
     *       }
     *      });
     * </code></pre>
     *
     * @alias readDir
     * @memberof Adapter
     * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
     * @param {string} path path to direcory without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
     * @param {object} options optional user context
     * @param {ioBroker.ReadDirCallback} callback return result
     *        <pre><code>
     *            function (err, filesOrDirs) {
     *                // filesOrDirs is array with elements like
     *                // {
     *                //      file:       'views.json,
     *                //      stats:      node.js stats object like https://nodejs.org/api/fs.html#fs_class_fs_stats ,
     *                //      isDir:      true/false,
     *                //      acl:        access control list object,
     *                //      modifiedAt: time when modified,
     *                //      createdAt:  time when created
     *                // }
     *            }
     *        </code></pre>
     */
    readDir: (_adapter: string, path: string, options: object, callback: ioBroker.ReadDirCallback) => any;
    /**
     * Promise-version of Adapter.readDir
     */
    readDirAsync: any;
    unlink: (_adapter: any, name: any, options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.unlink
     */
    unlinkAsync: any;
    delFile: (_adapter: any, name: any, options: any, callback: any) => any;
    delFileAsync: any;
    rename: (_adapter: any, oldName: any, newName: any, options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.rename
     */
    renameAsync: any;
    mkdir: (_adapter: any, dirname: any, options: any, callback: any) => any;
    /**
     * Promise-version of Adapter.mkdir
     */
    mkdirAsync: any;
    /**
     * Read file from DB.
     *
     * This function reads the content of one file from DB for given adapter and file name.
     * <pre><code>
     *      adapter.readFile('vis.0', '/main/vis-views.json', function (err, data) {
     *        // All enums
     *        if (err) adapter.log.error('Cannot read file: ' + err);
     *        console.log('Content of file is: ' + data);
     *      });
     * </code></pre>
     *
     * @alias readFile
     * @memberof Adapter
     * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
     * @param {string} filename path to file without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
     * @param {object} options optional user context
     * @param {ioBroker.ReadFileCallback} callback return result
     *        <pre><code>
     *            function (err, data) {
     *                // data is utf8 or binary Buffer depends on the file extension.
     *            }
     *        </code></pre>
     */
    readFile: (_adapter: string, filename: string, options: object, callback: ioBroker.ReadFileCallback) => any;
    /**
     * Promise-version of Adapter.readFile
     */
    readFileAsync: any;
    /**
     * Write file to DB.
     *
     * This function writes the content of one file into DB for given adapter and file name.
     * <pre><code>
     *      adapter.writeFile('vis.0', '/main/vis-views.json', data, function (err) {
     *        err && adapter.log.error('Cannot write file: ' + err);
     *      });
     * </code></pre>
     *
     * @alias readFile
     * @memberof Adapter
     * @param {string} _adapter adapter name. If adapter name is null, so the name (not instance) of current adapter will be taken.
     * @param {string} filename path to file without adapter name. E.g. If you want to read "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
     * @param {object} data data as UTF8 string or buffer depends on the file extension.
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *
     *            }
     *        </code></pre>
     */
    writeFile: (_adapter: string, filename: string, data: object, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.writeFile
     */
    writeFileAsync: any;
    /**
     * Checks if file exists in DB.
     *
     * @alias fileExists
     * @memberof Adapter
     * @param {string} _adapter adapter name
     * @param {string} filename path to file without adapter name. E.g. If you want to check "/vis.0/main/views.json", here must be "/main/views.json" and _adapter must be equal to "vis.0".
     * @param {object} [options] optional user context
     * @param {function} [callback] cb function if none provided, a promise is returned
     * @returns {Promise<boolean>}
     */
    fileExists: any;
    /**
     * Promise-version of Adapter.fileExists
     */
    fileExistsAsync: any;
    formatValue: (value: any, decimals: any, _format: any) => any;
    formatDate: (dateObj: any, isDuration: any, _format: any) => string;
    statesConnectedTime: number;
    patterns: any;
    /**
     * Send message to other adapter instance or all instances of adapter.
     *
     * This function sends a message to specific instance or all instances of some specific adapter.
     * If no instance given (e.g. "pushover"), the callback argument will be ignored. Because normally many responses will come.
     *
     * @alias sendTo
     * @memberof Adapter
     * @param {string} instanceName name of the instance where the message must be send to. E.g. "pushover.0" or "system.adapter.pushover.0".
     * @param {string} command command name, like "send", "browse", "list". Command is depend on target adapter implementation.
     * @param {object} message object that will be given as argument for request
     * @param {function(any):any} [callback] optional return result
     *        <pre><code>
     *            function (result) {
     *              // result is target adapter specific and can vary from adapter to adapter
     *              if (!result) adapter.log.error('No response received');
     *            }
     *        </code></pre>
     */
    sendTo: (instanceName: string, command: string, message: object, callback?: ((arg0: any) => any) | undefined) => Promise<any>;
    mboxSubscribed: boolean;
    callbacks: any;
    /**
     * Promise-version of Adapter.sendTo
     */
    sendToAsync: any;
    /**
     * Send message to specific host or to all hosts.
     *
     * This function sends a message to specific host or all hosts.
     * If no host name given (e.g. null), the callback argument will be ignored. Because normally many responses will come.
     *
     * @alias sendToHost
     * @memberof Adapter
     * @param {any} hostName name of the host where the message must be send to. E.g. "myPC" or "system.host.myPC". If argument is empty, the message will be sent to all hosts.
     * @param {string} command command name. One of: "cmdExec", "getRepository", "getInstalled", "getVersion", "getDiagData", "getLocationOnDisk", "getDevList", "getLogs", "delLogs", "readDirAsZip", "writeDirAsZip", "readObjectsAsZip", "writeObjectsAsZip", "checkLogging". Commands can be checked in controller.js (function processMessage)
     * @param {object} message object that will be given as argument for request
     * @param {function(any):any} [callback] optional return result
     *        <pre><code>
     *            function (result) {
     *              // result is target adapter specific and can vary from command to command
     *              if (!result) adapter.log.error('No response received');
     *            }
     *        </code></pre>
     */
    sendToHost: (hostName: any, command: string, message: object, callback?: ((arg0: any) => any) | undefined) => Promise<any>;
    /**
     * Promise-version of Adapter.sendToHost
     */
    sendToHostAsync: any;
    /**
     * Send notification with given scope and category to host of this adapter
     *
     * @param {string} scope - scope to be addressed
     * @param {string|null} category - to be addressed, if null message will be checked by regex of given scope
     * @param {string} message - message to be stored/checked
     * @return Promise<void>
     */
    registerNotification: (scope: string, category: string | null, message: string) => Promise<void>;
    setExecutableCapabilities: any;
    /**
     * Writes value into states DB.
     *
     * This function can write values into states DB for this adapter.
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * ack, options and callback are optional
     *
     * @alias setState
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object|string|number|boolean} state simple value or object with attribues.
     *  If state is object and ack exists too as function argument, function argument has priority.
     *  <pre><code>
     *      {
     *          val:    value,
     *          ack:    true|false,       // default - false; is command(false) or status(true)
     *          ts:     timestampMS,      // default - now
     *          q:      qualityAsNumber,  // default - 0 (ok)
     *          from:   origin,           // default - this adapter
     *          c:      comment,          // default - empty
     *          expire: expireInSeconds   // default - 0
     *          lc:     timestampMS       // default - automatic calculation
     *      }
     *  </code></pre>
     * @param {boolean} [ack] optional is command(false) or status(true)
     * @param {object} [options] optional user context
     * @param {ioBroker.SetStateCallback} [callback] optional return error and id
     *        <pre><code>
     *            function (err, id) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *            }
     *        </code></pre>
     */
    setState: (id: string, state: object | string | number | boolean, ack?: boolean | undefined, options?: object | undefined, callback?: ioBroker.SetStateCallback | undefined) => Promise<any>;
    /**
     * Promise-version of Adapter.setState
     */
    setStateAsync: any;
    /**
     * Writes value into states DB only if the value really changed.
     *
     * This function can write values into states DB for this adapter.
     * Only Ids that belong to this adapter can be modified. So the function automatically adds "adapter.X." to ID.
     * ack, options and callback are optional
     *
     * @alias setStateChanged
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object|string|number|boolean} state simple value or object with attribues.
     * @param {boolean} [ack] optional is command(false) or status(true)
     * @param {object} [options] optional user context
     * @param {ioBroker.SetStateChangedCallback} [callback] optional return error, id and notChanged
     *        <pre><code>
     *            function (err, id, notChanged) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *              if (!notChanged) adapter.log.debug('Value was changed');
     *            }
     *        </code></pre>
     */
    setStateChanged: (id: string, state: object | string | number | boolean, ack?: boolean | undefined, options?: object | undefined, callback?: ioBroker.SetStateChangedCallback | undefined) => any;
    /**
     * Promise-version of Adapter.setStateChanged
     */
    setStateChangedAsync: any;
    /**
     * Writes value into states DB for any instance.
     *
     * This function can write values into states DB for all instances and system states too.
     * ack, options and callback are optional
     *
     * @alias setForeignState
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object|string|number|boolean} state simple value or object with attribues.
     *  If state is object, so the ack will be ignored and must be included into object.
     *  <pre><code>
     *      {
     *          val:    value,
     *          ack:    true|false,       // default - false; is command(false) or status(true)
     *          ts:     timestampMS,      // default - now
     *          q:      qualityAsNumber,  // default - 0 (ok)
     *          from:   origin,           // default - this adapter
     *          c:      comment,          // default - empty
     *          expire: expireInSeconds   // default - 0
     *          lc:     timestampMS       // default - automatic calculation
     *      }
     *  </code></pre>
     * @param {boolean} [ack] optional is command(false) or status(true)
     * @param {object} [options] optional user context
     * @param {ioBroker.SetStateCallback} [callback] optional return error and id
     *        <pre><code>
     *            function (err, id) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *            }
     *        </code></pre>
     */
    setForeignState: (id: string, state: object | string | number | boolean, ack?: boolean | undefined, options?: object | undefined, callback?: ioBroker.SetStateCallback | undefined) => Promise<any>;
    /**
     * Promise-version of Adapter.setForeignState
     */
    setForeignStateAsync: any;
    /**
     * Writes value into states DB for any instance, but only if state changed.
     *
     * This function can write values into states DB for all instances and system states too.
     * ack, options and callback are optional
     *
     * @alias setForeignStateChanged
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object|string|number|boolean} state simple value or object with attribues.
     *  If state is object and ack exists too as function argument, function argument has priority.
     *  <pre><code>
     *      {
     *          val:    value,
     *          ack:    true|false,       // default - false; is command(false) or status(true)
     *          ts:     timestampMS,      // default - now
     *          q:      qualityAsNumber,  // default - 0 (ok)
     *          from:   origin,           // default - this adapter
     *          c:      comment,          // default - empty
     *          expire: expireInSeconds   // default - 0
     *          lc:     timestampMS       // default - automatic calculation
     *      }
     *  </code></pre>
     * @param {boolean} [ack] optional is command(false) or status(true)
     * @param {object} [options] optional user context
     * @param {ioBroker.SetStateChangedCallback} [callback] optional return error and id
     *        <pre><code>
     *            function (err, id) {
     *              if (err) adapter.log.error('Cannot set value for "' + id + '": ' + err);
     *            }
     *        </code></pre>
     */
    setForeignStateChanged: (id: string, state: object | string | number | boolean, ack?: boolean | undefined, options?: object | undefined, callback?: ioBroker.SetStateChangedCallback | undefined) => any;
    /**
     * Promise-version of Adapter.setForeignStateChanged
     */
    setForeignStateChangedAsync: any;
    /**
     * Read value from states DB.
     *
     * This function can read values from states DB for this adapter.
     * Only Ids that belong to this adapter can be read. So the function automatically adds "adapter.X." to ID.
     *
     * @alias getState
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object} options optional user context
     * @param {ioBroker.GetStateCallback} callback return result
     *        <pre><code>
     *            function (err, state) {
     *              if (err) adapter.log.error('Cannot read value: ' + err);
     *            }
     *        </code></pre>
     *
     *        See possible attributes of the state in @setState explanation
     */
    getState: (id: string, options: object, callback: ioBroker.GetStateCallback) => any;
    /**
     * Promise-version of Adapter.getState
     */
    getStateAsync: any;
    /**
     * Read value from states DB for any instance and system state.
     *
     * This function can read values from states DB for all instances and adapters. It expects the full path of object ID.
     *
     * @alias getForeignState
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object} options optional user context
     * @param {ioBroker.GetStateCallback} callback return result
     *        <pre><code>
     *            function (err, state) {
     *              if (err) adapter.log.error('Cannot read value: ' + err);
     *            }
     *        </code></pre>
     *
     *        See possible attributes of the state in @setState explanation
     */
    getForeignState: (id: string, options: object, callback: ioBroker.GetStateCallback) => any;
    /**
     * Promise-version of Adapter.getForeignState
     */
    getForeignStateAsync: any;
    /**
     * Read historian data for states of any instance or system state.
     *
     * This function can read values from history adapters like: history, sql, influxdb. It expects the full path of object ID.
     * Normally only foreign history has interest, so there is no getHistory and getForeignHistory
     *
     * Possible options:
     *
     *  - instance - (optional) name of instance, where to read the historian data, e.g. 'history.0', 'sql.1'. By default will be taken from system settings.
     *  - start - (optional) time in ms - Date.now()', by default is (now - 1 week)
     *  - end - (optional) time in ms - Date.now()', by default is (now + 5000 seconds)
     *  - step - (optional) used in aggregate (m4, max, min, average, total) step in ms of intervals
     *  - count - number of values if aggregate is 'onchange' or number of intervals if other aggregate method. Count will be ignored if step is set.
     *  - from - if from field should be included in answer
     *  - ack - if ack field should be included in answer
     *  - q - if q field should be included in answer
     *  - addId - if id field should be included in answer
     *  - limit - do not return more entries than limit
     *  - ignoreNull - if null values should be include (false), replaced by last not null value (true) or replaced with 0 (0)
     *  - sessionId - (optional) identifier of request, will be returned back in the answer
     *  - aggregate - aggregate method:
     *      - minmax - used special algorithm. Splice the whole time range in small intervals and find for every interval max, min, start and end values.
     *      - max - Splice the whole time range in small intervals and find for every interval max value and use it for this interval (nulls will be ignored).
     *      - min - Same as max, but take minimal value.
     *      - average - Same as max, but take average value.
     *      - total - Same as max, but calculate total value.
     *      - count - Same as max, but calculate number of values (nulls will be calculated).
     *      - none - No aggregation at all. Only raw values in given period.
     *
     * @alias getHistory
     * @memberof Adapter
     * @param {string} id object ID of the state.
     * @param {object} options see function description
     * @param {ioBroker.GetHistoryCallback} callback return result
     *        <pre><code>
     *            function (error, result, step, sessionId) {
     *              if (error) adapter.log.error('Cannot read value: ' + err);
     *            }
     *        </code></pre>
     *
     *        See possible attributes of the state in @setState explanation
     */
    getHistory: any;
    /**
     * Promise-version of Adapter.getHistory
     */
    getHistoryAsync: any;
    /**
     * Convert ID into object with device's, channel's and state's name.
     *
     * Convert "adapter.instance.D.C.S" in object {device: D, channel: C, state: S}
     * Convert ID to {device: D, channel: C, state: S}
     *
     * @alias idToDCS
     * @memberof Adapter
     * @param {string} id short or long string of ID like "stateID" or "adapterName.0.stateID".
     * @return {object} parsed ID as an object
     */
    idToDCS: (id: string) => object;
    /**
     * Deletes a state of this instance.
     * The object will NOT be deleted. If you want to delete it too, use @delObject instead.
     *
     * It is not required to provice the adapter namespace, because it will automatically be added.
     * E.g. to delete "adapterName.X.myObject", only "myObject" is required as ID.
     *
     * No error is returned if state does not exist.
     *
     * @alias delState
     * @memberof Adapter
     * @param {string} id exactly object ID (without namespace)
     * @param {object} [options] optional user context
     * @param {ioBroker.ErrorCallback} [callback] return result
     *        <pre><code>
     *            function (err) {
     *              if (err) adapter.log.error('Cannot delete object: ' + err);
     *            }
     *        </code></pre>
     */
    delState: (id: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.delState
     */
    delStateAsync: any;
    /**
     * Deletes a state of any adapter.
     * The object is NOT deleted. If you want to delete it too, use @delForeignObject instead.
     *
     * No error is returned if state does not exist.
     *
     * @alias delForeignState
     * @memberof Adapter
     * @param {string} id long string for ID like "adapterName.0.stateID".
     * @param {object} [options] optional argument to describe the user context
     * @param {ioBroker.ErrorCallback} [callback] return result function (err) {}
     */
    delForeignState: (id: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.delForeignState
     */
    delForeignStateAsync: any;
    /**
     * Read all states of this adapter, that pass the pattern
     *
     * Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
     * <pre><code>
     *     adapter.getStates('*', function (err, states) {
     *         for (var id in states) {
     *              adapter.log.debug('"' + id + '" = "' + states[id].val);
     *         }
     *     });
     * </code></pre>
     *
     * @alias getStates
     * @memberof Adapter
     * @param {string} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
     * @param {object} options optional argument to describe the user context
     * @param {ioBroker.GetStatesCallback} callback return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
     */
    getStates: (pattern: string, options: object, callback: ioBroker.GetStatesCallback) => void;
    /**
     * Promise-version of Adapter.getStates
     */
    getStatesAsync: any;
    _processStatesSecondary: (keys: any, targetObjs: any, srcObjs: any, callback: any) => void;
    _processStates: (keys: any, targetObjs: any, callback: any) => void;
    /**
     * Read all states of all adapters (and system states), that pass the pattern
     *
     * Allows to read all states of current adapter according to pattern. To read all states of current adapter use:
     * <pre><code>
     *     adapter.getStates('*', function (err, states) {
     *         for (var id in states) {
     *              adapter.log.debug('"' + id + '" = "' + states[id].val);
     *         }
     *     });
     * </code></pre>
     *
     * @alias getForeignStates
     * @memberof Adapter
     * @param {string | string[]} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
     * @param {object} options optional argument to describe the user context
     * @param {ioBroker.GetStatesCallback} callback return result function (err, states) {}, where states is an object like {"ID1": {"val": 1, "ack": true}, "ID2": {"val": 2, "ack": false}, ...}
     */
    getForeignStates: any;
    /**
     * Promise-version of Adapter.getForeignStates
     */
    getForeignStatesAsync: any;
    _addAliasSubscribe: (aliasObj: any, pattern: any, callback: any) => any;
    _removeAliasSubscribe: (sourceId: any, aliasObj: any, pattern: any, callback: any) => Promise<any>;
    /**
     * Subscribe for changes on all states of all adapters (and system states), that pass the pattern
     *
     * Allows to Subscribe on changes all states of all instances according to pattern. E.g. to read all states of 'adapterName.X' instance use:
     * <pre><code>
     *     adapter.subscribeForeignStates('adapterName.X.*');
     * </code></pre>
     *
     * @alias subscribeForeignStates
     * @memberof Adapter
     * @param {string | string[]} pattern string in form 'adapter.0.*' or like this. It can be array of IDs too.
     * @param {object} [options] optional argument to describe the user context
     * @param {ioBroker.ErrorCallback} [callback] return result function (err) {}
     */
    subscribeForeignStates: (pattern: string | string[], options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => Promise<any>;
    _aliasObjectsSubscribed: boolean;
    /**
     * Promise-version of Adapter.subscribeForeignStates
     */
    subscribeForeignStatesAsync: any;
    /**
     * Unsubscribe for changes for given pattern
     *
     * This function allows to unsubscribe from changes. The pattern must be equal to requested one.
     *
     * <pre><code>
     *     adapter.subscribeForeignStates('adapterName.X.*');
     *     adapter.unsubscribeForeignStates('adapterName.X.abc*'); // This will not work
     *     adapter.unsubscribeForeignStates('adapterName.X.*'); // Valid unsubscribe
     * </code></pre>
     *
     * @alias unsubscribeForeignStates
     * @memberof Adapter
     * @param {string | string[]} pattern string in form 'adapter.0.*'. Must be the same as subscribe.
     * @param {object} [options] optional argument to describe the user context
     * @param {ioBroker.ErrorCallback} [callback] return result function (err) {}
     */
    unsubscribeForeignStates: (pattern: string | string[], options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => Promise<any>;
    /**
     * Promise-version of Adapter.unsubscribeForeignStates
     */
    unsubscribeForeignStatesAsync: any;
    /**
     * Subscribe for changes on all states of this instance, that pass the pattern
     *
     * Allows to Subscribe on changes all states of current adapter according to pattern. To read all states of current adapter use:
     * <pre><code>
     *     adapter.subscribeStates('*'); // subscribe for all states of this adapter
     * </code></pre>
     *
     * @alias subscribeStates
     * @memberof Adapter
     * @param {string} pattern string in form 'adapter.0.*' or like this. Only string allowed
     * @param {object} [options] optional argument to describe the user context
     * @param {ioBroker.ErrorCallback} [callback]
     */
    subscribeStates: (pattern: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.subscribeStates
     */
    subscribeStatesAsync: any;
    /**
     * Unsubscribe for changes for given pattern for own states.
     *
     * This function allows to unsubscribe from changes. The pattern must be equal to requested one.
     *
     * <pre><code>
     *     adapter.subscribeForeignStates('*');
     *     adapter.unsubscribeForeignStates('abc*'); // This will not work
     *     adapter.unsubscribeForeignStates('*');    // Valid unsubscribe
     * </code></pre>
     *
     * @alias unsubscribeStates
     * @memberof Adapter
     * @param {string} pattern string in form 'adapter.0.*'. Must be the same as subscribe.
     * @param {object} [options] optional argument to describe the user context
     * @param {ioBroker.ErrorCallback} [callback]
     */
    unsubscribeStates: (pattern: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.unsubscribeStates
     */
    unsubscribeStatesAsync: any;
    /**
     * Decrypt the password/value with given key
     * @param {string} secretVal to use for decrypt (or value if only one parameter is given)
     * @param {string} [value] value to decrypt (if secret is provided)
     * @returns {string}
     */
    decrypt: (secretVal: string, value?: string | undefined) => string;
    /**
     * Encrypt the password/value with given key
     * @param {string} secretVal to use for encrypt (or value if only one parameter is given)
     * @param {string} [value] value to encrypt (if secret is provided)
     * @returns {string}
     */
    encrypt: (secretVal: string, value?: string | undefined) => string;
    getSession: (id: any, callback: any) => any;
    setSession: (id: any, ttl: any, data: any, callback: any) => any;
    destroySession: (id: any, callback: any) => any;
    /**
     * Write binary block into redis, e.g image
     *
     * @alias setBinaryState
     * @memberof Adapter
     *
     * @param {string} id of state
     * @param {Buffer} binary data
     * @param {object} [options] optional
     * @param {ioBroker.ErrorCallback} [callback]
     *
     */
    setBinaryState: (id: string, binary: Buffer, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => Promise<any>;
    /**
     * Promise-version of Adapter.setBinaryState
     *
     * @alias setBinaryStateAsync
     * @memberof Adapter
     * @param {string} id of state
     * @param {Buffer} binary data
     * @param {object} [options] optional
     * @return promise
     *
     */
    setBinaryStateAsync: any;
    /**
     * Read a binary block from redis, e.g. an image
     *
     * @param {string} id The state ID
     * @param {object} options optional
     * @param {ioBroker.GetBinaryStateCallback} callback
     */
    getBinaryState: (id: string, options: object, callback: ioBroker.GetBinaryStateCallback) => any;
    /**
     * Promise-version of Adapter.getBinaryState
     *
     * @alias getBinaryStateAsync
     * @memberof Adapter
     *
     */
    getBinaryStateAsync: any;
    /**
     * Deletes binary state
     *
     * @alias delBinaryState
     * @memberof Adapter
     *
     * @param {string} id
     * @param {object} [options]
     * @param {ioBroker.ErrorCallback} [callback]
     *
     */
    delBinaryState: (id: string, options?: object | undefined, callback?: ioBroker.ErrorCallback | undefined) => any;
    /**
     * Promise-version of Adapter.delBinaryState
     *
     * @alias delBinaryStateAsync
     * @memberof Adapter
     * @param {string} id
     * @param {object} [options]
     * @return promise
     *
     */
    delBinaryStateAsync: any;
    /**
     * Return plugin instance
     *
     * @param name {string} name of the plugin to return
     * @returns {object} plugin instance or null if not existent or not isActive
     */
    getPluginInstance: (name: string) => object;
    /**
     * Return plugin configuration
     *
     * @param name {string} name of the plugin to return
     * @returns {object} plugin configuration or null if not existent or not isActive
     */
    getPluginConfig: (name: string) => object;
    logRedirect: (isActive: any, id: any) => void;
    requireLog: (isActive: any) => void;
    logRequired: any;
    logOffTimer: any;
    processLog: (msg: any) => void;
    instance: any;
    config: any;
    host: any;
    common: any;
    stop: () => Promise<void>;
    kill: () => Promise<void>;
    adapterConfig: any;
    log: Log;
    version: any;
    oStates: Record<string, ioBroker.State> | undefined;
    pluginHandler: import("@iobroker/plugin-base/lib/PluginHandler") | undefined;
    /**
     * This method returns the list of license that can be used by this adapter
     * @param {boolean} all if return the licenses, that used by other instances (true) or only for this instance (false)
     * @returns {Promise<object[]>} list of suitable licenses
     */
    getSuitableLicenses: ((all: boolean) => Promise<object[]>) | undefined;
}
import Log = require("./log");
//# sourceMappingURL=adapter.d.ts.map