type LogFunction = (msg: string) => void;

/**
 * Log class for adapter.js
 *
 * It prefixes every message with the given namespace
 */
export class Log implements ioBroker.Logger {
    private readonly namespaceLog: string;
    readonly level: ioBroker.LogLevel;
    // TODO: this should be a winston.Logger, but the exported types will mess up because of https://github.com/microsoft/rushstack/issues/2220
    private readonly logger: {
        silly: LogFunction;
        debug: LogFunction;
        info: LogFunction;
        warn: LogFunction;
        error: LogFunction;
    };

    /**
     * @param namespaceLog Logging namespace to prefix
     * @param level The log level
     * @param logger logger instance
     */
    constructor(namespaceLog: string, level: ioBroker.LogLevel, logger: any) {
        this.namespaceLog = namespaceLog;
        this.level = level;
        // We have to bind the `this` context here, or it is possible that `this` is
        // undefined when passing around the logger methods. This happens e.g. when doing this:
        //   const log = new Log(...);
        //   const test = log.info;
        //   test();
        this.logger = logger;
        this.silly = this.silly.bind(this);
        this.debug = this.debug.bind(this);
        this.info = this.info.bind(this);
        this.error = this.error.bind(this);
        this.warn = this.warn.bind(this);
    }

    /**
     * Log a message at the silly level, prefixed with the adapter namespace
     *
     * @param msg the message to log
     */
    silly(msg: string): void {
        this.logger.silly(`${this.namespaceLog} ${msg}`);
    }

    /**
     * Log a message at the debug level, prefixed with the adapter namespace
     *
     * @param msg the message to log
     */
    debug(msg: string): void {
        this.logger.debug(`${this.namespaceLog} ${msg}`);
    }

    /**
     * Log a message at the info level, prefixed with the adapter namespace
     *
     * @param msg the message to log
     */
    info(msg: string): void {
        this.logger.info(`${this.namespaceLog} ${msg}`);
    }

    /**
     * Log a message at the error level, prefixed with the adapter namespace
     *
     * @param msg the message to log
     */
    error(msg: string): void {
        this.logger.error(`${this.namespaceLog} ${msg}`);
    }

    /**
     * Log a message at the warn level, prefixed with the adapter namespace
     *
     * @param msg the message to log
     */
    warn(msg: string): void {
        this.logger.warn(`${this.namespaceLog} ${msg}`);
    }
}
