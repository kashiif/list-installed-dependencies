var readJson = require('read-package-json');
var mapSeries = require('async/mapSeries');

var libFunctions = require('./lib/functions');

module.exports = function listDependencies(expr, callback) {
  readJson('package.json', function (er, data) {
    if (er) {
      console.error("There was an error reading the package.json file");
      return
    }

    var regexp = new RegExp(expr),
        deps = Object.keys(data.dependencies);

    mapSeries(deps, function(dep, callback){

      if (regexp.test(dep)) {
        libFunctions.processSingleDependency(dep, callback);
      }
      else {
        callback(null, null);
      }
    }, function(err, results) {
      // results now equals an array of the hash { name: String, version: String }
      callback(results.filter(function(entry){
        return entry !== null;
      }));
    });

  });
};
