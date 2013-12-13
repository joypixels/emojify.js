module.exports = function (grunt) {
    // Do grunt-related things in here
    grunt.initConfig({
        pkg : grunt.file.readJSON('package.json'),
        meta : {
            project : '<%= pkg.name %>',
            version : '<%= pkg.version %>',
            banner  : '/*! <%= meta.project %> - v<%= meta.version %> - \n' +
            ' * Copyright (c) Hassan Khan <%= grunt.template.today("yyyy") %>\n' +
            ' */'
        },
        jshint : {
            jshintrc     : '.jshintrc',
            files        : ['emojify.js']
        },
        less : {
            dist : {
                options : {
                    compile : true
                },
                files : {
                    'css/emojify.css' : 'less/emojify.less'
                }
            }
        },
        uglify : {
            options : {
                banner : '<%= meta.banner %>'
            },
            production : {
                files : {
                    'emojify.min.js' : 'emojify.js'
                }
            }
        },
        cssmin: {
            add_banner: {
                options: {
                    banner: '<%= meta.banner %>'
            },
            files: {
                'css/emojify.min.css': 'css/emojify.css'
                }
            }
        },
        clean : {
            production : {
                src : ['css/emojify.css']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask(
        'default',
        [
            // 'jshint',
            'less',
            'uglify',
            'cssmin'
        ]
    );
};
