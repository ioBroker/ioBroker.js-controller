/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

const expect = require('chai').expect;
const setup = require('../lib/setup4controller');
let objects = null;
let states = null;
const textName = 'Jsonl-File';
const tests = require('../lib/testObjects');
const context = {
    objects: null,
    name: textName
};

const objectsConfig = {
    options: {
        auth_pass: null,
        retry_max_delay: 100,
        retry_max_count: 2
    },
    dataDir: __dirname + '/../tmp/data',
    type: 'jsonl',
    host: '127.0.0.1',
    port: 19001,
    user: '',
    pass: '',
    noFileCache: true,
    connectTimeout: 2000,
    onChange: (id, _obj) => {
        console.log('object changed. ' + id);
    }
};

describe(textName + ' Test Objects File-Redis', function () {
    before(textName + ' Start js-controller', function (_done) {
        this.timeout(3000);

        setup.startController(
            {
                objects: objectsConfig,
                states: {
                    dataDir: __dirname + '/../tmp/data',
                    onChange: function (id, _state) {
                        console.log('state changed. ' + id);
                    }
                }
            },
            function (_objects, _states) {
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

    after(textName + ' Stop js-controller', function (done) {
        this.timeout(5000);
        setup.stopController(() => setTimeout(done, 2000));
    });
});
