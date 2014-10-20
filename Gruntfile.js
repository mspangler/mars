module.exports = function(grunt) {

  // Do grunt-related things in here
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';',
      },
      dist: {
        src: ['public/js/geolocation.js', 'public/js/share/list.js'],
        dest: 'public/js/dist/input.js',
      },
    },
    jshint: {
      beforeconcat: ['public/js/geolocation.js', 'public/js/share/list.js'],
      //afterconcat: ['public/js/dist/input.js']
    },
    uglify: {
      options: {
        mangle: false
      },
      my_target: {
        files: {
          'public/js/dist/output.min.js': ['public/js/dist/input.js']
        }
      }
    }
  });

  // Load the plugins
  grunt.loadNpmTasks('grunt-contrib-jshint'); // run this task with 'grunt jshint'
  grunt.loadNpmTasks('grunt-contrib-uglify'); // run this task with 'grunt uglify'
  grunt.loadNpmTasks('grunt-contrib-concat'); // run this task with 'grunt concat'

  // Run all the tasks with 'grunt'
  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

};
