#!/usr/bin/env node

var listDependencies = require('../index');
listDependencies(process.argv[2], function(dependencies) {
    dependencies.forEach(function(d) {
        console.log(d.name + '@' + d.version);
    });
});
