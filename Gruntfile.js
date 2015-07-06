module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                browserify: true,
                browser: true,
                devel: true
            },
            all: [
                'Gruntfile.js',
                'www/js/**/*.js',
            ]
        },
        watch: {
            options: {
                spawn: false
            },
            configFiles: {
                files: ['Gruntfile.js'],
                tasks: ['build']
            },
            js: {
                files: [
                    'www/js/**/*.js'
                ],
                tasks: ['build']
            },
            tpl: {
                files: [
                    'www/js/**/*.html'
                ],
                tasks: ['browserify:dev']
            }
        },
        browserify: {
            dev: {
                src: ['www/js/**/*.js'],
                dest: 'www/index.js',
                options: {
                    browserifyOptions: {
                        debug: true // Enable (inline) source map
                    }
                }
            },
            options: {
                transform: [
                    ['node-underscorify', {templateSettings: {variable: 'data'}}]
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['jshint', 'browserify:dev']);
    grunt.registerTask('default', ['build']);
};

// TODO: uglify (prod uniquement)