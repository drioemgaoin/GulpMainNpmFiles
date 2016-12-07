var fs = require('fs');

module.exports = function(options) {
  function getMainFile(modulePath) {
    var json = JSON.parse(fs.readFileSync(modulePath + '/package.json'));
    return modulePath + "/" + (json.main || "index.js");
  };

  options = options || {};

  if(!options.nodeModulesPath) {
    options.nodeModulesPath = './node_modules';
  }

  if(!options.packageJsonPath) {
    options.packageJsonPath = './package.json';
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
