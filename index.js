'use strict';

module.exports = function(gulp, gulpfileExports, config) {
  if (!config) {
    try {
      const yaml = require('js-yaml');
      const fs = require('fs');
      config = yaml.safeLoad(
        fs.readFileSync('./shila-gulp-config.yml', 'utf8'));
    }
    catch (e) {
      return;
    }
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
};
