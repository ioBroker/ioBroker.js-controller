// Deprecated. This is only for back compatibility by tests!
console.warn(
    'Deprecated! Please use require("@iobroker/db-objects-file").Server in tests to start a server and then use require("@iobroker/db-objects-file").Client to connect with a client against this server!',
);

import { Server } from '@iobroker/db-objects-file';
export default Server;
