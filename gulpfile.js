var gulp           = require("gulp");
var connect        = require('connect');
var http           = require('http');

var mochaPhantomJS = require('gulp-mocha-phantomjs');

gulp.task('serve', function(){
  var buildPath = __dirname;
  var app = connect()
              .use(connect.logger('dev'))
              .use(connect.static(buildPath));

  http.createServer(app).listen(4000);
});

gulp.task('test', function (){
  var stream = mochaPhantomJS();

  stream.write({path: 'test/runner.html'});
  stream.end();

  return stream;
});

gulp.task('default', ['serve']);
gulp.task('specs', ['serve', 'test']);
