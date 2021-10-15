module.exports = process.env.DEV ?
    require('../packages/common/lib/common/password') :
    require('@iobroker/js-controller-common/lib/common/password');
