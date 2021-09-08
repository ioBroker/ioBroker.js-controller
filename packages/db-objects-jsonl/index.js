module.exports = {
    Client: require('@iobroker/db-objects-redis').Client,
    Server: require('./lib/objects/objectsInMemServerClass.js'),
    getDefaultPort: _host => {
        return 9001;
    }
};
