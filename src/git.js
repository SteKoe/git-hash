'use strict';
let _mkdirp = require('mkdirp');
let _fs = require('fs');

exports = module.exports = {
    init: init
};

function init(path, author, email) {
    let repository = {
        root: path,
        metaDir: '.bpmn',
        index: 'index',
        author: author,
        email: email
    };

    _mkdirp.sync([repository.root, repository.metaDir].join('/'));
    _fs.writeFileSync([repository.root, repository.metaDir, repository.index].join('/'), '', 'utf8');

    return {
        add: require('./git-add')(repository),
        commit: require('./git-commit')(repository),
        info: () => repository
    }
}