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
        uglify : {
            options : {
                banner : '<%= meta.banner %>'
            },
            production : {
                files : {
                    'emojify.min.js' : 'emojify.js'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask(
        'default',
        [
            // 'jshint',
            'uglify'
        ]
    );
};
