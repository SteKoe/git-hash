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
tbd

## git-hash.tree()
tbd