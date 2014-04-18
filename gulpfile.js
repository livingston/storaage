var gulp    = require("gulp");
var connect = require('connect');
var http    = require('http');

gulp.task('serve', function(){
  var buildPath = __dirname;
  var app = connect()
              .use(connect.logger('dev'))
              .use(connect.static(buildPath));

  http.createServer(app).listen(4000);
});

gulp.task('default', ['serve']);
