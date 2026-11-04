/// <reference types="@iobroker/types-dev" />
import os from 'node:os';
import * as url from 'node:url';
import { createRequire } from 'node:module';
import { tools } from '@iobroker/js-controller-common';
import { Controller } from '@/lib/controller/controller.js';

// eslint-disable-next-line unicorn/prefer-module
const require = createRequire(import.meta.url || `file://${__filename}`);

/* Use require('loadavg-windows') to enjoy os.loadavg() on Windows OS.
   Currently, Node.js on a Windows platform does not implement os.loadavg() functionality - it returns [0,0,0]
   Expect first results after 1 min from application start (before 1 min runtime it will return [0,0,0])
   Requiring it on other operating systems has NO influence.*/
if (os.platform() === 'win32') {
    require('loadavg-windows');
}

tools.ensureDNSOrder();

/**
 * Initialize the controller
 *
 * @param compactGroupId the id of the compact group
 */
export async function init(compactGroupId?: number): Promise<void> {
    const controller = new Controller({ compactGroupId });

    await controller.init();
}

// eslint-disable-next-line unicorn/prefer-module
const modulePath = url.fileURLToPath(import.meta.url || `file://${__filename}`);
if (process.argv[1] === modulePath) {
    init().catch(e => console.error(`Cannot start js-controller: ${e.message}`));
}
