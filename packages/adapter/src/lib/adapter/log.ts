/**
 * Log class for adapter.js
 *
 * It prefixes every message with the given namespace
 */
export class Log implements ioBroker.Logger {
    private readonly namespaceLog: string;
    readonly level: ioBroker.LogLevel;
    // TODO: this should be a winston.Logger, but the exported types will mess up because of https://github.com/microsoft/rushstack/issues/2220
    private readonly logger: any;

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

    silly(msg: string): void {
        this.logger.silly(`${this.namespaceLog} ${msg}`);
    }

    debug(msg: string): void {
        this.logger.debug(`${this.namespaceLog} ${msg}`);
    }

    info(msg: string): void {
        this.logger.info(`${this.namespaceLog} ${msg}`);
    }

    error(msg: string): void {
        this.logger.error(`${this.namespaceLog} ${msg}`);
    }

    warn(msg: string): void {
        this.logger.warn(`${this.namespaceLog} ${msg}`);
    }
}
