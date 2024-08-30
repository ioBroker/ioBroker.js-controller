import type * as os from 'node:os';
import type { Branded } from './utils';

declare global {
    namespace ioBroker {
        /** Defines access rights for a single file */
        interface FileACL {
            /** Full name of the user who owns this file, e.g. "system.user.admin" */
            owner: string;
            /** Full name of the group who owns this file, e.g. "system.group.administrator" */
            ownerGroup: string;
            /** Linux-type permissions defining access to this file */
            permissions: number;
        }

        /** Defines access rights for a single file, applied to a user or group */
        interface EvaluatedFileACL extends FileACL {
            /** Whether the user may read the file */
            read: boolean;
            /** Whether the user may write the file */
            write: boolean;
        }

        /** Defines access rights for a single object */
        interface ObjectACL {
            /** Full name of the user who owns this object, e.g. "system.user.admin" */
            owner: string;
            /** Full name of the group who owns this object, e.g. "system.group.administrator" */
            ownerGroup: string;
            /** Linux-type permissions defining access to this object */
            object: number;
        }

        /** Defines access rights for a single state object */
        interface StateACL extends ObjectACL {
            /** Linux-type permissions defining access to this state */
            state: number;
        }

        /** Defines the existing object types in ioBroker */
        type ObjectType =
            | 'state'
            | 'channel'
            | 'device'
            | 'folder'
            | 'enum'
            | 'adapter'
            | 'config'
            | 'group'
            | 'host'
            | 'instance'
            | 'meta'
            | 'script'
            | 'user'
            | 'chart'
            | 'schedule'
            | 'design';

        // Define the naming schemes for objects, so we can provide more specific types for get/setObject
        namespace ObjectIDs {
            // Guaranteed meta objects
            type Meta =
                | `${string}.${number}`
                | `${string}.${'meta' | 'admin'}`
                | `${string}.meta.${string}`
                | `${string}.${number}.meta.${string}`;

            // Unsure, can be folder, device, channel or state
            // --> We need this match to avoid matching the more specific types below
            type Misc = `system.host.${string}.${string}` | `0_userdata.0.${string}`;

            // Guaranteed channel objects
            type Channel = `script.js.${'common' | 'global'}` | `${string}.${number}.info`;
            // Either script or channel object
            type ScriptOrChannel = `script.js.${string}`;
            // Guaranteed state objects
            type State = `system.adapter.${string}.${number}.${string}`;
            // Guaranteed enum objects
            type Enum = `enum.${string}`;
            // Guaranteed instance objects
            type Instance = `system.adapter.${string}.${number}`;
            // Guaranteed adapter objects
            type Adapter = `system.adapter.${string}` | `system.host.${string}.adapter.${string}`;
            // Guaranteed group objects
            type Group = `system.group.${string}`;
            // Guaranteed user objects
            type User = `system.user.${string}`;
            // Guaranteed host objects
            type Host = `system.host.${string}`;
            // Guaranteed repository object
            type Repository = 'system.repositories';
            // Guaranteed config objects
            type Config = 'system.certificates';
            // Guaranteed system config objects
            type SystemConfig = 'system.config';
            // Guaranteed design objects
            type Design = `_design/${string}`;

            // Unsure, can be folder, device, channel or state (or whatever an adapter does)
            type AdapterScoped = `${string}.${number}.${string}`;

            /** All possible typed object IDs */
            type Any =
                | Meta
                | Misc
                | Channel
                | ScriptOrChannel
                | State
                | Enum
                | Instance
                | Adapter
                | Group
                | User
                | Host
                | Config
                | AdapterScoped;
        }

        type ObjectIdToObjectType<T extends string, Read extends 'read' | 'write' = 'read'> =
            // State must come before Adapter or system.adapter.admin.0.foobar will resolve to AdapterObject
            T extends ObjectIDs.State
                ? StateObject
                : // Instance and Adapter must come before meta or `system.adapter.admin` will resolve to MetaObject
                  T extends ObjectIDs.Instance
                  ? InstanceObject
                  : T extends ObjectIDs.Adapter
                    ? AdapterObject
                    : T extends ObjectIDs.Channel
                      ? ChannelObject
                      : T extends ObjectIDs.Meta
                        ? MetaObject
                        : T extends ObjectIDs.Misc
                          ? AdapterScopedObject
                          : T extends ObjectIDs.ScriptOrChannel
                            ? ScriptObject | ChannelObject
                            : T extends ObjectIDs.Enum
                              ? EnumObject
                              : T extends ObjectIDs.Group
                                ? GroupObject
                                : T extends ObjectIDs.User
                                  ? UserObject
                                  : T extends ObjectIDs.Host
                                    ? HostObject
                                    : T extends ObjectIDs.Design
                                      ? DesignObject
                                      : T extends ObjectIDs.Repository
                                        ? RepositoryObject
                                        : T extends ObjectIDs.SystemConfig
                                          ? SystemConfigObject
                                          : T extends ObjectIDs.Config
                                            ? OtherObject & { type: 'config' }
                                            : T extends ObjectIDs.AdapterScoped
                                              ? AdapterScopedObject
                                              : Read extends 'read'
                                                ? ioBroker.Object
                                                : AnyObject;

        type Languages = 'en' | 'de' | 'ru' | 'pt' | 'nl' | 'fr' | 'it' | 'es' | 'pl' | 'uk' | 'zh-cn';
        type Translated = { en: string } & { [lang in Languages]?: string };

        /** For objects, we require the English language to be present */
        type StringOrTranslated = string | Translated;

        type CommonType = 'number' | 'string' | 'boolean' | 'array' | 'object' | 'mixed';

        interface ObjectCommon {
            /** The name of this object as a simple string or an object with translations */
            name: StringOrTranslated;

            /** Description of this object */
            desc?: StringOrTranslated;

            /** When set to true, this object may not be deleted */
            dontDelete?: true;

            /** When set to true, this object is only visible when expert mode is turned on in admin */
            expert?: true;
            /** Color attribute used in UI */
            color?: string;

            // Icon and role aren't defined in SCHEMA.md,
            // but they are being used by some adapters
            /** Icon for this object */
            icon?: string;
            /** role of the object */
            role?: string;
        }

        interface StateCommon extends ObjectCommon {
            /** Type of this state. See https://github.com/ioBroker/ioBroker/blob/master/doc/SCHEMA.md#state-commonrole for a detailed description */
            type: CommonType;
            /** minimum value */
            min?: number;
            /** maximum value */
            max?: number;
            /** allowed interval for numeric values */
            step?: number;
            /** unit of the value */
            unit?: string;

            /** if this state is readable */
            read: boolean;
            /** if this state is writable */
            write: boolean;
            /** role of the state (used in user interfaces to indicate which widget to choose) */
            role: string;

            /** the default value */
            def?: any;
            /** the default status of the ack flag */
            defAck?: boolean;

            /** Configures this state as an alias for another state */
            alias?: {
                /** The target state id */
                id:
                    | string
                    | {
                          read: string;
                          write: string;
                      };
                /** An optional conversion function when reading, e.g. `"(val − 32) * 5/9"` */
                read?: string;
                /** An optional conversion function when reading, e.g. `"(val * 9/5) + 32"` */
                write?: string;
            };

            /**
             * Dictionary of possible values for this state in the form
             * ```jsonc
             * {
             *     "internal value 1": "displayed value 1",
             *     "internal value 2": "displayed value 2",
             *     // ...
             * }
             * ```
             *
             * or as an array:
             * ```jsonc
             * [ "value 1", "value 2", // ... ]
             * ```
             *
             * In old ioBroker versions, this could also be a string of the form
             * `"val1:text1;val2:text2"` (now deprecated)
             */
            states?: Record<string, string> | string[] | string;

            /** ID of a helper state indicating if the handler of this state is working */
            workingID?: string;

            /** attached history information */
            history?: any;

            /** Custom settings for this state */
            custom?: Record<string, any>;

            /** Custom defined properties for backward compatibility of material adapter */
            material?: any;

            /** Custom defined properties for backward compatibility of habpanel adapter */
            habpanel?: any;

            /** Custom defined properties for backward compatibility of habpanel adapter */
            mobile?: any;

            /**
             * Settings for IOT adapters and how the state should be named in e.g., Alexa.
             * The string "ignore" (deprecated please use boolean `false` instead) or boolean value `false` is a special case, causing the state to be ignored.
             * A value of `null` means that the device should be removed by the IOT adapters
             */
            smartName?:
                | null
                | false
                | string
                | ({ [lang in Languages]?: string } & {
                      /** Which kind of device it is */
                      smartType?: string | null;
                      /** Which value to set when the ON command is issued */
                      byON?: string | null;
                  });
        }

        interface ChannelCommon extends ObjectCommon {
            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface DeviceCommon extends ObjectCommon {
            statusStates?: {
                /** State, which is truthy if a device is online */
                onlineId?: string;
                /** State, which is truthy if a device is offline */
                offlineId?: string;
                /** State, which is truthy if a device is in error state */
                errorId?: string;
            };
            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface ScheduleCommon extends ObjectCommon {
            enabled?: boolean;
            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface RepositoryCommon extends ObjectCommon {
            custom?: undefined;
        }

        interface ChartCommon extends ObjectCommon {
            enabled?: boolean;
            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface EnumCommon extends ObjectCommon {
            /** The IDs of the enum members */
            members?: string[];

            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface MetaCommon extends ObjectCommon {
            // Can be of type `user` for folders, where a user can store files or `folder` for adapter internal structures
            type: 'meta.user' | 'meta.folder';

            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        type InstanceMode = 'none' | 'daemon' | 'schedule' | 'once' | 'extension';

        interface AdminUi {
            /** UI type of config page inside admin UI */
            config: 'html' | 'json' | 'materialize' | 'none';
            /** UI type of custom tab inside admin UI */
            custom?: 'json';
            /** UI type of tab inside admin UI */
            tab?: 'html' | 'materialize';
        }

        /** Installed from attribute of instance/adapter object */
        type InstalledFrom = Branded<string, 'InstalledFrom'>;

        interface InstanceCommon extends AdapterCommon {
            version: string;
            /** The name of the host where this instance is running */
            host: string;
            enabled: boolean;
            /** How and when this instance should be started */
            mode: InstanceMode;
            /**
             * The starting priority of this adapter:
             * - **1:** Logic adapters
             * - **2:** Data providers
             * - **3:** All other adapters
             */
            tier?: 1 | 2 | 3;
            /** Variables of this adapter must be subscribed with sendTo to enable updates */
            subscribable?: boolean;
            /** If compact mode is supported */
            compact?: boolean;
            /** If compact mode is active */
            runAsCompactMode?: boolean;
            /** Active compact group, instances in this group will be started in one process */
            compactGroup?: number;
            /** String (or array) with names of attributes in common of instance, which will not be deleted. */
            preserveSettings?: string | string[];
            /** Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore */
            installedFrom?: InstalledFrom;
            /** Arguments passed to the adapter process, this disables compact mode */
            nodeProcessParams?: string[];
            /** If adapter can consume log messages, like admin, javascript or logparser */
            logTransporter?: boolean;
            /** Type of the admin UI */
            adminUI?: AdminUi;
            /** Optional memory limit for this instance */
            memoryLimitMB?: number;

            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface HostCommon extends ObjectCommon {
            /** The display name of this host */
            name: string;
            /** Changeable name of the host */
            title: string;
            /** base64 encoded icon */
            icon?: string;
            installedVersion: string; // e.g. 1.2.3 (following semver)
            /** The command line of the executable */
            cmd: string;
            hostname: string;
            /** An array of IP addresses this host exposes */
            address: string[]; // IPv4 or IPv6

            type: 'js-controller';
            platform: 'Javascript/Node.js';

            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface HostNative {
            process: {
                title: string;
                versions: NodeJS.ProcessVersions;
                env: NodeJS.ProcessEnv;
            };
            os: {
                hostname: string;
                type: ReturnType<(typeof os)['type']>;
                platform: ReturnType<(typeof os)['platform']>;
                arch: ReturnType<(typeof os)['arch']>;
                release: ReturnType<(typeof os)['release']>;
                endianness: ReturnType<(typeof os)['endianness']>;
                tmpdir: ReturnType<(typeof os)['tmpdir']>;
            };
            hardware: {
                /** Return value of os.cpu but property `times` could be removed from every entry */
                cpus: (Omit<ReturnType<(typeof os)['cpus']>[number], 'times'> &
                    Partial<Pick<ReturnType<(typeof os)['cpus']>[number], 'times'>>)[];
                totalmem: ReturnType<(typeof os)['totalmem']>;
                networkInterfaces: ReturnType<(typeof os)['networkInterfaces']>;
            };
        }

        interface UserCommon extends ObjectCommon {
            /** The username */
            name: string;
            /** The hashed password */
            password: string;
            /** Whether this user is enabled */
            enabled: boolean;

            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface GroupCommon extends ObjectCommon {
            /** The name of this group */
            name: string;
            /** The users of this group */
            members: ObjectIDs.User[]; // system.user.name, ...
            /** The default permissions of this group */
            acl: Omit<PermissionSet, 'user' | 'groups'>;
            /** A group can be disabled, if missing, a group is active */
            enabled?: boolean;
            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface ScriptCommon extends ObjectCommon {
            name: string;
            /** Defines the type of the script, e.g., TypeScript/ts, JavaScript/js or Blockly */
            engineType: string;
            /** The instance id of the instance which executes this script */
            engine: string;
            /** The source code of this script */
            source: string;
            debug: boolean;
            verbose: boolean;
            /** Whether this script should be executed */
            enabled: boolean;
            /** Is used to determine whether a script has changed and needs to be recompiled */
            sourceHash?: string;
            /** If the script uses a compiled language like TypeScript, this contains the compilation output */
            compiled?: string;
            /** If the script uses a compiled language like TypeScript, this contains the generated declarations (global scripts only) */
            declarations?: string;

            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        type WelcomeScreenEntry =
            | string
            | {
                  link: string;
                  name: string;
                  img: string;
                  color: string;
              };

        /**
         * Object which defines, if the adapter supports receiving messages via sendTo.
         * Additionally, it defines if specific messages are supported.
         * If one property is enabled, the object `system.adapter.<adaptername>.<adapterinstance>.messagebox will be created to send messages to the adapter (used for email, pushover, etc...)
         */
        interface SupportedMessages {
            /** If custom messages are supported (same as legacy messagebox) */
            custom?: boolean;
            /** If notification handling is supported, for information, see https://github.com/foxriver76/ioBroker.notification-manager#requirements-for-messaging-adapters */
            notifications?: boolean;
            /** If adapter supports signal stopInstance. Use number if you need more than 1000 ms for stop routine. The signal will be sent before stop to the adapter. (used if problems occurred with SIGTERM). */
            stopInstance?: boolean | number;
            /** If adapter supports the device manager and thus responds to the corresponding messages */
            deviceManager?: boolean;
            /** If adapter supports getHistory message. */
            getHistory?: boolean;
        }

        type AutoUpgradePolicy = 'none' | 'patch' | 'minor' | 'major';

        interface VisWidget {
            i18n: 'component' | true | Translated;
            name: string;
            url: string;
            components: string[];
            /** The vis widget does not support the listed major versions of vis */
            ignoreInVersions: number[];
        }

        type PaidLicenseType = 'paid' | 'commercial' | 'limited';

        interface LicenseInformationFree {
            /** License of the software */
            license?: string;
            /** Use 'paid' for adapters which do not work without a paid license. Use 'commercial' for adapters which require a license for commercial use only. Use 'limited' if some functionalities are not available without a paid license. */
            type: 'free';
            /**
             * Hyperlink, where information about the license can be found. For non-free licenses the linked page should contain information about free features (if applicable), time of validity, link to shop and seller information.
             * This is required if the license type is different from 'free'. For 'free' licenses an optional link to the license file can be placed here.
             */
            link?: string;
        }

        interface LicenseInformationWithPayment {
            /** License of the software */
            license?: string;
            /** Use 'paid' for adapters which do not work without a paid license. Use 'commercial' for adapters which require a license for commercial use only. Use 'limited' if some functionalities are not available without a paid license. */
            type: PaidLicenseType;
            /**
             * Hyperlink, where information about the license can be found. For non-free licenses the linked page should contain information about free features (if applicable), time of validity, link to shop and seller information.
             * This is required if the license type is different from 'free'. For 'free' licenses an optional link to the license file can be placed here.
             */
            link: string;
        }

        type LicenseInformation = LicenseInformationFree | LicenseInformationWithPayment;

        interface MessageRule {
            /** The message title */
            title: ioBroker.Translated;
            /** The message content */
            text: ioBroker.Translated;
            /** Optional link */
            link?: string;
            /** Text of the link */
            linkText?: ioBroker.Translated;
            /** The severity level of the message */
            level: 'warn' | 'error' | 'info';
            /** The buttons which should be shown on the message dialog */
            buttons?: ('agree' | 'cancel' | 'ok')[];
            /** The condition which needs to be met to display the message */
            condition: {
                operand: 'and' | 'or';
                rules: string[];
            };
        }

        interface CustomAdminColumn {
            path: string;
            name?: ioBroker.StringOrTranslated;
            objTypes?: ObjectType | ObjectType[];
            width?: number;
            edit?: boolean;
            type?: CommonType;
            align?: 'left' | 'center' | 'right';
        }

        type ConnectionType = 'local' | 'cloud';

        type LocalLink = {
            /** Link to the web service of this adapter, like: "%web_protocol%://%ip%:%web_port%/vis-2/edit.html" */
            link: string;
            /** Name of the link. Could be multi-language */
            name?: ioBroker.StringOrTranslated;
            /** Color */
            color?: string;
            /** Link to icon, like "vis-2/img/favicon.png" */
            icon?: string;
            /** Link to the adapter if it could be shown in the free cloud, like: vis-2/index.html according to "https://iobroker.net/" */
            cloud?: string;
            /** Link to the adapter if it could be shown in the pro-cloud, like: vis-2/edit.html according to "https://iobroker.pro/" */
            pro?: string;
            /** If this link should be shown on the intro tab in admin. false = do not show */
            intro?: boolean;
            /** Order of the card. Used on "intro" and cloud tabs to sort the links */
            order?: number;
            /** Description of the link. Could be multi-language */
            description?: ioBroker.StringOrTranslated;
        };

        interface AdapterCommon extends ObjectCommon {
            /** Custom attributes to be shown in admin in the object browser */
            adminColumns?: string | (string | CustomAdminColumn)[];
            /** Settings for custom Admin Tabs */
            adminTab?: {
                name?: StringOrTranslated;
                /** Base 64 icon for the tab */
                icon?: string;
                /** @deprecated icon name for FontAwesome (works only in admin 4)*/
                'fa-icon'?: string;
                /** If true, the Tab is not reloaded when the configuration changes */
                ignoreConfigUpdate?: boolean;
                /** Which URL should be loaded in the tab. Supports placeholders like http://%ip%:%port% */
                link?: string;
                /** If true, only one instance of this tab will be created for all instances */
                singleton?: boolean;
                /** Order number in admin tabs */
                order?: number;
            };
            allowInit?: boolean;
            /** If the adapter should be automatically upgraded and which version ranges are supported */
            automaticUpgrade?: AutoUpgradePolicy;
            /** Possible values for the instance mode (if more than one is possible) */
            availableModes?: InstanceMode[];
            /** Array which lists all blocked versions. Blocked versions will not be started. Use semver notation to specify the version ranges. The information is always used from the io-package.json in the GitHub repository. */
            blockedVersions?: string[];
            /** Whether this adapter includes custom blocks for Blockly. If true, `admin/blockly.js` must exist. */
            blockly?: boolean;
            /** Where the adapter will get its data from. Set this together with @see dataSource */
            connectionType?: ConnectionType;
            /** If true, this adapter can be started in compact mode (in the same process as other adapters) */
            compact?: boolean;
            /** The directory relative to iobroker-data where the adapter stores the data. Supports the placeholder `%INSTANCE%`. This folder will be backed up and restored automatically. */
            dataFolder?: string;
            /** How the adapter will mainly receive its data. Set this together with @see connectionType */
            dataSource?: 'poll' | 'push' | 'assumption';
            /** A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter on the same host. */
            dependencies?: Array<Record<string, string>>;
            /** A record of ioBroker adapters (including "js-controller") and version ranges which are required for this adapter in the whole system. */
            globalDependencies?: Array<Record<string, string>>;
            /** Which files outside the README.md have documentation for the adapter */
            docs?: Partial<Record<Languages, string | string[]>>;
            /** Whether new instances should be enabled by default. *Should* be `false`! */
            enabled: boolean;
            /** If true, all previous data in the target directory (web) should be deleted before uploading */
            eraseOnUpload?: boolean;
            /** URL of an external icon that is shown for adapters that are not installed */
            extIcon?: string;
            /** Whether this adapter responds to `getHistory` messages */
            getHistory?: boolean;
            /** Filename of the local icon which is shown for installed adapters. Should be located in the `admin` directory */
            icon?: string;
            /** The adapter will be executed once additionally after installation, and the `install` event will be emitted during this run. This allows for executing one time installation code. */
            install?: boolean;
            /** Source, where this adapter has been installed from, to enable reinstalling on e.g., backup restore */
            installedFrom?: InstalledFrom;
            /** Which version of this adapter is installed */
            installedVersion: string;
            keywords?: string[];
            /** A dictionary of links to web services this adapter provides */
            localLinks?: Record<string, string | LocalLink>;
            /** @deprecated Use @see localLinks */
            localLink?: string;
            loglevel?: LogLevel;
            /** Whether this adapter receives logs from other hosts and adapters (e.g., to store them somewhere) */
            logTransporter?: boolean;
            /** Path to the start file of the adapter. Should be the same as in `package.json` */
            main?: string;
            /** Whether the admin tab is written in materialized style. Required for Admin 3+ */
            materializeTab?: boolean;
            /** Whether the admin configuration dialog is written in materialized style. Required for Admin 3+ */
            materialize: boolean;
            /** @deprecated Use @see supportedMessages up from controller v5 */
            messagebox?: true;
            /** Messages which are supported by the adapter, supportedMessages.custom: true is the equivalent to messagebox: true */
            supportedMessages?: SupportedMessages;
            mode: InstanceMode;
            /** Name of the adapter (without leading `ioBroker.`) */
            name: string;
            /** News per version in i18n */
            news?: { [version: string]: Translated };
            /** If `true`, no configuration dialog will be shown */
            noConfig?: true;
            /** If `true`, this adapter's instances will not be shown in the admin overview screen. Useful for icon sets and widgets... */
            noIntro?: true;
            /** Set to `true` if the adapter is not available in the official ioBroker repositories. */
            noRepository?: true;
            /** If `true`, manual installation from GitHub is not possible */
            nogit?: true;
            /** If `true`, this adapter cannot be deleted or updated manually. */
            nondeletable?: true;
            /** If `true`, this "adapter" only contains HTML files and no main executable */
            onlyWWW?: boolean;
            /** Used to configure native (OS) dependencies of this adapter that need to be installed with system package manager before installing the adapter */
            osDependencies?: {
                /** For OSX */
                darwin: string[];
                /** For Linux */
                linux: string[];
                /** For Windows */
                win32: string[];
            };
            /** Which OSes this adapter supports */
            os?: 'linux' | 'darwin' | 'win32' | Array<'linux' | 'darwin' | 'win32'>;
            platform: 'Javascript/Node.js';
            /** The keys of common attributes (e.g. `history`) which are not deleted in a `setObject` call even if they are not present. Deletion must be done explicitly by setting them to `null`. */
            preserveSettings?: string | string[];
            /** Url of the ReadMe file */
            readme?: string;
            /** Which adapters must be restarted after installing or updating this adapter. */
            restartAdapters?: string[];
            /** CRON schedule to restart mode `daemon` adapters */
            restartSchedule?: string;
            /** If the adapter runs in `schedule` mode, this contains the CRON */
            schedule?: string;
            serviceStates?: boolean | string;
            /** Whether this adapter may only be installed once per host */
            singletonHost?: boolean;
            /** Whether this adapter may only be installed once in the whole system */
            singleton?: boolean;
            /** Whether the adapter must be stopped before an update */
            stopBeforeUpdate?: boolean;
            /** Overrides the default timeout that ioBroker will wait before force-stopping the adapter */
            stopTimeout?: number;
            subscribable?: boolean;
            /** If `true`, this adapter provides custom per-state settings. Requires a `custom_m.html` file in the `admin` directory. */
            supportCustoms?: boolean;
            /** @deprecated Use @see supportedMessages up from controller v5 */
            supportStopInstance?: boolean;
            /** The translated names of this adapter to be shown in the admin UI */
            titleLang?: StringOrTranslated;
            /** @deprecated The name of this adapter to be shown in the admin UI. Use @see titleLang instead. */
            title?: string;
            /** The type of this adapter */
            type?: string;
            /** If `true`, the `npm` package must be installed with the `--unsafe-perm` flag */
            unsafePerm?: true;
            /** The available version in the ioBroker repo. */
            version: string;
            visWidgets?: Record<string, VisWidget>;
            /** Include the adapter version in the URL of the web adapter, e.g. `http://ip:port/1.2.3/material` instead of `http://ip:port/material` */
            webByVersion?: boolean;
            /** Whether the web server in this adapter can be extended with plugin/extensions */
            webExtendable?: boolean;
            /** Relative path to a module that contains an extension for the web adapter. Use together with @see native.webInstance to configure which instances this affects */
            webExtension?: string;
            webPreSettings?: any; // ?
            webservers?: any; // ?
            /** @deprecated (use localLinks) A list of pages that should be shown on the "web" index page */
            welcomeScreen?: WelcomeScreenEntry[];
            /** @deprecated (use localLinks) A list of pages that should be shown on the ioBroker cloud index page */
            welcomeScreenPro?: WelcomeScreenEntry[];
            wwwDontUpload?: boolean;
            /** @deprecated Use 'common.licenseInformation' instead */
            license?: string;
            /** An object representing information with the license details */
            licenseInformation?: LicenseInformation;
            /** Messages, that will be shown (if condition evaluates to true) by upgrade or installation */
            messages?: MessageRule[];
            /** If a specific update of this adapter should be ignored, specifies version number to be ignored */
            ignoreVersion?: string;
            /** Sentry and other plugins */
            plugins?: { [pluginName: string]: Record<string, any> };

            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface SystemConfigCommon extends ObjectCommon {
            /** Name of all active repositories */
            activeRepo: string[];
            /** Current configured language */
            language: Languages;
            /** If floating comma is used instead of dot */
            isFloatComma: boolean;
            /** Configured longitude */
            longitude?: number;
            /** Configured latitude */
            latitude?: number;
            /** Optional user's city (only for diagnostics) */
            city?: string;
            /** Optional user's country (only for diagnostics) */
            country?: string;
            /** User-defined temperature unit */
            tempUnit?: '°C' | '°F';
            /** User-defined currency */
            currency?: string;
            /** User-defined first day of the week */
            firstDayOfWeek?: 'monday' | 'sunday';
            /** Default history instance */
            defaultHistory: string;
            /** Which diag data is allowed to be sent */
            diag: 'none' | 'extended' | 'no-city';
            /** If license has already been confirmed */
            licenseConfirmed: boolean;
            /** System wide default log level */
            defaultLogLevel?: LogLevel;
            /** Used date format for formatting */
            dateFormat: string;
            /** Default acl for new objects */
            defaultNewAcl: {
                object: number;
                state: number;
                file: number;
                owner: ObjectIDs.User;
                ownerGroup: ObjectIDs.Group;
            };
            /** Configured auto upgrade policy */
            adapterAutoUpgrade?: {
                /** Configuration for each repository */
                repositories: {
                    [repoName: string]: boolean;
                };
                /** Default policy, if none has been set explicit for the adapter */
                defaultPolicy: AutoUpgradePolicy;
            };
            /** Deactivated instances, that should not be shown in admin/Intro page */
            intro?: string[];
            /** Which tabs are visible in admin in the left menu */
            tabsVisible?: {
                /** Name of the tab */
                name: string;
                /** If the tab should be visible */
                visible: boolean;
                /** Optional color of the tab */
                color?: string;
            }[];
            /** Global saved expert mode for admin */
            expertMode?: boolean;

            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        interface OtherCommon extends ObjectCommon {
            [propName: string]: any;

            // Make it possible to narrow the object type using the custom property
            custom?: undefined;
        }

        /**
         * ioBroker has built-in protection for specific attributes of objects. If this protection is installed in the object, then the protected attributes of object cannot be changed by the user without valid password.
         * To protect the properties from change, the special attribute "nonEdit" must be added to the object. This attribute contains the password, which is required to change the object.
         * If object does not have "nonEdit" attribute, so the hash will be saved into "nonEdit.passHash". After that if someone will change the object, he must provide the password in "nonEdit.password".
         * If the password is correct, the object attributes will be updated. If the password is wrong, the object will not be changed.
         * Note, that all properties outside "nonEdit" can be updated without providing the password. Furthermore, do not confuse e.g. "nonEdit.common" with "obj.common" they are not linked in any way.
         */
        interface NonEditable {
            /** Password needed to edit non-editable information */
            password?: string;
            /** Hashed version of current password */
            passHash?: string;
            /** These properties can only be changed by providing the password, else they stay on the initial value */
            common?: Record<string, any>;
            /** These properties can only be changed by providing the password, else they stay on the initial value */
            native?: Record<string, any>;
        }

        /* Base type for Objects. Should not be used directly */
        interface BaseObject {
            /** The ID of this object */
            _id: string;
            type: ObjectType; // specified in the derived interfaces
            // Ideally we would limit this to JSON-serializable objects, but TypeScript doesn't allow this
            // without bugging users to change their code --> https://github.com/microsoft/TypeScript/issues/15300
            native: Record<string, any>;
            common: Record<string, any>;
            enums?: Record<string, string | Translated>;
            acl?: ObjectACL;
            from?: string;
            /** The user who created or updated this object */
            user?: string;
            ts?: number;
            /** These properties can only be edited if the correct password is provided */
            nonEdit?: NonEditable;
        }

        interface StateObject extends BaseObject {
            type: 'state';
            common: StateCommon;
            acl?: StateACL;
        }

        interface PartialStateObject extends Partial<Omit<StateObject, 'common' | 'acl'>> {
            common?: Partial<StateCommon>;
            acl?: Partial<StateACL>;
        }

        interface ChannelObject extends BaseObject {
            type: 'channel';
            common: ChannelCommon;
        }

        interface PartialChannelObject extends Partial<Omit<ChannelObject, 'common'>> {
            common?: Partial<ChannelCommon>;
        }

        interface DeviceObject extends BaseObject {
            type: 'device';
            common: DeviceCommon;
        }

        interface PartialDeviceObject extends Partial<Omit<DeviceObject, 'common'>> {
            common?: Partial<DeviceCommon>;
        }

        interface FolderObject extends BaseObject {
            type: 'folder';
            // Nothing is set in stone here, so start with allowing every property
            common: OtherCommon;
        }

        interface PartialFolderObject extends Partial<Omit<FolderObject, 'common'>> {
            common?: Partial<OtherCommon>;
        }

        interface EnumObject extends BaseObject {
            type: 'enum';
            common: EnumCommon;
        }

        interface PartialEnumObject extends Partial<Omit<EnumObject, 'common'>> {
            common?: Partial<EnumCommon>;
        }

        interface MetaObject extends BaseObject {
            type: 'meta';
            common: MetaCommon;
        }

        interface PartialMetaObject extends Partial<Omit<MetaObject, 'common'>> {
            common?: Partial<MetaCommon>;
        }

        interface ChartObject extends BaseObject {
            type: 'chart';
            common: ChartCommon;
        }

        type PartialChartObject = ChartObject;

        interface ScheduleObject extends BaseObject {
            type: 'schedule';
            common: ScheduleCommon;
        }

        interface PartialScheduleObject extends Partial<Omit<ScheduleObject, 'common'>> {
            common?: Partial<ScheduleCommon>;
        }

        interface PartialRepositoryObject extends Partial<Omit<RepositoryObject, 'common'>> {
            common?: Partial<RepositoryCommon>;
        }

        interface RepositoryJsonAdapterContent {
            /** Adapter name */
            name: string;
            /** Newest available version */
            version: string;
            /** Array of blocked versions, each entry represents a semver range */
            blockedVersions: string[];

            /** Other Adapter related properties, not important for this implementation */
            [other: string]: unknown;
        }

        interface RepoInfo {
            /** If it is the official stable repository */
            stable?: boolean;
            /** i18n name of the repository */
            name: Required<ioBroker.Translated>;
            /** Time of repository update */
            repoTime: string;
        }

        interface RepositoryJson {
            _repoInfo: RepoInfo;

            /** Information about each adapter */
            [adapter: string]: RepositoryJsonAdapterContent | RepoInfo;
        }

        interface RepositoryInformation {
            /** Url to the repository */
            link: string;
            json: RepositoryJson | null;
            hash?: string;
            time?: string;
        }

        interface RepositoryObject extends BaseObject {
            _id: ObjectIDs.Repository;
            type: 'config';
            native: {
                repositories: {
                    [repoName: string]: RepositoryInformation;
                };
                oldRepositories?: {
                    [repoName: string]: RepositoryInformation;
                };
            };
            common: RepositoryCommon;
        }

        interface InstanceObject extends BaseObject {
            _id: ObjectIDs.Instance;
            type: 'instance';
            common: InstanceCommon;
            /** These properties will be removed when foreign adapters access it */
            protectedNative?: string[];
            /** These properties will be automatically encrypted and decrypted when used with adapter.config */
            encryptedNative?: string[];
            /** Register notifications for the built-in notification system */
            notifications?: Notification[];
            /** Objects created for each instance, inside the namespace of this adapter */
            instanceObjects: (StateObject | DeviceObject | ChannelObject | FolderObject | MetaObject)[];
            /** Objects created for the adapter, anywhere in the global namespace */
            objects: ioBroker.AnyObject[];
        }

        interface PartialInstanceObject extends Partial<Omit<InstanceObject, 'common'>> {
            common?: Partial<InstanceCommon>;
        }

        /** TODO: To be defined */
        type NotificationCategory = any;

        interface Notification {
            scope: string;
            name: Translated;
            description: Translated;
            categories: NotificationCategory[];
        }

        interface AdapterObject extends BaseObject {
            _id: ObjectIDs.Adapter;
            type: 'adapter';
            common: AdapterCommon;
            /** An array of `native` properties which cannot be accessed from outside the defining adapter */
            protectedNative?: string[];
            /** Like protectedNative, but the properties are also encrypted and decrypted automatically */
            encryptedNative?: string[];
            /** Register notifications for the built-in notification system */
            notifications?: Notification[];
            /** Objects created for each instance, inside the namespace of this adapter */
            instanceObjects: (StateObject | DeviceObject | ChannelObject | FolderObject | MetaObject)[];
            /** Objects created for the adapter, anywhere in the global namespace */
            objects: ioBroker.AnyObject[];
        }

        interface PartialAdapterObject extends Partial<Omit<AdapterObject, 'common'>> {
            common?: Partial<AdapterCommon>;
        }

        interface HostObject extends BaseObject {
            _id: ObjectIDs.Host;
            type: 'host';
            common: HostCommon;
            native: HostNative;
        }

        interface PartialHostObject extends Partial<Omit<HostObject, 'common' | 'native'>> {
            common?: Partial<HostCommon>;
            native?: Partial<HostNative>;
        }

        interface UserObject extends BaseObject {
            _id: ObjectIDs.User;
            type: 'user';
            common: UserCommon;
        }

        interface PartialUserObject extends Partial<Omit<UserObject, 'common'>> {
            common?: Partial<UserCommon>;
        }

        interface GroupObject extends BaseObject {
            _id: ObjectIDs.Group;
            type: 'group';
            common: GroupCommon;
        }

        interface PartialGroupObject extends Partial<Omit<GroupObject, 'common'>> {
            common?: Partial<GroupCommon>;
        }

        interface ScriptObject extends BaseObject {
            type: 'script';
            common: ScriptCommon;
        }

        interface PartialScriptObject extends Partial<Omit<ScriptObject, 'common'>> {
            common?: Partial<ScriptCommon>;
        }

        interface SystemConfigObject extends BaseObject {
            type: 'config';
            common: SystemConfigCommon;
        }

        interface PartialSystemConfigObject extends Partial<Omit<SystemConfigObject, 'common'>> {
            common?: Partial<SystemConfigCommon>;
        }

        interface OtherObject extends BaseObject {
            type: 'config' | 'chart';
            common: OtherCommon;
        }

        interface PartialOtherObject extends Partial<Omit<OtherObject, 'common'>> {
            common?: Partial<OtherCommon>;
        }

        interface DesignObject extends Omit<BaseObject, 'common'> {
            // allow narrowing the type without making it a pain
            type: 'design';
            _id: ObjectIDs.Design;
            language: 'javascript';
            common?: OtherCommon;
            views: Record<string, { map: string }>;
        }

        interface PartialDesignObject extends Partial<Omit<DesignObject, 'common'>> {
            common?: Partial<OtherCommon>;
        }

        type AnyObject =
            | StateObject
            | ChannelObject
            | DeviceObject
            | FolderObject
            | EnumObject
            | MetaObject
            | HostObject
            | AdapterObject
            | InstanceObject
            | UserObject
            | GroupObject
            | ScriptObject
            | ChartObject
            | ScheduleObject
            | RepositoryObject
            | OtherObject
            | DesignObject;

        type AnyPartialObject =
            | PartialStateObject
            | PartialChannelObject
            | PartialDeviceObject
            | PartialFolderObject
            | PartialEnumObject
            | PartialMetaObject
            | PartialHostObject
            | PartialAdapterObject
            | PartialInstanceObject
            | PartialUserObject
            | PartialGroupObject
            | PartialScriptObject
            | PartialChartObject
            | PartialScheduleObject
            | PartialRepositoryObject
            | PartialSystemConfigObject
            | PartialOtherObject
            | PartialDesignObject;

        /** All objects that usually appear in an adapter scope */
        type AdapterScopedObject = FolderObject | DeviceObject | ChannelObject | StateObject;

        // For all objects that are exposed to the user, we need to tone the strictness down.
        // Otherwise, every operation on objects becomes a pain to work with
        type Object = AnyObject & {
            common: Record<string, any>;
            native: Record<string, any>;
        };

        // In set[Foreign]Object[NotExists] methods, the ID and acl of the object is optional
        type SettableObjectWorker<T> = T extends AnyObject
            ? Omit<T, '_id' | 'acl'> & {
                  _id?: T['_id'];
                  acl?: T['acl'];
              }
            : never;
        // in extend[Foreign]Object, most properties are optional
        type PartialObjectWorker<T> = T extends AnyObject ? AnyPartialObject & { type?: T['type'] } : never;

        type PartialObject<T extends AnyObject = AnyObject> = PartialObjectWorker<T>;

        // Convenient definitions for manually specifying settable object types
        type SettableObject<T extends AnyObject = AnyObject> = SettableObjectWorker<T>;
        type SettableStateObject = SettableObject<StateObject>;
        type SettableChannelObject = SettableObject<ChannelObject>;
        type SettableDeviceObject = SettableObject<DeviceObject>;
        type SettableFolderObject = SettableObject<FolderObject>;
        type SettableEnumObject = SettableObject<EnumObject>;
        type SettableMetaObject = SettableObject<MetaObject>;
        type SettableHostObject = SettableObject<HostObject>;
        type SettableAdapterObject = SettableObject<AdapterObject>;
        type SettableInstanceObject = SettableObject<InstanceObject>;
        type SettableUserObject = SettableObject<UserObject>;
        type SettableGroupObject = SettableObject<GroupObject>;
        type SettableScriptObject = SettableObject<ScriptObject>;
        type SettableScheduleObject = SettableObject<ScheduleObject>;
        type SettableChartObject = SettableObject<ChartObject>;
        type SettableDesignObject = SettableObject<DesignObject>;
        type SettableRepositoryObject = SettableObject<RepositoryObject>;
        type SettableSystemConfigObject = SettableObject<SystemConfigObject>;
        type SettableOtherObject = SettableObject<OtherObject>;

        // Used to infer the return type of GetObjectView
        type InferGetObjectViewItemType<Design extends string, View extends string> = Design extends 'system'
            ? View extends 'host'
                ? HostObject
                : View extends 'adapter'
                  ? AdapterObject
                  : View extends 'instance'
                    ? InstanceObject
                    : View extends 'meta'
                      ? MetaObject
                      : View extends 'device'
                        ? DeviceObject
                        : View extends 'channel'
                          ? ChannelObject
                          : View extends 'state'
                            ? StateObject
                            : View extends 'folder'
                              ? FolderObject
                              : View extends 'enum'
                                ? EnumObject
                                : View extends 'script'
                                  ? ScriptObject
                                  : View extends 'group'
                                    ? GroupObject
                                    : View extends 'user'
                                      ? UserObject
                                      : View extends 'chart'
                                        ? ChartObject
                                        : View extends 'schedule'
                                          ? ScheduleObject
                                          : View extends 'config'
                                            ?
                                                  | RepositoryObject
                                                  | SystemConfigObject
                                                  | (OtherObject & {
                                                        type: 'config';
                                                    })
                                            : View extends 'custom'
                                              ? NonNullable<StateObject['common']['custom']>
                                              : ioBroker.Object
            : any;
    }
}
