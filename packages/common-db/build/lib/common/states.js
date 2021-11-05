'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStatesConstructor = void 0;
const fs = require("fs-extra");
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const js_controller_common_1 = require("@iobroker/js-controller-common");
function getStatesConstructor() {
    const config = fs.readJSONSync(js_controller_common_1.tools.getConfigFileName());
    if (!config.states) {
        config.states = { type: 'file' };
    }
    try {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require(`@iobroker/db-states-${config.states.type}`).Client;
    }
    catch (_a) {
        console.error(`Installation broken or unknown states type: ${config.states.type} configured.`);
        process.exit(101);
    }
}
exports.getStatesConstructor = getStatesConstructor;
