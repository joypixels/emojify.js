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
            files: [ 'emojify.js' ],
            options: {
                jshintrc: '.jshintrc'
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
            minify: {
                files: {
                    'emojify.min.css': 'emojify.css',
                    'emojify-emoticons.min.css': 'emojify-emoticons.css',
                }
            }
        },
        datauri: {
            production: {
                options: {
                    classPrefix: 'emoji-'
                },
                files: {
                    'emojify.css': 'images/emoji/*.png',
                    'emojify-emoticons.css': 'images/emoji/{blush,scream,smirk,smiley,stuck_out_tongue_closed_eyes,stuck_out_tongue_winking_eye,rage,disappointed,sob,kissing_heart,wink,pensive,confounded,flushed,relaxed,mask,heart,broken_heart}.png'
                }
            }
        },
        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['tests/node/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-mocha-test');
    grunt.loadNpmTasks('grunt-datauri');

    grunt.registerTask('test-node', 'mochaTest');
    grunt.registerTask(
        'default',
        [
            'jshint',
            'uglify',
            'datauri',
            'cssmin'
        ]
    );

};
