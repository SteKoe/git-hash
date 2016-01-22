var GitHash = require('../src/git-hash');
var expect = require('expect.js');

describe('hash', () => {
    it('hashes blobs correctly when no LR is provided!', () => {
        var actual = GitHash.blob('Hello, World!');
        expect(actual).to.be('b45ef6fec89518d314f546fd6c3025367b721684');
    });

    it('hashes blobs correctly when LR is provided!', () => {
        var actual = GitHash.blob('Hello, World!\n');
        expect(actual).to.be('8ab686eafeb1f44702738c8b0f24f2567c36da6d');
    });

    it('hashes blobs correctly when LR LR is provided!', () => {
        var actual = GitHash.blob('Hello, World!\n\n');
        expect(actual).to.be('476f506d8ccb4d1fb65a5936cf1c2b104815a2aa');
    });

    it('hashes commits correctly!', () => {
        var commitObject = [
            'tree 341cf04522a24fcf326c5e46ff7ce4f66ff310dd',
            'author Stephan Koeninger <github@stekoe.de> 1453410322 +0100',
            'committer Stephan Koeninger <github@stekoe.de> 1453410322 +0100',
            '',
            'My First Commit',
            ''
        ].join('\n');

        var actual = GitHash.commit(commitObject);
        expect(actual).to.be('2c4d704f9c1c5b16df44980b657a2b0c766d3da1');
    });

    it('hashes empty tree correctly!', () => {
        var actual = GitHash.tree('');
        expect(actual).to.be('4b825dc642cb6eb9a060e54bf8d69288fbee4904');
    });

    it('hashes tree correctly!', () => {
        var commitObject = [
            '100644 blob b45ef6fec89518d314f546fd6c3025367b721684\ttest.txt'
        ].join('\n');

        var actual = GitHash.tree(commitObject);
        expect(actual).to.be('341cf04522a24fcf326c5e46ff7ce4f66ff310dd');
    });

    it('hashes complex tree correctly!', () => {
        var commitObject = [
            '100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391\ta',
            '100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391\tb',
            '100644 blob e69de29bb2d1d6434b8b29ae775ad8c2e48c5391\tc',
            '100644 blob b45ef6fec89518d314f546fd6c3025367b721684\ttest.txt',
            '100644 blob 485898852752293ee18a0160210f8ca51e6ba37d\ttree.txt'
        ].join('\n');

        var actual = GitHash.tree(commitObject);
        expect(actual).to.be('f32cd58dfcf86ce1c3413c7b4b7d5621f1a21617');
    });
});