'use strict'

const gulp = require('gulp')
const inquirer = require('inquirer')
const mockirer = require('mockirer')
const mockGulpDest = require('mock-gulp-dest')(gulp)

const assert = require('assert')
const mocha = require('mocha')
const it = mocha.it
const describe = mocha.describe
const before = mocha.before
const beforeEach = mocha.beforeEach

require('../slushfile')

describe('slush-react-start', function () {
	this.timeout(5000);

	before(() => {
		process.chdir(__dirname)
	})

	describe('should be not created the files', () => {
		it('when appName are empty', done => {
			mockirer(inquirer, {
				es: 'es5-browserify',
				appDescription: 'Another test',
				appAuthor: 'ceasbz',
				appEmail: 'ceasbz2@gmail.com'
			})

			gulp.start('default').once('stop', () => {
				assert.equal(mockGulpDest.files().length, 0)
				done()
			})
		})
	})

	describe('should be created the files when use es6-webpack', () => {
		beforeEach(() => {
			mockirer(inquirer, {
				es: 'es6-webpack',
				appName: 'ES6 Webpack Test',
				appDescription: 'Little description',
				appAuthor: 'ceasbz',
				appEmail: 'ceasbz2@gmail.com'
			})
		})

		it('should exists the files in root path', done => {
			gulp.start('default').once('stop', () => {
				mockGulpDest.assertDestContains([
					'.babelrc',
					'.gitignore',
					'package.json',
					'README.md',
					'webpack.config.js'
				])

				done()
			})
		})

		it('should exists the source files', done => {
			gulp.start('default').once('stop', () => {
				mockGulpDest.assertDestContains([
					'src/app.js',
					'src/hello.js',
					'src/index.html'
				])

				done()
			})
		})
	})

	describe('should be created the files when use es5-browserify', () => {
		beforeEach(() => {
			mockirer(inquirer, {
				es: 'es5-browserify',
				appName: 'ES5 Browserify Test',
				appDescription: 'Little description',
				appAuthor: 'ceasbz',
				appEmail: 'ceasbz2@gmail.com'
			})
		})

		it('should be exists the files in root path', done => {
			gulp.start('default').once('stop', () => {
				mockGulpDest.assertDestContains([
					'.gitignore',
					'package.json',
					'README.md'
				])

				done()
			})
		})

		it('should exists the source files', done => {
			gulp.start('default').once('stop', () => {
				mockGulpDest.assertDestContains([
					'src/app.js',
					'src/index.html'
				])

				done()
			})
		})
	})
})