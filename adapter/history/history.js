var adapter = require('../../modules/adapter.js')({

    name:           'history',
    version:        '0.0.0',

    objectChange: function (id, obj) {

    },
    stateChange: function (id, state) {
        pushHistory(id, state);
    },

    unload: function (callback) {
        try {
            adapter.log.info('history terminating');
            callback();
        } catch (e) {
            callback();
        }
    },

    ready: function () {
        main();
    }

});

function main() {

    adapter.objects.getObjectView('hm-rpc', 'stateHistory', {}, function (err, doc) {
        console.log(doc);
    });

    //adapter.subscribeStates('*');

}

function pushHistory(id, state) {
    setTimeout(function (_id, _state) {
        adapter.states.pushFifoExists(_id, _state);
    }, 1500, id, state);
}

