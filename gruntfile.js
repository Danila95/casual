module.exports = function(grunt) {

    // 1. Вся настройка находится здесь

    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
			
      connect: {
        all: {
          options: {
            port: 9001,
            base: 'public',
            livereload: true,
            open: true
          }
        }
      },
			
      autoprefixer: {
        dist: {
          files: {
            'public/css/main.css': 'public/css/main.css'
          }
        }
      },
			
      watch: {
        css: {
          files: ['dev/scss/**'],
          tasks: ['sass', 'autoprefixer'],
        },
				
        html: {
          files: ['dev/pug/**'],
          tasks: ['jade'],
        },
				
        livereload: {
          files: ['public/**'],
          options: {
            livereload: true
          },
        },
      },
			
      sass: {
        dist: {
          files: {
            'public/css/main.css' : 'dev/scss/main.scss'
          }
        }
      },
			
			jade: {
				compile: {
					options: {
						data: {
							client: false,
							debug: false
						}
					},
					files: [
						{
							cwd: 'dev/pug',
							src: '*.jade',
							dest: 'public',
							ext: '.html',
             				expand: true
						}
					]
				}
			},
			
			sync: {
				main: {
					files: [
						{
							cwd: 'dev/img',
							src: ['**'],
							dest: 'public/img'
						},
						{
							cwd: 'dev/fonts',
							src: ['**'],
							dest: 'public/fonts'
						},
						{
							cwd: 'dev/vendor',
							src: ['**'],
							dest: 'public/js/vendor'
						}
					],
					updateAndDelete: true
				}
			},
			
			coffee: {
				compileJoined: {
					options: {
						join: true
					},
					files: {
						'public/js/app.js': 'dev/coffee/**/*.coffee'
					}
				},
			},
			
			clean: ['public']
			
    });

    // 3. Тут мы указываем Grunt, что хотим использовать этот плагин
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-sync');

    // 4. Указываем, какие задачи выполняются, когда мы вводим «grunt» в терминале
    grunt.registerTask('default', ['sass', 'autoprefixer', 'jade', 'connect', 'watch']);

};