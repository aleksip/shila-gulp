'use strict';

module.exports = (gulp, gulpfileExports, config) => {
  const helpers = require('./lib/helpers.js');

  if (!config) {
    config = helpers.loadConfig();
  }

  let mainTasks = {
    lint: [],
    build: [],
    watch: []
  };

  if (config.browsersync) {
    require('./lib/browsersync.js')(gulp, gulpfileExports, config, mainTasks);
  }
  if (config.sass) {
    require('./lib/sass.js')(gulp, gulpfileExports, config, mainTasks);
  }

  gulpfileExports.lint = gulp.parallel(mainTasks.lint);
  gulpfileExports.build = gulp.series(mainTasks.build);
  gulpfileExports.watch = gulp.parallel(mainTasks.watch);
  gulpfileExports.default = gulp.series(
    gulpfileExports.lint, gulpfileExports.build, gulpfileExports.watch);

  return {
    config: config,
    helpers: helpers
  }
};
