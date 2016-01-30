require('babel-register'); // Enable ES6 in webpack config

var webpackAlias = require('jest-webpack-alias');
var babelJest = require('babel-jest');

/*
 * Optional, modified, babel-jest preprocessor to enforce presets just in case
 * that default preprocessor (below) complains for some reason. (Happened once)

  var pkg = require('./package.json');
  var babel = require('babel-core');
  var presets = pkg.babel && pkg.babel.presets ? pkg.babel.presets : ['es2015'];
  var babelJest = {
    process: function(src, filename) {
      if (babel.util.canCompile(filename)) {
        return babel.transform(src, {
          filename: filename,
          retainLines: true,
          presets: presets
        }).code;
      }

      return src;
    }
  }

*/

module.exports = {
  process: function(src, filename) {
    if (filename.indexOf('node_modules') === -1) {
      src = babelJest.process(src, filename);
      src = webpackAlias.process(src, filename);
    }
    return src;
  }
};
