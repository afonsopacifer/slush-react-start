'use strict';

var gulp     = require('gulp'),
    install  = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    _        = require('underscore.string'),
    inquirer = require('inquirer');

gulp.task('default', function(done) {

    //Answers
    var prompts = [{
        name: 'es',
        message: 'What the version of javascript?',
        type: 'list',
            choices: [
            {
                key: 'a',
                name: 'ES6/ES2015',
                value: 'es6-webpack'
            },
            {
                key: 'b',
                name: 'ES5',
                value: 'es5-browserify'
            }
        ]
    }, {
        name: 'appName',
        message: 'What the name of project?'
    }, {
        name: 'appDescription',
        message: 'What the description?'
    }, {
        name: 'appVersion',
        message: 'What the version?',
        default: '0.1.0'
    }, {
        name: 'appAuthor',
        message: 'Name of author?'
    }, {
        name: 'appEmail',
        message: 'Author e-mail?'
    }];

    //Ask
    inquirer.prompt(prompts).then(answers => {
        if (!answers.appName) {
            return done();
        }

        answers.appNameSlug = _.slugify(answers.appName)
        answers.appAuthorSlug = _.slugify(answers.appAuthor)
        gulp.src(__dirname + '/src/' + answers.es + '/**')
            .pipe(template(answers))
            .pipe(rename(function(file) {
                if (file.basename[0] === '_') {
                    file.basename = '.' + file.basename.slice(1);
                }
            }))
            .pipe(conflict('./'))
            .pipe(gulp.dest('./'))
            .pipe(install())
            .on('end', function() {
                done();
            })
            .resume();
    });
});
