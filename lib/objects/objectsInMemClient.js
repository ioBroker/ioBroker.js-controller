'use strict';

let Objects = null;
try {
    // @ts-ignore
    Objects = require('./objectsInRedis');
} catch (e) {
    console.log('error: ' + e);
    Objects = require('iobroker.objects-redis');
}

module.exports = Objects; //require('iobroker.objects-redis');
