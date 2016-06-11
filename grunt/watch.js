module.exports = {
  less: {
	  files: ['src/**/*.less', 'src/**/*.js', 'src/**/*.html'],
	  tasks: ['recess', 'newer:htmlmin', 'newer:copy:dist'],
  }
}
