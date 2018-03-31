/* jshint -W097 */
/* jshint strict:false */
/* jslint node:true */
/* jshint expr:true */
'use strict';

const expect   = require('chai').expect;
const setup    = require('./lib/setup4controller');
let   objects  = null;
let   states   = null;
const textName = 'File';
const tests    = require('./lib/testObjects');
let   context  = {
    objects: null,
    name: textName
};

describe(textName + ' Test Objects', function() {
    before(textName + ' Start js-controller', function (_done) {
        this.timeout(2000);

        setup.startController({
                objects: {
                    dataDir: __dirname + '/../tmp/data',
                    onChange: function (id, obj) {
                        console.log('object changed. ' + id);
                    }
                },
                states: {
                    dataDir: __dirname + '/../tmp/data',
                    onChange: function (id, state) {
                        console.log('state changed. ' + id);
                    }
                }
            },
            function (_objects, _states) {
                objects = _objects;
                states  = _states;
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
        setup.stopController(function () {
            done();
        });
    });
});
