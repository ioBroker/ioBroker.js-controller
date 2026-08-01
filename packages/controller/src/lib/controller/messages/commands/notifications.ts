import type { HostCommandHandler } from '@/lib/controller/messages/hostMessageHandler.js';

/**
 * Register a new notification at the notification handler of this host
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const addNotification: HostCommandHandler = async (controller, msg) => {
    const { notificationHandler, messages } = controller;

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
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const clearNotifications: HostCommandHandler = async (controller, msg) => {
    const { notificationHandler, messages } = controller;

    await notificationHandler.clearNotifications(msg.message.scope, msg.message.category, msg.message.instance);

    if (msg.callback && msg.from) {
        messages.sendTo(msg.from, msg.command, { result: 'ok' }, msg.callback);
    }
};

/**
 * Answer with all notifications of the given scope, category and instance
 *
 * @param controller The controller which has received the message
 * @param msg The received message
 */
const getNotifications: HostCommandHandler = (controller, msg) => {
    const { notificationHandler, messages } = controller;

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

/** All commands which deal with the notifications of this host */
export const notificationCommands: Record<string, HostCommandHandler> = {
    addNotification,
    clearNotifications,
    getNotifications,
};
