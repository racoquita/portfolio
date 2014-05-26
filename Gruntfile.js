module.exports = function(grunt) {
	grunt.task.loadNpmTasks('grunt-contrib-handlebars');
	grunt.task.loadNpmTasks('grunt-contrib-compass');
	grunt.task.loadNpmTasks('grunt-contrib-connect');
	grunt.task.loadNpmTasks('grunt-contrib-watch');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		handlebars: {
			build: {
				options: {
					namespace: 'raco',
					processName: function(filename) {
						return filename.replace('hbs/', '').replace('.hbs', '');
					}
				},
				files: {
					'js/templates.js': 'hbs/**/*.hbs'
				}
			}
		},
		compass: {
			build: {
				options: {
					sassDir: 'scss',
					cssDir: 'css',
					outputStyle: 'expanded',
					force: true,
					noLineComments: false
				}
			},
			minify: {
				options: {
					sassDir: 'scss',
					cssDir: 'css',
					outputStyle: 'compressed',
					force: true,
					noLineComments: true
				}
			}
		},
		connect: {
			build: {
				options: {
					hostname: '',
					port: 8002,
					base: '',
					open: true
				}
			}
		},
		watch: {
			scss: {
				files: 'scss/**/*.scss',
				tasks: ['compass:build'],
				options: {
					livereload: true
				}
			},
			hbs: {
				files: 'hbs/**/*.hbs',
				tasks: ['handlebars:build'],
				options: {
					livereload: true
				}
			},
			js: {
				files: 'js/**/*.js',
				tasks: [],
				options: {
					livereload: true
				}
			},
			once: {
				files: 'index.html',
				tasks: [],
				options: {
					livereload: true
				}
			}
		}
	});

/* primary task */
return grunt.registerTask('default', ['handlebars:build', 'compass:build', 'compass:minify', 'connect:build', 'watch']);
};