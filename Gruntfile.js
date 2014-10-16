module.exports = function(grunt) {

  // Do grunt-related things in here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    coffee: {
      compile: {
        files: {
          'public/js/dist/built.js': ['public/js/geolocation.coffee', 'public/js/index.coffee'] // compile and concat into single file
        }
      },
    },
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-coffee');

};
