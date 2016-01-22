var shasum = require('shasum');

exports = module.exports = {
    blob: hash('blob'),
    commit: hash('commit'),
    tree: hashTree
};

function hash(type) {
    return function (content) {
        var byteLength = bytes(content);
        var items = [
            new Buffer(type),
            new Buffer(' '),
            new Buffer(byteLength),
            new Buffer('\0'),
            new Buffer(content)
        ];
        var buffer = Buffer.concat(items);
        return shasum(buffer);
    }
}

function hashTree(content) {
    var a = content.split('\n')
        .filter(c => c !== "")
        .map(c => {
            var splitted = c.split(/\s|\t/g);
            var mode = splitted[0];
            var sha = splitted[2];
            var filename = splitted[3];

            var items = [
                new Buffer(mode),
                new Buffer(' '),
                new Buffer(filename),
                new Buffer('\0'),
                new Buffer(sha, 'hex')
            ];

            return Buffer.concat(items);
        });

    return hash('tree')(Buffer.concat(a));
}

function bytes(s) {
    if(typeof s === 'object') {
        return s.length.toString();
    }
    return Buffer.byteLength(s).toString()
}