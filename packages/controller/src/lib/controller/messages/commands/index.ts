import { createFileCommands, type FileCommandsDeps } from '@/lib/controller/messages/commands/files.js';
import { createInfoCommands, type InfoCommandsDeps } from '@/lib/controller/messages/commands/info.js';
import { createLogCommands, type LogCommandsDeps } from '@/lib/controller/messages/commands/logs.js';
import {
    createNotificationCommands,
    type NotificationCommandsDeps,
} from '@/lib/controller/messages/commands/notifications.js';
import {
    createRepositoryCommands,
    type RepositoryCommandsDeps,
} from '@/lib/controller/messages/commands/repository.js';
import { createSettingsCommands, type SettingsCommandsDeps } from '@/lib/controller/messages/commands/settings.js';
import { createShellCommands, type ShellCommandsDeps } from '@/lib/controller/messages/commands/shell.js';
import { createUpgradeCommands, type UpgradeCommandsDeps } from '@/lib/controller/messages/commands/upgrade.js';
import type { HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/**
 * The dependencies of every group of host commands
 *
 * Each group declares its own, so a handler can only reach what its group asked for. They are kept
 * apart here instead of being merged, which makes it visible per group what it is allowed to touch.
 */
export interface HostCommandGroupDeps {
    /** What the commands for zip based file and object transfers need */
    files: FileCommandsDeps;
    /** What the commands for information about this host need */
    info: InfoCommandsDeps;
    /** What the commands for the log files need */
    logs: LogCommandsDeps;
    /** What the commands for the notifications need */
    notifications: NotificationCommandsDeps;
    /** What the commands for the adapter repositories need */
    repository: RepositoryCommandsDeps;
    /** What the commands for the iobroker.json need */
    settings: SettingsCommandsDeps;
    /** What the commands for executing shell and CLI commands need */
    shell: ShellCommandsDeps;
    /** What the commands for upgrades, rebuilds and restarts need */
    upgrade: UpgradeCommandsDeps;
}

/**
 * Create all commands which can be sent to `system.host.<hostname>`
 *
 * Important: Do not forget to update the list of protected commands in iobroker.admin/lib/socket.js for
 * "socket.on('sendToHost'" and iobroker.socketio/lib/socket.js
 *
 * @param deps The dependencies of every group of host commands
 */
export function createHostCommands(deps: HostCommandGroupDeps): Record<string, HostCommandHandler> {
    return {
        ...createShellCommands(deps.shell),
        ...createLogCommands(deps.logs),
        ...createInfoCommands(deps.info),
        ...createFileCommands(deps.files),
        ...createSettingsCommands(deps.settings),
        ...createNotificationCommands(deps.notifications),
        ...createRepositoryCommands(deps.repository),
        ...createUpgradeCommands(deps.upgrade),
    };
}
