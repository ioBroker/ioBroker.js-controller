module.exports = process.env.DEV ?
    require('../packages/controller/lib/letsencrypt') :
    require('iobroker.js-controller/lib/letsencrypt');
