var srcDir   = __dirname + "/../";

module.exports = {
    all: {
        src: [
                srcDir + "*.js",
                srcDir + "lib/*.js",
                srcDir + "adapter/**/*.js",
                '!' + srcDir + 'node_modules/**/*.js',
                '!' + srcDir + 'adapter/admin/www/lib/**/*.js',
                '!' + srcDir + 'adapter/*/node_modules/**/*.js',
                '!' + srcDir + 'adapter/legacy/www/*/**/*.js'
        ],
        options: require('./jscsRules.js')
    }
};