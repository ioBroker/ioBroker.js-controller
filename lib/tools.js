module.exports = process.env.DEV ?
    require('../packages/common/lib/common/tools') :
    require('@iobroker/js-controller-common').tools;
