var tools = require(__dirname + '/tools.js');
tools.getRepositoryFile('https://raw.githubusercontent.com/ioBroker/ioBroker.js-controller/master/conf/sources-dist.json', function (err, data) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log(JSON.stringify(data, null, 2));
    for (var a = 0; a < process.argv.length; a++) {
        if (process.argv[a] == '--file' && process.argv[a + 1]) {
            require('fs').writeFileSync(process.argv[a + 1], JSON.stringify(data, null, 2));
        }
    }
    process.exit();
});