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
        },
        cssmin: {
            minify: {
                src: 'emojify.css',
                dest: 'emojify.min.css'
          }
        }
    });

    grunt.registerTask('buildCSS', 'Generate CSS for emojis in /images', function() {
        var fs = require('fs'),
            path = require('path'),
            util = require('util'),
            q = require('q'),
            done = this.async(),
            emojiPath = './images/emoji/',
            emojiCSS = fs.createWriteStream('emojify.css', {'flags': 'w'}),
            buildSelector = function(imageName, encodedImage) {
                return util.format('.emoji-%s {\n  background:\n    url(data:image/png;base64,%s) no-repeat right top;}\n',
                                   imageName, encodedImage);
            };

        fs.readdir(emojiPath, function (err, files) {
            q.all(files.map(function(file) {
                var deferred = q.defer();
                fs.readFile(path.join(emojiPath, file), function(err, data){
                    var base64Image = new Buffer(data, 'binary').toString('base64');
                    emojiCSS.write(buildSelector(file.slice(0, -4), base64Image), 'utf8', function() {
                        deferred.resolve();
                    });
                });
                return deferred.promise;
            })).then(function() {
                emojiCSS.close();
                done();
            });
        });
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');


    grunt.registerTask(
        'default',
        [
            'jshint',
            'uglify',
            'buildCSS',
            'cssmin'
        ]
    );

};
