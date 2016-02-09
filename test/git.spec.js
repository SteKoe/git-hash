'use strict';
var expect = require('expect.js');
var path = require('path');
var fs = require('fs');
var mkdirp = require('mkdirp');

var Git = require('../src/git');
var GitIndex = require('../src/git-index');

describe('Git', (done) => {
    const repoPath = path.resolve(__dirname + '/../tmp');

    beforeEach(() => {
        deleteFolderRecursive(repoPath);
    });

    it('initializes with emtpy index!', () => {
        var git = Git.init(repoPath);
        expect(GitIndex(git.info()).size()).to.be(0);
    });

    it('tracks files added via add in index!', () => {
        var git = Git.init(repoPath);

        writeFile('test.txt', 'Hello, World!');
        writeFile('a/b/c/test.txt', 'Hello, World!');

        git.add('.');
        expect(GitIndex(git.info()).size()).to.be(2);
    });

    it('throws exception when commit is invoked on empty index!', () => {
        var git = Git.init(repoPath);
        expect(git.commit).to.throwError(/Nothing to commit!/);
    });

    it('creates initial commits correctly!', () => {
        Date.now = function() {
            return 12314234;
        };

        const git = Git.init(repoPath, 'Stephan Koeninger', 'mail@stekoe.de');

        writeFile('a/test.txt', 'Hello, World!');

        git.add('.');
        git.commit('Initial');

        const treeObject = [git.info().root, git.info().metaDir, 'objects/34/1cf04522a24fcf326c5e46ff7ce4f66ff310dd'].join('/');
        const commitObject = [git.info().root, git.info().metaDir, 'objects/4e/758dad801d9467fc354d5166bd30fe0efd8f5a'].join('/');

        expect(fs.existsSync(treeObject)).to.be(true);
        expect(fs.existsSync(commitObject)).to.be(true);
    });

    // == Helper ====
    function deleteFolderRecursive(path) {
        if( fs.existsSync(path) ) {
            fs.readdirSync(path).forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.lstatSync(curPath).isDirectory()) { // recurse
                    deleteFolderRecursive(curPath);
                } else { // delete file
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    }

    function writeFile(filename, content) {
        const p = path.resolve([repoPath, filename].join('/'));
        mkdirp.sync(path.dirname(p));
        fs.writeFileSync(p, content, 'utf8');
    }
});