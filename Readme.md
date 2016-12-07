## Installation
To install this module, you need to run the following command

```Javascript
$ npm install gulp-main-npm-files
```

## Usage

```Javascript
var mainNpmFiles = require('gulp-main-npm-files');
var files = mainNpmFiles([[filter, ]options][, callback]);
```

This will read your package.json, iterate through your dependencies and returns an array of files defined in the main property of the packages package.json.

## Usage with gulp

```Javascript
var gulp = require('gulp');
var mainNpmFiles = require('gulp-main-npm-files');

gulp.task('TASKNAME', function() {
    return gulp.src(mainNpmFiles())
        .pipe(/* what you want to do with the files */)
});
```

## Options
The module accepts the following options:
- **nodeModulesPath**: path to your node_modules. By default, it is ./node_modules that means this directory is at your project's root.

```Javascript
var mainNpmFiles = require('gulp-main-npm-files');

// Copy dependencies from ./node_modules to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(mainNpmFiles(), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

```Javascript
var mainNpmFiles = require('gulp-main-npm-files');

// Copy dependencies from ./path/node_modules to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(mainNpmFiles({ nodeModulesPath: "./path/node_modules" }), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

- **packageJsonPath**: path to you package.json file. By default, it is ./package.json that means this file is at your project's root with the default name.

```Javascript
var mainNpmFiles = require('gulp-main-npm-files');

// Copy dependencies present in ./package.jon to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(mainNpmFiles(), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

```Javascript
var mainNpmFiles = require('gulp-main-npm-files');

// Copy dependencies present in ./path/package.json to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(mainNpmFiles({ packageJsonPath: "path/package.json" }), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

- **devDependencies**: true if you want to take account the dev dependencies, false otherwise. The default value is false.

```Javascript
var mainNpmFiles = require('gulp-main-npm-files');

// Copy dependencies to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(mainNpmFiles(), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

```Javascript
var mainNpmFiles = require('gulp-main-npm-files');

// Copy dev dependencies and dependencies to build/node_modules/
gulp.task('copyNpmDependencies', function() {
  gulp.src(mainNpmFiles({ devDependencies: true }), { base:'./' })
    .pipe(gulp.dest('./build'));
});
```

## Comments
Don't hesitate to send me any recommendations, suggestions about this project. I really want to have some returns about does it work well, does it match user expectation, etc.

You can send me any issues you want or contact me to my github email and put the repository name in the subject.
