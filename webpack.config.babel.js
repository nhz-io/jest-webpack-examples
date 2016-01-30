import path from 'path';
import pkg from './package.json';
import webpack from 'webpack';

const
  SRC                     = 'examples',
  DIST                    = 'dist',
  NODE_MODULES            = 'node_modules',

  MAIN                    = 'index.es6',

  ROOT_PATH               = path.resolve(__dirname),
  SRC_PATH                = path.resolve(ROOT_PATH, SRC),
  DIST_PATH               = path.resolve(ROOT_PATH, DIST),
  NODE_MODULES_PATH       = path.resolve(ROOT_PATH, NODE_MODULES),

  ENTRY_PATH              = path.resolve(SRC_PATH, MAIN),

  TARGET                  = process.env.TARGET || process.env.npm_lifecycle_event;

module.exports = {
  entry: (function(entry = {}) {
    entry[pkg.name] = entry[pkg.name + '.min'] = ENTRY_PATH
    return entry;
  }()),

  resolve: {
    root: ROOT_PATH,
    extensions: ["", ".js", "es6", "jsx"],
    alias: {
      "package.json": path.resolve(ROOT_PATH, "package.json"),
    }
  },

  externals: (function(externals = {}) {
    for(var key in pkg.dependencies) { externals[key] = key };
    return externals;
  }()),

  output: {
    path: DIST_PATH,
    filename: "[name].js",
    libraryTarget: 'commonjs2',
    library: true,
  },

  module: {
    preLoaders: [
      {
        test: /\.(js|es6|jsx)$/i,
        loader: 'eslint-loader',
        include: SRC_PATH,
        exclude: NODE_MODULES_PATH,
      }
    ],

    loaders: [
      {
        test: /\.(js|es6|jsx)$/i,
        loader: 'babel',
        include: SRC_PATH,
        exclude: NODE_MODULES_PATH,
      },      
      {
        test: /\.css$/,
        loaders: [ 'style', 'css' ],
        include: [ SRC_PATH, NODE_MODULES_PATH ]
      },
      {
        test: /\.((?!(js|es6|jsx|css)).)+$/i,
        loader: 'file?hash=sha512&digest=hex&name=[hash].[ext]',
        include: [ SRC_PATH, NODE_MODULES_PATH ],
      }
    ]
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      include: /\.min\.js$/,
      mangle: {
        except: ['$super', '$', 'exports', 'require'],
      }
    })
  ],

  eslint: {
    configFile: '.eslintrc',
  }
};
