import assert from 'node:assert/strict';
import os from 'node:os';
import path from 'node:path';
import fs from 'fs-extra';
import sinon from 'sinon';
import { tools } from '@iobroker/js-controller-common';
import { createLogCommands, type LogCommandsDeps } from '@/lib/controller/messages/commands/logs.js';
import { silentLogger } from '@/lib/controller/testing.test-utils.js';

/**
 * Local time as the logger writes it, e.g. `2026-11-04 10:00:00.123`
 *
 * @param date the time to format
 */
function logTime(date: Date): string {
    const pad = (value: number, length = 2): string => String(value).padStart(length, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 3)}`;
}

/**
 * A log of the last minutes: an info, a warning, an error with a stack trace and another info
 *
 * @param now the time the newest entry was written
 */
function logContent(now: number): string {
    const at = (minutesAgo: number): string => logTime(new Date(now - minutesAgo * 60_000));
    return [
        `${at(4)}  - info: host.testhost first info`,
        `${at(3)}  - warn: admin.0 a warning`,
        `${at(2)}  - error: host.testhost an error`,
        '    at Immediate.<anonymous> (/opt/iobroker/test.js:1:1)',
        `${at(1)}  - info: host.testhost second info`,
        '',
    ].join('\n');
}

interface Setup {
    commands: ReturnType<typeof createLogCommands>;
    sendTo: sinon.SinonStub;
    warn: sinon.SinonStub;
}

/**
 * The log commands with a logger that writes the given file and a recording message bus
 *
 * @param logFile the file the logger writes now
 * @param controllerDir directory of the js-controller, the fallback log is in `../../log` of it
 */
function setup(logFile: string, controllerDir: string): Setup {
    const sendTo = sinon.stub();
    const warn = sinon.stub();
    const logger = silentLogger({ warn, getFileName: () => logFile });

    const deps = {
        messages: { sendTo },
        logger,
        hostLogPrefix: 'host.testhost',
        hostObjectPrefix: 'system.host.testhost',
        hostname: 'testhost',
        controllerDir,
        logList: [],
    } as unknown as LogCommandsDeps;

    return { commands: createLogCommands(deps), sendTo, warn };
}

/**
 * A received host message
 *
 * @param command the host command
 * @param message its payload
 */
function request(command: string, message: unknown): ioBroker.SendableMessage {
    return {
        command,
        message,
        from: 'system.adapter.admin.0',
        callback: { id: 1 },
    } as unknown as ioBroker.SendableMessage;
}

describe('host commands for the log files', () => {
    let dir: string;
    let controllerDir: string;
    let logFile: string;
    let content: string;

    beforeEach(async () => {
        dir = await fs.mkdtemp(path.join(os.tmpdir(), 'iob-log-commands-'));
        controllerDir = path.join(dir, 'node_modules', 'iobroker.js-controller');
        // the fallback path goes through it with `..`, which Linux resolves only for directories that exist
        await fs.ensureDir(controllerDir);
        const now = Date.now();
        logFile = path.join(dir, 'log', `${tools.appName}.${logTime(new Date(now)).slice(0, 10)}.log`);
        content = logContent(now);
        await fs.outputFile(logFile, content);
    });

    afterEach(async () => {
        await fs.remove(dir);
    });

    describe('getLogs', () => {
        it('answers a plain number of lines as before: the lines and the size of the file last', async () => {
            const { commands, sendTo } = setup(logFile, controllerDir);

            await commands.getLogs(request('getLogs', 200));

            const [to, command, lines] = sendTo.firstCall.args;
            assert.strictEqual(to, 'system.adapter.admin.0');
            assert.strictEqual(command, 'getLogs');
            assert.deepStrictEqual(lines, [...content.split('\n'), String(Buffer.byteLength(content))]);
        });

        it('returns only the requested level and the more severe ones, stack traces included', async () => {
            const { commands, sendTo } = setup(logFile, controllerDir);

            await commands.getLogs(request('getLogs', { lines: 200, logLevel: 'warn' }));

            const lines: string[] = sendTo.firstCall.args[2];
            assert.deepStrictEqual(lines, [
                content.split('\n')[1],
                content.split('\n')[2],
                content.split('\n')[3],
                String(Buffer.byteLength(content)),
            ]);
        });

        it('reads the log in the data directory if the logger writes no file', async () => {
            const fallback = path.join(controllerDir, '..', '..', 'log', `${tools.appName}.log`);
            await fs.move(logFile, fallback);
            const { commands, sendTo } = setup(path.join(dir, 'missing.log'), controllerDir);

            await commands.getLogs(request('getLogs', { logLevel: 'error' }));

            const lines: string[] = sendTo.firstCall.args[2];
            assert.deepStrictEqual(lines, [
                content.split('\n')[2],
                content.split('\n')[3],
                String(Buffer.byteLength(content)),
            ]);
        });

        it('answers with a size of 0 if there is no log file at all', async () => {
            const { commands, sendTo } = setup(path.join(dir, 'missing.log'), path.join(dir, 'nowhere', 'a', 'b'));
            await fs.remove(logFile);

            await commands.getLogs(request('getLogs', 200));

            assert.deepStrictEqual(sendTo.firstCall.args[2], [0]);
        });

        it('does not answer a request without a callback', async () => {
            const { commands, sendTo } = setup(logFile, controllerDir);

            await commands.getLogs({ command: 'getLogs', message: 200, from: 'system.adapter.admin.0' });

            assert.strictEqual(sendTo.callCount, 0);
        });
    });

    describe('searchLogs', () => {
        it('answers with the matching entries of the log files of this host', async () => {
            const { commands, sendTo } = setup(logFile, controllerDir);

            await commands.searchLogs(request('searchLogs', { level: 'warn', source: 'host.testhost' }));

            const [to, command, result] = sendTo.firstCall.args;
            assert.strictEqual(to, 'system.adapter.admin.0');
            assert.strictEqual(command, 'searchLogs');
            assert.deepStrictEqual(result.lines, [content.split('\n').slice(2, 4).join('\n')]);
            assert.strictEqual(result.truncated, false);
            assert.strictEqual(result.files, 1);
        });

        it('answers with an error if the host writes no log file', async () => {
            const { commands, sendTo } = setup('', controllerDir);

            await commands.searchLogs(request('searchLogs', {}));

            assert.match(sendTo.firstCall.args[2].error, /does not write a log file/);
        });
    });
});
