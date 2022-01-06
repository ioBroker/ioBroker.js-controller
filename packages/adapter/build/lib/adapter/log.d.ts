/**
 * Log class for adapter.js
 *
 * It prefixes every message with the given namespace
 */
declare class Log {
    private readonly namespaceLog;
    private readonly level;
    private readonly logger;
    /**
     * @param namespaceLog Logging namespace to prefix
     * @param level The log level
     * @param logger logger instance
     */
    constructor(namespaceLog: string, level: string, logger: any);
    silly(msg: string): void;
    debug(msg: string): void;
    info(msg: string): void;
    error(msg: string): void;
    warn(msg: string): void;
}
export = Log;
//# sourceMappingURL=log.d.ts.map