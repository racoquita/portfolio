module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-watch');
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
    watch:{
      hbs:{
        files: 'hbs/**/*.hbs',
        tasks: ['handlebars:dev']
      }
    }

    
  });

  // Default task(s).
  grunt.registerTask('default', ['handlebars:dev', 'watch']);

};