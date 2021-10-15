module.exports = process.env.DEV ?
    require('../packages/controller/lib/session') :
    require('iobroker.js-controller/lib/session');
