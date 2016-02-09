#!/usr/bin/env node
const program = require('commander');
const manifest = require('./package.json');

program
    .version(manifest.version);

require('./lib/command/add')(program);
require('./lib/command/init')(program);

program.parse(process.argv);

if (!program.args || !program.args.length) {
    program.help();
}