// This should be the entry point for a refactoring of the CLI
// We'll start with the messages

module.exports = {
    success:     require('./messages').success,
    warn:        require('./messages').warn,
    error:       require('./messages').error,
    tools:       require('./cliTools'),
    command: {
        object:  require('./cliObjects.js'),
        state:   require('./cliStates.js'),
        process: require('./cliProcess.js'),
        message: require('./cliMessage.js'),
        logs:    require('./cliLogs.js'),
        host:    require('./cliHost.js'),
        cert:    require('./cliCert.js'),
        compact: require('./cliCompact.js'),
        debug:    require('./cliDebug.js'),
        plugin: require('./cliPlugin.js')
    }
};
