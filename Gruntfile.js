module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-compass');
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    handlebars: {
      dev: {
        files:{
          'js/templates.js': 'hbs/**/*.hbs'
        },
        options:{
          namespace: 'raco', 
          partialRegex: /^_/,
          processName: function (filename) {
            return filename.replace('hbs/', '').replace('.hbs', '')
          } 
        } 
      }
    },
    compass: {
      build: {
        options: {
          sassDir: 'scss',
          cssDir: 'css',
          outputStyle: 'compact',
          force: true,
          noLineComments: true
        }
      }
    },
    watch:{
      hbs:{
        files: 'hbs/**/*.hbs',
        tasks: ['handlebars:dev']
      },
      scss: {
        files: 'scss/**/*.scss',
        tasks: ['compass:build']
      }
    }

    
  });

  // Default task(s).
  grunt.registerTask('default', ['handlebars:dev','compass:build', 'watch']);

};