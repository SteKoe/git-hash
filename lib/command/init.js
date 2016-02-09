'use strict';
const exec = require('child_process').exec;
const path = require('path');

exports = module.exports = function (program) {
    program
        .command('init [directory]')
        .description('Initialize an empty BPMN repository.')
        .option('--bare')
        .action(function (directory, options) {
            let gitCmd = ['git init'];
            if (options.bare) {
                gitCmd.push('--bare');
            }
            gitCmd.push(directory);

            exec(gitCmd.join(' '), (error, stdout, stderr) => {
                if (error) {
                    console.log(`exec error: ${error}`);
                } else {
                    console.log(stdout.replace('Git', 'BPMN'))
                }
            });
        })
        .on('--help', function () {
            console.log('  Examples:');
            console.log();
            console.log('    $ bpmn-scm init .');
            console.log('    $ bpmn-scm init --bare .');
            console.log();
        });
};