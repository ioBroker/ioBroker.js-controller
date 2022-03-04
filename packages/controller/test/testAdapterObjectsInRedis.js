/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

const expect = require('chai').expect;
const setup = require(__dirname + '/lib/setup4controller');
let objects = null;
let states = null;
const textName = 'Redis ';
const tests = require('./lib/testObjects');
const fs = require('fs');

const context = {
    objects: null,
    name: textName
};
if (!fs.existsSync(__dirname + '/../tmp')) {
    fs.mkdirSync(__dirname + '/../tmp');
}

const objectsConfig = {
    dataDir: __dirname + '/../tmp/data',
    type: 'redis',
    host: '127.0.0.1',
    port: 6379,
    user: '',
    pass: '',
    redisNamespace: 'testOnlyObjects',
    noFileCache: true,
    connectTimeout: 2000,
    onChange: (id, _obj) => {
        console.log(`object changed. ${id}`);
    }
};

describe(textName + 'Test Objects Redis', function () {
    before(textName + 'Start js-controller', function (_done) {
        this.timeout(23000);

        setup.startController(
            {
                objects: objectsConfig,
                states: {
                    dataDir: __dirname + '/../tmp/data',
                    onChange: (id, _state) => {
                        console.log('state changed. ' + id);
                    }
                }
            },
            (_objects, _states) => {
                objects = _objects;
                states = _states;
                context.objects = _objects;
                expect(objects).to.be.ok;
                expect(states).to.be.ok;
                _done();
            }
        );
    });

    tests.register(it, expect, context);

    after(textName + 'Stop js-controller', function (done) {
        this.timeout(5000);
        setup.stopController(function () {
            setTimeout(done, 2000);
        });
    });
});
