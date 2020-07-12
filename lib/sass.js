const sass = require('gulp-dart-sass');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const stylelint = require('gulp-stylelint');

module.exports = (gulp, gulpfileExports, config, mainTasks) => {
  config = config.sass;

  function sassLintFiles(files, options) {
    return gulp.src(files)
      .pipe(stylelint(options));
  }

  function sassLintGlobal() {
    return sassLintFiles(config.files.global, config.lint.options);
  }

  function sassLintComponents() {
    return sassLintFiles(config.files.components, config.lint.options);
  }

  function sassCompileFiles(files, options, dest) {
    return gulp.src(files)
      .pipe(sassGlob())
      .pipe(sourcemaps.init())
      .pipe(sass(options).on('error', sass.logError))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dest));
  }

  function sassCompileGlobal() {
    return sassCompileFiles(
      config.files.global,
      config.compile.options,
      config.compile.dest.global);
  }

  function sassCompileComponents() {
    return sassCompileFiles(
      config.files.components,
      config.compile.options,
      config.compile.dest.components);
  }

  function sassWatchGlobal() {
    gulp.watch(config.watch.global).on('change', function(path, stats) {
      sassLintFiles(path, config.lint.options);
      sassCompileGlobal();
    });
  }

  function sassWatchComponents() {
    gulp.watch(config.watch.components).on('change', function(path, stats) {
      sassLintFiles(path, config.lint.options);
      sassCompileFiles(path, config.compile.options, config.compile.dest.components);
    });
  }

  gulpfileExports.sassLintGlobal = sassLintGlobal;
  gulpfileExports.sassLintComponents = sassLintComponents;
  gulpfileExports.sassCompileGlobal = sassCompileGlobal;
  gulpfileExports.sassCompileComponents = sassCompileComponents;

  gulpfileExports.sassLint = gulp.parallel(sassLintGlobal, sassLintComponents);
  gulpfileExports.sassCompile = gulp.parallel(sassCompileGlobal, sassCompileComponents);
  gulpfileExports.sassWatchGlobal = sassWatchGlobal;
  gulpfileExports.sassWatchComponents = sassWatchComponents;
  gulpfileExports.sassWatch = gulp.parallel(sassWatchGlobal, sassWatchComponents);

  mainTasks.lint.push(gulpfileExports.sassLint);
  mainTasks.build.push(gulpfileExports.sassCompile);
  mainTasks.watch.push(gulpfileExports.sassWatch);
};
