const browsersync = require('browser-sync');

module.exports = (gulp, gulpfileExports, config, mainTasks) => {
  config = config.browsersync;
  browsersync.create();

  function browsersyncInit(cb) {
    browsersync.init(config.options[config.use]);
    cb();
  }

  function browsersyncReload(cb) {
    browsersync.reload();
    cb();
  }

  function browsersyncWatch() {
    gulp.watch(config.watch.stream).on('change', function(path, stats) {
      return gulp.src(path)
        .pipe(browsersync.stream());
    });
    gulp.watch(config.watch.reload, browsersyncReload);
  }

  gulpfileExports.browsersyncInit = browsersyncInit;
  gulpfileExports.browsersyncReload = browsersyncReload;
  gulpfileExports.browsersyncWatch = browsersyncWatch;

  mainTasks.watch.push(browsersyncWatch);
  mainTasks.watch.push(browsersyncInit);
};
