module.exports = process.env.DEV ?
    require('../packages/adapter') :
    require('@iobroker/js-controller-adapter');
