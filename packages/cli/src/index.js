module.exports = {
    success: require('./lib/cli/messages').success,
    warn: require('./lib/cli/messages').warn,
    error: require('./lib/cli/messages').error,
    tools: require('./lib/cli/cliTools'),
    command: {
        object: require('./lib/cli/cliObjects.js'),
        state: require('./lib/cli/cliStates.js').CLIStates,
        process: require('./lib/cli/cliProcess.js'),
        message: require('./lib/cli/cliMessage.js'),
        logs: require('./lib/cli/cliLogs.js'),
        host: require('./lib/cli/cliHost.js'),
        cert: require('./lib/cli/cliCert.js'),
        compact: require('./lib/cli/cliCompact.js'),
        debug: require('./lib/cli/cliDebug.js'),
        plugin: require('./lib/cli/cliPlugin.js')
    },
    setupList: require('./lib/setup/setupList').List,
    setupPacketManager: require('./lib/setup/setupPacketManager').PacketManager,
    setupUpload: require('./lib/setup/setupUpload').Upload,
    setupInstall: require('./lib/setup/setupInstall').Install,
    setupBackup: require('./lib/setup/setupBackup').BackupRestore
};
