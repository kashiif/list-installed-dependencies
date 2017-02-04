var path = require('path');
var fs = require('fs');
var readJson = require('read-package-json');

function extractDependencyVersion(pkgJsonPath, callback){
  readJson(pkgJsonPath, function (err, pkgJson) {
    if (err) {
      callback(dep + ' ' + err);
      return;
    }

    var depName = path.dirname(pkgJsonPath);

    // Cater for the scoped named packagaes e.g. "@wabson/list-dependencies"
    depName = depName.substr(depName.lastIndexOf('node_modules/') + 13);

    callback(null, {
      name: depName,
      version: pkgJson.version
    });

  });
}

exports.extractDependencyVersion = extractDependencyVersion;

  exports.processSingleDependency = function(dep, callback) {

  var depPkgPath = path.join('node_modules', dep, 'package.json');

  fs.access(depPkgPath, function(err){

    if (err) {
      callback(dep + ' ' + err);
      return;
    }

    extractDependencyVersion(depPkgPath, callback);
  });

};