module.exports = {
    Client: require('@iobroker/db-states-redis').Client,
    Server: require('./lib/states/statesInMemServerClass.js'),
    getDefaultPort: _host => {
        return 9000;
    }
};
