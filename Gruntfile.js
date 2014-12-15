module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        watch: {
            sass: {
                files: ['app/sass/**/*.scss'],
                tasks: ['sass:dist']
            },
            livereload: {
                files: ['app/**/*.html', 'app/js/**/*.{js,json}', 'app/css/*.css','app/img/**/*.{png,jpg,jpeg,gif,webp,svg}'],
                options: {
                    livereload: true
                }
            }
        },
        sass: {
			options: {
				outputStyle: 'compressed'
			},
            dist: {
                files: {
                    'app/css/styles.css': 'app/sass/index.scss'
                }
            }
        },
		requirejs : {
			compile : {
				options : {
					baseUrl : 'app/js',
					name : 'main',
					paths : {
						almond : '../../bower_components/almond/almond',
						jquery : '../../bower_components/jquery/dist/jquery.min',
						velocity : '../../bower_components/velocity/velocity.min',
						unveil : 'vendor/jquery.unveil',
						backbone : '../../bower_components/backbone/backbone',
						underscore : '../../bower_components/underscore/underscore-min',
						text : '../../bower_components/requirejs-text/text',
						bus : 'utilities/bus',
						templates : '../templates'
					},
					include : ['almond'],
					insertRequire : ['main'],
					out : 'app/js/app.js',
					wrap : true,
					optimize : 'none',
					preserveLicenseComments : false
				}
			}
		}
    });
    grunt.registerTask('default', ['sass:dist', 'watch']);
    grunt.registerTask('build', ['sass:dist', 'requirejs']);
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-requirejs');
};