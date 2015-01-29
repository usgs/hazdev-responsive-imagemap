'use strict';


module.exports = function (grunt) {

	var gruntConfig = require('./gruntconfig');

	gruntConfig.tasks.forEach(grunt.loadNpmTasks);
	grunt.initConfig(gruntConfig);


	grunt.event.on('watch', function (action, filepath) {
		// Only lint the file that actually changed
		grunt.config(['jshint', 'scripts'], filepath);
	});

	grunt.registerTask('build', [
		'clean',
		'concurrent:build',
	]);

	grunt.registerTask('test', [
		'build',
		'connect:test',
		'mocha_phantomjs'
	]);

	grunt.registerTask('dist', [
		'build',
		'concurrent:dist',
		'connect:dist'
	]);

	grunt.registerTask('default', [
		'build',
		'compass:dev',
		'connect:dev',
		'connect:test',
		'mocha_phantomjs',
		'watch'
	]);

};
