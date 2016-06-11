// tasks/jshint.js
module.exports = function(grunt) {
  grunt.config('jshint', {
    files: ['Gruntfile.js', 'src/**/*.js'],
    options: {
      // options here to override JSHint defaults
      globals: {
        jQuery: true,
        console: true,
        module: true,
        document: true
      }
    }
  });
};