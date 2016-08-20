var webpack             = require("webpack");
var WebpackDevServer    = require("webpack-dev-server");

var config = require("./webpack.config.js");
config.entry.app.unshift("webpack-dev-server/client?http://localhost:8080/");

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
    contentBase: 'build',
    stats: { 
        colors: true,
        hash: true,
        timings: true,
        chunks: true,
        chunkModules: false,
        modules: false 
    }
});

server.listen(8080);