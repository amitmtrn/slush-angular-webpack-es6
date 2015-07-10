
module.exports = {

  // set the context (optional)
  context: __dirname + '/src',
  entry: './app/app.js',

  // enable loading modules relatively
  resolve: {
    root: [__dirname.replace(/\\/g, '/') + '/src']
  },

  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader:'babel' },
      { test: /\.less$/, loader: 'style!css!less'},
      { test: /\.json$/, loader: 'json' },

      // load raw html files
      { test: /\.html$/, exclude: /node_modules/, loader:'raw' },

      // load fonts and images
      { test: /\.(ttf|eot|svg|otf)$/, loader: 'file' },
      { test: /\.woff(2)?$/, loader: 'url?limit=10000&minetype=application/font-woff'}
    ]
  },

  // support source maps
  devtool: '#inline-source-map'
};
