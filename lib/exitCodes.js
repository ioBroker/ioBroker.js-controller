module.exports = process.env.DEV ?
    require('../packages/common').EXIT_CODES :
    require('@iobroker/js-controller-common').EXIT_CODES;
