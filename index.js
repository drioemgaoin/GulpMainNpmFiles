var fs = require('fs');
var path = require('path');
var callerId = require('caller-id');

module.exports = function(options) {
  function getMainFile(modulePath) {
    var json = JSON.parse(fs.readFileSync(modulePath + '/package.json'));
    return modulePath + "/" + (json.main || "index.js");
  };

  options = options || {};

  if(!options.nodeModulesPath) {
    options.nodeModulesPath = './node_modules';
  } else if(!path.isAbsolute(options.nodeModulesPath)) {
    var caller = callerId.getData();
    options.nodeModulesPath = path.join(path.dirname(caller.filePath), options.nodeModulesPath);
  }

  if(!options.packageJsonPath) {
    options.packageJsonPath = './package.json';
  } else if(!path.isAbsolute(options.packageJsonPath)) {
    var caller = callerId.getData();
    options.packageJsonPath = path.join(path.dirname(caller.filePath), options.packageJsonPath);
  }

  var buffer, packages, keys;
  buffer = fs.readFileSync(options.packageJsonPath);
  packages = JSON.parse(buffer.toString());
  keys = [];

  for (var key in packages.dependencies) {
    keys.push(getMainFile(options.nodeModulesPath + "/" + key));
  }

  if (options.devDependencies) {
    for (var key in packages.devDependencies) {
      keys.push(getMainFile(options.nodeModulesPath + "/" + key));
    }
  }

  return keys;
};
