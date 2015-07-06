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
                'www/js/*.js',
            ]
        },
        browserify: {
            dev: {
                src: ['www/js/*.js'],
                dest: 'www/index.js',
                options: {
                    browserifyOptions: {
                        debug: true // Enable (inline) source map
                    }
                }
            }
        },
        jst: {
            compile: {
                options: {
                    processName: function(filepath) {
                        // Remove 'www/tpl/' at the front and '.html' at the end
                        return filepath.slice(8, -5);
                    },
                    templateSettings: {
                        variable: 'data'
                    },
                    external: ['underscore']
                },
                files: {
                    'www/templates.js': ['www/tpl/*.html']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-jst');

    grunt.registerTask('build', ['jshint', 'jst', 'browserify:dev']);
    grunt.registerTask('default', ['build']);
};

// TODO: uglify (prod uniquement) + watch + node-underscorify