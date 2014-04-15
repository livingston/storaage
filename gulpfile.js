var gulp    = require("gulp");
var connect = require('connect');
var http    = require('http');

gulp.task('serve', function(){
  var buildPath = __dirname;
  var app = connect()
              .use(connect.logger('dev'))
              .use(connect.static(buildPath));

  http.createServer(app).listen(8080);
});

// gulp.task('build', ['clean', 'templates', 'es6', 'styles']);
// gulp.task('default', ['build', 'watch', 'serve', 'open']);
