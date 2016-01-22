#git-hash

This tool uses node.js Buffer to calculate hashes of given input.
There are three different kinds of input types which are adopted from git: blob, commit, and tree.
The way sha1 checksums are calculated are the same as in git.

## git-hash.blob()
Blobs are representations of files in git's internal folder structure.
A blob is the content of a file which is revision controlled by git.

Native git command:

```
$ echo -n 'Hello, World!' | git hash-object --stdin
b45ef6fec89518d314f546fd6c3025367b721684
```

git-hash.js:

```
var GitHash = require('git-hash');
var sha = GitHash.blob('Hello, World!'); //sha=b45ef6fec89518d314f546fd6c3025367b721684
```

## git-hash.commit()
Native git command:

```
$ echo -n -e 'tree 7a2df406dae8eaa23c427cdd1d3ab68f185fcf6f\nauthor Stephan Koeninger <github@stekoe.de> 1453441379 +0100\ncommitter Stephan Koeninger <github@stekoe.de> 1453441379 +0100\n\nInitial commit\n' | git hash-object -t commit --stdin
125757d5d2521927c0bd83e22537d401b5dc875a
```

git-hash.js:

```
var GitHash = require('git-hash');

var commitObject = [
    'tree 7a2df406dae8eaa23c427cdd1d3ab68f185fcf6f',
    'author Stephan Koeninger <github@stekoe.de> 1453441379 +0100',
    'committer Stephan Koeninger <github@stekoe.de> 1453441379 +0100',
    '',
    'Initial commit',
    ''
].join('\n');
var sha = GitHash.commit(commitObject); //sha=125757d5d2521927c0bd83e22537d401b5dc875a
```


## git-hash.tree()
tbd