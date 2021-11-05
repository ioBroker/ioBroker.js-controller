'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getObjectsConstructor = void 0;
const fs = require("fs-extra");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const js_controller_common_1 = require("@iobroker/js-controller-common");
function getObjectsConstructor() {
    const config = fs.readJSONSync(js_controller_common_1.tools.getConfigFileName());
    if (!config.objects) {
        config.objects = { type: 'file' };
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(`@iobroker/db-objects-${config.objects.type}`).Client;
    }
    catch (_a) {
        console.error(`Installation broken or unknown objects type: ${config.objects.type} configured.`);
        process.exit(101);
    }
}
exports.getObjectsConstructor = getObjectsConstructor;
