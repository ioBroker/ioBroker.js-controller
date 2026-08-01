import { fileCommands } from '@/lib/controller/messages/commands/files.js';
import { infoCommands } from '@/lib/controller/messages/commands/info.js';
import { logCommands } from '@/lib/controller/messages/commands/logs.js';
import { notificationCommands } from '@/lib/controller/messages/commands/notifications.js';
import { repositoryCommands } from '@/lib/controller/messages/commands/repository.js';
import { settingsCommands } from '@/lib/controller/messages/commands/settings.js';
import { shellCommands } from '@/lib/controller/messages/commands/shell.js';
import { upgradeCommands } from '@/lib/controller/messages/commands/upgrade.js';
import type { HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/**
 * All commands which can be sent to `system.host.<hostname>`
 *
 * Important: Do not forget to update the list of protected commands in iobroker.admin/lib/socket.js for
 * "socket.on('sendToHost'" and iobroker.socketio/lib/socket.js
 */
export const hostCommands: Record<string, HostCommandHandler> = {
    ...shellCommands,
    ...logCommands,
    ...infoCommands,
    ...fileCommands,
    ...settingsCommands,
    ...notificationCommands,
    ...repositoryCommands,
    ...upgradeCommands,
};
