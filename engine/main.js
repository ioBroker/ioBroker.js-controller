#!/usr/bin/env node
'use strict';

if (process.argv.indexOf('--debug') !== -1) {
    process.env.DEBUG = '*';
} else {
    process.env.NODE_ENV = 'production';
}

const web = require('./lib/web');
const search = require('./lib/search');

const app = web();
search.init(app.app);

