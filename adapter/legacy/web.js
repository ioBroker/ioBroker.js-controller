var express = require('express');
var socketio = require('socket.io');
var app,
    appSsl,
    server,
    serverSsl,
    io,
    ioSsl;

var objects = {};
var states = {};

var adapter = require('.././adapter.js')({

    name:           'legacy',

    install: function (callback) {
        if (typeof callback === 'function') callback();
    },

    objectChange: function (id, obj) {
        objects[id] = obj;

        if (io)     io.sockets.emit('objectChange', id, obj);
        if (ioSsl)  ioSsl.sockets.emit('objectChange', id, obj);
    },

    stateChange: function (id, state) {
        states[id] = state;
        if (io)     io.sockets.emit('stateChange', id, state);
        if (ioSsl)  ioSsl.sockets.emit('stateChange', id, state);
    },

    unload: function (callback) {
        try {
            if (server) {
                adapter.log.info("terminating http server");
                server.close();

            }
            if (serverSsl) {
                adapter.log.info("terminating https server");
                serverSsl.close();

            }
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

    adapter.subscribeForeignStates('*');
    adapter.subscribeForeignObjects('*');

    initWebserver();

    getData();

}

function initWebserver() {
    if (adapter.config.listenPort) {
        app = express();
        server =    require('http').createServer(app)
    }
    if (adapter.config.listenPortSsl) {
        try {
            options = {
                key: fs.readFileSync(__dirname+'/ssl/privatekey.pem'),
                cert: fs.readFileSync(__dirname+'/ssl/certificate.pem')
            };
        } catch(err) {
            adapter.log.error(err.message);
        }
        if (options) {
            appSsl = express();
            serverSsl = require('https').createServer(options, appSsl);
        }
    }

    if (adapter.config.cache) {
        app.use('/', express.static(__dirname + '/../www/htdocs', { maxAge: 30758400000 }));
    } else {
        app.use('/', express.static(__dirname + '/../www/htdocs'));
    }

    if (server) {
        var port = adapter.getPort(adapter.config.listenPort, function (port) {
            server.listen(port);
            adapter.log.info("http server listening on port " + port);
            io = socketio.listen(server);
            /*io.set('logger', {
             debug: function(obj) {adapter.log.debug("socket.io: "+obj)},
             info: function(obj) {adapter.log.debug("socket.io: "+obj)} ,
             error: function(obj) {adapter.log.error("socket.io: "+obj)},
             warn: function(obj) {adapter.log.warn("socket.io: "+obj)}
             });*/
            io.on('connection', initSocket);
        });

    }

    if (serverSsl) {
        var portSsl = adapter.getPort(adapter.config.listenPortSsl, function (portSsl) {
            serverSsl.listen(portSsl);
            adapter.log.info("https server listening on port " + portSsl);
            ioSsl = socketio.listen(serverSsl);
            /*io.set('logger', {
             debug: function(obj) {adapter.log.debug("socket.io: "+obj)},
             info: function(obj) {adapter.log.debug("socket.io: "+obj)} ,
             error: function(obj) {adapter.log.error("socket.io: "+obj)},
             warn: function(obj) {adapter.log.warn("socket.io: "+obj)}
             });*/
            ioSsl.on('connection', initSocket);
        });
    }

}

function getData() {
    adapter.log.info('requesting all states');
    adapter.getForeignStates('*', function (err, res) {
        adapter.log.info('received all states');
        states = res;
    });
    adapter.log.info('requesting all objects');
    adapter.objects.getObjectList({include_docs: true}, function (err, res) {
        adapter.log.info('received all objects');
        res = res.rows;
        objects = {};
        for (var i = 0; i < res.length; i++) {
            objects[res[i].doc._id] = res[i].doc;
        }
    });
}

function initSocket(socket) {
    socket.on('log', function (sev, msg) {
        switch (sev) {
            case 'info':
                adapter.log.info(msg);
                break;
            case 'warn':
                adapter.log.warn(msg);
                break;
            case 'error':
                adapter.log.error(msg);
        }
    });

    socket.on('logDp', function (id) {
 
    });

    socket.on('execCmd', function (cmd, callback) {
        adapter.log.info('exec '+cmd);
        childProcess.exec(cmd, callback);
    });

    socket.on('execScript', function (script, arg, callback) {
        adapter.log.info('script '+script + '['+arg+']');
        var scr_prc = childProcess.fork(__dirname + script, arg);
        var result = null;
        scr_prc.on('message', function(obj) {
            // Receive results from child process
            console.log ('Message: ' + obj);
            adapter.log.debug('script result: ' + obj);
            result = obj;
        });
        scr_prc.on ('exit', function (code, signal) {
            if (callback) {
                adapter.log.debug('script end result: ' + result);
                callback(script, arg, result);
            }
        });
    });

    socket.on('restartAdapter', function (adapter) { // deprecated (should be implemented in admin-adapter)
        return restartAdapter(adapter)
    });

    socket.on('updateAddon', function (url, name) { // deprecated (should be implemented in admin-adapter)

    });

    socket.on('updateSelf', function () { // deprecated (should be implemented in admin-adapter)


    });

    socket.on('createBackup', function () { // deprecated (should be implemented in admin-adapter)


    });

    socket.on('createSnapshot', function () { // deprecated (should be implemented in admin-adapter)


    });

    socket.on('applyBackup', function (fileName) { // deprecated (should be implemented in admin-adapter)


    });

    socket.on('refreshAddons', function () { // deprecated (should be implemented in admin-adapter)


    });

    socket.on('reloadData', function () { // deprecated (should be implemented in admin-adapter)


    });

    // Get list of all IP address on device
    socket.on('getIpAddresses', function (callback) {
        var ifaces = os.networkInterfaces();
        var ipArr = [];
        for (var dev in ifaces) {
            var alias = 0;
            ifaces[dev].forEach(function (details) {
                if (details.family === 'IPv4') {
                    ipArr.push({name: dev + (alias ? ':' + alias: ''), address: details.address});
                    ++alias;
                }
            });
        }
        if (typeof callback === 'function') {
            callback(ipArr);
        }
    });

    // Get platform name, type and if as service under windows
    socket.on('getPlatform', function (callback) {
        var p = os.platform();
        if (typeof callback === 'function') {
            var plat = p;
            if (p == 'linux') {
                plat = 'linux';
            } else if (p.match(/^win/)) {
                plat = 'windows';
            } else if (p == 'darwin') {
                plat = 'osx';
            }
            callback(plat, p, fs.existsSync(__dirname + '/restart_ccu_io.bat'));
        }
    });

    socket.on('restart', function () {

    });

    socket.on('restartRPC', function () {  // deprecated

    });

    socket.on('reloadScriptEngine', function (callback) { // deprecated (scriptengine is a "normal" adapter)

    });

    socket.on('readdir', function (path, callback) {

    });

    socket.on('readdirStat', function(path, callback) {


    });

    socket.on('rename', function(path_old,path, callback) {


    });

    socket.on('mkDir', function(path, callback) {


    });

    socket.on('removeRecursive', function(path, callback) {


    });

    socket.on('writeFile', function (name, obj, callback) {


    });

    socket.on('writeAdapterSettings', function (adapter, obj, callback) { // deprecated


    });

    socket.on('writeRawFile', function (path, content, callback) {


    });

    socket.on('writeBase64', function (path, content, callback) {


    });

    socket.on('readFile', function (name, callback) {


    });

    socket.on('readRawFile', function (name, callback) {


    });

    socket.on('readBase64', function (name, callback) {


    });

    socket.on('touchFile', function (name, callback) {


    });

    socket.on('delRawFile', function (name, callback) {


    });

    socket.on('readJsonFile', function (name, callback) {


    });

    socket.on('getUrl', function (url, callback) {
        adapter.log.info('GET '+url);
        if (url.match(/^https/)) {
            https.get(url, function(res) {
                var body = '';
                res.on('data', function (data) {
                    body += data;
                });
                res.on('end', function () {
                    callback(body);
                });

            }).on('error', function(e) {
                adapter.log.error('GET '+url+' '+ e.message);
            });
        } else {
            http.get(url, function(res) {
                var body = '';
                res.on('data', function (data) {
                    body += data;
                });
                res.on('end', function () {
                    callback(body);
                });
            }).on('error', function(e) {
                adapter.log.error('GET '+url+' '+ e.message);
            });
        }
    });

    socket.on('getStatus', function (callback) {  // deprecated


    });

    socket.on('getNextId', function (start, callback) { // deprecated

    });

    socket.on('getSettings', function (callback) {

    });

    socket.on('getVersion', function(callback) {

    });

    socket.on('getDatapoints', function(callback) {
        adapter.log.verbose('socket.io <-- getDatapoints');

        callback(states);
    });

    socket.on('getDatapoint', function(id, callback) {
        adapter.log.verbose('socket.io <-- getDatapoint ' + id);

        callback(id, states[id]);
    });

    socket.on('getObjects', function(callback) {
        adapter.log.verbose('socket.io <-- getObjects');
        callback(objects);
    });

    socket.on('getIndex', function(callback) {

    });

    socket.on('getStringtable', function(callback) { // was this ever used?
        adapter.log.verbose('socket.io <-- getStringtable');

    });


    socket.on('setObject', setObject);

    socket.on('delObject', delObject);


    socket.on('setState', function (arr, callback) {
        var id = arr[0];
        var obj = {
            val: arr[1],
            ts: arr[2],
            ack: arr[3]
        };
        adapter.setState(id, obj, function () {
            if (typeof callback === 'function') callback();
        });

    });

    socket.on('programExecute', programExecute); // deprecated

    socket.on('runScript', function (script, callback) { // deprecated
    });


}

