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
                livereload: true,
                spawn: false
            },
            configFiles: {
                files: ['Gruntfile.js'],
                tasks: ['build'],
                options: {
                    reload: true
                }
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
            },
            css: {
                files: [
                    'www/css/main.css',
                    'www/css/page-container.css',
                    'node_modules/bootstrap/dist/css/bootstrap.min.css'
                ],
            },
        },
        connect: {
            server: {
                options: {
                    base: 'www',
                    open: true,
                    livereload: true
                }
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
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-browserify');

    grunt.registerTask('build', ['jshint', 'browserify:dev']);
    grunt.registerTask('dev', ['build', 'connect', 'watch']);
    grunt.registerTask('default', ['build']);
};

/* TODO:
 * - uglify (prod uniquement)
 * - remplacer connect par ripple et enlever le test "if (window.cordova)" dans init.js
 */
