'use strict'

const gulp = require('gulp')
const inquirer = require('inquirer')
const mockirer = require('mockirer')
const mockGulpDest = require('mock-gulp-dest')(gulp)

const mocha = require('mocha')
const it = mocha.it
const describe = mocha.describe
const before = mocha.before
const beforeEach = mocha.beforeEach

require('../slushfile')

describe('slush-react-start', () => {
	before(() => {
		process.chdir(__dirname)
	})

	describe('should be created the files when use es6-webpack', () => {
		beforeEach(() => {
			mockirer(inquirer, {
				es: 'es6-webpack',
				appName: 'simple-test',
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
})