'use strict';

exports = module.exports = function (program) {
    program
        .command('add <pathspec..>')
        .description('Add BPMN-Diagram to the index');
};