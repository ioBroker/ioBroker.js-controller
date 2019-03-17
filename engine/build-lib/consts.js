const path = require('path');

module.exports = {
    FRONT_END_DIR: path.normalize(__dirname + '/../front-end/public/').replace(/\\/g, '/'),
    SRC_DOC_DIR: path.join(path.normalize(__dirname + '/../../docs/')).replace(/\\/g, '/'),
    GITHUB_ROOT: 'https://github.com/ioBroker/ioBroker.docs/edit/engine/docs/',
    LANGUAGES: ['de', 'en', 'ru'],
};
