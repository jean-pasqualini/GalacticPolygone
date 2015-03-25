module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-symlink');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    //grunt.file.mkdir('app/Resources/public/images/');
    grunt.file.mkdir('web/built/');

    // properties are css files
    // values are less files
    var filesLess = {};

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            bundles: {
                files: filesLess
            }
        },
        symlink: {
        },
        concat: {
            dist: {
                src: [
                    'web/lib/require.js',
                    'web/vendor/matter-js/build/matter.js',
                    'web/lib/SkelzEngine.js',
                    'web/src/js/game/entity/*.js',
                    'web/src/js/game/room/*.js',
                    'web/src/js/main.js'
                ],
                dest: 'web/built/app/js/app.js'
            }
        },
        watch: {
            css: {
                files: ['web/src/less/*.less'],
                tasks: ['css']
            },
            javascript: {
                files: ['web/src/js/*.js'],
                tasks: ['javascript']
            }
        },
        uglify: {
            dist: {
                files: {
                    'web/built/app/js/app.min.js': ['web/built/app/js/app.js']
                }
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                devel: true,
                undef: true,
                unused: true,
                bitwise: true,
                camelcase: true,
                forin: true,
                immed: true,
                latedef: true,
                newcap: true,
                quotmark: 'single',
                strict: true,
                maxparams: 4,
                maxdepth: 2,
                maxcomplexity: 3,
                globals: {
                    'angular' : true,
                    'jQuery': true,
                    '$': true,
                    '_': true,
                    'Mustache': true
                }
            },
            dist: {
                src: [
                    //'web/src/js/**/*.js'
                ]
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['css', 'javascript']);
    grunt.registerTask('css', ['less:discovering', 'less']);
    grunt.registerTask('javascript', ['jshint', 'concat', 'uglify']);
    grunt.registerTask('assets:install', ['symlink']);
    grunt.registerTask('deploy', ['assets:install', 'default']);
    grunt.registerTask('less:discovering', 'This is a function', function() {
        // LESS Files management
        // Source LESS files are located inside : bundles/[bundle]/less/
        // Destination CSS files are located inside : built/[bundle]/css/

    });
};