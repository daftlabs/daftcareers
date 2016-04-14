var paths = require('../paths');
import browserify  from 'browserify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import debowerify from 'debowerify';
import babelify from 'babelify';
import browserifyShim from 'browserify-shim';
import es from 'event-stream';

module.exports = function(gulp, $, reload, gutil) {
  return function() {
    var files = [
      paths.srcPaths.scripts + '/main.js',
      paths.srcPaths.scripts + '/satisfaction.js'
    ];

    var tasks = files.map(function (entry) {
      var distFilename = entry.replace(paths.srcPaths.scripts + '/', '').replace('.js', '.min.js');

      return browserify({ entries: entry })
        .transform(debowerify)
        .transform(babelify)
        .transform(browserifyShim)
        .bundle()
        .pipe(source(distFilename))
        .pipe(buffer())
        .pipe($.sourcemaps.init({ loadMaps: true }))
          .pipe($.uglify())
          .on('error', gutil.log)
        .pipe($.sourcemaps.write('./'))
        .pipe(gulp.dest(paths.distPaths.scripts));
    });

    return es.merge.apply(null, tasks);
  }
}

