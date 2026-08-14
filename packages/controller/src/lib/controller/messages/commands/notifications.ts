import type { MessageBus } from '@/lib/controller/messages/messageBus.js';
import type { NotificationHandler } from '@iobroker/js-controller-common';
import type { HostCommand, HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/** Everything the host commands for the notifications of this host need */
export interface NotificationCommandsDeps {
    /** Handles the notifications of this host */
    notificationHandler: NotificationHandler;
    /** Sends the answers back to the requester */
    messages: MessageBus;
}

/**
 * Register a new notification at the notification handler of this host
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const addNotification: HostCommand<NotificationCommandsDeps> = async (deps, msg) => {
    const { notificationHandler, messages } = deps;

    await notificationHandler.addMessage({
        scope: msg.message.scope,
        category: msg.message.category,
        message: msg.message.message,
        instance: msg.message.instance,
        contextData: msg.message.contextData,
    });

    if (msg.callback && msg.from) {
        messages.sendTo(msg.from, msg.command, { result: 'ok' }, msg.callback);
    }
};

/**
 * Clear notifications of the given scope, category and instance
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const clearNotifications: HostCommand<NotificationCommandsDeps> = async (deps, msg) => {
    const { notificationHandler, messages } = deps;

    await notificationHandler.clearNotifications(msg.message.scope, msg.message.category, msg.message.instance);

    if (msg.callback && msg.from) {
        messages.sendTo(msg.from, msg.command, { result: 'ok' }, msg.callback);
    }
};

/**
 * Answer with all notifications of the given scope, category and instance
 *
 * @param deps What this group of commands needs
 * @param msg The received message
 */
const getNotifications: HostCommand<NotificationCommandsDeps> = (deps, msg) => {
    const { notificationHandler, messages } = deps;

    if (!msg.callback || !msg.from) {
        return;
    }

    const notificationsObj = notificationHandler.getFilteredInformation(
        msg.message.scope,
        msg.message.category,
        msg.message.instance,
    );

    messages.sendTo(msg.from, msg.command, { result: notificationsObj }, msg.callback);
};

/**
 * Create the host commands for the notifications of this host
 *
 * @param deps Everything these commands need
 */
export function createNotificationCommands(deps: NotificationCommandsDeps): Record<string, HostCommandHandler> {
    return {
        addNotification: msg => addNotification(deps, msg),
        clearNotifications: msg => clearNotifications(deps, msg),
        getNotifications: msg => getNotifications(deps, msg),
    };
}
