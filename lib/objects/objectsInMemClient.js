'use strict';

let Objects;
try {
    // @ts-ignore normally class comes from objects-redis package, but in special cases is can exist locally
    Objects = require('./objectsInRedis');
} catch (e) {
    console.log(`error: ${e}`);
    Objects = require('@iobroker/db-objects-redis').Client;
}

module.exports = Objects; //require('iobroker.objects-redis');
