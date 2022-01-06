"use strict";
/**
 * Log class for adapter.js
 *
 * It prefixes every message with the given namespace
 */
class Log {
    /**
     * @param namespaceLog Logging namespace to prefix
     * @param level The log level
     * @param logger logger instance
     */
    constructor(namespaceLog, level, logger) {
        this.namespaceLog = namespaceLog;
        this.level = level;
        // We have to bind the this context here or it is possible that `this` is
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
    silly(msg) {
        this.logger.silly(`${this.namespaceLog} ${msg}`);
    }
    debug(msg) {
        this.logger.debug(`${this.namespaceLog} ${msg}`);
    }
    info(msg) {
        this.logger.info(`${this.namespaceLog} ${msg}`);
    }
    error(msg) {
        this.logger.error(`${this.namespaceLog} ${msg}`);
    }
    warn(msg) {
        this.logger.warn(`${this.namespaceLog} ${msg}`);
    }
}
module.exports = Log;
//# sourceMappingURL=log.js.map