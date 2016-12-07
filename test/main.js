var mainNpmFiles = require('../');
var path = require('path');

require('should');

describe('main-npm-files', function() {
  function expect(filenames) {
      var expectedFiles = [].concat(filenames).map(function(filename) {
          return path.join(__dirname, filename);
      });

      function run(path, options, done) {
          options = options || {};

          if (!options.packageJsonPath) {
            options.packageJsonPath = __dirname + path;
          }

          if (!options.nodeModulesPath) {
            options.nodeModulesPath = __dirname + "/fixtures";
          }

          var srcFiles = mainNpmFiles(options);
          srcFiles.should.be.eql(expectedFiles);

          if (done) {
              done();
          }
      }

      return {
          fromConfig: function(path, options) {
              return {
                  when: function(done) {
                      run(path, options, done);
                  }
              };
          }
      };
  }

  it('should select the expected files with dependency', function(done) {
      expect([
          '/fixtures/module1/index.js',
          '/fixtures/module2/dist/index.js'
      ])
      .fromConfig('/_package.json')
      .when(done);
  });
});
