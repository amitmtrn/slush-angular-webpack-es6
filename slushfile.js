var gulp = require('gulp'); // the gulp running the tasks with gulp
var inquirer = require('inquirer'); // ask the question
var template = require('gulp-template');
var rename = require('gulp-rename');
var jeditor = require('gulp-json-editor');
var merge = require('merge-stream');
var rimraf = require('gulp-rimraf');

gulp.task('default', function(done) { // build the package

  // ask the questions
  inquirer.prompt([
    {type: 'input', name: 'name', message: 'What do you want to name your app?', default: getNameProposal()},
    {type: 'input', name: 'description', message: 'Describe your app?', default: ''},
    {type: 'input', name: 'license', message: 'License?', default: ''},
    {type: 'input', name: 'author', message: 'Author name?', default: ''}
  ],
  function(answers) { // get the answers
    gulp.src(__dirname + '/templates/app/**')
    .pipe(template(answers))
    .pipe(gulp.dest('./'));
  });
});

gulp.task('directive', function(done) { // build the package

  // ask the questions
  inquirer.prompt([
    {type: 'input', name: 'moduleName', message: 'module name?', default: gulp.args ? gulp.args[0] : ''},
    {type: 'input', name: 'name', message: 'directive name (no space, camelCase)?', default: gulp.args ? gulp.args[0] : ''},
    {type: 'input', name: 'restrict', message: 'restrict?', default: 'E'},
    {type: 'input', name: 'controllerAs', message: 'controllerAs?', default: gulp.args ? gulp.args[0] : ''}
  ],
  function(answers) { // get the answers
    var scaffold = gulp.src(__dirname + '/templates/directive/**.*')
    .pipe(template(answers))
    .pipe(rename(function(path) {
      path.basename = answers.moduleName + path.basename;
    }))
    .pipe(gulp.dest('./src/' + answers.moduleName));

    var addConfig = gulp.src('./src/app/appConfig.json')
    .pipe(jeditor(function(json) {
      json.moduleDependencies.push(answers.moduleName);
      return json; // must return JSON object.
    }))
    .pipe(rimraf())
    .pipe(gulp.dest('./src/app/'));

    return merge(scaffold, addConfig);
  });
});

function getNameProposal() {
  var path = require('path');
  try {
    return require(path.join(process.cwd(), 'package.json')).name;
  } catch (e) {
    return path.basename(process.cwd());
  }
}
