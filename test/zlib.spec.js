'use strict';
const expect = require('expect.js');
const fs = require('fs');
const gitZlib = require('git-zlib');

var Deflate = gitZlib.Deflate;
var stringToByteArray = gitZlib.Util.stringToByteArray;
var Inflate = gitZlib.Inflate;

const GitHash = require('../src/git-hash');

describe.skip('zlib', () => {
    it('hashes blobs correctly when no LR is provided!', (done) => {

        const input = fs.readFileSync('compressed', 'binary');
        let plain, recompressed;

        inflate(input, function (err, _plain) {
            plain = new Buffer(_plain);
        });

        deflate(plain, function (err, _recomporessed) {
            recompressed = new Buffer(_recomporessed);
        });

        console.log('input       ', new Buffer(input));
        console.log('plain       ', plain);
        console.log('recompressed', recompressed);
    });

    function deflate(buffer, callback) {
        var deflater = new Deflate(new Buffer(buffer));
        var compressed = deflater.compress();
        callback(null, compressed);
    }

    function inflate(buffer, callback) {
        var inflater = new Inflate(new Buffer(buffer));
        var plain = inflater.decompress();
        callback(null, plain);
    }
});

