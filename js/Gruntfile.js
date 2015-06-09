module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine_nodejs: {
      options: {
        specNameSuffix: 'Spec.js',
        helperNameSuffix: 'Helper.js',
        useHelpers: true,
        reporters: {
          console: {
            colors: true,
            cleanStack: 1,
            verbosity: 3,
            listStyle: 'indent'
          }
        }
      },
      your_target: {
        options: {
          useHelpers: true
        },
        specs: ["spec/**"],
        helpers: ["spec/helpers/**"]
      }
    },
    watch: {
      jasmine_nodejs: {
        files: [
          "spec/**/*.js",
          "spec/*.js",
          "lib/**"
        ],
      },
      tasks: ['jasmine_nodejs']
    }
  });

  grunt.loadNpmTasks('grunt-jasmine-nodejs');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['jasmine_nodejs']);
};
